<template>
  <div v-show="isActive" :class="$style.loader">
    <div :class="$style.wrapper">
      <div :class="$style.item" />
      <div :class="$style.item" />
      <div :class="$style.item" />
      <div :class="$style.item" />
    </div>
  </div>
</template>

<script>
/**
 * @file Displays loading animation
 * @since 0.1.0
 * @author Anton Komarenko <mi3ta@sent.as>
 */
export default {
  computed: {
    /* Returns loading state */
    isActive() {
      return this.$store.state.isDataLoading;
    }
  }
};
</script>


<style module lang="stylus">
.loader {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  background: rgba(255, 255, 255, .23);
  z-index: 9999;
}
.loader .wrapper {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 64px;
  height: 64px;
  margin: auto;
  text-align: center;
  background: transparent;
}
.loader .item {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #56a9d9;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.loader .item:nth-child(1) {
  left: 6px;
  animation: loader1 0.6s infinite;
}
.loader .item:nth-child(2) {
  left: 6px;
  animation: loader2 0.6s infinite;
}
.loader .item:nth-child(3) {
  left: 26px;
  animation: loader2 0.6s infinite;
}
.loader .item:nth-child(4) {
  left: 45px;
  animation: loader3 0.6s infinite;
}
@keyframes loader1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes loader3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes loader2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>
