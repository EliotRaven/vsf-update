<template>
  <div class="droppoint-map">
    <div class="col-sm-12 mb25">
      <div class="row">
        <div class="col-sm-6">
          <label class="form-label">{{ $t('Choose your city') }}</label>
          <base-select
            class="col-12"
            name="cities"
            :options="citiesOptions"
            :selected="city"
            :validations="[
              {
                condition: $v.shipping.city.$error && !$v.shipping.city.required,
                text: $t('Field is required')
              }
            ]"
            v-model="city"
            @input="changeCity"
          />
          {{ error }}
        </div>
        <div class="col-sm-6">
          <label class="form-label">{{ $t('Street, metro') }}</label>
          <base-input type="text" value="" name="metro" class="col-12 input-wrapper" />
        </div>
      </div>
    </div>
    <div class="col-sm-12">
      <div class="nav-wrapper">
        <div class="row">
          <div class="col-sm-6">
            <a href="#"
               @click.prevent="showList"
               :class="[{'active': !show}, 'tab-nav']">
              {{ $t('List') }}
            </a>
          </div>
          <div class="col-sm-6">
            <a href="#" @click.prevent="show = true" :class="[{'active': show}, 'tab-nav']">
              {{ $t('Map') }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12">
      <div class="tab-content">
        <div v-show="show" id="panel1" class="tab-pane fade in active">
          <h4 class="col-xs-12">{{ $t('Choose shop') }}</h4>
          <gmap-map class="map-container"
                    :center="center"
                    :zoom="12"
                    :options="{streetViewControl:false, fullscreenControl: false}">
            <gmap-marker
              v-for="(m, index) in droppoints"
              :key="index"
              :position="m.position"
              :animation="selected === m.id ? 1 : 0"
              :clickable="true"
              :icon="m.icon"
              @click="selectDroppoint(m)" />
          </gmap-map>
        </div>
        <div v-show="!show" id="panel2" class="tab-pane fade">
          <div :key="index" v-for="(m, index) in droppoints" @click="selectDroppoint(m)">
            <availability-sheet @get:selected="getSelected"
                                :id="m.id"
                                :stock-id="m.city_id"
                                :item="m"
                                :checked="selected" />
          </div>
        </div>
      </div>
    </div>
    <span :key="index" v-for="(field, index) in extraFields">
      {{ field.title }}
      <input type="text"
             v-model="shipping.extraFields[index]"
             @keyup="$v.shipping.extraFields[index].$touch(); setShipping()">
      <span
        class="validation-error"
        v-if="$v.shipping.extraFields[index].$error && !$v.shipping.extraFields[index].required"
      >
        {{ $t('Field is required') }}
      </span>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import { required, minLength } from 'vuelidate/lib/validators'

import { dps } from './droppoints'
import BaseSelect from '@vue-storefront/theme-default/components/core/blocks/Form/BaseSelect'
import BaseInput from '@vue-storefront/theme-default/components/core/blocks/Form/BaseInput'
import AvailabilitySheet from '@vue-storefront/theme-default/components/theme/blocks/AvailabilitySheet/AvailabilitySheet'

// GoogleMaps cannot be included while in SSR
if (process.browser) {
  const VueGoogleMaps = require('vue2-google-maps')
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBQwWyTufRQqwJajpxqcCPfdgH27qKWNzc',
      libraries: 'places'
    }
  })
}

