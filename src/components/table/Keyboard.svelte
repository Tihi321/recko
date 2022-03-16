<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import isEqual from "lodash/isEqual";
  import { useSettings } from "../../hooks";
  import Letter from "./Letter.svelte";
  import { ENGLISH_LETTERS, CROATIAN_LETTERS, ELanguages } from "../../constants";
  const { settings } = useSettings();

  $: letters = isEqual($settings.language, ELanguages.English) ? ENGLISH_LETTERS : CROATIAN_LETTERS;

  const dispatch = createEventDispatcher();
  const onClick = (letter: string) => {
    dispatch("click", letter);
  };
</script>

<div class="table">
  {#each letters as tableRow}
    <div class="row">
      {#each tableRow as letter}
        <div class="letter" on:click={() => onClick(letter)}>
          <Letter {letter} neutral={true} />
        </div>
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
    margin: 4px;
    cursor: pointer;
  }
</style>
