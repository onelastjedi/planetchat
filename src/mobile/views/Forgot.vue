<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <i @click="goBack" class="icon-left-arrow" />
      <h3>Reset Password</h3>
    </div>
    <div :class="$style.content">
      <img v-if="!isKeyboard" :class="$style.lock" src="@/shared/assets/lock-icon.svg" />
      <form @submit.stop.prevent="handleSubmit(email)">
        <div :class="$style.email_input">
          <i class="icon-user" />
          <input
            type="text"
            :disabled="disableInputs"
            placeholder="Email"
            v-model.trim="email"
            @focus="setTypeMode(true)"
            @blur="setTypeMode(false)"
          />
        </div>
        <styled-button :isMobile="true" :disabled="!email || disableInputs">Reset password</styled-button>
      </form>
      <p>
        Check your email after tapping button above.<br>
        You'll recieve an email with 6 digit code.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  data: () => ({
    /* Inputs Accessibility */
    disableInputs: false,

    /* Account (email/username) */
    email: null,

    /* Is mobile keyboard presented on screen */
    isKeyboard: false,

    /* Template root el height */
    elHeight: null
  }),
  methods: {
    goBack() {
      this.$router.push("/");
    },
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
    },

    /* Sets layout when keyboard appears */
    setTypeMode(mode) {
      this.isKeyboard = mode;
    },

    /**
     * Reacts to mobile keyboard toggling
     * @param {number} innerHeight Affected window height
     */
    handleResize({ target: { innerHeight } }) {
      if (innerHeight < this.elHeight) this.setTypeMode(true);
      else this.setTypeMode(false);
    }
  },

  mounted() {
    this.elHeight = this.$el.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative
    position fixed
    background-color #e8eef2
    width 100%
    height 100%
    text-align center
    padding 25px 25px

  .header
    color #2a2d31
    font-weight 700
    font-size 22px
    display grid
    margin 0 -22px
    align-items center
    grid-template-columns 60px 1fr 60px
    grid-column-gap 15px

    i
      margin 0 auto
      color #5997dc
      cursor pointer
      font-size 24px

  .content
    padding 20px 0

    p
      margin 15px 0
      font-size 20px
      line-height 1.3
      color #93a5ba

  .lock
    padding 40px 0 30px
    width 30%

  .email_input
    display grid
    grid-template-columns auto 1fr
    padding 20px 25px
    background white
    border-radius 25px
    margin-bottom 25px
    font-size 18px

    ::-webkit-input-placeholder
      color #93a5ba

    ::-moz-placeholder
      color #93a5ba

    :-ms-input-placeholder
      color #93a5ba

    :-moz-placeholder
      color #93a5ba

    input
      background transparent
      color #93a5ba
      padding-left 15px

    i[class^="icon-user"]
      line-height 20px
      color #0e4b8a33
      line-height 28px

</style>
