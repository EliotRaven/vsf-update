<template>
  <div class="TelBlock">
    <router-link class="number" :to="('tel:+380800399399')">
      0800 399 399
    </router-link>
    <router-link class="link" :to="localizedRoute('/')">
      {{ $t('Call me') }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TelBlock'
}
</script>

<style lang="scss" scoped>
.TelBlock {
  line-height: 1;
  .number {
    color: black;
    font-weight: 700;
    font-size: 18px;
    &:hover {
      &:after {
        background-color: transparent;
      }
    }
  }
  .link {
    color: red;
    text-decoration: underline;
    font-size: 12px;
    &:hover {
      &:after {
        background-color: transparent;
      }
    }
  }
}
@media (max-width: 767px) {
  .TelBlock {
    .number,
    .link {
      color: white;
    }
  }
}
</style>
