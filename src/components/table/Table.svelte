<script lang="ts">
  import type { TTableLetters } from "../../types";
  import Letter from "./Letter.svelte";
  export let data: TTableLetters;
</script>

<div class="table">
  {#each data as tableRow}
    <div class="row">
      {#each tableRow as { letter, success, exist }}
        <div class="letter"><Letter {letter} {success} secondary={exist} /></div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  @import "src/styles/all";

  .table {
    padding: 10px;
  }

  .row {
    display: flex;
  }

  .letter {
    padding: 4px;
  }
</style>
