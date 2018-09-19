<template>
  <div :class="$style.add" v-if="isVisible">
    <div :class="$style.header">
      New Contact
      <span @click="close">&times;</span>
    </div>
    <div :class="$style.search">
      <i class="icon-search" />
      <input type="text"
        placeholder="Search here..."
        v-model.trim="contactName"
        @input="handleSearchContactByName(contactName)"
      />
    </div>
    <div
      v-if="searchedUsers"
      :class="$style.list"
    >
      <div
        v-for="(user, index) in searchedUsers"
        :key="`users-${index}`"
        :class="$style.listItem"
      >
        <img :src="
          user.pid
          ? photoUrl(user.pid)
          : '/img/mocks/inbox_avatar_default.png'
        "/>
        <div :class="$style.listInfo">
          <h3>{{ user.fn }}&nbsp;{{ user.ln }}</h3>
          <p><i class="icon-user" /><span>{{ user.un }}</span></p>
        </div>
        <div :class="$style.listButtons">
          <button
            :class="$style.addContact"
            @click="addContact(user.uid)"
          >
            Add contact<i class="icon-new_contact" />
          </button>
          <button
            :class="$style.addAndChat"
            @click="addAndChat(user)"
          >
            Add and chat<i class="icon-chat" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewContact",
  data: () => ({
    contactName: ""
  }),
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    },
    searchedUsers() {
      return this.$store.state.searchedUsers;
    }
  },
  methods: {
    photoUrl(pid) {
      return `${
        process.env.VUE_APP_API_BASE_URL
      }/photo/${pid}?session=${this.lib.currentUserSession()}&version=360thumb`;
    },
    handleSearchContactByName(name) {
      if (name.length) this.$socket.emit("searchByName", { name });
      else this.$store.commit("CLEAR_USERS_RETURNED_BY_SEARCH");
    },
    addContact(uid) {
      const contacts = [uid];
      this.$socket.emit("postContacts", { contacts });
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        { AddNewContact: false },
        { UserAdded: true }
      ]);
    },
    deleteContact({ uid }) {
      this.$socket.emit("deleteContact", { user_id: uid });
    },
    addAndChat({ fn, ln, uid }) {
      this.addContact(uid);
      const group = {
        name: `${fn} ${ln}`,
        chat: 1
      };
      this.$socket.emit("postGroup", group);
      this.close();
    },
    close() {
      this.contactName = "";
      this.$store.commit("CLEAR_USERS_RETURNED_BY_SEARCH");
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        Object.defineProperty({}, this.$options.name, {
          value: false,
          writable: false
        })
      ]);
    }
  }
};
</script>

<style module lang="stylus">
  .add
    position fixed
    width 50%
    max-width 600px
    min-width 460px
    height 50%
    z-index 99
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    border-radius 15px
    background-color white
    padding 10px 15px
    box-shadow 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)

    @media (max-width: 739px)
      width 100%
      height 100%
      max-width 100%
      border-radius 0

      .header
        font-size 20px
        padding-bottom 20px

        span
          font-size 60px
          line-height 40px

  .header
    position relative
    font-weight 700
    text-align center
    padding 15px 0

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

  .search
    background-color #ebf1f5
    border-radius 15px
    padding 15px
    display grid
    grid-template-columns 30px auto


    i
      font-size 18px
      padding-left 1px
      color #56b9d6

    input
      background transparent

  .list
    position relative
    padding-top 10px

    p
      margin-bottom 2px
      font-size 13px

    h3
      font-size 18px
      margin-bottom 4px

    i
      color #56b9d6
      margin-right 5px

    img
      width 100%
      border-radius 45%
      overflow hidden

    .listItem
      display grid
      align-items center
      grid-template-columns 50px 1fr auto
      grid-column-gap 10px
      border-bottom 1px solid rgba(235, 241, 245, .6)
      padding 10px 0

  .listButtons
    display grid
    grid-template-columns auto auto
    grid-gap 5px

    .addContact
      background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
      border none
      color white

      i
        color white

    button
      border none
      border 2px solid #578FC0
      background white
      display block
      border-radius 15px
      width 100%
      height 35px
      color #578FC0
      text-transform uppercase
      font-weight bold
      font-size 10px
      width 110px

      i
        background-image none
        -webkit-text-fill-color unset
        color #578FC0
        margin 0 0 0 5px
        font-size 11px
</style>
