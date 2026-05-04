<script lang="ts">
  import Debug from "$lib/Debug.svelte";
  import FileList from "$lib/FileList.svelte";
  import PaneLayout from "$lib/PaneLayout.svelte";
  import Watermark from "$lib/Watermark.svelte";
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
    <div>
      <h1>JsPL</h1>
    </div>
    <div><Watermark /></div>
    <div>
      <h2 title="Coming soon!">JsPL-lib</h2>
    </div>
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
    padding: 0 16px 32px;
  }
  #header {
    height: 64px;
    display: flex;
    padding: 0 0 24px;
    > * {
      height: 100%;
      display: flex;
      align-items: end;
      &:first-child {
        flex: 1;
      }
      &:last-child {
        justify-content: end;
        flex: 1;
        h2 {
          opacity: 0.2;
        }
      }
    }
  }
</style>
