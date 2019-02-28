import { buildFilterProductsQuery } from '@vue-storefront/store/helpers'

export default {
  name: 'CategorySidebar',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      show: [],
      checked_filters: []
    }
  },
  computed: {
    category () {
      return this.$store.state.category.current
    },
    activeFilters () {
      return this.$store.state.category.filters.chosen
    }
  },
  methods: {
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    },
    checkedFilter (val) {
      return (this.checked_filters.includes(val)) ? this.checked_filters.filter(i => i !== val) : this.checked_filters.push(val)
    },
    resetAllFilters () {
      this.$bus.$emit('filter-reset')
      this.$store.dispatch('category/resetFilters')
      this.$store.dispatch('category/searchProductQuery', buildFilterProductsQuery(this.category, this.activeFilters))
      this.$store.dispatch('category/products', this.$store.state.category.current_product_query)
    }
  }
}
