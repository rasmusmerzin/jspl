<script lang="ts">
  import type { LanguageName } from "jspl";
  import { ctrlPressed } from "$lib/state";
  import { codeStates, languages, positions } from "$lib/state/editor";
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
  let position = $derived(positions[languageName]);
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
  <div class="status" class:hidden={$ctrlPressed || paneIndex}>{$position}</div>
  <div class="index" class:hidden={!$ctrlPressed}>{paneIndex + 1}</div>
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
    .status {
      position: absolute;
      pointer-events: none;
      right: 16px;
      bottom: 16px;
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: end;
      align-items: center;
      font-size: 12px;
      color: var(--fg-2);
    }
    .index {
      position: absolute;
      pointer-events: none;
      right: 16px;
      bottom: 16px;
      box-sizing: border-box;
      padding: 2px;
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      border: 1px solid var(--mg);
    }
    .hidden {
      display: none;
    }
  }
</style>
