<template>
  <div class="collection">
    <div class="container brt">
      <div class="row center-xs">
        <header class="col-md-12">
          <h2 class="align-left cl-accent">
            {{ title }}
          </h2>
        </header>
      </div>
    </div>
    <div class="collection-slider">
      <div class="container px15">
        <div class="row">
          <div class="col-md-12">
            <div class="cool-stuff-collection">
              <no-ssr>
                <carousel
                  v-bind="config"
                  @pageChange="setMuted"
                  pagination-enabled="true"
                  navigation-enabled="true"
                  navigation-prev-label="<"
                  navigation-next-label=">"
                >
                  <slide
                    v-for="product in products"
                    :key="product.id"
                  >
                    <product-tile-slider
                      class="collection-product"
                      :product="product"
                      :labels-active="true"
                      :only-image="false"
                    />
                  </slide>
                </carousel>
              </no-ssr>
            </div>
          </div>
        </div>
      </div>
      <div class="align-center container py50">
        <button
          class="py15 px40 h5 slider-btn"
        >
          {{ $t('Go to the directory') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'

import ProductTileSlider from 'theme/components/core/ProductTileSlider'

export default {
  name: 'ProductsSlider',
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    Slide,
    Carousel,
    ProductTileSlider,
    'no-ssr': NoSSR
  },
  data () {
    return {
      currentPage: 0
    }
  },
  methods: {
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-product-bg: color(secondary, $colors-background);

.collection-slider {
  overflow: hidden;
  .VueCarousel-wrapper {
    &:before,
    &:after {
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 1;
      display: none;
      @media only screen and (min-width: 576px) {
        display: block;
        width: calc((100vw - (560px - 30px)) / 2);
      }

      @media only screen and (min-width: 768px) {
        width: calc((100vw - (752px - 30px)) / 2);
      }

      @media only screen and (min-width: 992px) {
        width: calc((100vw - (976px - 30px)) / 2);
      }

      @media only screen and (min-width: 1200px) {
        width: calc((100vw - (1184px - 30px)) / 2);
      }
    }
    &:before {
      right: 100%;
      background: linear-gradient(to right, $color-product-bg 0%,$color-product-bg 40%,rgba($color-product-bg,0.2) 100%);
    }
    &:after {
      left: 100%;
      background: linear-gradient(to left, $color-product-bg 0%,$color-product-bg 40%,rgba($color-product-bg,0.2) 100%);
    }
    .VueCarousel-inner{
      padding: 0 10px;
      transition: transform 1s ease 0.1s!important;
      .VueCarousel-slide {
        margin: 0 9px;
        flex-basis: 265px;
        border: 1px solid lightgray;
        border-radius: 5px;
        .product {
          .product-link {
            display: block;
            padding: 0 15px 15px 15px;
            .product-image {
              height: auto;
              img {
                max-width: 100%;
                max-height: 100%;
                height: auto;
                vertical-align: bottom;
              }
            }
          }
        }
      }
    }
  }
  .VueCarousel-navigation {
    .VueCarousel-navigation-button.VueCarousel-navigation-next,
    .VueCarousel-navigation-button.VueCarousel-navigation-prev {
      padding: 13px 17px!important;
      font-weight: 400;
      border-radius: 5px;
      background: #d83b4b;
      color: white;
      font-size: 20px;
    }
  }
}
.slider-btn {
  background: transparent;
  border: 1px solid #d83b4b;
  border-radius: 5px;
  color: #d83b4b;
  transition: all 0.3s;
  &:hover {
    background: #d83b4b;
    color: #fff;
  }
}
.brt {
  border-top: 1px solid lightgray;
}
</style>
