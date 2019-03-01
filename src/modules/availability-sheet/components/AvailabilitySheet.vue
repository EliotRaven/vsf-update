<script>
import moment from 'moment'
import Product from '../../../themes/default/components/core/blocks/Checkout/Product'
import { mapGetters } from 'vuex'

export default {
  components: {Product},
  name: 'AvailabilitySheet',
  props: {
    id: {
      type: String,
      default: null
    },
    stockId: {
      type: Number,
      default: null
    },
    item: {
      type: Object,
      default: null
    },
    checked: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      selected: '',
      showPopup: false
    }
  },
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    }),
    cDate () {
      return moment(new Date()).add(3, 'days').format('MM.DD')
    },
    availability () {
      return JSON.parse(JSON.stringify(this.$store.getters['availability-sheet/availability'])).filter(i => i.source_code === this.id)
    },
    productsInCart () {
      return JSON.parse(JSON.stringify(this.$store.state.cart.cartItems))
    },
    productsInCartMap () {
      return this.productsInCart.map(i => {
        return {
          sku: i.sku,
          qty: i.qty
        }
      })
    }
  },
  methods: {
    mHidePopup () {
      this.showPopup = false
    },
    mShowPopup () {
      this.showPopup = true
    },
    findMissing () {
      let skuArr = this.availability.filter(i => i.sku && i.source_code === this.item.id).map(i => i.sku)
      let currentStock = this.availability.filter(i => i.sku && i.source_code === this.item.id)
      let outOfStock = this.productsInCart.filter(i => !skuArr.includes(i.sku))
      let low = this.productsInCart.filter(i => {
        if (currentStock.find(p => p.sku === i.sku)) {
          return currentStock.find(p => p.sku === i.sku)['qty_available'] < i.qty
        }
      })
      return [...outOfStock, ...low]
    },
    filterData (item) {
      return this.findMissing().find(i => i.sku === item.sku)
    },
    getData () {
      let data = {
        inventoryRequest: {
          stockId: this.stockId,
          items: this.productsInCartMap
        },
        algorithmCode: 'priority'
      }
      this.$store.dispatch('availability-sheet/get', data)
    }
  },
  watch: {
    selected (val) {
      this.$emit('get:selected', val)
    },
    showPopup (val) {
      this.$emit('show:popup', val)
    },
    city () {
      this.getData()
    }
  },
  beforeMount () {
    this.getData()
  }
}
</script>
