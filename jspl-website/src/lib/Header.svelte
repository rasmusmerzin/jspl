<script lang="ts">
  import Watermark from "$lib/Watermark.svelte";
  import GitHub from "$lib/icons/GitHub.svelte";
  import Navigation from "./Navigation.svelte";
</script>

<div id="header">
  <div style:margin-bottom="16px">
    <a aria-label="landing" href="/">
      <Watermark size={80} />
    </a>
  </div>
  <Navigation />
  <div>
    <a title="GitHub" target="_blank" href="https://github.com/rasmusmerzin/jspl">
      <GitHub height={28} />
    </a>
  </div>
</div>

<style>
  #header {
    height: 96px;
    display: flex;
    align-items: center;
    grid-gap: 0 16px;
    > * {
      display: flex;
      flex-wrap: wrap;
      grid-gap: 0 16px;
      a {
        display: inline-flex;
      }
      &:first-child {
        flex: 1;
        align-items: baseline;
      }
      &:last-child {
        justify-content: end;
        align-items: center;
        flex: 1;
      }
    }
  }
</style>
