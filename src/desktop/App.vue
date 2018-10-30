<template>
  <main id="app"
    v-if="isConnected"
    :class="{ overlayed: isAppOverlayed }"
  >
    <AppHeader v-if="isHeader" />
    <notifier />
    <full-screen-image-popup />
    <add-new-contact-popup />
    <weather-popup />
    <create-group-popup />
    <edit-group-popup />
    <add-group-members-popup />
    <user-added-popup />
    <satellite-device-info-popup />
    <satellite-choose-plan-popup />
    <satellite-payment-details />
    <router-view />
  </main>
</template>

<script>
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    AppHeader: () => import("@/desktop/components/common/AppHeader"),
    AddNewContactPopup: () =>
      import("@/desktop/components/popups/AddNewContactPopup"),
    WeatherPopup: () => import("@/desktop/components/popups/WeatherPopup"),
    CreateGroupPopup: () =>
      import("@/desktop/components/popups/CreateGroupPopup"),
    EditGroupPopup: () => import("@/desktop/components/popups/EditGroupPopup"),
    AddGroupMembersPopup: () =>
      import("@/desktop/components/popups/AddGroupMembersPopup"),
    UserAddedPopup: () => import("@/desktop/components/popups/UserAddedPopup"),
    FullScreenImagePopup: () =>
      import("@/desktop/components/popups/FullScreenImagePopup"),
    SatelliteDeviceInfoPopup: () =>
      import("@/desktop/components/popups/SatelliteDeviceInfoPopup"),
    SatelliteChoosePlanPopup: () =>
      import("@/desktop/components/popups/SatelliteChoosePlanPopup"),
    SatellitePaymentDetails: () =>
      import("@/desktop/components/popups/SatellitePaymentDetails"),
    Notifier: () => import("@/shared/components/Notifier")
  },
  watch: {
    /**
     * Perform init action when socket connected
     */
    isConnected() {
      this.$store.dispatch("init");
    }
  },
  computed: {
    /* Socket connection status */
    isConnected() {
      return this.$store.state.isSocketConnected;
    },

    /* Is header displayed */
    isHeader() {
      return this.$route.meta.isHeader;
    },

    /* Is overlay visible */
    isAppOverlayed() {
      return this.$store.getters.isAnyPopupVisible;
    }
  },
  async beforeCreate() {
    await this.$lib.getAppConfig();

    /**
     * Opens socket connection and defines
     * list of callbacks, that used in store
     * to invoke actions
     */
    await this.$socket.open([
      "getGroupAll",
      "getGroupInfo",
      "getMessageById",
      "getContacts",
      "getOtherInfo",
      "getGroupMembersById",
      "getBefore",
      "postGroup",
      "deleteGroupById",
      "notification",
      "searchByName",
      "getPrivacy",

      /* Plans */
      "getPlansAll",
      "getPlansMine",

      /* Hardware */
      "createHardware",
      "hardwareAssociate",
      "hardwareDissasociate",
      "getHardwareByUserId"
    ]);

    /* Saves connection to store */
    this.$store.commit("SET_SOCKET_CONNECTION_STATE", true);
  }
};
</script>


<style lang="stylus" src="@/shared/styles/app.styl" />
