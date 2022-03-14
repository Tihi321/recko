<script lang="ts">
  export let letter: string;
  export let show: boolean = false;
  export let success: boolean = false;
  export let secondary: boolean = false;
  export let neutral: boolean = false;
</script>

<div class="letter" class:success class:secondary class:neutral>
  {show ? letter : ""}
</div>

<style lang="scss">
  @import "src/styles/all";

  .letter {
    @extend %square-size;
    font-size: $medium-font-size;
    background-color: $letter-bg-color;
    color: $letter-text-color;
    text-transform: uppercase;
    cursor: default;
    border: 1px solid $letter-border-color;
  }

  .secondary {
    background-color: $letter-bg-secondary-color;
  }

  .success {
    background-color: $letter-bg-success-color;
  }

  .neutral {
    border: none;
    color: $letter-neutral-color;
    background-color: $letter-neutral-bg-color;
  }
</style>
