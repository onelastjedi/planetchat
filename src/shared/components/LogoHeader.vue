<template>
  <div :class="$style.header">
    <img src="@/shared/assets/logo.svg" />
    <h1>Planet<span>Chat</span></h1>
    <h2><slot /></h2>
  </div>
</template>

<style module lang="stylus">
  .header
    padding-top 60px
    padding-bottom 30px
    text-align center
    color white

    h1
      font-size 32px
      font-weight bold

      span
        color #8AC9E4

    h2
      margin-top 5px
      font-size 19px
</style>
