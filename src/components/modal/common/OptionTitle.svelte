<script lang="ts">
  export let title: string;
</script>

<h3 class="title">{title}</h3>

<style lang="scss">
  @import "src/styles/all";
  .title {
    font-size: $small-font-size;
    margin: 0 0 5px 0;
    font-weight: normal;
    font-weight: bold;
    cursor: default;
  }
</style>
