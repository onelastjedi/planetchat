<template>
  <chat-groups-wrapper />
</template>

<script>
export default {
  components: {
    /**
     * Resolves components asynchronously
     * @see {@link https://vuejs.org/v2/guide/components-dynamic-async.html|Async Components}
     */
    ChatGroupsWrapper: () =>
      import("@/mobile/components/groups/ChatGroupsWrapper")
  }
};
</script>
