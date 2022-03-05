<script lang="ts">
  import { t } from "svelte-i18n";
  import { Options } from "ts-components-library";
  import map from "lodash/map";
  import { useModals } from "../../../hooks";
  import { EModals } from "../../../constants";
  import ModalWindow from "../common/ModalWindow.svelte";
  import { useGame, useSettings } from "../../../hooks";
  import { ELanguages, EThemes } from "../../../constants";
  import OptionTitle from "../common/OptionTitle.svelte";

  const { game } = useGame();
  const { settings, setLanguage } = useSettings();

  const getTranslation = (value) => {
    switch (value) {
      case ELanguages.Croatian:
        return $t("modal.settings.sub_labels.languages.croatian");
      case ELanguages.English:
        return $t("modal.settings.sub_labels.languages.english");
      case EThemes.Light:
        return $t("modal.settings.sub_labels.theme.light");
      case EThemes.Dark:
        return $t("modal.settings.sub_labels.theme.dark");

      default:
        break;
    }
  };

  $: selectedLanguage = {
    id: $settings.language,
    value: getTranslation($settings.language),
  };

  $: selectedTheme = {
    id: $settings.theme,
    value: getTranslation($settings.theme),
  };
  const languageItems = map(Object.values(ELanguages), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const themeItems = map(Object.values(EThemes), (key) => ({
    id: key,
    value: getTranslation(key),
  }));

  const onThemeChange = (event) => {
    $settings.theme = event.detail.id;
  };

  const onLanguageChange = (event) => {
    setLanguage(event.detail.id);
  };

  const { closeModal } = useModals();

  function closeSettingsModal() {
    closeModal(EModals.Settings);
  }
</script>

<ModalWindow title={$t("modal.settings.title")} on:close={closeSettingsModal}>
  <div class="container">
    {#if !$game.started}
      <div class="option-group">
        <OptionTitle title={$t("modal.settings.labels.language")} />
        <Options selected={selectedLanguage} items={languageItems} on:change={onLanguageChange} />
      </div>
    {/if}
    <div class="option-group">
      <OptionTitle title={$t("modal.settings.labels.theme")} />
      <Options selected={selectedTheme} items={themeItems} on:change={onThemeChange} />
    </div>
  </div>
</ModalWindow>

<style lang="scss">
  @import "src/styles/all";
  .container {
    padding: 20px 50px;
  }
</style>
