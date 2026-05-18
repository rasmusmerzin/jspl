<script lang="ts">
  import { EXAMPLES } from "./examples";
  import { onFileClick } from "./FileList";
  import { selectedFile } from "./state";
</script>

<div class="FileList">
  {#each Object.keys(EXAMPLES) as fileName}
    <button id="{fileName}-File" class:selected={$selectedFile === fileName} onclick={onFileClick}>
      {fileName}
    </button>
  {/each}
</div>

<style>
  .FileList {
    padding: 0 4px;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 8px;
  }
  button {
    --inset-color: #fff4;
    --color: #6663;
    cursor: pointer;
    color: var(--fg);
    font-size: 0.7rem;
    padding: 7px 12px;
    border-radius: 8px;
    background: var(--color);
    backdrop-filter: blur(32px);
    border: none;
    box-shadow:
      1px 2px 8px #0004,
      0 0 1px #0004,
      inset 0 0 1px var(--inset-color),
      -1px -2px 8px #ccc1;
    transition:
      color 100ms,
      box-shadow 200ms,
      background 200ms;
    &:hover {
      --color: #8884;
      --inset-color: #fffa;
    }
    &.selected {
      color: var(--bg);
      background: var(--fg);
      font-weight: 600;
    }
  }
</style>
