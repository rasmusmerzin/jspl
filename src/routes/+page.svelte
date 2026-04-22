<script>
  import { LANGUAGES, content } from "$lib";
</script>

<h1>P3Lang</h1>
<main>
  {#each LANGUAGES as lang}
    <div>
      <div class="header">
        <img src="/{lang}-original.svg" alt={lang} />
      </div>
      <div
        class="content"
        spellcheck="false"
        contenteditable
        bind:textContent={$content}
      ></div>
    </div>
  {/each}
</main>

<style>
  h1 {
    text-align: center;
    padding: 16px 0;
  }
  main {
    box-sizing: border-box;
    max-width: 1080px;
    margin: auto;
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8px;
    div {
      display: grid;
      .header {
        padding: 16px;
        height: 32px;
        display: flex;
        justify-content: center;
      }
      .content {
        min-height: 256px;
        font-family: monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
        padding: 12px;
        border-radius: 16px;
        background: #444;
        color: #eee;
        box-shadow: 1px 2px 8px #0004;
        &:focus {
          outline: 3px solid #0cf;
        }
      }
    }
  }
</style>
