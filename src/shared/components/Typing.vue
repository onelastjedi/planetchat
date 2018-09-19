<template>
  <div :class="$style.wrapper">
    <div :class="$style.typing" />
    <div :class="$style.user"><slot />&nbsp;typing...</div>
  </div>
</template>

<style module lang="stylus">
  .wrapper
    padding 10px 0
    position relative
    display grid
    grid-template-columns 35px 1fr
    align-items center

  .typing
    width 23px
    height 24px
    background url('@/shared/assets/typing-sprite.png') left center
    background-size cover
    animation play 1s steps(14) infinite

  @keyframes play
    100%
      background-position -644px
</style>
