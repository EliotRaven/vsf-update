<template>
  <div class="breadcrumbs h5 cl-gray">
    <span v-for="link in routes" :key="link.route_link">
      <router-link :to="localizedRoute(link.route_link)">
        {{ link.name | htmlDecode }}
      </router-link>
      <i class="arrow" />
    </span>
    <span class="cl-mine-shaft">
      {{ activeRoute | htmlDecode }}
    </span>
  </div>
</template>

<script>
import Breadcrumbs from '@vue-storefront/core/compatibility/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs]
}
</script>

<style lang="scss">
  .breadcrumbs {
    span {
      position: relative;
    }
    a {
      padding-right: 25px;
      color: #19233C;
      font-weight: 500;

      &.underline:after, &:not(.no-underline):hover:after {
        display: none;
      }
    }
    i.arrow {
      border: solid #8b93a6;
      border-width: 0 1px 1px 0;
      display: inline-block;
      padding: 2px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      position: absolute;
      right: 13px;
      top: 8px;
    }
    .cl-mine-shaft {
      color: #8b93a6;
      font-weight: 500;
    }
  }
</style>
