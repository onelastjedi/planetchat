<template>
  <div :class="$style.auth">
    <div :class="$style.wrapper">
      <logo-header><h2>Login to get started</h2></logo-header>
      <form @submit.stop.prevent="handleSubmit({ account, password })">
        <div
          v-if="error"
          :class="$style.error"
        >
          {{ error }}
        </div>
        <div :class="$style.loginInput">
          <i class="icon-user" />
          <input
            type="text"
            :disabled="disableInputs"
            placeholder="Username or email"
            v-model.trim="account"
          />
        </div>
        <hr>
        <div :class="$style.passwordInput">
          <i class="icon-pass" />
          <input
            :type="showPassword ? 'text' : 'password'"
            :disabled="disableInputs"
            v-model.trim="password"
            placeholder="Password"
          />
          <i class="icon-eye" @click="toggleShowPassord" />
        </div>
        <router-link :to="{path: '/forgot'}">Forgot Password?</router-link>
        <styled-button type="filled-white" :disabled="!account || !password || disableInputs">Login</styled-button>
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

    /* Account (email/username) */
    account: null,

    /* Login password */
    password: null
  }),
  watch: {
    account() {
      if (this.error) this.$store.commit("CLEAR_ERRORS");
    },
    password() {
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
        const path = await this.$lib.login(params);
        this.$router.push(path);
      } catch ({ message }) {
        this.$store.commit("PUSH_ERROR", message);
      }
    }
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/auth.styl" />
