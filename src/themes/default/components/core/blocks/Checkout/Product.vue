<template>
  <div class="row py25 between-xs product">
    <img class="blend" v-lazy="thumbnail">
    <div class="col-xs">
      <div class="row">
        <div class="col-xs-12 col-md-9 pb15">
          <div class="mb15">
            <div class="h4 weight-400 cl-accent serif">{{ product.name | htmlDecode }}</div>
            <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
              {{ product.errors | formatProductMessages }}
            </div>
            <div class="h5 cl-tertiary pt5">{{ product.sku }}</div>
            <div class="h6 cl-bg-tertiary pt5 options" v-if="product.totals && product.totals.options">
              <div v-for="opt in product.totals.options" :key="opt.label">
                <span class="opn">{{ opt.label }}: </span>
                <span class="opv" v-html="opt.value" />
              </div>
            </div>
            <div class="h6 cl-bg-tertiary pt5 options" v-else-if="product.options">
              <div v-for="opt in product.options" :key="opt.label">
                <span class="opn">{{ opt.label }}: </span>
                <span class="opv" v-html="opt.value" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <span v-if="missingOrLow" class="h5 cl-secondary">
                <span class="text-warning">
                  Товар отсутсвует
                </span>
              </span>
              <span v-if="!missingOrLow" class="h5 cl-secondary">
                {{ $t('Qty') }}
                <span class="weight-700">
                  {{ product.qty }}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-3 serif">
          <div v-if="!product.totals">
            <span class="h4 cl-error" v-if="product.special_price">{{ product.priceInclTax * product.qty | price }} </span>
            <span class="price-original h5" v-if="product.special_price" >{{ product.originalPriceInclTax * product.qty | price }}</span>
            <span v-if="!product.special_price" class="h4">{{ product.priceInclTax * product.qty | price }}</span>
          </div>
          <div v-if="product.totals">
            <span class="h4 cl-error" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax - product.totals.discount_amount | price }} </span>
            <span class="price-original h5" v-if="product.totals.discount_amount" >{{ product.totals.row_total_incl_tax | price }}</span>
            <span v-if="!product.totals.discount_amount" class="h4">{{ product.totals.row_total_incl_tax | price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product'

export default {
  mixins: [Product]
}
</script>

<style scoped>
.product {
  border-top: 1px solid #ebebeb;
  margin: 0 25px;
}
.price-original {
  text-decoration: line-through;
}
.blend {
  mix-blend-mode: multiply;
}
.text-warning {
  color: #ffad2e;
}
</style>
