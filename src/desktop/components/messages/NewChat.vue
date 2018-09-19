<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <i class="icon-search" />
      <h3>Type Recipient's Name Here...</h3>
      <div>
        <span>or</span>
        <styled-button @click="showCreateGroupPopup" type="filled-blue-sm">Create group chat</styled-button>
      </div>
    </div>
    <div :class="$style.content">
      <div
        :class="$style.message"
        v-for="(message, index) in messages"
        :key="`message-${index}`"
      ><span></span><p></p></div>
    </div>
    <div :class="$style.footer">
      Type here...
    </div>
  </div>
</template>

<script>
/**
 * @file Holds new chat empty wrapper
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    StyledButton: () => import("@/shared/components/StyledButton")
  },
  data: () => ({
    /* Provides array of caps to render */
    messages: [
      { key: 0 },
      { key: 1 },
      { key: 2 },
      { key: 3 },
      { key: 4 },
      { key: 5 },
      { key: 6 },
      { key: 7 },
      { key: 8 },
      { key: 9 }
    ]
  }),
  methods: {
    /* Toggle CreateGroupPopup visibility */
    showCreateGroupPopup() {
      this.$store.commit("SET_POPUPS_VISIBILITY", [{ CreateGroup: true }]);
    }
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

  .header
    position relative
    background white
    padding 0 15px 0 20px
    align-items center
    height 60px
    border-top-left-radius 15px
    border-top-right-radius 15px
    display grid
    grid-template-columns 35px 1fr auto

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
      color #93a5ba
      font-weight 300

    i
      color #d4dbe3

    span
      color #93a5ba
      font-weight 700
      text-transform uppercase
      font-size 13px

    div
      display grid
      grid-template-columns auto 1fr
      align-items center
      grid-column-gap 10px

  .content
    padding 0 20px
    background white
    overflow auto

  .message
    position relative
    margin-bottom 30px
    margin-top 10px
    display grid
    grid-template-columns 1fr auto
    grid-column-gap 15px
    align-items end

  .message:nth-child(odd)
    span
      background #E3F1FE
      width 40px
      height 40px
      order 2
      overflow hidden
      border-radius 50%

    p
      order 1
      position relative
      background #E3F1FE
      color white
      border-radius 20px
      padding 30px 20px
      border-bottom-right-radius 0
      display inline-block

  .message:nth-child(even)
    grid-template-columns auto 1fr

    span
      background #F3F7FA
      width 40px
      height 40px
      order 1
      overflow hidden
      border-radius 50%

    p
      order 2
      position relative
      background #F3F7FA
      color white
      border-radius 20px
      padding 30px 20px
      border-bottom-left-radius 0
      display inline-block

  .footer
    padding 10px 20px
    align-items center
    background white
    position relative
    display grid
    color #93a5ba
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
</style>
