<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import isEqual from "lodash/isEqual";
  import { useSettings } from "../../hooks";
  import Letter from "./Letter.svelte";
  import { ENGLISH_LETTERS, CROATIAN_LETTERS, SHARED_LETTERS, ELanguages } from "../../constants";
  const { settings } = useSettings();

  const dispatch = createEventDispatcher();
  const onClick = (letter: string) => {
    dispatch("click", letter);
  };
</script>

<div class="table">
  {#each SHARED_LETTERS as letter}
    <div class="letter" on:click={() => onClick(letter)}>
      <Letter {letter} neutral={true} />
    </div>
  {/each}
  {#if isEqual($settings.language, ELanguages.Croatian)}
    {#each CROATIAN_LETTERS as letter}
      <div class="letter" on:click={() => onClick(letter)}>
        <Letter {letter} neutral={true} />
      </div>
    {/each}
  {:else}
    {#each ENGLISH_LETTERS as letter}
      <div class="letter" on:click={() => onClick(letter)}>
        <Letter {letter} neutral={true} />
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";

  .table {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    max-width: 450px;
  }

  .letter {
    margin: 4px;
    cursor: pointer;
  }
</style>
