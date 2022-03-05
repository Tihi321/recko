<script lang="ts">
  import { EThemes } from "../../constants";
  export let theme: EThemes = EThemes.Light;
</script>

<div
  class="styles"
  class:light-theme={theme === EThemes.Light}
  class:dark-theme={theme === EThemes.Dark}
>
  <slot />
</div>

<style lang="scss">
  @import "src/styles/all";
  :global {
    body {
      @extend %default-body;
      @extend %scrollbar;
    }

    ul {
      @extend %reset-list;
    }

    button {
      @extend %reset-button;
    }

    a {
      @extend %reset-link;
      color: $link-color;
    }
  }

  .styles {
    @include add-map-modifiers($theme-colors, shared, color);
    @include add-map-modifiers($font-variables, mobile, font-size);

    &.light-theme {
      @include add-map-modifiers($theme-colors, light, color);
    }
    &.dark-theme {
      @include add-map-modifiers($theme-colors, dark, color);
    }

    @include add-map-modifiers(map-get-strict($theme-colors, libraries), ts-components, color);
  }
</style>
