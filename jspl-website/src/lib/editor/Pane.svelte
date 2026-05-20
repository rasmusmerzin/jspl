<script lang="ts">
  import type { LanguageName } from "jspl";
  import { codeStates, ctrlPressed, languages } from "$lib/state";
  import {
    onEditableFocus,
    onEditableKeyDown,
    onEditableMouseDown,
    onEditableSubmit,
  } from "./Pane";
  import PaneActions from "./PaneActions.svelte";

  let {
    languageName,
  }: {
    languageName: LanguageName;
  } = $props();

  let codeState = $derived(codeStates[languageName]);
  let paneIndex = $derived($languages.indexOf(languageName));
</script>

<div class="Pane" id="{languageName}-Pane">
  <div
    role="textbox"
    tabindex="0"
    class="content"
    spellcheck="false"
    contenteditable
    onmousedown={onEditableMouseDown}
    onfocus={onEditableFocus}
    onkeydown={onEditableKeyDown}
    onsubmit={onEditableSubmit}
    bind:textContent={$codeState}
  ></div>
  <PaneActions {languageName} {paneIndex} />
  <div class="index" class:visible={$ctrlPressed}>{paneIndex + 1}</div>
</div>

<style>
  .Pane {
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    .content {
      --inset-color: #fff4;
      --shadow-color: #0002;
      flex: 1;
      overflow: auto;
      box-sizing: border-box;
      font-family: monospace;
      white-space: pre;
      word-wrap: break-word;
      padding: 12px;
      border-radius: 16px;
      background: #6663;
      backdrop-filter: blur(32px);
      box-shadow:
        1px 2px 8px var(--shadow-color),
        inset 0 0 1px var(--inset-color),
        -1px -2px 8px #fff1;
      transition: box-shadow 200ms;
      color: var(--fg-2);
      &:hover {
        --inset-color: #fffa;
        --shadow-color: #0008;
        color: var(--fg-1);
      }
      &:focus {
        box-shadow:
          1px 2px 8px var(--shadow-color),
          inset 0 0 1px var(--shadow-color);
        background: var(--bg-1);
        color: var(--fg);
        padding: 10px;
        border: 2px solid var(--primary);
        outline: 2px solid var(--primary);
      }
      &:empty::before {
        content: "...";
        display: inline;
        opacity: 0.5;
      }
    }
    .index {
      position: absolute;
      pointer-events: none;
      right: 12px;
      bottom: 12px;
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:not(.visible) {
        display: none;
      }
    }
  }
</style>
