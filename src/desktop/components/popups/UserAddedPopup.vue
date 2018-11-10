<template>
  <div :class="$style.wrapper" v-if="isVisible">
    <div :class="$style.avatar" v-if="lastContact">
      <img :src="
        lastContact.pid
        ? lastContact.pid
        : '/img/mocks/inbox_avatar_default.png'
      "/>
    </div>
    <div :class="$style.content" v-if="lastContact">
      User <span>{{ lastContact.un }}</span><br> is added to contacts list
    </div>
    <styled-button @click="close" type="filled-blue">Ok</styled-button>
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
  name: "UserAdded",
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    },
    lastContact() {
      return this.$store.getters.getLastAddedContact;
    }
  },
  methods: {
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
    width 360px
    height 160px
    z-index 99
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    background white
    padding 30px 15px 25px
    border-radius 15px

  .avatar
    position absolute
    width 76px
    height 76px
    top -38px
    left 0
    right 0
    margin auto

    img
      border-radius 45%
      overflow hidden
      height inherit
      width inherit

  .content
    position relative
    text-align center
    line-height 1.3
    font-size 18px
    margin 15px 0

    span
      color #588fc1
      font-weight bold
</style>
