<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>P3Lang</title>
</svelte:head>

{@render children()}

<style>
  :global(*) {
    padding: 0;
    margin: 0;
  }
  :root {
    font-family: sans-serif;
    background: #eee;
    color: black;
  }
  :global(body) {
    background: radial-gradient(ellipse at top, transparent, #bbb);
    min-height: 100dvh;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      background: black;
      color: white;
    }
    :global(body) {
      background: radial-gradient(ellipse at top, #333, transparent);
    }
  }
</style>
