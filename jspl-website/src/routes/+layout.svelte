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
    --bg-1: #ccc;
    --fg: #000;
    --fg-1: #333;
    --fg-2: #666;
    --mg: #8888;
    --font: sans-serif;
    --primary: #ff8900;
    --primary-text: white;
    --transition: background 200ms, color 200ms;
    --pane-height: 320px;
    font-family: var(--font);
    background: var(--bg);
    color: var(--fg);
    transition: var(--transition);
  }
  :global(button) {
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
      1px 2px 8px #0001,
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
  :global(a) {
    color: var(--fg);
    user-select: none;
    &.button {
      color: var(--bg);
      font-weight: bold;
      background: var(--fg-1);
      text-decoration: none;
      padding: 0.5em 0.8em;
      border-radius: 0.4em;
    }
    &.button:hover {
      background: var(--fg);
    }
    &[aria-disabled="true"] {
      cursor: not-allowed;
      text-decoration: none;
      opacity: 0.5;
    }
    &:not([aria-disabled="true"]):hover {
      font-weight: 600;
    }
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
      color: var(--primary-text);
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
