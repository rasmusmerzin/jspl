<script lang="ts">
  import Debug from "$lib/Debug.svelte";
  import FileList from "$lib/FileList.svelte";
  import PaneLayout from "$lib/PaneLayout.svelte";
  import { onKeyDown, onKeyUp } from "$lib";
  import { onMount } from "svelte";

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
    <h2 title="Coming soon!">JsPL-lib</h2>
  </div>
  <FileList />
  <PaneLayout />
  <Debug />
</main>

<style>
  main {
    box-sizing: border-box;
    max-width: 1080px;
    height: 100dvh;
    margin: auto;
    display: flex;
    flex-direction: column;
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
</style>
