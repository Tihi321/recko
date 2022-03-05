<div class="backdrop" on:click|self>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";
  .backdrop {
    @extend %flex-centered;
    width: 100%;
    height: 100%;
  }
</style>
