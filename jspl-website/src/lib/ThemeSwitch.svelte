<script lang="ts">
  import DarkMode from "./icons/DarkMode.svelte";
  import LightMode from "./icons/LightMode.svelte";
  import { theme, toggleTheme } from "./state/theme";
</script>

<button
  onclick={toggleTheme}
  title={$theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
>
  {#if $theme === "light"}
    <DarkMode />
  {:else}
    <LightMode />
  {/if}
</button>

<style>
  button {
    box-shadow: none;
    background: none;
    border: none;
    padding: 0;
    display: inline-flex;
  }
</style>
