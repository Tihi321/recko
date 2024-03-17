<script lang="ts">
  import { t } from "svelte-i18n";
  import InfoIcon from "../icons/InfoIcon.svelte";
  import CogIcon from "../icons/CogIcon.svelte";
  import ColoredButton from "../common/ColoredButton.svelte";
  import { useGame, useModals, useApi, useDailyRestrictions } from "../../hooks";
  import { EModals } from "../../constants";

  const { game, startGame, startDailyChallenge, endGame, resetGame } = useGame();
  const { api } = useApi();
  const { openModal } = useModals();
  const { dailyRestrictions, getIsDailyDisabled } = useDailyRestrictions();

  $: dailyChallengeDisabled = getIsDailyDisabled($dailyRestrictions);

  const openSettingsModal = () => {
    openModal(EModals.Settings);
  };

  const openInfoModal = () => {
    openModal(EModals.Info);
  };
</script>

<header class="header">
  <div class="container">
    <button class="icon-button" on:click={openSettingsModal}><CogIcon /></button>
    <ul class="menu">
      {#if !$game.started}
        <li class="menu-item">
          <button
            class="start-button"
            disabled={dailyChallengeDisabled}
            on:click={() => startDailyChallenge($api)}>{$t("game_menu.start_daily_game")}</button
          >
        </li>
        <li class="menu-item">
          <button class="start-button" on:click={() => startGame($api)}
            >{$t("game_menu.start_game")}</button
          >
        </li>
      {:else}
        {#if !$game.daily}
          <li class="menu-item">
            <ColoredButton
              type="warn"
              on:click={() => resetGame($api)}
              title={$t("game_menu.restart_game")}
            />
          </li>
        {/if}
        <li class="menu-item">
          <ColoredButton type="failure" on:click={endGame} title={$t("game_menu.end_game")} />
        </li>
      {/if}
    </ul>
    <button class="icon-button" on:click={openInfoModal}><InfoIcon /></button>
  </div>
</header>

<style lang="scss">
  @import "src/styles/all";
  .header {
    height: auto;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .icon-button {
    @extend %flex-centered;
    width: 40px;
    height: 40px;
    transition: transform 0.2s ease;

    &:hover {
      transform: rotate(180deg);
    }
  }
  .menu {
    display: flex;
    align-items: center;
    margin: 0;
  }

  .start-button {
    @extend %round-button;
    color: $button-color;
    border: 2px solid $button-color;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .menu-item:nth-child(odd) {
    margin-right: 10px;
  }
</style>
