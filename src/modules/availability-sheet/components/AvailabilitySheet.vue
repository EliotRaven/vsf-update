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
    },
    notAll () {
      return this.availability.find(e => e.qty_to_deduct > e.qty_available)
    }
  },
  methods: {
    findMissing () {
      return this.productsInCart.map(e => {
        let curCity = this.availability.filter(i => i.source_code === this.item.id)
        debugger
        let missing = curCity.find(c => e.sku !== c.sku)
        debugger
        let notAvailable = curCity.filter(c => c.qty_available < parseInt(e.qty))
        return [...missing, ...notAvailable]
      })
    },
    filterData (item) {
      return this.productsInCart.find(i => i.sku === item.sku)
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
    }
  },
  beforeMount () {
    this.getData()
  }
}
</script>
