<template>
  <div class="newsletter py25 px15">
    <div class="container">
      <div class="newsletter-content m0 row middle-sm between-xs">
        <div class="col-lg-6 col-xs-12">
          <h4>
            {{ $t('Learn about new promotions first') }}
          </h4>
        </div>
        <div class="newsletter-button col-lg-5 col-xs-12 end-md">
          <form class="row" @submit.prevent="submit(onSuccesfulSubmission)" novalidate>
            <div class="col-xs-8">
              <subscribe-input
                focus
                type="email"
                name="email"
                v-model="email"
                autocomplete="email"
                :placeholder="$t('E-mail address *')"
                :validations="[
                  {
                    condition: $v.email.$error && !$v.email.required,
                    text: $t('Field is required.')
                  },
                  {
                    condition: !$v.email.email && $v.email.$error,
                    text: $t('Please provide valid e-mail address.')
                  }
                ]"
              />
            </div>
            <subscribe-button
              class="col-xs-4"
              type="submit"
              :disabled="this.$v.$invalid"
              @click.native="$v.email.$touch"
            >
              {{ $t('Subscribe') }}
            </subscribe-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Subscribe } from 'src/modules/mailchimp/components/Subscribe'
import i18n from '@vue-storefront/i18n'

import Modal from 'theme/components/core/Modal'
import SubscribeButton from 'theme/components/core/blocks/Footer/SubscribeButton.vue'
import SubscribeInput from 'theme/components/core/blocks/Form/SubscribeInput.vue'

export default {
  name: 'Newsletter',
  beforeDestroy () {
    this.$off('validation-error')
  },
  methods: {
    onSuccesfulSubmission () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You have been successfully subscribed to our newsletter!'),
        action1: { label: i18n.t('OK') }
      })
      this.$bus.$emit('modal-hide', 'modal-newsletter')
    }
  },
  components: {
    Modal,
    SubscribeButton,
    SubscribeInput
  },
  mixins: [
    Subscribe
  ]
}
</script>

<style scoped>
  .newsletter {
    background: #d83b4b;
    color: white;
    font-size: 16px;
  }
  h4 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
  form {
    background: white;
    border-radius: 5px;
    align-items: center;
  }
  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .h4 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
