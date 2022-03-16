<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import get from "lodash/get";
  import { useGame, useWordle, useApi } from "../../hooks";
  import { EEvents } from "../../constants";
  import type { TWordleData } from "../../types";
  import Table from "../table/Table.svelte";
  import Keyboard from "../table/Keyboard.svelte";

  const { game, addLetter } = useGame();
  const { api } = useApi();
  const { generateWordleData, getWordType } = useWordle();

  $: wordsData = generateWordleData($game) as TWordleData;
  $: wordType = getWordType($game) as string;

  let showNotWord = false;
  let notWord = "word";

  const onClick = (event) => {
    const letter: string = get(event, ["detail"]);
    addLetter($game, $api, letter);
  };

  const notWordCallback = (event) => {
    notWord = get(event, ["detail"]);
    showNotWord = true;

    setTimeout(() => {
      showNotWord = false;
    }, 1000);
  };

  onMount(() => {
    document.addEventListener(EEvents.NotRealWord, notWordCallback);
  });

  onDestroy(() => {
    document.removeEventListener(EEvents.NotRealWord, notWordCallback);
  });
</script>

<div class="container">
  <Table data={wordsData.table} />
  <div class="type">
    {wordType}
    <div class="not-real-word" class:show={showNotWord}>{notWord}</div>
  </div>
  <Keyboard on:click={onClick} />
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .type {
    margin: 20px 0;
  }

  .not-real-word {
    opacity: 0;
    transition: opacity 0.3s ease;

    &.show {
      opacity: 1;
    }
  }
</style>
