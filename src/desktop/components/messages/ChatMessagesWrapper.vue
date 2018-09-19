<template>
  <div :class="$style.wrapper" v-if="group">
    <chat-messages-header
      :name="group.name"
      :groupId="group.gid"
      :avatar="group.group_photo_id"
    />
    <div
      :class="$style.chatMessagesWrapper"
      ref="chatMessagesWrapper"
    >
      <loader />
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
      <template v-if="typingUsers.length">
        <typing
          v-for="(user, index) in typingUsers"
          :key="`typing-${index}`"
        >
          {{ user.un }}
        </typing>
      </template>
    </div>
    <chat-messages-input :current-group-id="group.gid" />
  </div>
</template>

<script>
export default {
  components: {
    ChatMessagesHeader: () =>
      import("@/desktop/components/messages/ChatMessagesHeader"),
    ChatMessagesItem: () =>
      import("@/desktop/components/messages/ChatMessagesItem"),
    ChatMessagesInput: () =>
      import("@/desktop/components/messages/ChatMessagesInput"),
    Loader: () => import("@/shared/components/Loader"),
    Typing: () => import("@/shared/components/Typing")
  },
  props: {
    group: {
      type: Object,
      default: null
    }
  },
  computed: {
    messages() {
      return this.$store.getters.getMessagesByGroupId(this.group.gid);
    },

    members() {
      return this.$store.getters.getMembersByGroupId(this.group.gid);
    },

    typingUsers() {
      return this.$store.getters.getTypingUsers(this.group.gid);
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
      const { chatMessagesWrapper } = this.$refs;
      if (chatMessagesWrapper)
        chatMessagesWrapper.scrollTop = chatMessagesWrapper.scrollHeight;
    },
    getMessagePid(uid) {
      if (this.group.members.length) {
        const member = this.group.members.find(obj => obj.uid === uid);
        if (member) return member.pid;
      }
    }
  },
  updated() {
    this.scrollToBottom();
  },
  mounted() {
    this.scrollToBottom();
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative
    display grid
    grid-template-rows 60px auto 50px
    height calc(100vh - 100px)

    @media (max-width: 960px)
      border-left 1px solid rgba(235,241,245,0.6);
      height calc(100vh - 80px)

    .chatMessagesWrapper
      padding 20px
      background white
      overflow auto
</style>
