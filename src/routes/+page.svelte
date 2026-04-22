<script>
  import { LANGUAGES, code } from "$lib";
  import {
    onEditableFocus,
    onEditableKeyDown,
    onEditableMouseDown,
  } from "$lib/editable";
</script>

<h1>P3Lang</h1>
<main>
  {#each LANGUAGES as lang}
    <div>
      <div class="header">
        <img src="/{lang}-original.svg" alt={lang} />
      </div>
      <div
        role="textbox"
        tabindex="0"
        class="content"
        spellcheck="false"
        contenteditable
        onmousedown={onEditableMouseDown}
        onfocus={onEditableFocus}
        onkeydown={onEditableKeyDown}
        bind:textContent={$code[lang]}
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
        img {
          filter: drop-shadow(0 0 6px #4448);
        }
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
        box-shadow:
          1px 2px 8px #0008,
          inset 0 0 1px #fff8;
        &:empty::before {
          content: "...";
          display: inline;
          opacity: 0.5;
        }
        &:focus {
          box-shadow: 1px 2px 8px #0008;
          outline-width: 3px;
          outline-style: solid;
        }
      }
    }
  }
</style>
