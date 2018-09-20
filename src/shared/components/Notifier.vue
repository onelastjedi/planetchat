<template>
  <transition name="fade"
    v-on:enter="afterEnter"
  >
    <div
      v-if="isSocketConnected && isNotifier"
      :class="$style.wrapper">
      Connecting...
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isSocketConnected() {
      return this.$store.state.isSocketConnected;
    },
    isNotifier() {
      return this.$route.meta.isNotifier;
    }
  },
  methods: {
    afterEnter: el => {
      setTimeout(() => {
        el.classList.add("fade-enter");
      }, 1000);
    }
  }
};
</script>


<style module lang="stylus">
  .wrapper
    z-index 99
    top 80px
    font-size 14px
    position absolute
    color white
    left 0
    right 0
    margin auto
    text-align center
    line-height 30px
    background-color #60cff1
</style>
