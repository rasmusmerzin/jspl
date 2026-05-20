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
    --mg: #888;
    --font: sans-serif;
    --primary: #ff8900;
    --primary-text: white;
    --transition: background 200ms, color 200ms;
    --pane-height: 320px;
    font-family: var(--font);
    background: var(--bg);
    color: var(--fg);
    transition: var(--transition);
    &:global([theme="light"]) {
      --bg: #eee;
      --bg-1: #ccc;
      --bg-2: #aaa;
      --fg: #000;
      --fg-1: #333;
      --fg-2: #666;
      --background: radial-gradient(ellipse at top, transparent, #ddd);
    }
    &:global([theme="dark"]) {
      --bg: #222;
      --bg-1: #333;
      --bg-2: #555;
      --fg: #fff;
      --fg-1: #ddd;
      --fg-2: #bbb;
      --background: radial-gradient(ellipse at top, transparent, #111);
    }
  }
  :global(button) {
    --inset-color: #fff4;
    --color: var(--bg-1);
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
    &:disabled {
      cursor: auto;
    }
    &:hover {
      --color: var(--bg-2);
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
    text-decoration: none;
    word-break: keep-all;
    &.button {
      color: var(--bg);
      font-weight: bold;
      background: var(--fg-1);
      padding: 0.5em 0.8em;
      border-radius: 0.4em;
    }
    &.button:hover {
      background: var(--fg);
    }
    &:not(.button):not([aria-disabled="true"]):hover {
      text-decoration: underline;
    }
    &[aria-disabled="true"] {
      text-decoration: none;
      opacity: 0.5;
    }
    &:not([aria-disabled="true"]):hover {
      font-weight: bold;
    }
  }
  :global(img) {
    user-select: none;
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
    background: var(--background);
    min-height: 100dvh;
  }
</style>
