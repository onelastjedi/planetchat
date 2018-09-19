<template>
  <main id="app"
    v-if="isConnected"
    :class="{ overlayed: isAppOverlayed }"
  >
    <AppHeader v-if="isHeader" />
    <!-- <notifier /> -->
    <!-- <full-screen-image-popup /> -->
    <add-new-contact-popup />
    <weather-popup />
    <!-- <create-group-popup /> -->
    <edit-group-popup />
    <!-- <add-group-members-popup /> -->
    <!-- <user-added-popup /> -->
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
    AppHeader: () => import("@/desktop/components/AppHeader"),
    AddNewContactPopup: () =>
      import("@/desktop/components/popups/AddNewContactPopup"),
    WeatherPopup: () => import("@/desktop/components/popups/WeatherPopup"),
    // CreateGroupPopup: () => import("@/components/popups/CreateGroupPopup"),
    EditGroupPopup: () => import("@/desktop/components/popups/EditGroupPopup")
    // AddGroupMembersPopup: () =>
    //   import("@/components/popups/AddGroupMembersPopup"),
    // UserAddedPopup: () => import("@/components/popups/UserAddedPopup"),
    // FullScreenImagePopup: () =>
    //   import("@/components/popups/FullScreenImagePopup"),
    // Notifier: () => import("@/components/common/Notifier")
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
  }
};
</script>


<style lang="stylus" src="@/shared/styles/app.styl" />
