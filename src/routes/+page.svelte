<script>
  import { activePrints, commonTreeStates, languages, treePrintStates } from "$lib/state";
  import { onKeyDown, onKeyUp } from "$lib";
  import { onMount } from "svelte";
  import PaneLayout from "$lib/PaneLayout.svelte";
  import FileList from "$lib/FileList.svelte";

  let active = $derived($languages[0]);
  let activePrintState = $derived(treePrintStates[active]);
  let activeCommonTreeState = $derived(commonTreeStates[active]);

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
  <div id="header">
    <h1>JsPL</h1>
    <h2>JsPL-lib</h2>
  </div>
  <FileList />
  <PaneLayout />
  <div id="debug">
    <pre>{$activePrintState}</pre>
    <pre>{JSON.stringify($activeCommonTreeState, null, 2)}</pre>
    <div>
      <pre>{$activePrints.JavaScript}</pre>
      <pre>{$activePrints.Python}</pre>
      <pre>{$activePrints.Lua}</pre>
    </div>
  </div>
</main>

<style>
  main {
    box-sizing: border-box;
    max-width: 1080px;
    margin: auto;
    display: grid;
    grid-gap: 16px;
    padding: 32px 16px;
  }
  #header {
    height: 32px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 0 0 16px;
    h1 {
      font-size: 32px;
    }
    h2 {
      opacity: 0.2;
    }
  }
  #debug {
    padding: 16px 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8px;
    > div {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }
</style>
