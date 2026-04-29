<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>JsPL</title>
</svelte:head>

{@render children()}

<style>
  :root {
    --bg: #eee;
    --bg-1: #ddd;
    --fg: #000;
    --fg-1: #333;
    --fg-2: #666;
    --mg: #8888;
    --font: sans-serif;
    --primary: #08c;
    --transition: background 200ms, color 200ms;
    --pane-height: 320px;
    font-family: var(--font);
    background: var(--bg);
    color: var(--fg);
    transition: var(--transition);
  }
  :global(*) {
    padding: 0;
    margin: 0;
    min-width: 0;
    min-height: 0;
    scrollbar-width: none;
    &:hover {
      scrollbar-width: thin;
    }
    &::selection {
      background: var(--primary);
      color: white;
    }
  }
  :global(body) {
    background: radial-gradient(ellipse at top, transparent, #ddd);
    min-height: 100dvh;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #222;
      --bg-1: #444;
      --fg: #fff;
      --fg-1: #ddd;
      --fg-2: #bbb;
    }
    :global(body) {
      background: radial-gradient(ellipse at top, transparent, #111);
    }
  }
</style>
