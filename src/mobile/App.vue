<template>
  <main id="app"
    class="app_mobile"
    v-if="isConnected"
  >
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
  }
};
</script>


<style lang="stylus" src="@/shared/styles/app.styl" />
