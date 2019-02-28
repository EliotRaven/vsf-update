<template>
  <div class="search-block w-100">
    <div >
      <label for="search-block" class="search-input-group mb5">
        <input
          ref="search"
          id="search-block"
          v-model="search"
          @focus="showResultPanel"
          @input="makeSearch"
          class="search-panel-input"
          :placeholder="$t('Type what you are looking for...')"
          type="text"
        >
        <i
          class="search-icon cl-accent"
        >
          {{ $t('To find') }}
        </i>
      </label>
    </div>
    <transition name="fade">
      <div class="panel" v-if="open">
        <div class="close-icon-row">
          <i
            class="material-icons pointer cl-accent close-icon"
            @click="closeSearchpanel"
            data-testid="closeSearchPanel"
          >
            close
          </i>
        </div>
        <div class="product-listing row m0">
          <product-tile-home @click.native="closeSearchpanel" :key="product.id" v-for="product in products"
                             :product="product"/>
          <transition name="fade">
            <div v-if="emptyResults" class="no-results relative center-xs h4 col-md-12">
              {{ $t('No results were found.') }}
            </div>
          </transition>
        </div>
        <div v-show="OnlineOnly" v-if="products.length >= 18" class="buttons-set align-center py35 mt20 px40">
          <button @click="seeMore" v-if="readMore"
                  class="no-outline brdr-none py15 px20 bg-cl-mine-shaft :bg-cl-th-secondary cl-white fs-medium-small"
                  type="button">
            {{ $t('Load more') }}
          </button>
          <button @click="closeResultPanel"
                  class="no-outline brdr-none p15 fs-medium-small close-button"
                  type="button">
            {{ $t('Close') }}
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import VueOfflineMixin from 'vue-offline/mixin'
import ProductTileHome from 'theme/components/core/ProductTileHome'
export default {
  name: 'SearchInBlock',
  components: {
    ProductTileHome
  },
  mixins: [SearchPanel, VueOfflineMixin],
  data () {
    return {
      // open: false
    }
  },
  methods: {
    showResultPanel () {
      this.open = true
    },
    closeResultPanel () {
      this.open = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";
  @import "~theme/css/variables/grid";
  @import "~theme/css/variables/typography";
  .search-block {
    position: relative;
    border-bottom: 2px solid #d83b4b;
    padding: 0 7px 3px;
    .search-input-group {
      display: flex;
    }
    .search-icon {
      cursor: pointer;
      width: 180px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #d83b4b;
      opacity: 1;
      color: white;
      border: 1px solid #d83b4b;
      border-radius: 5px;
      line-height: 1.7;
      font-size: 16px;
      font-family: 'OpenSans';
      font-weight: normal;
      font-style: normal;
    }
    .search-panel-input {
      width: 100%;
      height: 40px;
      padding-bottom: 0;
      padding-top: 0;
      padding-left: 15px;
      border: none;
      outline: 0;
      font-size: 24px;
      font-family: 'GothamPro';
      font-weight: normal;
      font-style: normal;
      @media #{$media-xs} {
        font-size: 16px;
      }
    }
    .search-panel-input::-webkit-input-placeholder {
      color: #d83b4b !important;
    }
    .panel {
      padding-top: 40px;
      width: 98%;
      left: 0;
      border: 4px solid rgba(134, 135, 141, 0.25);
      border-radius: 5px;
      position: absolute;
      bottom: 120%;
      background: #fff;
      max-height: 405px;
      z-index: 10;
      overflow-y: auto;
      overflowx-x: hidden;
      .close-icon-row{
        position: absolute;
        z-index: 1;
        right: 5px;
        top: 5px;
        width: 35px;
        height: 35px;
      }
      .product {
        box-sizing: border-box;
        padding: 0 0 5px 0;
      }
    &::-webkit-scrollbar {
      width: 5px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #8c8c8b;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)#8c8c8b;
      border-radius: 10px;
      background-color: #F5F5F5;
    }
    }
    i {
      opacity: 0.6;
    }
    i:hover {
      opacity: 1;
    }
  }
@media (max-width: 767px) {
  .search-block {
    .search-icon {
      position: absolute;
      bottom: -70px;
      left: 50%;
      transform: translate(-55%);
    }
  }
}
</style>
