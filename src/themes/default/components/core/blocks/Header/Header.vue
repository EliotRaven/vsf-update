<template>
  <div class="header">
    <header
      class="fixed w-100 brdr-bottom-1 bg-cl-primary brdr-cl-secondary"
      :class="{ 'is-visible': navVisible }"
    >
      <div class="container px15">
        <div class="row between-xs middle-xs" v-if="!isCheckoutPage">
          <div class="col-xs-2 col-md-1 middle-xs">
            <div>
              <template v-if="!canGoBack">
                <hamburger-icon class="p15 icon bg-cl-secondary pointer" v-if="!canGoBack"/>
              </template>
              <template v-else>
                <return-icon class="p15 icon bg-cl-secondary pointer" v-if="canGoBack"/>
              </template>
            </div>
          </div>
          <div class="col-xs-2 col-sm-1 hidden-lg hidden-xl">
            <search-icon class="p15 icon pointer" />
          </div>
          <div class="col-xs-4 col-sm-1 center-xs pt5">
            <div>
              <logo width="auto" height="41px"/>
            </div>
          </div>
          <div class="col-xs-5 center-xs pt5 hidden-md hidden-sm hidden-xs">
            <SearchInHeader/>
          </div>
          <div class="col-xs-12 col-sm-3 col-lg-2 center-xs pt5 first-xs initial-order-sm">
            <TelBlock/>
          </div>
          <div class="col-xs-4  col-sm-2 end-xs">
            <div class="inline-flex between-xs right-icons">
              <wishlist-icon class="p15 icon hidden-xs pointer" />
              <microcart-icon class="p15 icon pointer" />
              <account-icon class="account-icon p15 icon hidden-xs pointer" />
            </div>
          </div>
        </div>
        <div class="row between-xs middle-xs px15 pt5" v-if="isCheckoutPage">
          <div class="col-xs-5 col-md-3 middle-xs">
            <div>
              <router-link :to="localizedRoute('/')" class="cl-tertiary links">
                {{ $t('Return to shopping') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-2 col-md-6 center-xs">
            <logo width="auto" height="41px"/>
          </div>
          <div class="col-xs-5 col-md-3 end-xs">
            <div>
              <a v-if="!currentUser" href="#" @click.prevent="gotoAccount" class="cl-tertiary links">
                {{ $t('Login to your account') }}
              </a>
              <span v-else>
                {{ $t('You are logged in as') }} {{ currentUser.firstname }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import Logo from 'theme/components/core/Logo'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'
import SearchInHeader from 'theme/components/core/blocks/SearchPanel/SearchInHeader'
import TelBlock from 'theme/components/core/blocks/Header/TelBlock'
export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    ReturnIcon,
    SearchIcon,
    WishlistIcon,
    SearchInHeader,
    TelBlock
  },
  mixins: [CurrentPage],
  data () {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 54
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    })
  },
  beforeMount () {
    window.addEventListener('scroll', () => {
      this.isScrolling = true
    })
    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  methods: {
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop > this.lastScrollTop && this.scrollTop > this.navbarHeight) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);
header {
  height: 54px;
  top: -55px;
  z-index: 2;
  transition: top 0.2s ease-in-out;
  &.is-visible {
    top: 0;
  }
}
.icon {
  opacity: 0.88;
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}
.right-icons {
  //for edge
  float: right;
}
.header-placeholder {
  height: 54px;
}
.links {
  text-decoration: underline;
}
@media (max-width: 767px) {
  header {
    height: 90px;
    top: -91px;
    .pt5 {
      padding-top: 0;
      .TelBlock {
        height: 30px;
        background: #e41c3f;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }
    }
    .account-icon {
      display: none;
    }
  }
  .right-icons {
    width: 100%;
  }
  .header-placeholder {
    height: 90px;
  }
  .row.middle-xs {
    margin: 0 -15px;
    &.py5 {
      margin: 0;
    }
  }
  .col-xs-2:first-of-type {
      padding-left: 0;
  }
  .col-xs-2:last-of-type {
      padding-right: 0;
  }
  a, span {
    font-size: 12px;
  }
}
</style>
