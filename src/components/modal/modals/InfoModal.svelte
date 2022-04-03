<script lang="ts">
  import { t } from "svelte-i18n";
  import { useModals } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";
  import Letter from "../../table/Letter.svelte";

  const { closeModal } = useModals();

  function closeSettingsModal() {
    closeModal(EModals.Info);
  }
</script>

<ModalWindow title={$t("modal.info.title")} on:close={closeSettingsModal}>
  <div class="container">
    {$t("modal.info.description.intro")}
    <hr />
    <div class="title">{$t("modal.info.description.examples")}</div>
    <div class="example">
      <div class="letters">
        <Letter letter="W" success />
        <Letter letter="o" />
        <Letter letter="r" />
        <Letter letter="d" />
      </div>
      <div class="example-description">{$t("modal.info.description.letter_correct")}</div>
    </div>
    <div class="example">
      <div class="letters">
        <Letter letter="W" />
        <Letter letter="o" secondary />
        <Letter letter="r" />
        <Letter letter="d" />
      </div>
      <div class="example-description">{$t("modal.info.description.letter_incorrect_place")}</div>
    </div>
    <div class="example">
      <div class="letters">
        <Letter letter="W" />
        <Letter letter="o" />
        <Letter letter="r" neutral />
        <Letter letter="d" />
      </div>
      <div class="example-description">{$t("modal.info.description.wrong_letter")}</div>
    </div>
    <hr />
    {$t("modal.info.description.daily")}
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding: 20px 50px;
  }

  hr {
    opacity: 0.5;
    margin: 10px 0;
  }

  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }

  .example {
    margin: 20px 0;
  }

  .letters {
    display: flex;
  }
  .example-description {
    margin: 10px 0;
  }
</style>
