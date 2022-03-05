<script lang="ts">
  import { t } from "svelte-i18n";
  import { createEventDispatcher } from "svelte";
  import Backdrop from "./Backdrop.svelte";
  export let title: string;
  export let closeTitle: string = $t("modal.labels.close");

  let transparent = false;

  const dispatch = createEventDispatcher();

  function onClose() {
    transparent = !transparent;
    dispatch("close");
  }
</script>

<Backdrop on:click={onClose}>
  <div class="window" class:transparent>
    <h2 class="title window-item">{title}</h2>
    <slot />
    <button class="close-button window-item" on:click={onClose}>{closeTitle}</button>
  </div>
</Backdrop>

<style lang="scss">
  @import "src/styles/all";
  .window {
    background-color: $modal-window-bg-color;
    min-width: 400px;
    min-height: 400px;
    max-width: 600px;
    border-radius: 5px;
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    filter: $shadow-color-filter;

    &.transparent {
      pointer-events: none;
    }
  }
  .window-item {
    color: $modal-window-items-color;
    font-weight: normal;
    text-align: center;
  }

  .title {
    background: $modal-window-header-bg-color;
    margin: 0;
    border-radius: 5px 5px 0 0;
    padding: 10px 0;
    font-size: 18px;
    border-bottom: 1px solid $modal-window-border-color;
    cursor: default;
  }

  .close-button {
    margin: 0;
    background: $modal-window-button-bg-color;
    border-top: 1px solid $modal-window-border-color;
    padding: 20px 0;
    width: 100%;
    border-radius: 0 0 5px 5px;
  }
</style>
