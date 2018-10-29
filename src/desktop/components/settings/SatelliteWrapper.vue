<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">Satellite Settings</div>
    <div :class="$style.content">
      <div :class="$style.new">
        Hardware
        <styled-button
          type="filled-blue-sm"
          @click="openWizard('SatelliteDeviceInfo')"
        >
          Add New Hardware
        </styled-button>
      </div>
      <div :class="$style.add">
        <template v-for="(hw, index) in hardware">
          <span :key="`hw-${index}`">imei: {{ hw.imei }}, serial: {{ hw.serial }}, billing date: {{ hw.billing_date }}</span>
        </template>
      </div>
      <div :class="$style.footer">
        <div>
          <styled-button
            type="filled-blue-sm"
            @click="openWizard('SatellitePaymentDetails')"
          >
            Change Payment Method
          </styled-button>
        </div>
        <styled-button
          type="bordered-blue-sm"
          @click="openWizard('SatelliteChoosePlan')"
        >
          Change Plan
        </styled-button>
        <styled-button
          type="bordered-red-sm"
          @click="deactivate"
        >
          Deactivate
        </styled-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SatelliteWrapper",
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  computed: {
    hardware() {
      return this.$store.state.hardware;
    }
  },
  methods: {
    openWizard(tabName) {
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        Object.defineProperty({}, tabName, {
          value: true,
          writable: false
        })
      ]);
    },
    deactivate() {
      console.log("Deactivate");
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative
    background white
    border-radius 15px

    @media (max-width: 960px)
      border-left 1px solid rgba(235,241,245,0.6);
      border-radius 0

  .header
    position relative
    padding 17px 20px
    height 50px
    color #2a2d31
    font-weight 700
    border-bottom 1px solid rgba(147, 165, 186, .4)

  .content
    position relative
    color #2a2d31
    padding 20px

    .new
      position relative
      display grid
      align-items end
      grid-template-columns 1fr auto
      color #93a5ba
      margin-bottom 15px

      button
        text-transform none
        width auto

    .add
      margin-bottom 15px
      padding 15px 20px
      height 100px
      background-color #ECF1F5
      border-radius 15px

    .footer
      display grid
      grid-template-columns 1fr auto auto
      grid-column-gap 10px
      margin-bottom 15px

      button
        text-transform none
        width auto
</style>
