<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">App Info</div>
    <div :class="$style.content">
      <p><img src="@/shared/assets/full-logo.png" />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel aliquam nibh, et pretium libero. Nam et dolor eros. In tristique justo sit amet sapien convallis interdum. Mauris luctus ex eget malesuada interdum. Sed vulputate, orci ut feugiat rhoncus, ipsum est rhoncus tortor, in volutpat massa ante nec dui. Fusce nunc leo, scelerisque quis venenatis ut, maximus vel tortor. Donec efficitur nisl nulla. Nullam aliquet mollis est et egestas. Proin tincidunt lacus nulla, quis sollicitudin felis luctus non. In egestas sit amet orci eget rhoncus. Sed rutrum finibus hendrerit. Maecenas egestas ex massa, dignissim varius nunc gravida ac. Mauris consectetur eleifend sem, vel posuere arcu. Nullam sodales justo vel nisl auctor iaculis a sit amet mauris. Vivamus suscipit enim quam, sed volutpat augue vehicula sit amet. Donec sagittis est ut ultrices pharetra.</p>
      <p>Praesent eu feugiat neque, ac vehicula velit. Duis ut nulla imperdiet est sagittis vehicula. Integer lacinia convallis fermentum. Vestibulum elit felis, blandit vel ipsum vel, porta molestie est. Integer sollicitudin, nisi eu interdum aliquam, justo libero egestas lectus, at imperdiet metus mauris quis dolor. In tempus sagittis vehicula. Mauris viverra turpis sit amet sem porttitor tincidunt. Maecenas vel elit lorem. Quisque quis turpis luctus, tincidunt nisi in, luctus est. Nam mattis vitae justo a placerat. Nam ornare accumsan est, ac vehicula lorem accumsan non. Ut vitae ultrices metus.</p>
    </div>
  </div>
</template>

<script>
export default {};
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
    border-bottom-left-radius 15px
    border-bottom-right-radius 15px

    img
      float left
      padding 0 10px 10px

    p
      text-indent 15px
      margin-bottom 10px

</style>
