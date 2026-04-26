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
    --fg-1: #444;
    --fg-2: #888;
    --font: sans-serif;
    --primary: #0ad;
    --transition: background 200ms, color 200ms;
    font-family: var(--font);
    background: var(--bg);
    color: var(--fg);
    transition: var(--transition);
  }
  :global(*) {
    padding: 0;
    margin: 0;
    outline-color: var(--primary);
    &::selection {
      background: var(--primary);
      color: black;
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
      --fg-1: #ccc;
      --fg-2: #aaa;
    }
    :global(body) {
      background: radial-gradient(ellipse at top, transparent, #111);
    }
  }
</style>