export default {
  name: 'DroppointMap',
  components: {BaseInput, BaseSelect, AvailabilitySheet},
  props: {
    shippingMethod: {
      type: String,
      required: true
    },
    zipcode: {
      type: Number,
      default: null,
      required: false
    }
  },
  data () {
    return {
      center: {lat: 55.488351, lng: 9.479296},
      droppoints: [],
      error: '',
      extraFields: {},
      loading: false,
      city: null,
      cities: [],
      selected: '',
      shipping: this.$store.state.checkout.shippingDetails,
      show: true
    }
  },
  computed: {
    citiesOptions () {
      return this.cities.map(item => {
        return {
          value: item,
          label: item
        }
      })
    }
  },
  methods: {
    showList () {
      this.show = false
      this.changeCity()
    },
    getSelected (val) {
      this.selected = val
    },
    changeCity (city = this.city) {
      this.setDroppoints(dps.filter(dp => dp.city === this.city))
    },
    selectDroppoint (m) {
      let phoneNumber = this.shipping.phoneNumber
      this.selected = m.id

      let nameArr = m.name.split(' ')
      let first = nameArr[0]
      let last = nameArr[1]

      if (!last || last.length === 0) {
        last = first
      }

      this.shipping = {
        firstName: first,
        lastName: last,
        streetAddress: m.streetname,
        apartmentNumber: m.streetname2,
        zipCode: m.zipcode,
        company: m.id,
        city: m.city,
        droppoint: m,
        country: m.country,
        phoneNumber: phoneNumber,
        shippingMethod: this.shippingMethod
      }

      this.$v.$touch()
      this.setShipping()
    },
    setShipping (invalidate = false) {
      if (!this.$v.$invalid && !invalidate) {
        this.$bus.$emit('checkout-after-shippingset', this.shipping)
      }
    },
    setDroppoints (droppoints = []) {
      this.droppoints = droppoints
      this.center = droppoints[0].position
    },
    getDroppoints () {
      this.droppoints = []
      if (this.searchZipcode) {
        this.loading = true
        this.error = null
        if (this.$config.droppointShipping) {
          let endpoint = this.$config.droppointShipping[this.shippingMethod].endpoint

          this.$store.dispatch('droppoint-shipping/fetch', {
            url: endpoint + '/zipcode/' + encodeURIComponent(this.searchZipcode),
            payload: {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
              mode: 'cors'
            },
            callback_event: 'droppoint-map-update'
          }, {root: true})
        }
      }
    }
  },
  created () {
    // change method on mock data
    dps.forEach(dp => {
      if (!this.cities.includes(dp.city)) {
        this.cities.push(dp.city)
      }
    })
    this.city = this.cities[0]
    this.setDroppoints(dps.filter(dp => dp.city === this.city))
  },
  mounted () {
    if (this.shipping) {
      if (this.shipping.zipCode) {
        this.searchZipcode = this.shipping.zipCode
        this.getDroppoints()
      }
      if (
        (typeof this.shipping.droppoint === 'object') &&
        (this.shipping.droppoint.id !== null)
      ) {
        this.selectDroppoint(this.shipping.droppoint)
      } else {
        this.shipping.streetAddress = ''
      }
    }
    this.$bus.$on('droppoint-map-update', (event) => {
      this.loading = false
      if (event.result.droppoints) {
        this.setDroppoints(event.result.droppoints)

        if (event.result.center) {
          this.center = event.result.center.position
        }

        this.extraFields = event.result.extraFields
        this.shipping.extraFields = {}
      } else {
        this.error = event.result.error
      }
      this.setShipping()
    })
  },
  validations () {
    let val = {
      shipping: {
        phoneNumber: {
          required,
          minLength: minLength(8)
        },
        city: {
          required
        }
      }
    }
    if (this.extraFields) {
      val.shipping.extraFields = {}
      for (const [key, value] of Object.entries(this.extraFields)) {
        val.shipping.extraFields[key] = {}
        if (value.required) {
          val.shipping.extraFields[key] = {required}
        }
      }
    }
    return val
  },
  watch: {
    shippingMethod (val, oldVal) {
      if (val !== oldVal) {
        this.getDroppoints()
        this.selected = {}
        this.setShipping(true)
      }
    }
  },
  destroyed () {
    this.$bus.$off('droppoint-map-update')
  }
}
</script>

<style lang="scss">
  .map-container {
    width: 100%;
    height: 400px;
  }
  .droppoint-map {
    .form-label {
      font-size: 14px;
      font-weight: 700;
    }
    .select-wrapper {
      margin-top: 5px;
      select {
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
      }
      option {
        font-size: 14px;
      }
      &::after {
        border: 1px solid #000;
        border-width: 0 0 1px 1px;
        width: 5px;
        height: 5px;
        line-height: 0;
        font-size: 0;
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 14px;
      }
    }
    .input-wrapper {
      margin-top: 5px;
      input {
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        padding: 10px;
        font-size: 14px;
        background: #f2f3f7;
        &:focus {
          background: #ffffff;
        }
      }
    }
    .nav-wrapper {
      border: 1px solid #dadada;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
      .row {
        margin: 0;
        .col-sm-6 {
          margin: 0;
          padding: 0;

          &:first-child {
            .tab-nav {
              border-right: 1px solid #dadada;
            }
          }
        }
      }
      .tab-nav {
        text-align: center;
        padding: 15px 0;
        display: block;
        background: #f2f3f7;
        border-bottom: 2px solid transparent;
        font-size: 14px;
        font-weight: 700;
        &:hover {
          text-decoration: none;
        }
        &.underline:after, &:not(.no-underline):hover:after {
          display: none;
        }
        &.active {
          background-color: transparent;
          border-bottom-color: #009d00;
          color: #009d00;
        }
      }
    }
    #panel2.tab-pane {
      position: relative;
    }
  }
</style>
