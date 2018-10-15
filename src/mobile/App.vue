<template>
  <main id="app"
    :style="{height: elHeight + 'px'}"
    class="app_mobile"
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
    Notifier: () => import("@/shared/components/Notifier")
  },
  data: () => ({
    /* Template root el height */
    elHeight: null
  }),
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
      "getPrivacy"
    ]);

    /* Saves connection to store */
    this.$store.commit("SET_SOCKET_CONNECTION_STATE", true);
  },
  mounted() {
    this.elHeight = window.innerHeight;
  }
};
</script>


<style lang="stylus" src="@/shared/styles/app.styl" />
