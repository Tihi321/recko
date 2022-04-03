<script lang="ts">
  import { t } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import get from "lodash/get";
  import { useGame, useWordle, useApi, useDailyRestrictions } from "../../hooks";
  import { EEvents } from "../../constants";
  import type { TWordleData } from "../../types";
  import Table from "../table/Table.svelte";
  import Keyboard from "../table/Keyboard.svelte";
  import Victory from "../common/Victory.svelte";

  const { game, addLetter, gameFinishedSuccesfully, gameFinished } = useGame();
  const { dailyRestrictions, setSuccess } = useDailyRestrictions();
  const { api } = useApi();
  const { generateWordleData, getWordType } = useWordle();

  $: wordsData = generateWordleData($game) as TWordleData;
  $: wordType = getWordType($game) as string;
  $: showGameSuccess = gameFinishedSuccesfully($game) as boolean;
  $: ganmeFinished = gameFinished($game, $dailyRestrictions) as boolean;

  $: hideKeyboard = showGameSuccess || ganmeFinished;
  $: dailySuccess = showGameSuccess && $game.daily;

  $: {
    if (dailySuccess) {
      setSuccess();
    }
  }

  let showNotWord = false;
  let notWord = "";

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
  <div>
    <Table data={wordsData.table} />
    <div class="type-container">
      <div class="type">
        {wordType}
      </div>
      <div class="not-word" class:show={showNotWord}>
        {`${notWord} - ${$t("game.not_a_word")}`}
      </div>
    </div>
    {#if dailySuccess}
      <Victory />
    {/if}
  </div>
  {#if !hideKeyboard}
    <Keyboard on:click={onClick} />
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .type-container {
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .type,
  .not-word {
    @extend %round-button;
    color: $colored-button-color;
  }

  .type {
    background-color: $success-button-bg-color;
    margin-bottom: 10px;
  }

  .not-word {
    background-color: $failure-button-bg-color;
    opacity: 0;
    transition: opacity 0.3s ease;

    &.show {
      opacity: 1;
    }
  }
</style>
