<script lang="ts">
  import Navigation from "./Navigation.svelte";
  import ThemeSwitch from "./ThemeSwitch.svelte";
  import Watermark from "./Watermark.svelte";
  import Docs from "./icons/Docs.svelte";
  import GitHub from "./icons/GitHub.svelte";
</script>

<div id="header">
  <div style:margin-bottom="16px">
    <a aria-label="landing" href="/">
      <Watermark size={80} />
    </a>
  </div>
  <Navigation />
  <div>
    <ThemeSwitch />
    <a title="PDF" target="_blank" href="/JsPL.pdf">
      <Docs />
    </a>
    <a title="GitHub" target="_blank" href="https://github.com/rasmusmerzin/jspl">
      <GitHub />
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
      grid-gap: 0 12px;
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
