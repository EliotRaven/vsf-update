<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :type="!link ? type : false"
    :to="localizedRoute(link)"
    class="subbtn no-outline brdr-none px10 py20 ripple"
    :class="{ 'no-underline pointer align-center border-box': link, 'disabled': disabled }"
    data-testid="subscribeSubmit"
    :disabled="disabled"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'SubscribeButton',
  directives: { focusClean },
  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: Object,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .subbtn {
    background-color: white;
    color: #d83b4b;
    font-weight: 700;
    font-size: 14px;
  }
  .disabled {
    font-weight: 400;
    opacity: 0.7;
    font-size: 13px;
    pointer-events: none;
  }
</style>
