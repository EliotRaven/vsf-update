<template>
  <div class="availability-sheet">
    <div v-for="item in cItems" :key="item.source_code" class="item">
      <h4>{{ filterData(item).name }} : </h4>
      <button class="no-outline button-full block w-100 brdr-none px10 py10 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium">
        {{ (item.qty_to_deduct > item.qty_available) ? 'Забрать через три дня' : 'Забрать здесь' }}
      </button>

    </div>
  </div>
</template>

<script>
import AvailabilitySheet from '../../../../../../../src/modules/availability-sheet/components/AvailabilitySheet'

export default {
  name: 'AvailabilitySheet',
  mixins: [AvailabilitySheet],
}
</script>

<style lang="scss" scoped>
    @import "~theme/css/animations/transitions";
    .availability-sheet {
      padding: 15px;
      border: 1px solid #ebebeb;
      -webkit-transition: all .3s ;
      -moz-transition: all .3s ;
      -ms-transition: all .3s ;
      -o-transition: all .3s ;
      transition: all .3s ;
      position: relative;
      z-index: 99;

      &:hover {
        -webkit-box-shadow: 0 0 15px rgba(0,0,0,.3);
        -moz-box-shadow: 0 0 15px rgba(0,0,0,.3);
        box-shadow: 0 0 15px rgba(0,0,0,.3);
      }

      h4 {
        margin: 5px 0;
      }

      .item {
        padding-bottom: 10px;
        border-bottom: 1px solid #ebebeb;
      }
    }
</style>