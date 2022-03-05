<script lang="ts">
  import { t } from "svelte-i18n";
  import { useModals } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";

  const { closeModal } = useModals();

  function closeSettingsModal() {
    closeModal(EModals.Info);
  }
</script>

<ModalWindow title={$t("modal.info.title")} on:close={closeSettingsModal}>
  <div class="container">Info</div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding: 20px 50px;
  }
</style>
