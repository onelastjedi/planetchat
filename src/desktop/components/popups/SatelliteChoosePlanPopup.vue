<template>
  <div :class="$style.wrapper" v-if="isVisible">
    <div :class="$style.section">
      <div :class="$style.header">
        Choose Plan
        <span @click="close">&times;</span>
      </div>
      <div :class="$style.slides">
        <div @click="changeSlide('SatelliteDeviceInfo')"></div>
        <div :class="$style.active"></div>
        <div @click="changeSlide('SatellitePaymentDetails')"></div>
      </div>
      <div :class="$style.content">
        <div :class="$style.contentSlider">
          <template v-for="(plan, index) in plans">
            <label
              :key="`plans-${index}`"
              :class="$style.checkboxContainer"
            >
              <input type="radio" name="plan">
              <span :class="$style.checkmark" />
              {{ plan.name }}
            </label>
          </template>
        </div>
      </div>
      <div :class="$style.footer">
        <styled-button
          @click="changeSlide('SatelliteDeviceInfo')"
          type="filled-white-sm"
        >
          Previous Step
        </styled-button>
        <styled-button
          @click="changeSlide('SatellitePaymentDetails')"
          type="filled-blue-sm"
        >
          Next Step
        </styled-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SatelliteChoosePlan",
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    },
    plans() {
      return this.$store.state.plans;
    }
  },
  methods: {
    close() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        Object.defineProperty({}, this.$options.name, {
          value: false,
          writable: false
        })
      ]);
    },
    changeSlide(tabName) {
      this.close();
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        Object.defineProperty({}, tabName, {
          value: true,
          writable: false
        })
      ]);
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position fixed
    width 50%
    max-width 600px
    min-width 360px
    height auto
    z-index 99
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    display table

  .section
    border-radius 15px
    padding 10px 15px
    display table-cell
    vertical-align middle
    background-color white
    box-shadow 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)

  .header
    position relative
    font-weight 700
    text-align center
    padding 15px 0 0

    span
      font-size 45px
      font-weight 300
      line-height 35px
      position absolute
      right -5px
      padding 0 10px
      top 0
      cursor pointer
      color #93a5ba

  .slides
    padding 15px 0
    margin 0 auto
    display grid
    width 50px
    grid-template-columns auto auto auto

    .active
      background-color #3B9ED5

    div
      background-color #E6EDF3
      width 10px
      height 10px
      border-radius 50%
      overflow hidden
      cursor pointer

  .content
    position relative
    padding 20px 10px 20px 20px
    background-color #ecf1f5
    border-radius 15px
    height 190px
    margin-bottom 12px

  .contentSlider
    padding-left 20px
    height 160px
    position relative
    overflow scroll

  .footer
    display grid
    grid-template-columns 1fr 1fr
    grid-column-gap 10px
    padding 10px 5px

    button
      text-transform none!important

  .checkboxContainer
    display block
    position relative
    margin-bottom 20px
    height 20px
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    user-select none

    &:last-child
      margin-bottom 0

    input
      opacity 0

    input:checked ~ .checkmark:after
      display block

    input:checked ~ .checkmark
      background-color #5398E0

    .checkmark
      cursor pointer
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      margin-left -20px
      height 20px
      width 20px
      border-radius 7px
      background-color #fff

      &:after
        content ""
        position absolute
        display none
        left 7px
        top 4px
        width 4px
        height 8px
        border solid #fff
        border-width 0 2px 2px 0
        transform rotate(45deg)
</style>
