<template>
  <div :class="$style.header">
    <h3>Chats and Groups</h3>
    <i class="icon-new-contact" @click="newContact" />
    <i class="icon-new-conversation" @click="newConversation" />
  </div>
</template>

<script>
export default {
  methods: {
    newContact() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [{ AddNewContact: true }]);
    },
    newConversation() {
      this.$router.push("/create");
    }
  }
};
</script>

<style module lang="stylus">
  .header
    background white
    padding 17px 20px
    height 50px
    border-top-left-radius 15px
    border-top-right-radius 15px
    display grid
    grid-template-columns 1fr auto auto
    grid-column-gap 15px

    @media (max-width: 960px)
      border-radius 0

    h3
      color #2a2d31
      font-weight 700

    i
      color #56b9d6
      cursor pointer
</style>
