<template>
  <div :class="$style.header">
    <div @click="goBack"><i class="icon-left-arrow" /></div>
    <h3>{{ groupName }}</h3>
    <i class="icon-more" @click="showMore" />
  </div>
</template>

<script>
export default {
  props: {
    groupName: {
      type: String,
      default: "Miriam Herrera"
    },
    lastActiveTime: {
      type: String,
      default: "Active 5 min ago"
    }
  },
  computed: {
    typingUsers() {
      return this.$store.getters.getCurrentGroupTypingUsers;
    }
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    showMore() {
      /* eslint-disable-next-line */
      console.log('Show more')
    }
  }
};
</script>

<style module lang="stylus">
  .header
    height 70px
    display grid
    text-align center
    grid-template-columns 60px 1fr 60px
    grid-column-gap 15px
    position fixed
    top 0
    width 100%
    z-index 1
    background-color #f5f7fa
    box-shadow 0 1px 10px rgba(0,0,0,.1)

    @media (max-height: 568px)
      height 50px

    div
      display grid
      align-items center

    h3
      text-align center
      align-self center
      color #2a2d31
      font-weight 700
      font-size 20px

      @media (max-height: 568px)
        font-size 18px

      span
        font-weight 300
        color #93a5ba

    i
      color #5997dc
      cursor pointer
      font-size 24px
      line-height 70px

      @media (max-height: 568px)
        font-size 18px
        line-height 50px
</style>
