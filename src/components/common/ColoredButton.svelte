<script lang="ts">
  export let title: string;
  export let type: string;
</script>

<button
  class="button"
  class:success={type === "success"}
  class:failure={type === "failure"}
  class:warn={type === "warn"}
  on:click>{title}</button
>

<style lang="scss">
  @import "src/styles/all";
  .button {
    @extend %round-button;
    color: $colored-button-color;
    width: 100%;

    &.warn {
      background-color: $warn-button-bg-color;
    }

    &.success {
      background-color: $success-button-bg-color;
    }

    &.failure {
      background-color: $failure-button-bg-color;
    }
  }
</style>
