<template>
  <div :class="$style.auth">
    <div :class="$style.wrapper">
      <logo-header>Enter your email</logo-header>
      <form @submit.stop.prevent="handleSubmit({ email })">
        <div
          v-if="error"
          :class="$style.error"
        >
          {{ error }}
        </div>
        <div :class="$style.emailInput">
          <i class="icon-user" />
          <input
            type="text"
            :disabled="disableInputs"
            placeholder="Email"
            v-model.trim="email"
          />
        </div>
        <styled-button type="filled-white" :disabled="!email || disableInputs">Send</styled-button>
        <p>
          Don't have an account yet?&nbsp;
          <router-link :to="{path: '/signup'}">Register now!</router-link>
        </p>
      </form>
      <app-store-badge />
    </div>
    <app-footer />
  </div>
</template>

<script>
/**
 * @file Holds forgot password screen
 * @since 0.2.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    LogoHeader: () => import("@/shared/components/LogoHeader"),
    AppStoreBadge: () => import("@/shared/components/AppStoreBadge"),
    StyledButton: () => import("@/shared/components/StyledButton"),
    AppFooter: () => import("@/shared/components/AppFooter")
  },
  data: () => ({
    /* Inputs Accessibility */
    disableInputs: false,

    /* Account (email/username) */
    email: null
  }),
  watch: {
    email() {
      if (this.error) this.$store.commit("CLEAR_ERRORS");
    }
  },
  computed: {
    error() {
      return this.$store.state.errors[0];
    }
  },
  methods: {
    /**
     * Emits 'resetPassword' with given parameters
     * @param {object} params
     */
    async handleSubmit(params) {
      try {
        const path = await this.$lib.forgotPassword(params);
        this.$router.push({ path, query: { email: this.email } });
      } catch ({ message }) {
        this.$store.commit("PUSH_ERROR", message);
      }
    }
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/auth.styl" />
