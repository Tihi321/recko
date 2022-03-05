<script lang="ts">
  import Home from "../components/home/Home.svelte";
  import { useGame } from "../hooks";

  const { game } = useGame();
</script>

{#if $game.started}
  Game started
{:else}
  <Home />
{/if}
