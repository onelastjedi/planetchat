<template>
  <main id="app"
    v-if="isConnected"
    :class="{ overlayed: isAppOverlayed }"
  >
    <!-- <notifier />
    <full-screen-image-popup />
    <add-new-contact-popup />
    <weather-popup />
    <create-group-popup />
    <edit-group-popup />
    <add-group-members-popup />
    <user-added-popup /> -->
    <router-view />
    <AppFooter v-if="isFooter" />
  </main>
</template>

<script>
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    AppFooter: () => import("@/shared/components/AppFooter"),
    // AddNewContactPopup: () => import("@/components/popups/AddNewContactPopup"),
    // WeatherPopup: () => import("@/components/popups/WeatherPopup"),
    // CreateGroupPopup: () => import("@/components/popups/CreateGroupPopup"),
    // EditGroupPopup: () => import("@/components/popups/EditGroupPopup"),
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

    /* Is footer displayed */
    isFooter() {
      return this.$route.meta.isFooter;
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
}
</script>


<style lang="stylus" src="@/shared/styles/app.styl" />
