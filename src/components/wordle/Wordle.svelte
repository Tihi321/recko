<script lang="ts">
  import { useGame, useWordle } from "../../hooks";
  import type { TWordleData } from "../../types";
  import Table from "../table/Table.svelte";

  const { game } = useGame();
  const { generateWordleData } = useWordle();

  $: wordsData = generateWordleData($game) as TWordleData;
</script>

<div class="container"><Table data={wordsData.table} /></div>

<style lang="scss">
  @import "src/styles/all";

  .container {
    display: flex;
    justify-content: center;
  }
</style>
