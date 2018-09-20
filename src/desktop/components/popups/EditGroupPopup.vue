<template>
  <div :class="$style.wrapper" v-if="isVisible">
    <div :class="$style.section">
      <div :class="$style.header">
        <div :class="[$style.avatar, {[$style.isntAdmin]: !isAdmin}]">
          <input
            type="file"
            accept="image/*"
            @change="handleFileChange"
            ref="inputFile"
            v-if="isAdmin"
          />
          <img
            v-if="group.group_photo_id"
            :src="group.group_photo_id"
          />
          <i v-else class="icon-user" />
          <i v-if="isAdmin" class="icon-camera" />
        </div>
        <span @click="close('clear')">&times;</span>
      </div>
      <form :class="$style.form">
        <fieldset :disabled="!isAdmin">
          <p>
            <input
              type="text"
              placeholder="Group Name"
              v-model="group.name"
              @change="editGroup({ group_id: group.gid, name: group.name })"
            />
            <span :class="$style.broadcast">Broadcast: {{ isBroadcastEnabled(group.broadcast) }}<b></b></span>
            <span>
              <input type="checkbox" name="broadcast" :class="$style.toggle" :checked="group.broadcast" />
              <label for="broadcast" :class="$style.checkbox" />
            </span>
          </p>
          <input
            type="text"
            placeholder="Description"
            v-model="group.description"
            @change="editGroup({ group_id: group.gid, description: group.description })"
          />
        </fieldset>
      </form>
      <div :class="$style.members">
        <h3>Members</h3>
        <div
          :class="$style.member"
          v-for="(member, index) in group.members"
          :key="`member-${index}`"
        >
          <img
            :src="
              member.pid
              ? member.pid
              : '/img/mocks/inbox_avatar_default.png'
          "/>
          {{ member.fn }}&nbsp;{{ member.ln }}
          <div v-if="member.isAdmin"><img src="@/shared/assets/admin-badge.svg" /></div>
          <i v-if="isAdmin && !member.isAdmin" class="icon-more" @click="showOptions(member)" />
          <div :class="$style.options" v-if="member.options">
            <span @click="setAsAdmin(member)">Set as admin</span>
            <span @click="removeFromGroup(member)">Remove from the group</span>
          </div>
        </div>
        <div v-if="!isChat && isAdmin" :class="$style.addMembers" @click="addMembers">
          <span><i class="icon-new-contact" /></span>
          Add Members
          <i class="icon-right-arrow" />
        </div>
      </div>
      <div :class="[$style.buttons, {[$style.isntAdmin]: !isAdmin}]">
        <styled-button type="filled-white-red">Leave group</styled-button>
        <styled-button v-if="isAdmin" type="gradient-red" @click="deleteGroup">Delete group</styled-button>
      </div>
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
  name: "EditGroup",
  computed: {
    isAdmin() {
      return this.$store.getters.isAdminOfGroup(this.group);
    },
    groupId() {
      return +this.$route.params.id;
    },
    group() {
      return this.$store.getters.getGroupById(this.groupId);
    },
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    },
    isChat() {
      return this.group.chat === 1;
    }
  },
  methods: {
    /**
     * Performs file uploading
     * @param {object} e Event object
     */
    async handleFileChange(e) {
      /* Get input by ref attribute */
      const inputFile = this.$refs.inputFile;

      /* Get file from input */
      const file = e.target.files[0];

      if (file) {
        /* Construct FormData object */
        const formData = new FormData();
        formData.append("file", file);

        /* Setup headers for request */
        const config = {
          headers: { "content-type": "multipart/form-data" }
        };

        /* Sends request with parameters */
        const { data } = await this.$lib.HTTP.post(
          `/photo?session=${this.$lib.currentUserSession()}&use=profile&group_id=${
            this.groupId
          }`,
          formData,
          config
        );

        /* Update UI after succesful file uploading */
        if (data.status === "success") {
          inputFile.value = "";

          await this.$lib.delay(2000);

          const image = await this.$lib.getRotatedPhotoAsBase64String(
            data.photo_id
          );

          this.$store.commit("SET_GROUP_PHOTO", {
            pid: image,
            gid: this.groupId
          });
        } else console.log(data);
      }
    },
    editGroup(options) {
      this.$socket.emit("putGroupById", options);
    },
    async deleteGroup() {
      this.close();
      this.$socket.emit("deleteGroupById", { group_id: this.groupId });
    },
    isBroadcastEnabled(state) {
      return state ? "On" : "Off";
    },
    addMembers() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [
        { EditGroup: false },
        { AddGroupMembers: true }
      ]);
      this.clearOptions(this.group.members);
    },
    showOptions(member) {
      this.$store.commit("UPDATE_MEMBER", {
        gid: this.groupId,
        user: {
          ...member,
          options: member.options ? false : true
        }
      });
    },
    removeFromGroup(member) {
      this.$socket.emit("deleteMemberFromGroup", {
        group_id: this.groupId,
        member_user_id: member.uid
      });
      this.showOptions(member);
    },
    setAsAdmin(member) {
      console.log(member);
    },
    clearOptions(members) {
      members.forEach(member => {
        this.$store.commit("UPDATE_MEMBER", {
          gid: this.groupId,
          user: {
            ...member,
            options: false
          }
        });
      });
    },
    close(clear) {
      if (clear) this.clearOptions(this.group.members);
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
    background linear-gradient(0deg, #5998dc 0%, #56b9d6 100%)
    overflow hidden
    cursor pointer
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

    &:hover
      i[class="icon-camera"]
        color white

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

    input[type="file"]
      width 100%
      height 100%
      opacity 0
      overflow hidden
      position absolute
      cursor pointer
      z-index 2
      top 0
      bottom 0
      left 0
      right 0
      margin auto

    img
      width 100%
      height 100%

  .avatar.isntAdmin
    &:after
      display none

  .form
    position relative

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

    p
      display grid
      grid-template-columns 1fr 90px 30px
      grid-column-gap 10px
      align-items center
      margin-bottom 15px
      color #93a5ba

      span
        position relative

    fieldset
      border none

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
    background #6e8095
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
    background-color white

  .toggle:checked + .checkbox:before
    left calc(100% - 13px)

  .toggle:checked + .checkbox
    background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)

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

  .buttons
    display grid
    grid-template-columns 1fr 1fr
    grid-column-gap 10px

  .buttons.isntAdmin
    grid-template-columns 1fr

  .options
    position absolute
    z-index 1
    right 20px
    bottom -75px
    background-color white
    padding 0 15px
    box-shadow 0 2px 5px rgba(0, 0, 0, .1), 0 2px 5px rgba(0, 0, 0, .2)
    border-top-left-radius 15px
    border-top-right-radius 5px
    border-bottom-right-radius 15px
    border-bottom-left-radius 15px

    span
      display block
      padding 15px 10px
      cursor pointer

      &:last-child
        border-top 1px solid rgba(147, 165, 186, 0.4)
</style>
