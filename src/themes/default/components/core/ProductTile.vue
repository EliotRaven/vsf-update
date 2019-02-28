<template>
  <div class="product w-100 mb20"
       v-observe-visibility="visibilityChanged"
  >
    <router-link class="block no-underline product-link"
                 :to="localizedRoute({
                   name: product.type_id + '-product',
                   params: {
                     parentSku: product.parentSku ? product.parentSku : product.sku,
                     slug: product.slug,
                     childSku: product.sku
                   }
                 })"
                 data-testid="productLink"
    />
    <div class="column-wrapper">
      <div class="column">
        <div class="product-image relative bg-cl-secondary text-center"
             :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]">
          <img :alt="product.name"
               :src="thumbnailObj.loading"
               v-lazy="thumbnailObj"
               height="300"
               width="310"
               data-testid="productImage"
          >
          <a href="#" @click.prevent="toggleLike">
            <i :class="['material-icons', {'like': like}]">
              {{ (like) ? 'favorite' : 'favorite_border' }}
            </i>
          </a>
        </div>
      </div>
      <div class="column p10">
        <h3 class="mb0 cl-accent mt10" v-if="!onlyImage">
          {{ product.name | htmlDecode }}
        </h3>

        <span v-if="product.brand" class="brand">{{ product.brand && product.brand }}</span>
      </div>
      <div class="column p10">
        <div class="btn-wrapper py15">
          <div class="price dib">
            <span class="price-original mr5 lh30 cl-secondary"
                  v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0 && !onlyImage"
            >
              {{ product.originalPriceInclTax | price }}
            </span>
            <span class="price-special lh30 cl-accent weight-700"
                  v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
            >
              {{ product.priceInclTax | price }}
            </span>
            <span class="lh30 cl-secondary real-price"
                  v-if="!product.special_price && parseFloat(product.priceInclTax) > 0 && !onlyImage"
            >
              {{ parseInt(product.priceInclTax).toFixed(2) }}<sup>{{ product.priceInclTax | price | custom }}</sup>
            </span>
          </div>
          <div class="add-to-cart dib">
            <add-to-cart :product="product" class="relative bg-cl-transparent brdr-none inline-flex btn icon"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rootStore from '@vue-storefront/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import AddToCart from 'theme/components/core/AddToCart.vue'

export default {
  components: {MicrocartIcon, AddToCart},
  mixins: [ProductTile],
  props: {
    labelsActive: {
      type: Boolean,
      requred: false,
      default: true
    },
    onlyImage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  filters: {
    custom (val) {
      return val.match(/\W+/g)[1]
    }
  },
  methods: {
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (rootStore.state.config.products.configurableChildrenStockPrefetchDynamic && rootStore.products.filterUnavailableVariants) {
          const skus = [this.product.sku]
          if (this.product.type_id === 'configurable' && this.product.configurable_children && this.product.configurable_children.length > 0) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = rootStore.state.stock.cache[confChild.id]
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku)
              }
            }
            if (skus.length > 0) {
              rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
            }
          }
        }
      }
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/animations/transitions';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  $bg-secondary: color(secondary, $colors-background);
  $border-secondary: color(secondary, $colors-border);
  $color-white: color(white);

  .product {
    position: relative;
    border: 1px solid #f2f3f7;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
      border-color: #BFC5D2;
    }
    .product-image a {
      position: absolute;
      right: 20px;
      top: 20px;
      opacity: 0;
      z-index: -1;
      &.underline:after, &:not(.no-underline):hover:after {
        display: none;
      }
      i {
        font-size: 24px;
        color: #dcdde2;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

        &:hover {
          color: #BFC5D2;
        }
        &.like {
          color: #009777;
        }
      }
    }
    &:hover .product-image a {
      opacity: 1;
      z-index: 1;
    }
    .product-link {
      height: 100%;
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 100%;
    }
    @media (max-width: 767px) {
      padding-bottom: 10px;
    }
  }

  .price-original {
    text-decoration: line-through;
  }

  .real-price {
    font-size: 30px;
    line-height: 34px;
    font-weight: 900;
    color: #19233C;
    sup {
      font-size: 16px;
      line-height: 20px;
      font-weight: 600;
    }
  }

  %label-form {
    -webkit-border-radius: 5px 0 5px 0;
    -moz-border-radius: 5px 0 5px 0;
    border-radius: 5px 0 5px 0;
    position: absolute;
    top: 0;
    left: 0;
    color: #ffffff;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 800;
    padding: 3px 7px;
  }
  %hit-label {
    background: #19233C;
  }
  %new-label {
    top: 30px;
    background: #009777;
  }

  .minicart-count {
    top: 7px;
    left: 50%;
    min-width: 16px;
    min-height: 16px;
    border-radius: 10px;
  }

  h3 {
    font-size: 24px;
    line-height: 24px;
    color: #19233C;
  }

  .column-wrapper {
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
  }

  .column {
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

  .btn-wrapper {
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
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .dib {
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

  .add-to-cart {
    .btn {
      position: relative;
      z-index: 1;
      background: #e41e3f;
      outline: none;
      border: none;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      font-size: 30px;
      line-height: 34px;
      color: #ffffff;
      transition: all .3s;
      padding: 5px 30px;
      min-width: auto;
      &:hover {
        background: #BD1432;
      }
    }
  }

  .product-image {
    width: 100%;
    display: block;
    overflow: hidden;
    max-height: 300px;
    position: relative;

    &:hover {
      img {
        opacity: 1;
        transform: scale(1.1);
      }

      &.sale::after,
      &.new::after {
        opacity: 0.8;
      }
    }

    img {
      display: block;
      max-height: 100%;
      max-width: 100%;
      width: auto;
      height: auto;
      margin: auto;
      mix-blend-mode: darken;
      opacity: 0.8;
      transform: scale(1);
      transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

      &[lazy="loaded"] {
        animation: products-loaded;
        animation-duration: 0.3s;
      }

      @keyframes products-loaded {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.8;
        }
      }
    }

    &.sale {
      &::after {
        @extend %label-form;
        @extend %hit-label;
        content: 'Хит';
      }
    }

    &.new {
      &::after {
        @extend %label-form;
        @extend %new-label;
        content: 'Новинка';
      }
    }
  }
</style>
