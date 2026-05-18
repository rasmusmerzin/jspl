<script lang="ts">
  import { EXAMPLES } from "$lib/examples";
  import { selectedFile } from "$lib/state";
  import { onFileClick } from "./FileList";
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
</style>
