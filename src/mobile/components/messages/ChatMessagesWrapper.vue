<template>
  <div :class="$style.wrapper" v-if="currentGroup">
    <chat-messages-header :group-name="currentGroup.name" />
    <div
      :class="$style.chatMessagesWrapper"
      ref="chatMessagesWrapper"
      :style="{height: wrapperHeight + 'px'}"
    >
      <chat-messages-item
        v-if="messages && members.length"
        v-for="(message, index) in messages"
        :key="`messages-${index}`"
        :from="isFrom(message.uid)"
        :text="decode(message.tx)"
        :pid="getMessagePid(message.uid)"
        :mid="message.mid"
        :uid="message.uid"
        :gid="group.gid"
        :dr="message.dr"
        :pic="message.pid"
        :sm="message.sm"
        :lk="message.lk"
      />
    </div>
    <chat-messages-input :current-group-id="currentGroup.group_id" />
  </div>
</template>

<script>
export default {
  components: {
    ChatMessagesHeader: () =>
      import("@/mobile/components/messages/ChatMessagesHeader"),
    ChatMessagesItem: () => import("@/shared/components/ChatMessagesItem"),
    ChatMessagesInput: () =>
      import("@/mobile/components/messages/ChatMessagesInput")
  },

  props: {
    group: {
      type: Object,
      default: null
    }
  },

  computed: {
    groupId() {
      return +this.$route.params.id;
    },
    messages() {
      const messages = this.currentGroup.messages;
      if (messages) return messages.slice().reverse();
    },

    members() {
      return this.$store.getters.getMembersByGroupId(this.group.gid);
    },

    currentGroup() {
      return this.$store.getters.getGroupById(this.groupId);
    },

    wrapperHeight() {
      return window.innerHeight > 568
        ? window.innerHeight - 140
        : window.innerHeight - 100;
    }
  },
  methods: {
    isFrom(uid) {
      return uid !== this.$lib.currentUserUID();
    },
    decode(message) {
      return this.$lib.base64.decode(message);
    },
    scrollToBottom() {
      const chatMessagesWrapper = this.$refs.chatMessagesWrapper;
      if (chatMessagesWrapper)
        chatMessagesWrapper.scrollTop = chatMessagesWrapper.scrollHeight;
    },
    getMessagePid(uid) {
      if (this.currentGroup.members) {
        const member = this.currentGroup.members.find(obj => obj.uid === uid);
        if (member) return member.pid;
      }
    }
  },
  mounted() {
    this.scrollToBottom();
    this.$socket.emit("getBefore", {
      count: 20,
      group_id: this.groupId,
      message_id: 4294967295
    });
    this.$socket.emit("getGroupMembersById", {
      group_id: this.groupId
    });
  },
  updated() {
    this.scrollToBottom();
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative
    background-color white

    .chatMessagesWrapper
      width 100%
      padding 20px
      background white
      overflow auto
      -webkit-overflow-scrolling touch
</style>
