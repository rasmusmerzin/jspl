<script>
  import { activePrints, commonTreeStates, languages, treePrintStates } from "$lib/state";
  import { onKeyDown, onKeyUp } from "$lib";
  import { onMount } from "svelte";
  import PaneLayout from "$lib/PaneLayout.svelte";

  let focused = $derived($languages[0]);
  let focusedPrintState = $derived(treePrintStates[focused]);
  let focusedCommonTreeState = $derived(commonTreeStates[focused]);

  onMount(() => {
    addEventListener("keydown", onKeyDown);
    addEventListener("keyup", onKeyUp);
    return function cleanup() {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
    };
  });
</script>

<main>
  <h1>JsPL</h1>
  <PaneLayout />
  <div id="ast-container">
    <pre>{$focusedPrintState}</pre>
    <pre>{JSON.stringify($focusedCommonTreeState, null, 2)}</pre>
    <div>
      <pre>{$activePrints.JavaScript}</pre>
      <pre>{$activePrints.Python}</pre>
      <pre>{$activePrints.Lua}</pre>
    </div>
  </div>
</main>

<style>
  h1 {
    text-align: center;
  }
  main {
    box-sizing: border-box;
    max-width: 1080px;
    margin: auto;
    display: grid;
    grid-gap: 32px;
    padding: 32px 16px;
  }
  #ast-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8px;
    > div {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }
</style>
