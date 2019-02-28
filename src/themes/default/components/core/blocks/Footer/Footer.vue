<template>
  <footer :class="{ 'brdr-top-1 brdr-cl-secondary': isCheckoutPage }">
    <newsletter class=" flex brdr-bottom-1 brdr-cl-secondary" v-if="!isCheckoutPage"/>
    <div
      class="footer-links flex pt30 pb60 px40 bg-cl-secondary"
      v-if="!isCheckoutPage"
    >
      <div class="container">
        <div class="row m0 center-xs between-md">
          <div class="col-xs-12 col-sm-3 start-md">
            <h3 class="cl-accent weight-400">
              {{ $t('Assistance') }}
            </h3>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/c/women-20')" exact>
                {{ $t('How to make an order') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/c/men-11')" exact>
                {{ $t("Order by phone") }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/')" exact>
                {{ $t('Deliver to New Mail') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/')" exact>
                {{ $t('Free shipping') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/')" exact>
                {{ $t('Report a problem') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-12 col-sm-3 start-md">
            <h3 class="cl-accent weight-400">
              {{ $t('About the service') }}
            </h3>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/order-tracking')" exact>
                {{ $t('About us') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/my-account')" exact>
                {{ $t('Sale') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/delivery')" exact>
                {{ $t('Payment and delivery') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/returns')" exact>
                {{ $t('Production quality') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-12 col-sm-3 start-md">
            <h3 class="cl-accent weight-400">
              {{ $t('Cooperation') }}
            </h3>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/customer-service')" exact>
                {{ $t('Work in the company') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/size-guide')" exact>
                {{ $t('Corporate clients') }}
              </router-link>
            </div>
            <div class="mt15">
              <router-link class="cl-secondary" :to="localizedRoute('/contact')" exact>
                {{ $t('Insurance companies') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-12 col-sm-3 social mt30">
            <a
              class="social-icon mx10 brdr-circle no-underline"
              href="https://www.facebook.com/"
              :aria-label="$t('Go to Facebook')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="facebook icon" width="40" height="40" viewBox="0 0 40 40" fill="#d83b4b">
                <path d="M20,0 C8.9541,0 0,8.95435 0,20 C0,31.0457 8.9541,40 20,40 C31.0459,40 40,31.0457 40,20 C40,8.95435 31.0459,0 20,0 Z M22.085,20.8785 L22.085,31.7595 L17.5825,31.7595 L17.5825,20.8789 L15.3335,20.8789 L15.3335,17.1293 L17.5825,17.1293 L17.5825,14.8779 C17.5825,11.819 18.8525,10 22.4609,10 L25.4653,10 L25.4653,13.7501 L23.5874,13.7501 C22.1826,13.7501 22.0898,14.2742 22.0898,15.2521 L22.085,17.1288 L25.4863,17.1288 L25.0884,20.8785 L22.085,20.8785 Z"/>
              </svg>
            </a>
            <a
              class="social-icon mx10 brdr-circle no-underline"
              href="https://www.youtube.com"
              :aria-label="$t('Go to Youtube')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="youtube icon" width="40" height="40" viewBox="0 0 40 40" fill="#d83b4b">
                <path d="M20,0 C8.9541,0 0,8.95435 0,20 C0,31.0457 8.9541,40 20,40 C31.0459,40 40,31.0457 40,20 C40,8.95435 31.0459,0 20,0 Z M28.335,13.1244 C29.2529,13.3763 29.9756,14.1185 30.2212,15.061 C30.667,16.7692 30.667,20.3333 30.667,20.3333 C30.667,20.3333 30.667,23.8973 30.2212,25.6056 C29.9756,26.5481 29.2529,27.2903 28.335,27.5424 C26.6714,28 20,28 20,28 C20,28 13.3291,28 11.6655,27.5424 C10.7476,27.2903 10.0244,26.5481 9.7793,25.6056 C9.3335,23.8973 9.3335,20.3333 9.3335,20.3333 C9.3335,20.3333 9.3335,16.7692 9.7793,15.061 C10.0244,14.1185 10.7476,13.3763 11.6655,13.1244 C13.3291,12.6666 20,12.6666 20,12.6666 C20,12.6666 26.6714,12.6666 28.335,13.1244 Z"/>
                <polygon points="0 6.667 0 0 5.333 3.333" transform="translate(18 17.33)"/>
              </svg>
            </a>
          </div>
          <div class="alert-message col-xs-12">
            {{ $t('Self-esteem can be harmful to your health! BEFORE USING CONSULT THE MEDICINE.') }}
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row middle-xs px15 bottom-links">
        <div class="col-xs-5 col-sm-3 cl-tertiary">
          <language-switcher v-if="multistoreEnabled" />
        </div>
        <div class="col-xs col-sm-12">
          <ul class="pl0 links flex between-xs" data-testid="bottomLinks">
            <li class="inline-flex copiright">
              Klikis © 2018-2019. All rights reserved.
            </li>
            <li class="inline-flex">
              <router-link
                class="cl-tertiary underline"
                to="/privacy"
                exact
              >
                {{ $t('Privacy policy') }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage'
import LanguageSwitcher from '../../LanguageSwitcher.vue'
import Newsletter from 'theme/components/core/blocks/Footer/Newsletter'

export default {
  mixins: [CurrentPage],
  name: 'MainFooter',
  computed: {
    multistoreEnabled () {
      return this.$store.state.config.storeViews.multistore
    }
  },
  components: {
    Newsletter,
    LanguageSwitcher
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-secondary: color(secondary);

.icon {
  transition: 0.3s all;
}

.social-icon {
  width: 40px;
  height: 40px;
  &:hover,
  &:focus,
  &:active {
    .icon {
      fill: $color-secondary;
    }
  }
}
.links {
  list-style-type: none;
}

.bottom-links {
  @media (max-width: 767px) {
    padding: 0;
  }
}

.underline {
  &:hover {
    color: $color-secondary;
    &:after {
      background-color: $color-secondary;
    }
  }
}
.legal-entity-link {
  text-align: center;
  @media (min-width: 768px) {
    display: none;
  }
}

.privacy-policy-link {
  text-align: right;
  @media (min-width: 768px) {
    display: none;
  }
}

.alert-message {
  font-size: 32px;
  color: #a2a8b3;
  text-transform: uppercase;
  padding-top: 2em;
  font-weight: 600;
}

.copiright {
  font-size: 13px;
  color: #a2a8b3;
}

@media (max-width: 768px) {
  .alert-message {
    font-size: 20px;
  }
}

@media (max-width: 595px) {
  .alert-message {
    font-size: 15px;
  }
  .no-mobile {
    display: none;
  }

  .footer-links {
    padding-bottom: 30px;
  }
}
</style>
