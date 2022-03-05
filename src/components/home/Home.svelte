<script lang="ts">
  import { t } from "svelte-i18n";
  import InfoIcon from "../icons/InfoIcon.svelte";
  import CogIcon from "../icons/CogIcon.svelte";
</script>

<div class="centered">
  <div class="logo">{$t("title")}</div>
  <div class="welcome">
    <div class="welcome-message">{$t("home.message")}</div>
    <ul class="welcome-icons">
      <li class="welcome-icons-item">
        <div class="icon"><CogIcon /></div>
        - {$t("home.labels.settings")}
      </li>
      <li class="welcome-icons-item">
        <div class="icon"><InfoIcon /></div>
        - {$t("home.labels.rules")}
      </li>
    </ul>
  </div>
</div>

<style lang="scss">
  @import "src/styles/all";

  .centered {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logo {
    @extend %flex-centered;
    padding: 50px;
    font-size: $huge-font-size;
    font-weight: bold;
    border: 5px solid $font-color;
  }

  .welcome {
    margin-top: 50px;
    font-weight: bold;
    max-width: 400px;
    min-width: 300px;
  }

  .welcome-message {
    text-align: center;
  }

  .welcome-icons {
    display: flex;
    justify-content: space-between;
  }

  .welcome-icons-item {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }

  .icon {
    width: 40px;
    margin-right: 20px;
  }
</style>
