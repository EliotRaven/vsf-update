export default {
  name: 'AvailabilitySheet',
  props: {
    id: {
      default: null
    }
},
  computed: {
    info () {
      return JSON.parse(JSON.stringify(this.$store.getters['availability-sheet/info']));
    },
    productsInCart () {
      return JSON.parse(JSON.stringify(this.$store.state.cart.cartItems));
    },
    cItems () {
      return this.info.filter(i => i.source_code === this.id)
    },
  },
  methods: {
    filterData(item){
      return this.productsInCart.find(i => i.sku === item.sku)
    },

    getData () {
      let data = {
        inventoryRequest: {
          "stockId": this.id,
          "items": this.productsInCart
        },
        algorithmCode: "priority"
      }
      this.$store.dispatch('availability-sheet/get', data);
    }
  },
  beforeMount () {
    this.getData()
  }
};