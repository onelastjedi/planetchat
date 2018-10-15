<template>
  <div :class="$style.auth_mobile" :style="{height: elHeight + 'px'}">
    <div :class="$style.header"><logo-header :isMobile="true" /></div>
    <form :class="[$style.form, {[$style.error]: error }]" @submit.stop.prevent="handleSubmit({ account, password })">
      <div :class="$style.loginInput_mobile">
        <i class="icon-user" />
        <input
          type="text"
          :disabled="disableInputs"
          placeholder="Username or email"
          v-model.trim="account"
        />
      </div>
      <hr>
      <div :class="$style.passwordInput_mobile">
        <i class="icon-pass" />
        <input
          :type="showPassword ? 'text' : 'password'"
          :disabled="disableInputs"
          v-model.trim="password"
          placeholder="Password"
        />
        <i class="icon-eye" @click="toggleShowPassord" />
      </div>
      <styled-button :isMobile="true" type="filled-white" :disabled="!account || !password || disableInputs">Login</styled-button>
    </form>
    <div :class="$style.footer_mobile_wrapper">
      <div v-if="error" :class="$style.error">{{ error }}</div>
      <div :class="$style.footer_mobile">
        <router-link :to="{path: '/forgot'}">Forgot password?</router-link>
      </div>
    </div>
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
    password: null,

    /* Template root el height */
    elHeight: null
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
        this.$lib.hideVirtualKeyboard();
        const path = await this.$lib.login(params);
        this.$router.push(path);
      } catch ({ message }) {
        this.$store.commit("PUSH_ERROR", message);
      }
    }
  },
  mounted() {
    this.elHeight = window.innerHeight;
  }
};
</script>

<style module lang="stylus" src="@/shared/styles/common/auth_mobile.styl" />
