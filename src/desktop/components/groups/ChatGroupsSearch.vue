<template>
  <div :class="$style.search">
    <div :class="$style.searchInput">
      <i class="icon-search" />
      <input
        type="text"
        placeholder="Search groups"
        v-model.trim="searchString"
        @keyup="handleSearchString(searchString)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    searchString: ""
  }),
  methods: {
    handleSearchString(string) {
      this.$emit("search", string);
    }
  }
};
</script>

<style module lang="stylus">
  .search
    background white
    padding 0 10px 10px
    color #93a5ba

    .searchInput
      padding 15px 15px
      background #ebf1f5
      border-radius 15px
      display grid
      grid-template-columns 30px auto

    input
      background transparent
      color #93a5ba
      width 100%

    i
      color #d4dbe3
      font-size 18px
      padding-left 1px

    ::-webkit-input-placeholder
      color #93a5ba

    ::-moz-placeholder
      color #93a5ba

    :-ms-input-placeholder
      color #93a5ba

    :-moz-placeholder
      color #93a5ba
</style>
