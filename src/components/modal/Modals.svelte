<script lang="ts">
  import isEmpty from "lodash/isEmpty";
  import includes from "lodash/includes";
  import get from "lodash/get";
  import { useModals } from "../../hooks";
  import { EModals } from "../../constants";
  import SettingsModal from "./modals/SettingsModal.svelte";
  import InfoModal from "./modals/InfoModal.svelte";

  const { modals } = useModals();

  let activeModals: string[] = [];
  let transparent: boolean = false;

  modals.subscribe((state) => {
    activeModals = get(state, ["active"]);
  });

  $: anyModalActive = !isEmpty(activeModals);
  $: activeSettingsModal = includes(activeModals, EModals.Settings);
  $: activeInfoModal = includes(activeModals, EModals.Info);
</script>

<div class="modals" class:active={anyModalActive} class:transparent>
  {#if activeSettingsModal}
    <SettingsModal />
  {/if}
  {#if activeInfoModal}
    <InfoModal />
  {/if}
</div>

<style lang="scss">
  @import "src/styles/all";
  .modals {
    @extend %absolute-centered;
    background-color: $backdrop-bg-color;
    display: block;
    width: 100%;
    z-index: 2;
    pointer-events: none;
    transition: 0.25s opacity ease;
    opacity: 0;

    &.active {
      opacity: 1;
      pointer-events: all;
    }

    &.transparent {
      opacity: 0;
    }
  }
</style>
