<template>
  <div class="sidebar pt10">
    <pre>{{ filters }} 2</pre>
    <div class="accordion">
      <div class="card">
        <div class="card-header py5" @click="toggle">
          Category 1
          <i v-if="!show">+</i>
          <i v-if="show">-</i>
        </div>
        <div class="card-body" v-show="show">
          <div class="form-control pt10">
            <base-checkbox class="dib" id="1" value="false" v-model="filters" />
            <div class="label dib">Filter</div>
          </div>
          <div class="form-control pt10">
            <base-checkbox id="2" class="dib" value="false" v-model="filters" />
            <div class="label dib">Filter</div>
          </div>
          <div class="form-control pt10">
            <base-checkbox id="3" class="dib" value="false" v-model="filters" />
            <div class="label dib">Filter</div>
          </div>
        </div>
      </div>
    </div>
    <!--<h4>-->
    <!--{{ $t('Filter') }}-->
    <!--</h4>-->
    <!--<button-->
    <!--class="visible-xs no-outline brdr-none py15 px40 bg-cl-mine-shaft :bg-cl-th-secondary ripple h5 cl-white sans-serif"-->
    <!--@click="resetAllFilters"-->
    <!--:class="{'button-disabled': Object.keys(activeFilters).length === 0}"-->
    <!--:disabled="Object.keys(activeFilters).length === 0"-->
    <!--&gt;-->
    <!--{{ $t('Clear') }}-->
    <!--</button>-->
    <!--<div-->
    <!--v-for="(filter, filterIndex) in filters"-->
    <!--:key="filterIndex"-->
    <!--v-if="filter.length"-->
    <!--&gt;-->
    <!--<h5>-->
    <!--{{ $t(filterIndex + '_filter') }}-->
    <!--</h5>-->

    <!--<div v-if="filterIndex==='color'">-->
    <!--<color-selector-->
    <!--context="category"-->
    <!--:attribute_code="color"-->
    <!--code="color"-->
    <!--v-for="(color, index) in filter"-->
    <!--:key="index"-->
    <!--:id="color.id"-->
    <!--:label="color.label"-->
    <!--/>-->
    <!--</div>-->
    <!--<div v-else-if="filterIndex==='size'">-->
    <!--<size-selector-->
    <!--context="category"-->
    <!--:attribute_code="size"-->
    <!--code="size"-->
    <!--class="size-select mr10 mb10"-->
    <!--v-for="(size, index) in sortById(filter)"-->
    <!--:key="index"-->
    <!--:id="size.id"-->
    <!--:label="size.label"-->
    <!--/>-->
    <!--</div>-->
    <!--<div v-else-if="filterIndex==='price'">-->
    <!--<price-selector-->
    <!--context="category"-->
    <!--:attribute_code="price"-->
    <!--class="price-select mb10 block"-->
    <!--code="price"-->
    <!--v-for="(price, index) in filter"-->
    <!--:key="index"-->
    <!--:id="price.id"-->
    <!--:from="price.from"-->
    <!--:to="price.to"-->
    <!--:content="price.label"-->
    <!--:label="price.label"-->
    <!--/>-->
    <!--</div>-->
    <!--<div v-else-if="filterIndex==='erin_recommends'">-->
    <!--<generic-selector-->
    <!--context="category"-->
    <!--:attribute_code="filter.attribute_code"-->
    <!--class="price-select mb10 block"-->
    <!--:code="filterIndex"-->
    <!--v-for="(option, index) in filter"-->
    <!--:key="index"-->
    <!--:id="option.id"-->
    <!--:label="option.label"-->
    <!--/>-->
    <!--</div>-->
    <!--<div v-else>-->
    <!--<new-selector v-for="(option, index) in filter"-->
    <!--context="category"-->
    <!--attribute_code="new"-->
    <!--code="new"-->
    <!--:key="index"-->
    <!--:id="option.id"-->
    <!--:label="option.label"-->
    <!--/>-->
    <!--</div>-->
  <!--</div>-->
  <!-- add the custom controls to other available filters set in config.products.defaultFilters; must be numeric field in ES
  <div v-if="filters.erin_recommends && filters.erin_recommends.length">
    <h5>
      {{ $t('Erin recommends') }}
    </h5>
    <div
      class="size-select mr10 mb10"
      v-for="(er, index) in filters.erin_recommends"
      :key="index"
      :id="er.id"
      :label="er.label"
    >{{ er.label }}</div>
  </div>
    -->
  </div>
</template>

<script>
import Sidebar from '@vue-storefront/core/compatibility/components/blocks/Category/Sidebar'

import ColorSelector from 'theme/components/core/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import GenericSelector from 'theme/components/core/GenericSelector'
import NewSelector from 'theme/components/core/NewSelector'

import BaseCheckbox from '@vue-storefront/theme-default/components/core/blocks/Form/BaseCheckbox'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector,
    NewSelector,
    BaseCheckbox
  },
  mixins: [Sidebar],
  data () {
    return {
      show: false,
      filters: []
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss">
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
  .accordion {
    .card {
      background: #e5e6eb;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      padding: 10px;
      .card-header {
        position: relative;
        padding-right: 30px;
        cursor: pointer;
        i {
          position: absolute;
          right: 10px;
          top: 2px;
          font-style: normal;
          font-size: 20px;
        }
      }
      .card-body {
        .dib {
          display: inline-block;
          vertical-align: middle;
          line-height: 24px;
        }
      }
    }
  }
</style>
