<template>
  <div :class="$style.chatItem" @click="selectGroup(groupId)">
    <div :class="$style.avatar" v-if="group">
       <img :src="
          group.group_photo_id
          ? group.group_photo_id
          : '/img/mocks/inbox_avatar_default.png'
       "/>
      <span v-show="unreadMessagesCount">{{ unreadMessagesCount }}</span>
    </div>
    <div :class="$style.message" v-if="group">
      <div :class="$style.messageHeader">
        <h3>{{ group.name }}</h3>
        <div :class="$style.time">
          {{ lastMessageTime }}
        </div>
      </div>
      <p
        v-if="lastMessage"
        :class="{[$style.unread]: unreadMessages}">
        {{ decode(lastMessage.tx) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupId: {
      type: Number,
      default: null
    },
    avatar: {
      type: String,
      default: null
    },
    header: {
      type: String,
      default: null
    },
    lastMessageId: {
      type: Number,
      default: null
    },
    unreadMessages: {
      type: Boolean,
      default: false
    },
    unreadMessagesCount: {
      type: Number,
      default: null
    }
  },
  computed: {
    group() {
      return this.$store.getters.getGroupById(this.groupId);
    },
    lastMessage() {
      return this.$store.getters.getLastMessageByGroupId(this.groupId);
    },
    lastMessageTime() {
      return this.$store.getters.getLastMessageTimeByGroupId(this.groupId);
    }
  },
  watch: {
    group() {
      if (this.lastMessageId) {
        this.$socket.emit("getMessageById", {
          message_id: this.lastMessageId
        });
      }
    }
  },
  methods: {
    decode(tx) {
      return this.$lib.base64.decode(tx);
    },
    selectGroup(groupId) {
      this.$router.push(`/groups/${groupId}`);
    }
  }
};
</script>

<style module lang="stylus">
  .chatItem
    cursor pointer
    position relative
    background transparent
    padding 10px 20px 10px 10px
    color #2a2d31
    line-height 1.3
    display grid
    grid-template-columns 70px 1fr
    align-items center
    overflow hidden

    &:after
      content ""
      position absolute
      left 0
      right 0
      margin auto
      overflow hidden
      bottom 0
      height 1px
      width 95%
      border-bottom 1px solid rgba(235, 241, 245, 0.6)

    .avatar
      position relative

      img
        border-radius 45%
        overflow hidden

      span
        position absolute
        bottom 1px
        right 7px
        display block
        background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
        width 20px
        height 20px
        font-size 8px
        text-align center
        line-height 18px
        color white
        border-radius 15px
        border 1px solid white

    .messageHeader
      display grid
      grid-template-columns 1fr auto

    h3
      font-weight 700
      font-size 19px

    p
      font-size 16px
      line-height 1.5em
      height 2.7em

    img
      width 60px

    .time
      font-weight 300
      color #588fc1
      font-size 14px

    .unread
      font-weight 700

// https://codepen.io/romanrudenko/pen/ymHFh
</style>
