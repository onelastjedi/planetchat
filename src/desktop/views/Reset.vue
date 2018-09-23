<template>
  <div :class="$style.auth">
    <div :class="$style.wrapper">
      <logo-header>New password and token from email</logo-header>
      <form @submit.stop.prevent="handleSubmit({ email, token, new_password })">
        <div
          v-if="error"
          :class="$style.error"
        >
          {{ error }}
        </div>
        <div :class="$style.passwordInputReset">
          <i class="icon-pass" />
          <input
            :type="showPassword ? 'text' : 'password'"
            :disabled="disableInputs"
            v-model.trim="new_password"
            placeholder="Password"
          />
          <i class="icon-eye" @click="toggleShowPassord" />
        </div>
        <hr>
        <div :class="$style.loginInputReset">
          <i class="icon-user" />
          <input
            type="text"
            :disabled="disableInputs"
            placeholder="Token"
            v-model.trim="token"
          />
        </div>
        <styled-button type="filled-white" :disabled="!token || !new_password || disableInputs">RESET</styled-button>
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
 * @file Holds login screen
 * @since 0.1.0
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
    /* Password characters visibility */
    showPassword: false,

    /* Inputs Accessibility */
    disableInputs: false,

    /* Token */
    token: null,

    /* Login password */
    new_password: null
  }),
  computed: {
    email() {
      return this.$route.query.email;
    },
    error() {
      return this.$store.state.errors[0];
    }
  },
  methods: {
    /**
     * Toggles password characters visibility
     */
    toggleShowPassord() {
      this.showPassword = !this.showPassword;
    },

    /**
     * Emits 'login' with given parameters
     * @param {object} params Login credentials
     */
    async handleSubmit(params) {
      try {
        const path = await this.$lib.resetPassword(params);
        this.$router.push(path);
      } catch ({ message }) {
        this.$store.commit("PUSH_ERROR", message);
      }
    }
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/auth.styl">
