<script lang="ts">
  import { t } from "svelte-i18n";
  import { copyToClipboard } from "../../utils";
  import { useApi, useDailyRestrictions } from "../../hooks";
  import StarIcon from "../icons/StarIcon.svelte";
  import ShareIcon from "../icons/ShareIcon.svelte";

  const { api } = useApi();
  const { dailyRestrictions } = useDailyRestrictions();

  const shareStats = () => {
    const message = `${$t("victory.title")} 🖊 ${$t("title")} 🖊 ${$dailyRestrictions.attempts} 🖊 W ${
      $api.dailyChallenge.word
    }`;
    copyToClipboard(`✌ ${message} ✌`);
  };
</script>

<div class="victory">
  <div class="star">
    <StarIcon />
  </div>
  <div class="repeats">
    {$t("victory.labels.attempts")}
    {$dailyRestrictions.attempts}
  </div>
  <button class="btn share" on:click={shareStats}>
    <ShareIcon />
    <div class="btn-text">{$t("victory.button.share")}</div>
  </button>
</div>

<style lang="scss">
  @import "src/styles/all";
  .victory {
    @extend %flex-centered;
    padding: 10px;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
  }

  .star {
    @extend %flex-centered;
    width: 100%;
    padding: 20px 0;

    animation: delayspin 5s infinite;

    :global(.star-icon) {
      transform: scale(1.5);
    }
  }

  .repeats {
    text-align: center;
  }

  .btn {
    color: $button-color;
    font-size: $normal-font-size;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .btn-text {
    margin-left: 10px;
  }

  .share {
    &:hover {
      :global(.share-icon) {
        animation: bounce 0.5s;
      }
    }
  }
</style>
