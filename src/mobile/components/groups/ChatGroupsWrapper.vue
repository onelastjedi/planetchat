<template>
  <div :class="$style.wrapper">
    <chat-groups-header />
    <div :class="$style.content">
      <chat-groups-item
        v-for="(group, index) in groups"
        :key="`contacts-${index}`"
        :last-message-id="group.mmx"
        :unread-messages-count="group.new"
        :group-id="group.gid"
      />
    </div>
    <mobile-nav />
  </div>
</template>

<script>
export default {
  components: {
    ChatGroupsHeader: () =>
      import("@/mobile/components/groups/ChatGroupsHeader"),
    ChatGroupsItem: () => import("@/mobile/components/groups/ChatGroupsItem"),
    MobileNav: () => import("@/mobile/components/common/MobileNav")
  },
  computed: {
    groups() {
      const groups = this.$store.state.groups;
      return this.$_.orderBy(groups, ["messages.0.sd"], ["desc"]);
    }
  }
};
</script>

<style module lang="stylus">
  .wrapper
    position relative

  .content
    margin 90px 15px 74px
    border-radius 15px
    background-color white
    overflow auto

    @media (max-height: 568px)
      margin 70px 15px 60px
</style>
