<template>
  <div :class="$style.auth">
    <div :class="$style.wrapper">
      <logo-header>Fill-in your details below:</logo-header>
      <form @submit.stop.prevent="handleSubmit(params)">
        <div
          v-if="error"
          :class="$style.error"
        >
          {{ error }}
        </div>
        <div :class="$style.inputs">
          <span><i class="icon-add-photo" /></span>
          <label>
            <input
              type="text"
              :disabled="disableInputs"
              placeholder="First Name"
              v-model.trim="params.firstname"
            />
          </label>
          <hr>
          <label>
            <input
              type="text"
              :disabled="disableInputs"
              placeholder="Last Name"
              v-model.trim="params.lastname"
            />
          </label>
          <hr>
          <label>
            <i class="icon-user" />
            <input
              type="text"
              :disabled="disableInputs"
              placeholder="Username"
              v-model.trim="params.username"
            />
          </label>
          <hr>
          <label>
            <i class="icon-email" />
            <input
              type="text"
              :disabled="disableInputs"
              placeholder="Email"
              v-model.trim="params.email"
            />
          </label>
          <hr>
          <label :class="$style.password">
            <i class="icon-pass" />
            <input
              :type="showPassword ? 'text' : 'password'"
              :disabled="disableInputs"
              placeholder="Password"
              v-model.trim="params.password"
            />
            <i class="icon-eye" @click="toggleShowPassord"/>
          </label>
          <hr>
          <label>
            <i class="icon-phone" />
            <input
              type="text"
              :disabled="disableInputs"
              placeholder="Phone Number"
              v-model.trim="params.phone"
            />
          </label>
        </div>
        <div :class="$style.checkbox">
          <p>
            I agree to PlanetChat's
            <router-link :to="{path: '/terms'}">Terms</router-link> and
            <router-link :to="{path: '/privacy'}">Privacy Policy</router-link>
          </p>
          <label :class="$style.checkboxContainer">
            <input type="checkbox" v-model.trim="params.terms">
            <span :class="$style.checkmark" />
          </label>
        </div>
        <styled-button
          type="transparent"
          :disabled="
            !params.firstname ||
            !params.lastname ||
            !params.username ||
            !params.email ||
            !params.password ||
            !params.phone ||
            !params.terms ||
            disableInputs
          ">
          Sign up!
        </styled-button>
        <p>
          Already have an account?&nbsp;
          <router-link :to="{path: '/login'}">Login here</router-link>
        </p>
      </form>
    </div>
    <app-footer />
  </div>
</template>

<script>
export default {
  components: {
    LogoHeader: () => import("@/shared/components/LogoHeader"),
    StyledButton: () => import("@/shared/components/StyledButton"),
    AppFooter: () => import("@/shared/components/AppFooter")
  },
  data: () => ({
    showPassword: false,
    disableInputs: false,
    params: {
      firstname: null,
      lastname: null,
      username: null,
      email: null,
      password: null,
      phone: null,
      terms: false,
      country_code: "US",
      time_zone: "America/New_York"
    }
  }),
  computed: {
    error() {
      return this.$store.state.errors[0];
    }
  },
  methods: {
    toggleShowPassord() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit(params) {
      this.$store.commit("CLEAR_ERRORS");

      try {
        const path = await this.$lib.signup(params);
        this.$router.push(path);
      } catch ({ message }) {
        this.$store.commit("PUSH_ERROR", message);
      }
    }
  }
};
</script>

<style module lang="stylus">
  .auth
    display block
    min-width 360px
    height 100%
    display grid
    grid-template-rows auto 56px

    .wrapper
      background-image url('@/shared/assets/login_pic_1.png'),
        url('@/shared/assets/login_pic_2.png'),
        url('@/shared/assets/pattern.png'),
        linear-gradient(to top, #5997dc 0%, #56b9d6 100%)
      background-repeat no-repeat, no-repeat, repeat, no-repeat
      background-position 1% 100%, 97% 100%, 0 0, 100% 100%
      background-size 570px, 700px, auto, cover

      @media (max-width: 980px)
        background-position -100px 100%, 130% 100%, 0 0, 100% 100%

      @media (max-width: 760px)
        background-image url('@/shared/assets/pattern.png'),
          linear-gradient(to top, #5997dc 0%, #56b9d6 100%)
        background-repeat repeat, no-repeat
        background-position 0 0, 100% 100%
        background-size auto, cover

    .error
      padding 15px 20px
      margin 10px 0
      background-color #ffdce0
      border-radius 5px
      color #86181d

    form
      display block
      width 340px
      margin 0 auto 40px auto

      @media (max-width: 400px)
        width 80%

      .inputs
        background-color white
        border-radius 15px
        padding 20px 10px 5px 10px
        text-align center

      i[class^="icon-add-photo"]
        color #578FC0
        font-size 48px
        margin 0 auto
        background-image linear-gradient(to top, #bdd5f1 0%, #bce3ef 100%)
        -webkit-background-clip text
        -webkit-text-fill-color transparent
        position relative
        z-index 1
        line-height 70px

        &:after
          content ''
          position absolute
          display block
          border 1px solid #dff2ff
          width 70px
          height 70px
          top -10px
          left 50%
          background #f5fbff
          z-index -1
          margin-left -35px
          border-radius 50%

      .checkbox
        font-size 14px
        display grid
        grid-template-columns 1fr auto

        p
          text-align right
          margin-right 5px

        a
          border-bottom 1px solid rgba(255, 255, 255, .3)
          padding 0

      .checkboxContainer
        display block
        position relative
        -webkit-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none

        input
          position absolute
          opacity 0

        input:checked ~ .checkmark:after
          display block


        .checkmark
          cursor pointer
          position absolute
          top 0
          left 0
          bottom 0
          right 0
          margin auto
          height 16px
          width 16px
          border-radius 15px
          background-color #eee

          &:after
            content ""
            position absolute
            display none
            left 6px
            top -1px
            width 5px
            height 10px
            border solid #427090
            border-width 0 3px 3px 0
            transform rotate(45deg)

      label
        padding 0 10px
        display block
        display grid
        grid-template-columns auto 1fr
        align-items center

        i
          background-image linear-gradient(to top, #bdd5f1 0%, #bce3ef 100%)
          -webkit-background-clip text
          -webkit-text-fill-color transparent
          margin-right 12px

        i[class^="icon-email"]
          font-size 13px

        i[class^="icon-eye"]
          font-size 13px
          margin-right 0
          color #93a5ba
          cursor pointer
          height 40px
          line-height 40px

      label.password
        grid-template-columns auto 1fr auto

      input
        background transparent
        color #333
        display block
        width 100%
        height 40px

      hr
        border none
        height 1px
        background #93a5ba

      ::-webkit-input-placeholder
        color #93a5ba

      ::-moz-placeholder
        color #93a5ba

      :-ms-input-placeholder
        color #93a5ba

      :-moz-placeholder
        color #93a5ba

      a
        color white
        text-align right
        display block
        padding 12px 0

      p
        padding 15px 0
        text-align center
        color white

        a
          display inline
          font-weight bold
</style>
