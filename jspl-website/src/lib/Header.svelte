<script lang="ts">
  import Watermark from "$lib/Watermark.svelte";
</script>

<div id="header">
  <div>
    <h1>JsPL</h1>
  </div>
  <div style:margin-bottom="16px"><Watermark size={80} /></div>
  <div>
    <h2 title="Coming soon!">JsPL-lib</h2>
  </div>
</div>

<style>
  #header {
    height: 96px;
    display: flex;
    align-items: center;
    > * {
      display: flex;
      align-items: center;
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
