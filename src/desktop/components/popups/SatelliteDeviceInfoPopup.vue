<template>
  <div :class="$style.wrapper" v-if="isVisible">
    <div :class="$style.section">
      <div :class="$style.header">
        Device Info
        <span @click="close">&times;</span>
      </div>
      <div :class="$style.slides">
        <div :class="$style.active"></div>
        <div @click="changeSlide('SatelliteChoosePlan')"></div>
        <div @click="changeSlide('SatellitePaymentDetails')"></div>
      </div>
      <div :class="$style.content">
        <label>Your device IMEI number</label>
        <input v-model="hardware.imei" type="text" placeholder="Type Here..." />
        <label>Serial Number</label>
        <input v-model="hardware.serial" type="text" placeholder="Type here..." />
      </div>
      <div :class="$style.footer">
        <div></div>
        <styled-button
          @click="changeSlide('SatelliteChoosePlan')"
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
  name: "SatelliteDeviceInfo",
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  data: () => ({
    hardware: {
      imei: null,
      serial: null
    }
  }),
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
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
    createHardware({ imei, serial }) {
      if (imei && serial)
        this.$socket.emit("createHardware", {
          user_id: this.$lib.currentUserUID,
          serial,
          imei,
          available: 0
        });
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
    padding 10px 5px

    ::-webkit-input-placeholder
      color #93a5ba

    ::-moz-placeholder
      color #93a5ba

    :-ms-input-placeholder
      color #93a5ba

    :-moz-placeholder
      color #93a5ba

    label
      padding 0 0 0 20px
      color #93a5ba

    input
      display block
      width 100%
      background-color #ECF1F5
      padding 15px 20px
      border-radius 15px
      margin 10px 0 15px

  .footer
    display grid
    grid-column-gap 10px
    grid-template-columns 1fr 1fr
    padding 10px 5px

    button
      text-transform none!important
</style>
