<template>
  <div
    v-if="isVisible"
    :class="$style.wrapper"
  >
    <span @click="close">&times;</span>
    <img
      :src="imageSrc"
      ref="image"
    />
  </div>
</template>

<script>
export default {
  name: "FullScreenImage",
  computed: {
    isVisible() {
      return this.$store.state.popups[this.$options.name];
    },
    imageSrc() {
      return this.$store.state.popups[this.$options.name];
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
    },
    setSize(image) {
      if (image.width > image.height) image.width = this.$el.clientWidth;
      else image.height = this.$el.clientHeight;
    }
  },
  updated() {
    const { image } = this.$refs;
    if (image && image.src) this.setSize(image);
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position absolute
    top 0
    bottom 0
    margin auto
    display grid
    align-items center
    text-align center
    width 100%
    height 100%
    z-index 99
    background black

    span
      font-size 60px
      color white
      display block
      position absolute
      top 10px
      right 20px
      width 40px
      height 40px
      text-align center
      line-height 26px
      border-radius 50%
      overflow hidden
      background-color rgba(255, 255, 255, .3)
      cursor pointer

    img
      margin 0 auto
</style>
