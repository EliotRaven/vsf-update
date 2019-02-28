<template>
  <span @click="switchFilter(id, content)" class="price-selector-wrapper">
    <button
      class="relative brdr-cl-bg-tertiary brdr-1 bg-cl-transparent mr10 pointer price-selector dib"
      :class="{ active: active }"
      :aria-label="$t('filter ') + content"
    >
      <i class="material-icons">done</i>
    </button>
    <span class="dib">{{ content }}</span>
  </span>
</template>

<script>
export default {
  name: 'PriceSelector',
  props: {
    content: {
      type: null,
      default: ''
    },
    id: {
      type: null,
      required: true
    },
    code: {
      type: null,
      required: true
    },
    context: {
      type: null,
      default: ''
    }
  },
  data () {
    return {
      active: false
    }
  },
  beforeMount () {
    this.$bus.$on('filter-reset', this.filterReset)
    this.$bus.$on('filter-changed-' + this.context, this.filterChanged)
  },
  beforeDestroy () {
    this.$bus.$off('filter-reset', this.filterReset)
    this.$bus.$off('filter-changed-' + this.context, this.filterChanged)
  },
  methods: {
    filterChanged (filterOption) {
      if (filterOption.attribute_code === this.code) {
        if (filterOption.id === this.id) {
          if (this.active) {
            this.active = false
          } else {
            this.active = true
          }
        } else {
          this.active = false
        }
      }
    },
    filterReset (filterOption) {
      this.active = false
    },
    switchFilter (id, from, to) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, from: from, to: to })
    }
  }
}
</script>

<style lang="scss" scoped>
    .price-selector-wrapper {
        padding: 7px 0;
    }

    .price-selector {
        width: 22px;
        height: 22px;
        background: #ffffff;
        border: 1px solid #e5e6eb;
        border-radius: 5px;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

        &:hover, &.active {
            border-color: #009777;
        }

        &.active {
            background: #009777;
            i {
                opacity: 1;
            }
        }

        i {
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
            opacity: 0;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            bottom: 0;
            font-size: 20px;
            color: #ffffff;
        }
    }
</style>
