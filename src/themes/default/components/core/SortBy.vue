<template>
  <div class="sort-by">
    <label v-if="!sortby" class="form-label">{{ $t('Sort By') }}</label>
    <base-select
      class="col-12"
      name="sortby"
      :options="cOptions()"
      :selected="sortby"
      v-model="sortby"
      @input="changeOrder"
    />
    <!--<select-->
    <!--name="sortby"-->
    <!--class="cl-secondary"-->
    <!--v-model="sortby"-->
    <!--@change="changeOrder">-->
    <!--<option selected="selected" disabled value="">{{ $t('Sort By') }}</option>-->
    <!--<option v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option" >{{ $t(label) }}</option>-->
    <!--</select>-->
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/compatibility/components/SortBy'
import BaseSelect from '@vue-storefront/theme-default/components/core/blocks/Form/BaseSelect'

export default {
  components: {BaseSelect},
  mixins: [SortBy],

  methods: {
    cOptions () {
      let arr = []
      for (let i in this.sortByAttribute) {
        arr.push({value: this.sortByAttribute[i], label: i})
      }
      return arr
    }
  }
}
</script>
<style lang="scss">
@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);
.sort-by {
  display: flex;
  width: 100%;
  margin-right: 38px;
  position: relative;
  label {
    position: absolute;
    top: 14px;
    left: 10px;
  }
  .select-wrapper {
    width: 100%;
    margin-top: 5px;
    select {
      border: 1px solid #ebebeb;
      border-radius: 5px;
      padding: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    option {
      font-size: 14px;
    }
    &::after {
      border: 1px solid #000;
      border-width: 0 0 1px 1px;
      width: 5px;
      height: 5px;
      line-height: 0;
      font-size: 0;
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      top: 14px;
    }
  }
}
</style>
