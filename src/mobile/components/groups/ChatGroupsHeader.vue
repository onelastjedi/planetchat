<template>
  <div :class="$style.header">
    <div @click="newContact">
      <i class="icon-new-contact" />
    </div>
    <h3>Chats and Groups</h3>
    <div @click="newConversation">
      <i class="icon-new-conversation" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    newContact() {
      /* eslint-disable-next-line */
      console.log('New contact')
    },
    newConversation() {
      /* eslint-disable-next-line */
      console.log('New conversation')
    }
  }
};
</script>

<style module lang="stylus">
  .header
    height 70px
    text-align center
    display grid
    grid-template-columns 70px 1fr 65px
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
      align-self center
      color #2a2d31
      font-weight 700
      font-size 20px

      @media (max-height: 568px)
        font-size 18px

    i
      margin 0 auto
      color #5997dc
      font-size 24px
      line-height 70px

      @media (max-height: 568px)
        font-size 18px
        line-height 50px
</style>
