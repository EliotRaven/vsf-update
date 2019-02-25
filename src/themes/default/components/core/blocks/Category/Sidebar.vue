<template>
  <div class="sidebar pt20">
    <div class="accordion">
      <div :class="['card mb10', {opened: show.includes(filterIndex)}]"
           v-for="(filter, filterIndex) in filters"
           :key="filterIndex"
           v-if="filter.length">
        <div class="card-header py5">
          <input type="checkbox" class="hidden-radio" :value="filterIndex" v-model="show">
          {{ $t(filterIndex + '_filter') }}
          <i v-if="!show.includes(filterIndex)">+</i>
          <i v-else>-</i>
        </div>
        <div class="card-body" v-show="show.includes(filterIndex)">
          <div class="form-control pt10"
               v-for="(item, index) in filter"
               :key="index"
               :id="item.id">
            <div class="custom-checkbox dib relative">
              <input type="checkbox" class="m0 no-outline" :id="item.label" :value="item.label" v-model="checked_filters" >
              <label class="pl35 lh30 h4 pointer" :for="item.label" />
            </div>
            <div class="label dib">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>
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
    <!--<h5>{{ $t(filterIndex + '_filter') }}</h5>-->

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
  mixins: [Sidebar]
}
</script>

<style lang="scss">
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-silver: color(silver);
  $color-active: color(secondary);
  $color-white: color(white);

  .custom-checkbox {
    label {
      user-select: none;
      &:before {
        content: '';
        position: absolute;
        top: 3px;
        left: 0;
        width: 22px;
        height: 22px;
        background-color: $color-white;
        border: 1px solid #009777;
        cursor: pointer;
      }
    }

    input {
      position: absolute;
      top: 3px;
      left: 0;
      opacity: 0;
      &:checked + label {
        &:before {
          background-color: #009777;
          border-color: #009777;
          cursor: pointer;
          border-radius: 3px;
        }
        &:after {
          content: '';
          position: absolute;
          top: 9px;
          left: 6px;
          width: 11px;
          height: 5px;
          border: 2px solid $color-white;
          border-top: none;
          border-right: none;
          background-color: #009777;
          transform: rotate(-45deg);
        }
      }
      &:hover,
      &:focus {
        + label {
          &:before {
            border-color: $color-active;
          }
        }
      }
      &:disabled + label {
        cursor: not-allowed;
        opacity: 0.5;
        pointer-events: none;
        &:hover,
        &:focus {
          &:before {
            border-color: #009777;
            cursor: not-allowed;
          }
        }
      }
    }
  }
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
      background: #f2f3f7;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      padding: 10px;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      &:hover, &.opened {
        background: #e5e6eb;
      }
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
        .hidden-radio {
          opacity: 0;
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: 0;
          cursor: pointer;
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
