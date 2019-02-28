<template>
  <span @click="switchFilter(id, from, to)" class="price-selector-wrapper">
    <button
      class="relative brdr-cl-bg-tertiary brdr-1 bg-cl-transparent mr10 pointer price-selector dib"
      :class="{ active: active }"
      :aria-label="$t('Price ') + content"
    >
      <i class="material-icons">done</i>
    </button>
    <span class="dib">{{ content }}</span>
  </span>
</template>

<script>
import PriceSelector from '@vue-storefront/core/compatibility/components/PriceSelector'

export default {
  mixins: [PriceSelector]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-event: color(tertiary);
  $color-active: color(accent);

  .price-selector-wrapper {
    padding: 7px 0;
  }

  .price-selector {
    width: 22px;
    height: 22px;
    background: #ffffff;
    border: 1px solid #e5e6eb;
    border-radius: 5px;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;

    &:hover, &.active {
        border-color: #009777;
    }

    &.active {
      background: #009777;
      i {
          opacity: 1;
      }
    }

    i {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      bottom: 0;
      font-size: 20px;
      color: #ffffff;
    }
  }
</style>
