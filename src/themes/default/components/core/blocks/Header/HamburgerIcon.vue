<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
    data-testid="menuButton"
  >
    <img
      src="/assets/svg/burger-menu.svg"
      alt="Menu"
    >
  </button>
</template>

<script>
import HamburgerIcon from '@vue-storefront/core/compatibility/components/blocks/Header/HamburgerIcon'

export default {
  mixins: [HamburgerIcon]
}
</script>

<style scoped>
.bg-cl-transparent.brdr-none {
  background-color: transparent;
}
img {
  height: 24px;
}
</style>
