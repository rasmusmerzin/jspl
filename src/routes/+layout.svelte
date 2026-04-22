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
  :root {
    font-family: sans-serif;
    background: black;
    color: white;
  }
  :global(body) {
    background: radial-gradient(ellipse at top, #333, transparent);
    min-height: 100dvh;
  }
  :global(*) {
    padding: 0;
    margin: 0;
  }
</style>
