<script>
  import Pane from "$lib/Pane.svelte";
  import { languages } from "$lib/state";
  import { flip } from "svelte/animate";
</script>

<div id="PaneLayout">
  {#each $languages as languageName (languageName)}
    <div animate:flip={{ duration: 400 }}>
      <Pane {languageName} />
    </div>
  {/each}
</div>

<style>
  #PaneLayout {
    --gap: 8px;
    position: relative;
    height: 512px;
    > div {
      display: flex;
      flex-direction: column;
      width: calc(50% - var(--gap) / 2);
      position: absolute;
      &:first-child {
        height: 100%;
        z-index: 2;
      }
      &:not(:first-child) {
        height: calc(50% - var(--gap) / 2);
        left: calc(50% + var(--gap) / 2);
      }
      &:last-child {
        top: calc(50% + var(--gap) / 2);
      }
    }
  }
</style>
