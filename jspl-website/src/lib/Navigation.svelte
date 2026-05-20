<script lang="ts">
  import { page } from "$app/state";
</script>

<nav>
  <a href="/editor">
    <h2 class:selected={page.url.pathname === "/editor"}>Editor</h2>
  </a>
  <a aria-disabled="true">
    <h2 title="Coming soon!">Library</h2>
  </a>
</nav>

<style>
  nav {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 0 16px;
    h2 {
      font-size: 24px;
      &:not(.selected) {
        opacity: 0.5;
        font-weight: 500;
      }
    }
  }
</style>
