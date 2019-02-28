<template>
  <div class="search-header w-100">
    <div >
      <label for="search-header" class="search-input-group mb5">
        <input
          ref="search"
          id="search-header"
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
          <product-tile @click.native="closeSearchpanel" :key="product.id" v-for="product in products"
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
import ProductTile from 'theme/components/core/ProductTile'
export default {
  name: 'SearchInHeader',
  components: {
    ProductTile
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
  .search-header {
    position: relative;
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
      border-bottom-right-radius: 7px;
      border-top-right-radius: 7px;
      line-height: 1.7;
      font-size: 16px;
      font-family: 'OpenSans';
      font-weight: normal;
      font-style: normal;
    }
    .search-panel-input {
      width: 100%;
      height: 40px;
      background: #f4f4f4;
      padding-bottom: 0;
      padding-top: 0;
      padding-left: 15px;
      border: 1px solid #e8e8e8;
      border-bottom-left-radius: 7px;
      border-top-left-radius: 7px;
      box-shadow: inset 0px 0px 50px #eee;
      outline: 0;
      font-size: 18px;
      font-family: 'OpenSans';
      @media #{$media-xs} {
        font-size: 16px;
      }
    }
    .panel {
      padding-top: 40px;
      width: 75vw;
      left: calc(75vw / -6);
      position: absolute;
      border: 4px solid rgba(134, 135, 141, 0.25);
      border-radius: 5px;
      top: 100%;
      background: #fff;
      max-height: calc(100vh - 54px);
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
        width: 33.33%;
        padding-left: 15px;
        padding-right: 15px;
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
</style>
