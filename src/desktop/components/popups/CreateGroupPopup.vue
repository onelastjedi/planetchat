<template>
  <div :class="$style.wrapper" v-if="isVisible">
    <div :class="$style.section">
      <div :class="$style.header">
        <!-- <div :class="$style.avatar">
          <i class="icon-user" />
          <i class="icon-camera" />
        </div> -->
        <span @click="close">&times;</span>
      </div>
      <form @submit.stop.prevent="handleCreateGroup({ name, description, broadcast })">
        <p>
          <input
            type="text"
            placeholder="Group Name"
            v-model.trim="name"
          />
          <span :class="$style.broadcast">Broadcast: <b>{{ isBroadcastEnabled(broadcast) }}</b></span>
          <span>
            <input type="checkbox" name="broadcast" v-model="broadcast" :class="$style.toggle" />
            <label for="broadcast" :class="$style.checkbox" />
          </span>
        </p>
        <input
          type="text"
          placeholder="Description"
          v-model.trim="description"
        />
        <!-- <div :class="$style.members">
          <h3>Members</h3>
          <div :class="$style.member">
            <img
              v-if="currentUser"
              :src="
              currentUser.pid
              ? photoUrl(currentUser.pid)
              : '/img/mocks/inbox_avatar_default.png'
            "/>
            <span>{{ currentUser.fn }}&nbsp;{{ currentUser.ln }}</span>
            <div><img src="@/assets/admin-badge.svg" /></div>
          </div>
          <div
            :class="$style.member"
            v-for="(contact, index) in selectedContacts"
            :key="`contacts-${index}`"
          >
            <img
              :src="
              contact.pid
              ? photoUrl(contact.pid)
              : '/img/mocks/inbox_avatar_default.png'
            "/>
            <span>{{ contact.fn }}&nbsp;{{ contact.ln }}</span>
            <i class="icon-more" @click="showOptions(contact.uid, contact.options)" />
            <div :class="$style.options" v-if="contact.options">
              <span @click="removeFromSelectedUsers(contact.uid, contact.options)">Remove from group</span>
            </div>
          </div>
          <div @click="addMembers" :class="$style.addMembers">
            <span><i class="icon-new_contact" /></span>
            Add Members
            <i class="icon-right-arrow" />
          </div>
        </div> -->
        <styled-button :disabled="!name" type="filled-blue">Create group</styled-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  name: "CreateGroup",
  data: () => ({
    name: "",
    description: "",
    broadcast: false
  }),
  watch: {
    isVisible(val) {
      if (!val) {
        this.clearInputs();
        // this.$store.commit("UNSET_CURRENT_USER_CONTACTS_SELECTION");
        // this.$store.commit("UNSET_CURRENT_USER_CONTACT_OPTIONS_VISIBILITY");
      }
    }
  },
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    selectedContacts() {
      if (this.$store.state.currentUser.contacts) {
        return this.$store.state.currentUser.contacts.filter(
          obj => obj.selected === true
        );
      }
    }
  },
  methods: {
    handleCreateGroup(params) {
      const { name, description, broadcast } = params;
      if (name.length) {
        this.$socket.emit("postGroup", { name, description, broadcast });
        this.close();
      }
    },
    clearInputs() {
      this.name = null;
      this.description = null;
      this.broadcast = false;
    },
    isBroadcastEnabled(state) {
      return state ? "On" : "Off";
    },
    addMembers() {
      this.$store.commit("SET_CREATE_GROUP_POPUP_VISIBILITY", false);
      this.$store.commit("SET_ADD_GROUP_MEMBERS_POPUP_VISIBILITY", true);
    },
    showOptions(uid, options) {
      this.$store.commit("SET_CURRENT_USER_CONTACT_OPTIONS_VISIBILITY", {
        options: options ? false : true,
        uid
      });
    },
    removeFromSelectedUsers(uid, selected) {
      this.$store.commit("SET_CURRENT_USER_CONTACT_SELECTION", {
        selected: selected ? false : true,
        uid
      });
      this.showOptions(uid, true);
    },
    close() {
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

    input[type="text"]
      display block
      background-color #ebf1f5
      width 100%
      padding 15px
      border-radius 15px

    ::-webkit-input-placeholder
      color #93a5ba

    ::-moz-placeholder
      color #93a5ba

    :-ms-input-placeholder
      color #93a5ba

    :-moz-placeholder
      color #93a5ba

    form
      position relative

      button
        margin-top 15px

      p
        display grid
        grid-template-columns 1fr 90px 30px
        grid-column-gap 10px
        align-items center
        margin-bottom 15px
        color #93a5ba

        span
          position relative

  .header
    position relative
    font-weight 700
    text-align center
    padding 25px 0

    span
      font-size 45px
      font-weight 300
      line-height 35px
      position absolute
      right -9px
      padding 0 10px
      top 0
      cursor pointer
      color #93a5ba

  .avatar
    position absolute
    top -50px
    left 0
    right 0
    margin auto
    width 80px
    height 80px
    background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
    overflow hidden
    border-radius 50%
    display grid
    align-items center

    &:after
      content ''
      background rgba(0, 0, 0, .7)
      height 40%
      width 100%
      position absolute
      bottom 0
      left 0

    i
      color #bae9ff
      font-size 43px

    i[class="icon-camera"]
      color rgba(255, 255, 255, .7)
      position absolute
      bottom 6px
      left 0
      right 0
      margin auto
      width 21px
      z-index 1
      font-size 20px

  .members
    position relative
    margin 15px 0

    h3
      padding 10px 0
      font-weight 700
      font-size 13px
      text-transform uppercase
      color #57b1d8
      border-bottom 1px solid rgba(147, 165, 186, .4)

    i[class="icon-more"]
      text-align center
      width 45px
      color #56b9d6
      background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
      -webkit-background-clip text
      -webkit-text-fill-color transparent
      cursor pointer

  .member
    position relative
    display grid
    padding 10px 0
    grid-template-columns 50px 1fr auto
    grid-column-gap 15px
    align-items center
    border-bottom 1px solid rgba(147, 165, 186, .4)

    img
      border-radius 40%
      width 50px
      height 50px
      overflow hidden

  .options
    position absolute
    z-index 1
    right 20px
    bottom -25px
    background-color white
    padding 0 15px
    box-shadow 0 2px 5px rgba(0, 0, 0, .1), 0 2px 5px rgba(0, 0, 0, .2)
    border-top-left-radius 15px
    border-top-right-radius 5px
    border-bottom-right-radius 15px
    border-bottom-left-radius 15px

    span
      display block
      padding 15px 0
      cursor pointer

  .addMembers
    cursor pointer
    position relative
    display grid
    padding 10px 0
    grid-template-columns 50px 1fr 25px
    grid-column-gap 15px
    align-items center

    i[class^="icon-right-arrow"]
      font-size 12px
      color #56b9d6
      background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
      -webkit-background-clip text
      -webkit-text-fill-color transparent

    span
      display block
      height 50px
      border-radius 40%
      display grid
      align-items center
      text-align center
      background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)

      i
        color white
        font-size 18px

  .toggle, .toggle:active
    position absolute
    z-index 2
    height 20px
    width 100%
    opacity 0
    border none
    outline none
    cursor pointer

  .checkbox
    display block
    position relative
    padding 8px
    width 100%
    border-radius 18px
    background #6E8095
    cursor pointer

  .checkbox:before
    content ''
    display block
    position absolute
    z-index 1
    line-height 34px
    text-indent 40px
    height 10px
    width 10px
    border-radius 40%
    top 3px
    left 3px
    right auto
    background white

  .toggle:checked + .checkbox:before
    left calc(100% - 13px)

  .toggle:checked + .checkbox
    background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
</style>
