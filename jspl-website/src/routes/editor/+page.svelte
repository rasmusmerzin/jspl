<script lang="ts">
  import Debug from "$lib/editor/Debug.svelte";
  import FileList from "$lib/editor/FileList.svelte";
  import Header from "$lib/Header.svelte";
  import PaneLayout from "$lib/editor/PaneLayout.svelte";
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
  <Header />
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
    padding: 0 16px 32px;
  }
</style>
