<script lang="ts">
  import { page } from "$app/state";
  import Watermark from "$lib/Watermark.svelte";
  import GitHub from "$lib/icons/GitHub.svelte";
</script>

<div id="header">
  <nav>
    <a href="/editor">
      <h2 class:selected={page.url.pathname === "/editor"}>JsPL-editor</h2>
    </a>
    <a aria-disabled="true">
      <h2 title="Coming soon!">JsPL-lib</h2>
    </a>
  </nav>
  <div style:margin-bottom="16px">
    <a aria-label="landing" href="/">
      <Watermark size={80} />
    </a>
  </div>
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
        color: var(--fg);
        text-decoration: none;
        word-break: keep-all;
      }
      h2 {
        font-size: 24px;
        &:not(.selected) {
          opacity: 0.5;
          font-weight: 500;
        }
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
