<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">User Details</div>
    <div :class="$style.content">
      <div :class="$style.userpic">
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          ref="inputFile"
        />
        <img :src="
          currentUser.pid ?
          currentUser.pid :
          '/img/mocks/inbox_avatar_default.png'
        "/>
        <i class="icon-camera" />
      </div>
        <form
          v-if="currentUser"
          @submit.stop.prevent="handleStatusSubmit(status)"
        >
          <label>
            <span>Update your status:</span>
            <input
              type="text"
              :value="decode(currentUser.sta)"
              @input="updateStatus"
            />
          </label>
          <button>Update</button>
        </form>
    </div>
  </div>
</template>

<script>
/**
 * @file Holds user's details screen
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  data: () => ({
    status: null
  }),
  computed: {
    /**
     * Returns user's object from store
     */
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    /**
     * Emits socket action to post status
     * @param {string} status String from input
     */
    handleStatusSubmit(status) {
      if (status)
        this.$socket.emit("postStatus", {
          user_status: this.$lib.base64.encode(status)
        });
    },
    /* Update status prop */
    updateStatus(e) {
      this.status = e.target.value;
    },
    /* Decode status */
    decode(message) {
      if (message) return this.$lib.base64.decode(message);
    },
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
          `/photo?session=${this.$lib.currentUserSession()}&use=profile`,
          formData,
          config
        );

        /* Update UI after successful file uploading */
        if (data.status === "success") {
          inputFile.value = "";
          await this.$lib.delay(1000);
          const image = await this.$lib.getRotatedPhotoAsBase64String(
            data.photo_id
          );
          this.$store.commit("SET_CURRENT_USER_PIC", image);
        } else console.log(data);
      }
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative
    background white
    border-radius 15px

    @media (max-width: 960px)
      border-left 1px solid rgba(235,241,245,0.6);
      border-radius 0

  .header
    position relative
    padding 17px 20px
    height 50px
    color #2a2d31
    font-weight 700
    border-bottom 1px solid rgba(147, 165, 186, 0.4)

  .content
    position relative
    color #2a2d31
    padding 20px 15px
    overflow auto
    border-bottom-left-radius 15px
    border-bottom-right-radius 15px
    display grid
    grid-template-columns 65px 1fr
    grid-gap 10px
    align-items center

    form
      display grid
      grid-template-columns 1fr auto
      grid-gap 10px

    label
      color #93a5ba

      span
        padding-left 7px

    input
      margin-top 7px
      background-color #ebf1f5
      display block
      width 100%
      padding 10px 20px
      border-radius 15px

    button
      border none
      background none
      color #588fc1
      text-transform uppercase
      font-weight 700
      margin-top 20px

    .userpic
      position relative
      cursor pointer
      border-radius 50%
      width 65px
      height 65px
      overflow hidden

      &:hover
        i
          color white

      &:after
        content ''
        background rgba(0, 0, 0, .7)
        height 40%
        width 100%
        position absolute
        bottom 0
        left 0

      input[type="file"]
        width 100%
        height 100%
        opacity 0
        overflow hidden
        position absolute
        cursor pointer
        z-index 2
        margin-top 0

      i
        color rgba(255, 255, 255, .7)
        position absolute
        bottom 5px
        left 0
        right 0
        margin auto
        width 19px
        z-index 1

      img
        width 100%
</style>
