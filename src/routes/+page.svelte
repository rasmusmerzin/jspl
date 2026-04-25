<script>
  import Pane from "$lib/Pane.svelte";
  import { languages } from "$lib";
  import { slide } from "svelte/transition";
</script>

<main>
  <h1>P3Lang</h1>
  <div id="code-container">
    <div>
      {#each $languages.slice(0, 1) as languageName (languageName)}
        <div transition:slide={{ axis: "y" }}>
          <Pane autoFocus {languageName} />
        </div>
      {/each}
    </div>
    <div>
      {#each $languages.slice(1) as languageName (languageName)}
        <div transition:slide={{ axis: "y" }}>
          <Pane {languageName} />
        </div>
      {/each}
    </div>
  </div>
  <pre>{$languages}</pre>
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
