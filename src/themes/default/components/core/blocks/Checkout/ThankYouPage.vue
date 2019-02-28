<template>
  <div class="thank-you-page">
    <!--<header class="thank-you-title bg-cl-secondary py35 pl20">-->
    <!--<div class="container">-->
    <!--<breadcrumbs-->
    <!--:routes="[{name: 'Homepage', route_link: '/'}]"-->
    <!--:active-route="this.$t('Order confirmation')"-->
    <!--/>-->
    <!--<h2 class="category-title">-->
    <!--{{ $t('Order confirmation') }}-->
    <!--</h2>-->
    <!--</div>-->
    <!--</header>-->
    <div class="thank-you-content align-justify py40 pl20">
      <div class="container">
        <div class="row">
          <div class="col-md-6 pl20 pr20">
            <h1>{{ $t('Thank You!') }}</h1>
            <div class="py15">
              <b>{{ $t('Order') }} <span>№{{ lastOrderConfirmation.magentoOrderId }}</span> {{ $t('issued successfully.') }}</b>
            </div>
            <p>
              {{ order.products.length }}
              {{ $t('ordered good worth') }}
              {{ total }} {{ $t('Currency') }}
              {{ $t('will be available an hour later at:') }}
              <b>
                {{ $t('m.') }} {{ orderData.city }},
                {{ $t('st.') }} {{ orderData.street[0] }}
                {{ orderData.street[1] }}
                <span v-if="orderData.metro">({{ $t('m.') }}{{ orderData.metro }})</span>,
                {{ $t('Pharmacy') }} "{{ orderData.firstname }}".
              </b>
              {{ $t('Payment of the goods is carried out on the spot upon receipt.') }}
            </p>

            <div class="form-control">
              <button>{{ $t('Go home') }}</button>
            </div>
            <!--<h3 v-if="OnlineOnly" >-->
            <!--{{ $t('Your purchase') }}-->
            <!--</h3>-->
            <!--<p v-if="OnlineOnly" v-html="this.$t('You have successfuly placed the order. You can check status of your order by using our <b>delivery status</b> feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress.')" />-->
            <!--<p v-if="OnlineOnly && lastOrderConfirmation" v-html="this.$t('The server order id has been set to ') + lastOrderConfirmation.backendOrderId"/>-->
            <!--<p v-if="OnlineOnly" v-html="this.$t('E-mail us at <b>demo@vuestorefront.io</b> with any questions, suggestions how we could improve products or shopping experience')"/>-->

            <!--<h4 v-if="OfflineOnly">-->
            <!--{{ $t('You are offline') }}-->
            <!--</h4>-->
            <!--<p v-if="OfflineOnly && !isNotificationSupported" >-->
            <!--{{ $t('To finish the order just come back to our store while online. Your order will be sent to the server as soon as you come back here while online and then confirmed regarding the stock quantities of selected items') }}-->
            <!--</p>-->
            <!--<p v-if="OfflineOnly && isNotificationSupported && !isPermissionGranted" >-->
            <!--{{ $t("You can allow us to remind you about the order via push notification after coming back online. You'll only need to click on it to confirm.") }}-->
            <!--</p>-->
            <!--<p v-if="OfflineOnly && isNotificationSupported && isPermissionGranted" >-->
            <!--<strong>{{ $t('You will receive Push notification after coming back online. You can confirm the order by clicking on it') }}</strong>-->
            <!--</p>-->
            <!--<p v-if="!isPermissionGranted && isNotificationSupported">-->
            <!--<button-outline color="dark" @click.native="requestNotificationPermission()" >-->
            <!--{{ $t('Allow notification about the order') }}-->
            <!--</button-outline>-->
            <!--</p>-->
            <!--<div id="thank-you-extensions"/>-->
            <!--<h4>-->
            <!--{{ $t('Your Account') }}-->
            <!--</h4>-->
            <!--<p v-html="this.$t('You can log to your account using e-mail and password defined earlier. On your account you can <b>edit your profile data,</b> check <b>history of transactions,</b> edit <b>subscription to newsletter.</b>')"/>-->
          </div>
          <div class="col-md-6 thank-you-improvment">
            <gmap-map class="map-container"
                      :center="center"
                      :zoom="12"
                      :options="{streetViewControl:false, fullscreenControl: false}">
              <gmap-marker class="marker"
                           :icon="{url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAzCAYAAAAKLSELAAAACXBIWXMAAAsSAAALEgHS3X78AAACf0lEQVRoBdWZ35HaMBCHf6GB3LtHAx0cHUSpIHQQUsG5g5AOoAPcwXUQ0QF0gMejd1IBmWXWYLySDv/B1n0z94BlzHe71spafzmfz2iLVXoBYA5AA5gBmNYutQNwArAH8J4UZt/mpxpLWqVJKgVAgl/FCWFyAFv6SwpzDJ7ZRpLl1gC+icF2bACsksKcepG0Sq8A/BYD3fkHYJkU5j10paCkVfoFgAHwKgb7ZZMUJvVdcSKO3ATnAwkSb1bprTjKOCPJEdw7ZuuzyZLCLOu/ISJZSfHQgsRPq/S6flBI0owbKMU+3rj+XrlLt1WaivJfz5eHhOrpvCxP9Uh6b96BmfKCgTtJq/RypPvQR8rz4y6S3jo1ErTkLq+SVunZyJPFR4pKJBeek8ZmSgGMXZJYlJJzMRQP8wnPoKbPhUNySXfMUSReXMtibLx+BkmxLMbIYcLPjTFzmjyyERqZY5nuXcSS+1LSiKF4MKVkcEs5Ijl1PS6S3P7II5S8BK9agsQGKALWdcktdxRiISv7RVdJLkUxRfPqUl9x1pFEM6u2Ce8kI4rmqvrB12Y5jrhzFM0r3wOG6McMRF6PolcyKQytQJkYeD6p61nCKcmkAxf4zNdM9UryfzRU2vNQc8IriVva/4iBfqGSt3ClucQ5u+tYpSkNP8RAP/xKChNslAUjWYHSfhBHu7P5SBANX5HMeKvR1x7d2Xp28fBGjBd73dOyeQhNlDqNdou8nnYVJUEdmiidJHETbdvgaiyItvtuLk3fG0a0lSDavACtUnkh9dFkai2Irh2MB+/RXRdBdI1kCUd062hpP1xmQvQiSXCfk0QvbwzoNkgKIx67RpV8GgD+A2F+7bN9cUrnAAAAAElFTkSuQmCC'}"
                           :position="center"
                           :clickable="false"/>
            </gmap-map>
            <!--<h3>-->
            <!--{{ $t('What we can improve?') }}-->
            <!--</h3>-->
            <!--<p class="mb25">-->
            <!--{{ $t('Your feedback is important fo us. Let us know what we could improve.') }}-->
            <!--</p>-->
            <!--<form @submit.prevent="sendFeedback">-->
            <!--<base-textarea-->
            <!--class="mb25"-->
            <!--type="text"-->
            <!--name="body"-->
            <!--v-model="feedback"-->
            <!--:placeholder="$t('Type your opinion')"-->
            <!--:autofocus="true"-->
            <!--/>-->
            <!--<button-outline color="dark">-->
            <!--{{ $t('Give a feedback') }}-->
            <!--</button-outline>-->
            <!--</form>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Composite from '@vue-storefront/core/mixins/composite'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import VueOfflineMixin from 'vue-offline/mixin'
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm'

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
  name: 'ThankYouPage',
  mixins: [Composite, VueOfflineMixin, EmailForm],
  data () {
    return {
      feedback: '',
      center: {lat: 55.488351, lng: 9.479296},
      icon: ''
    }
  },
  computed: {
    order () {
      return this.$store.state.order.last_order_confirmation.order
    },
    total () {
      return parseInt(this.order.products.reduce((p, c) => p + c.final_price, '')).toFixed(2)
    },
    orderData () {
      return this.$store.state.order.last_order_confirmation.order.addressInformation.shippingAddress
    },
    lastOrderConfirmation () {
      return this.$store.state.order.last_order_confirmation ? this.$store.state.order.last_order_confirmation.confirmation : {}
    },
    isNotificationSupported () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return 'Notification' in window
    },
    isPermissionGranted () {
      if (Vue.prototype.$isServer || !('Notification' in window)) return false
      return Notification.permission === 'granted'
    },
    checkoutPersonalEmailAddress () {
      return this.$store.state.checkout.personalDetails.emailAddress
    },
    mailerElements () {
      return this.$store.state.config.mailer.contactAddress
    }
  },
  methods: {

    requestNotificationPermission () {
      if (Vue.prototype.$isServer) return false
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    },
    sendFeedback () {
      this.sendEmail(
        {
          sourceAddress: this.checkoutPersonalEmailAddress,
          targetAddress: this.mailerElements.contactAddress,
          subject: this.$t('What we can improve?'),
          emailText: this.feedback
        },
        this.onSuccess,
        this.onFailure
      )
    },
    onSuccess (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message,
        action1: { label: this.$t('OK') }
      })
      if (this.mailerElements.sendConfirmation) {
        this.sendEmail(
          {
            sourceAddress: this.mailerElements.contactAddress,
            targetAddress: this.checkoutPersonalEmailAddress,
            subject: this.$t('Confirmation of receival'),
            emailText: this.$t(`Dear customer,\n\nWe have received your letter.\nThank you for your feedback!`),
            confirmation: true
          }
        )
      }
    },
    onFailure (message) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message,
        action1: { label: this.$t('OK') }
      })
    }
  },
  destroyed () {
    this.$store.dispatch('checkout/setThankYouPage', false)
  },
  components: {
    BaseTextarea,
    Breadcrumbs,
    ButtonOutline
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800');
  .thank-you-page * {
    font-family: 'Open Sans', sans-serif;
  }
  .thank-you-page {
    h1 {
      margin: 0 0 30px;
    }
    .row {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-align-content: center;
      -ms-flex-line-pack: center;
      align-content: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .flex-container {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-align-content: center;
      -ms-flex-line-pack: center;
      align-content: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .flex-item {
      -webkit-order: 0;
      -ms-flex-order: 0;
      order: 0;
      -webkit-flex: 0 1 auto;
      -ms-flex: 0 1 auto;
      flex: 0 1 auto;
      -webkit-align-self: auto;
      -ms-flex-item-align: auto;
      align-self: auto;
    }
    b {
      font-weight: 700;
      color: #19233c;
    }
    p {
      font-weight: 400;
      color: #8b93a6;
      font-size: 16px;
      line-height: 24px;
      b {
        font-weight: 600;
        span {
          color: #e41c3f;
        }
      }
    }
    .form-control {
      padding-top: 30px;
      button {
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
        display: inline-block;
        background-color: transparent;
        padding: 20px 0;
        width: 50%;
        color: #e41c3f;
        border: 1px solid #e41c3f;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        font-size: 16px;
        line-height: 20px;

        &:hover {
          background: #e41c3f;
          color: #ffffff;
        }
      }
    }
    .marker {
      background: #e41c3f;
    }
 }
</style>
