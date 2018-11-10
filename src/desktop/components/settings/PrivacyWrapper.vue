<template>
  <div
    v-if="currentUser"
    :class="$style.wrapper"
  >
    <div :class="$style.header">Share My Profile Picture to:</div>
    <div :class="$style.content">
      <label>
        <input
          @click="changePictureRadio"
          type="radio" value="all" name="picture"
          :checked="photoPrivacy === 'all'"
        />
        <span>Everybody</span>
      </label>
      <label>
        <input
          @click="changePictureRadio"
          type="radio" value="contacts" name="picture"
          :checked="photoPrivacy === 'contacts'"
        />
        <span>Just My Contacts</span>
      </label>
      <label>
        <input
          @click="changePictureRadio"
          type="radio" value="none" name="picture"
          :checked="photoPrivacy === 'none'"
        />
        <span>Nobody</span>
      </label>
    </div>
    <div :class="$style.header">Share My Status to:</div>
    <div :class="$style.content">
      <label>
        <input
          @click="changeStatusRadio"
          type="radio" value="all" name="status"
          :checked="statusPrivacy === 'all'"
        />
        <span>Everybody</span>
      </label>
      <label>
        <input
          @click="changeStatusRadio"
          type="radio" value="contacts" name="status"
          :checked="statusPrivacy === 'contacts'"
        />
        <span>Just My Contacts</span>
      </label>
      <label>
        <input
          @click="changeStatusRadio"
          type="radio" value="none" name="status"
          :checked="statusPrivacy === 'none'"
        />
        <span>Nobody</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    photoPrivacy() {
      if (this.currentUser.privacy)
        return this.currentUser.privacy.photo_visibility;
    },
    statusPrivacy() {
      if (this.currentUser.privacy)
        return this.currentUser.privacy.status_visibility;
    }
  },
  methods: {
    changePictureRadio(e) {
      this.$socket.emit("postPrivacy", {
        photo_visibility: e.target.value
      });
    },
    changeStatusRadio(e) {
      this.$socket.emit("postPrivacy", {
        status_visibility: e.target.value
      });
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative

    @media (max-width: 960px)
      border-left 1px solid rgba(235,241,245,0.6);

  .header
    background white
    border-top-left-radius 15px
    border-top-right-radius 15px
    position relative
    padding 17px 20px
    height 50px
    color #2a2d31
    font-weight 700
    border-bottom 1px solid rgba(147, 165, 186, 0.4)

    @media (max-width: 960px)
      border-radius 0

  .content
    background white
    position relative
    color #2a2d31
    padding 20px 15px
    border-bottom-left-radius 15px
    border-bottom-right-radius 15px
    margin-bottom 10px

    @media (max-width: 960px)
      border-radius 0

    label
      margin-right 15px
      cursor pointer

      span
        display inline-block
        padding-bottom 10px

    input[type="radio"]
      display none

    input[type="radio"]:checked ~ span
      border-bottom 3px solid #588fc1

    img
      float left
      padding 0 10px 10px

    p
      text-indent 15px
      margin-bottom 10px

</style>
