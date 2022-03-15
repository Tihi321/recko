<script lang="ts">
  import { onMount } from "svelte";
  import Home from "./pages/Home.svelte";
  import Modals from "./components/modal/Modals.svelte";
  import ThemeContainer from "./components/common/ThemeContainer.svelte";
  import Container from "./components/common/Container.svelte";
  import Header from "./components/header/Header.svelte";
  import { useLocalSettings, useSettings, useApi } from "./hooks";

  const { fetchApiWordsData } = useApi();
  const { setLocalStorageState } = useLocalSettings();
  const { settings } = useSettings();

  onMount(() => {
    setLocalStorageState();

    // uncomment
    // fetchApiWordsData($settings.language);
  });
</script>

<ThemeContainer theme={$settings.theme}>
  <main>
    <Modals />
    <Container>
      <div class="content">
        <Header />
        <Home />
      </div>
    </Container>
  </main>
</ThemeContainer>

<style lang="scss">
  @import "src/styles/all";

  main {
    color: $font-color;
    background-color: $bg-color;
  }

  .content {
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-gap: 50px;
    height: 100%;
  }
</style>
