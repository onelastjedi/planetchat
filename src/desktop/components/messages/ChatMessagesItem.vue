<template>
  <div :class="$style.wrapper">
    <div v-if="sm" :class="$style.system">{{ this.$lib.parseSystemMessage(text) }}</div>
    <div v-else :class="[$style.message, {[$style.from]: from}]">
      <img
        :class="$style.avatar"
        :src="
            pid
            ? pid
            : '/img/mocks/inbox_avatar_default.png'
        "/>
      <div
        :class="$style.image"
        v-if="pic"
        @click="toggleFullScreen(pic)"
      >
        <img
          :class="$style.pic"
          :src="pic"
        />
      </div>
      <div v-else :class="$style.text">
        <a v-if="lk" target="_blank" :href="getLink(lk)">
          <p v-html="format(text)" />
          <i v-if="isDelivered(dr)" class="icon-sent-checkmark" />
          <i v-if="isRead(dr)" class="icon-seen-checkmark" />
          <i class="icon-chat-link" />
        </a>
        <div v-else>
          <p v-html="format(text)" />
          <i v-if="isDelivered(dr)" class="icon-sent-checkmark" />
          <i v-if="isRead(dr)" class="icon-seen-checkmark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: null
    },
    from: {
      type: Boolean,
      default: false
    },
    pid: {
      type: String,
      default: null
    },
    mid: {
      type: Number,
      default: null
    },
    uid: {
      type: Number,
      default: null
    },
    gid: {
      type: Number,
      default: null
    },
    dr: {
      type: Number,
      default: null
    },
    pic: {
      type: String,
      default: null
    },
    sm: {
      type: Number,
      default: 0
    },
    lk: [String, Object]
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    group() {
      return this.$store.getters.getGroupById(this.gid);
    },
    member() {
      return this.group.members.find(obj => obj.uid === this.uid);
    }
  },
  methods: {
    /**
     * Represents delivery status
     * @param {number} dr
     * @returns {number}
     */
    isDelivered(dr) {
      return dr === 1 && this.uid === this.$lib.currentUserUID();
    },

    /**
     * Represents delivery status
     * @param {number} dr
     * @returns {number}
     */
    isRead(dr) {
      return dr === 2 && this.uid === this.$lib.currentUserUID();
    },

    /**
     * Replace new lines with <br>
     * @param {string} text Unformatted text
     * @returns {string} Formatted text
     */
    format(text) {
      return text.replace(/\n/g, "<br />");
    },

    getLink(lk) {
      if (typeof lk === "object") return lk.link;
      else return lk;
    },

    toggleFullScreen(pic) {
      this.$store.commit("SET_POPUPS_VISIBILITY", [{ FullScreenImage: pic }]);
    }
  },
  updated() {
    if (this.uid !== this.$lib.currentUserUID() && this.dr !== 2) {
      this.$socket.emit("postMarkRead", { mid: [this.mid] });
      this.$store.commit("DECREMENT_NEW_COUNT", this.group);
    }
  },
  mounted() {
    if (this.uid !== this.$lib.currentUserUID() && this.dr !== 2) {
      this.$socket.emit("postMarkRead", { mid: [this.mid] });
      this.$store.commit("DECREMENT_NEW_COUNT", this.group);
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
    text-align center

  .system
    font-size 13px
    background #9f59dc
    color white
    margin 5px auto
    border-radius 20px
    padding 10px 15px
    display inline-block

  .message
    position relative
    margin-bottom 10px
    margin-top 10px
    text-align right
    display grid
    grid-template-columns 1fr auto
    grid-column-gap 15px
    align-items end

    i[class^="icon-chat-link"]
      top 12px
      right 12px
      font-size 12px
      color #56b9d6

    i
      color white
      font-size 6px
      position absolute
      right 5px
      bottom 5px

    .avatar
      width 40px
      order 2
      overflow hidden
      border-radius 50%

    .text, .image
      order 1
      position relative

    p
      position relative
      background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
      color white
      padding 15px 20px
      line-height 1.3
      border-bottom-right-radius 0
      border-bottom-left-radius 20px
      border-top-left-radius 20px
      border-top-right-radius 20px
      display inline-block
      text-align left

  .from
    position relative
    grid-template-columns auto 1fr
    text-align left

    .avatar
      order 1

    .text, .image
      order 2

    p
      background #ebf1f5
      color #2a2d31
      border-radius 20px
      border-bottom-left-radius 0
      display inline-block

  .pic
    width 100%
    border-radius 20px!important
    order 1!important

  .image
    cursor pointer

    img
      width 50%
      min-width 100px

</style>
