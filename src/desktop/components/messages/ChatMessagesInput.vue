<template>
  <div>
    <form :class="$style.messageInput" @submit.stop.prevent="handleSubmit(message)">
      <input
        type="text"
        placeholder="Type here..."
        v-model.trim="message"
        @input="startTyping"
        @keyup="stopTyping"
      />
      <span v-if="isTyping" @click="handleSubmit(message)"><i class="icon-send-message" /></span>
      <label v-else><input type="file" accept="image/*" @change="handleFileChange" ref="inputFile" /><i class="icon-camera" /></label>
    </form>
  </div>
</template>

<script>
/**
 * @file Performs Message sending
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
import {
  currentUserUID,
  currentUserSession,
  getLocalRotatedPhotoAsBase64String
} from "@/shared/utils/auth";
import { base64, datetime } from "@/shared/utils/messages-common";
import HTTP from "@/shared/utils/http-common";

export default {
  props: {
    /**
     * Group to send message
     */
    currentGroupId: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    /**
     * Trimmed string input
     */
    message: "",
    timeout: null,
    isTyping: false
  }),
  methods: {
    /**
     * Performs send message (with optimistic updates)
     * @param {string} message Message from input
     */
    handleSubmit(message) {
      if (message && message.length) {
        this.performOptimisticUpdates({ message });
        this.postMessage({ message });

        /* Clears input */
        this.message = "";

        /* Sends stopTyping */
        this.isTyping = false;

        this.$socket.emit("stopTyping", {
          group_id: this.currentGroupId
        });
      }
    },
    startTyping(event) {
      if (!this.isTyping && event.key !== "Enter") {
        this.isTyping = true;
        this.$socket.emit("typing", {
          group_id: this.currentGroupId
        });
      }
    },
    stopTyping() {
      clearTimeout(this.timeout);

      if (this.isTyping) {
        this.timeout = setTimeout(() => {
          this.isTyping = false;
          this.$socket.emit("stopTyping", {
            group_id: this.currentGroupId
          });
        }, 5000);
      }
    },
    async postMessage({ message, photo_id }) {
      /**
       * Creates sent_datetime as seconds since epoch in UTC
       */
      const sent_datetime = datetime();

      /**
       * Creates a base64 encoded ASCII string
       */
      const message_text = base64.encode(message);

      /**
       * Get current group ID
       */
      const to_group_id = this.currentGroupId;

      /**
       * Emits 'postMessage' with given parameters
       * @param {number} to_group_id Group to send message
       * @param {string} tx Message as base64 encoded string
       * @param {number} sd Sent datetime as seconds since epoch in UTC
       */
      this.$socket.emit("postMessage", {
        to_group_id,
        message_text,
        sent_datetime,
        photo_id
      });
    },
    async performOptimisticUpdates({ message, photo }) {
      /**
       * Creates sent_datetime as seconds since epoch in UTC
       */
      const sent_datetime = datetime();

      /**
       * Creates a base64 encoded ASCII string
       */
      const message_text = base64.encode(message);

      /**
       * Get current group ID
       */
      const to_group_id = this.currentGroupId;

      /**
       * Get rotated photo
       */
      const base64photo = photo
        ? await getLocalRotatedPhotoAsBase64String(photo)
        : undefined;

      /* Performs optimistic updates for messages */
      this.$store.commit("UPDATE_CURRENT_GROUP_MESSAGES", {
        uid: currentUserUID(),
        tx: message_text,
        sd: sent_datetime.toString(),
        gid: to_group_id,
        pid: base64photo
      });
    },
    async handleFileChange(e) {
      // this.$store.commit("SET_LOADING_STATE", true);

      const inputFile = this.$refs.inputFile;
      const file = e.target.files[0];

      this.performOptimisticUpdates({ message: "picture", photo: file });

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const config = {
          headers: { "content-type": "multipart/form-data" }
        };

        const { data } = await HTTP.post(
          `/photo?session=${currentUserSession()}&group_id=${
            this.currentGroupId
          }`,
          formData,
          config
        );
        if (data.status === "success") {
          this.postMessage({ message: "picture", photo_id: data.photo_id });

          inputFile.value = "";
        } else console.log(data);
      }
    }
  }
};
</script>

<style module lang="stylus">
  .messageInput
    padding-right 10px
    background white
    position relative
    display grid
    grid-template-columns 1fr 50px

    &:before
      content ""
      position absolute
      left 0
      right 0
      margin auto
      overflow hidden
      top 0
      height 1px
      width 97%
      border-top 1px solid rgba(147, 165, 186, 0.4)

    input[type="text"]
      padding 15px 0 15px 20px

    input[type="file"]
      width 0.1px
      height 0.1px
      opacity 0
      overflow hidden
      position absolute
      z-index -1

    span, label
      position relative
      display block
      line-height 50px
      cursor pointer
      text-align center
      z-index 0
      color white

      &:before
        content ''
        position absolute
        width 70%
        height 70%
        left 0
        right 0
        top 2px
        bottom 0
        margin auto
        border-radius 15px
        background linear-gradient(0deg, #5997dc 0%, #56b9d6 100%)
        z-index -1

      i
        vertical-align middle
</style>
