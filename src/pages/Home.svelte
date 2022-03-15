<script lang="ts">
  import Home from "../components/home/Home.svelte";
  import Wordle from "../components/wordle/Wordle.svelte";
  import { useGame } from "../hooks";

  const { game } = useGame();
</script>

{#if $game.started}
  <Wordle />
{:else}
  <Home />
{/if}
