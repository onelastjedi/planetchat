<template>
  <div :class="$style.header" v-if="group">
    <h3>{{ group.name }}&nbsp;&nbsp;<span v-if="lastActiveTime">(Active {{ lastActiveTime }})</span></h3>
    <div
      @click="showDetails"
      :class="$style.avatar"
    >
      <img :src="
        group.group_photo_id
        ? group.group_photo_id
        : '/img/mocks/inbox_avatar_default.png'
      "/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupId: {
      type: Number,
      default: null
    }
  },
  computed: {
    group() {
      return this.$store.getters.getGroupById(this.groupId);
    },
    lastActiveTime() {
      return this.$store.getters.getLastMessageTimeByGroupId(this.groupId);
    }
  },
  methods: {
    showDetails() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [{ EditGroup: true }]);
    }
  }
};
</script>

<style module lang="stylus">
  .header
    position relative
    background white
    padding 0 20px
    height 60px
    border-top-left-radius 15px
    border-top-right-radius 15px
    display grid
    grid-template-columns 1fr auto
    align-items center

    @media (max-width: 960px)
      border-radius 0

    &:after
      content ""
      position absolute
      left 0
      right 0
      margin auto
      overflow hidden
      bottom 0
      height 1px
      width 97%
      border-bottom 1px solid rgba(147, 165, 186, 0.4)

    h3
      color #2a2d31
      font-weight 700

      span
        font-weight 300
        color #93a5ba

  .avatar
    position relative
    width 40px
    height 40px
    cursor pointer

    img
      border-radius 45%
      overflow hidden
      width inherit
      height inherit

</style>
