<template>
  <div :class="$style.empty">
    <p>Select a group to start messaging</p>
  </div>
</template>

<style module lang="stylus">
  .empty
    border-top-left-radius 15px
    border-top-right-radius 15px
    text-align center
    display grid
    position relative
    background white
    align-items center

    @media (max-width: 960px)
      border-radius 0
      border-left 1px solid rgba(235,241,245,0.6);
      height calc(100vh - 80px)
</style>
