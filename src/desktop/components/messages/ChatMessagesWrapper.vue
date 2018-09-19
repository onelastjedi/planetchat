<template>
  <div :class="$style.wrapper">
    <chat-messages-header :groupId="group.gid" />
    <div
      :class="$style.chatMessagesWrapper"
      ref="chatMessagesWrapper"
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
import { currentUserUID } from "@/shared/utils/auth";
import { base64 } from "@/shared/utils/messages-common";

export default {
  components: {
    ChatMessagesHeader: () =>
      import("@/desktop/components/messages/ChatMessagesHeader"),
    ChatMessagesItem: () =>
      import("@/desktop/components/messages/ChatMessagesItem"),
    ChatMessagesInput: () =>
      import("@/desktop/components/messages/ChatMessagesInput"),
    Typing: () => import("@/shared/components/Typing")
  },
  props: {
    group: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    groupId() {
      this.scrollToBottom();
      this.emitGetBefore();
    }
  },
  computed: {
    groupId() {
      return +this.$route.params.id;
    },
    messages() {
      return this.$store.getters.getMessagesByGroupId(this.groupId);
    },
    members() {
      return this.$store.getters.getMembersByGroupId(this.groupId);
    },
    typingUsers() {
      return this.$store.getters.getTypingUsers(this.groupId);
    }
  },
  methods: {
    isFrom(uid) {
      return uid !== currentUserUID();
    },
    decode(message) {
      return base64.decode(message);
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
    },
    emitGetBefore() {
      if (this.group.mmx) {
        this.$socket.emit("getBefore", {
          count: 20,
          group_id: this.group.gid,
          message_id: 4294967295
        });
      }
    }
  },
  mounted() {
    this.scrollToBottom();
    this.emitGetBefore();
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
