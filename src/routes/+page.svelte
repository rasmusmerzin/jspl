<script>
  import Pane from "$lib/Pane.svelte";
  import { languages } from "$lib/state";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { onKeyDown, onKeyUp } from "$lib";
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
  <h1>P3Lang</h1>
  <div id="code-container">
    <div>
      {#each $languages.slice(0, 1) as languageName (languageName)}
        <div transition:slide={{ duration: 300, axis: "y" }}>
          <Pane autoFocus maxHeight={504} {languageName} />
        </div>
      {/each}
    </div>
    <div>
      {#each $languages.slice(1) as languageName (languageName)}
        <div transition:slide={{ duration: 300, axis: "y" }}>
          <Pane maxHeight={248} {languageName} />
        </div>
      {/each}
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
  #code-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    > div {
      display: flex;
      flex-direction: column;
      &:first-child {
        grid-row: 1 / -1;
        > div {
          height: 512px;
        }
      }
      > div {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
