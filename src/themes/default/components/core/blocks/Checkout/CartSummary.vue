<template>
  <div class="cart-summary mt50">
    <div class="brdr-1 brdr-cl-primary">
      <div class="header">
        <div class="row">
          <div class="col-sm-6 py25">
            <h3 class="cl-accent ml30 mt50 summary-title">{{ $t('Order Summary') }}</h3>
          </div>
          <div class="col-sm-6 py25">
            <button class="custom-btn"><span>Редактировать</span> <i class="material-icons cl-tertiary">edit</i></button>
          </div>
        </div>
      </div>
      <product v-for="product in productsInCart" :key="product.sku" :product="product"/>
      <!--<div v-if="productsInCart && productsInCart.length" class="checkout bg-cl-secondary pt10 serif cl-accent">-->

      <!--<div v-for="(segment, index) in totals" :key="index" class="row pt15 pb20 pl30 pr55 " v-if="segment.code !== 'grand_total'">-->
      <!--<div class="col-xs cl-accent">-->
      <!--{{ segment.title }}-->
      <!--</div>-->
      <!--<div v-if="segment.value != null" class="col-xs align-right cl-accent h4">-->
      <!--{{ segment.value | price }}-->
      <!--</div>-->
      <!--</div>-->

      <!--<div class="row pt20 pb20 pl30 pr55 weight-400 h3" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">-->
      <!--<div class="col-xs">-->
      <!--{{ segment.title }}-->
      <!--</div>-->
      <!--<div class="col-xs align-right">-->
      <!--{{ segment.value | price }}-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="total">
      <div class="row mb30 mt10 px25">
        <div class="col-sm-9">
          <div class="h4">До сплати: </div>
        </div>
        <div class="col-xs-12 col-md-3">
          <div class="h4 text-right">Total</div>
        </div>
      </div>
    </div>
    <!--<div class="py50 px25">-->
    <!--<h4 class="h3 m0">-->
    <!--{{ $t('Safety') }}-->
    <!--</h4>-->
    <!--<p class="cl-tertiary lh20">-->
    <!--Lorem ipsum dolor sit amet, consectetur adipiscing elit.-->
    <!--Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.-->
    <!--</p>-->
    <!--<h4 class="h3 mb0">-->
    <!--{{ $t('Shipping') }}-->
    <!--</h4>-->
    <!--<p class="cl-tertiary lh20">-->
    <!--Lorem ipsum dolor sit amet, consectetur adipiscing elit.-->
    <!--Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.-->
    <!--</p>-->
    <!--<h4 class="h3 mb0">-->
    <!--{{ $t('Returns') }}-->
    <!--</h4>-->
    <!--<p class="cl-tertiary lh20">-->
    <!--Lorem ipsum dolor sit amet, consectetur adipiscing elit.-->
    <!--Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.-->
    <!--</p>-->
    <!--</div>-->
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800');
  #checkout .cart-summary h3 {
    color: #19233c;
    line-height: 40px;
    margin: 0;
  }
  #checkout .cart-summary .material-icons {
    line-height: 18px;
    font-size: 20px;
    color: #d83b4b;
    padding-bottom: 3px;
    border-bottom: 3px solid #d83b4b;
    margin-left: 5px;
  }
  #checkout .cart-summary {
    .custom-btn:hover {
      background: #d83b4b;
      color: #ffffff;

      .material-icons {
        border-color: #ffffff;
        color: #ffffff;
      }
    }
  }
  .cart-summary {
    & > div {
      -webkit-border-radius: 5px 5px 0 0;
      -moz-border-radius: 5px 5px 0 0;
      border-radius: 5px 5px 0 0;
    }
    .header {
      text-align: center;
    }
    .custom-btn {
      display: inline-block;
      padding: 7px 15px;
      font-size: 14px;
      font-weight: 400;
      background-color: transparent;
      border: 1px solid #d83b4b;
      color: #d83b4b;
      border-radius: 5px;
      -webkit-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      span, i {
        display: inline-block;
        vertical-align: middle;
      }
      &:hover {
        background: #d83b4b;
        color: #ffffff;

        .material-icons {
          border-color: #ffffff;
          color: #ffffff;
        }
      }
    }
    .total {
      background: rgba(#009777, .1);
      border: 1px solid #009777;
      -webkit-border-radius: 0 0 5px 5px;
      -moz-border-radius: 0 0 5px 5px;
      border-radius: 0 0 5px 5px;

      .h4 {
        font-weight: 700;
        font-size: 18px;
      }
      .text-right {
        text-align: right;
      }
    }
  }
  .summary-title {
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
</style>
