<script lang="ts">
  import type { LanguageName } from "./parser";
  import { codeStates, ctrlPressed, languages } from "$lib/state";
  import { onEditableFocus, onEditableKeyDown, onEditableMouseDown } from "$lib/Pane";
  import { onMount } from "svelte";

  let {
    languageName,
    autoFocus = false,
  }: {
    languageName: LanguageName;
    autoFocus?: boolean;
  } = $props();

  let codeState = $derived(codeStates[languageName]);
  let paneIndex = $derived($languages.indexOf(languageName));
  let content: HTMLDivElement | undefined = $state();

  onMount(() => {
    if (autoFocus) content?.focus();
  });
</script>

<div class="Pane" id="{languageName}-Pane">
  <div class="header">
    <img src="/{languageName.toLowerCase()}-original.svg" alt={languageName} />
  </div>
  <div
    bind:this={content}
    role="textbox"
    tabindex="0"
    class="content"
    spellcheck="false"
    contenteditable
    onmousedown={onEditableMouseDown}
    onfocus={onEditableFocus}
    onkeydown={onEditableKeyDown}
    bind:textContent={$codeState}
  ></div>
  <div class="footer">
    <div class="index" class:visible={$ctrlPressed}>{paneIndex + 1}</div>
  </div>
</div>

<style>
  .Pane {
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1 1 256px;
    box-sizing: border-box;
    padding: 0 0 8px;
    &:not(:focus-within) {
      .header img {
        opacity: 0.5;
      }
    }
    .header {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      padding: 12px;
      display: flex;
      justify-content: end;
      pointer-events: none;
      img {
        filter: drop-shadow(0 0 6px #4448);
      }
    }
    .content {
      height: 100%;
      flex: 1;
      box-sizing: border-box;
      font-family: monospace;
      white-space: pre-wrap;
      word-wrap: break-word;
      padding: 12px;
      border-radius: 16px;
      background: #444;
      color: #ddd;
      box-shadow:
        1px 2px 8px #0008,
        inset 0 0 1px #fff8;
      &:empty::before {
        content: "...";
        display: inline;
        opacity: 0.5;
      }
      &:focus {
        box-shadow:
          1px 2px 8px #0008,
          inset 0 0 1px #0008;
        background: #333;
        color: #fff;
        border: 3px solid var(--primary);
        padding: 9px;
        outline: none;
      }
    }
    .footer {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      bottom: 8px;
      padding: 12px;
      display: flex;
      justify-content: end;
      pointer-events: none;
      .index {
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        &:not(.visible) {
          display: none;
        }
      }
    }
  }
</style>
