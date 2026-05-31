<script lang="ts">
  import type { LanguageName } from "jspl";
  import { ctrlPressed } from "$lib/state";
  import {
    codeStates,
    COLORS,
    highlightStates,
    languages,
    positions,
    TEXT_COLORS,
  } from "$lib/state/editor";
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
  let color = $derived(COLORS[languageName]);
  let textColor = $derived(TEXT_COLORS[languageName]);
  let highlightState = $derived(highlightStates[languageName]);
  let paneIndex = $derived($languages.indexOf(languageName));
  let position = $derived(positions[languageName]);
</script>

<div class="Pane" id="{languageName}-Pane" style:--color={color} style:--text-color={textColor}>
  <div class="content">
    <div
      class="code"
      role="textbox"
      tabindex="0"
      spellcheck="false"
      contenteditable
      onmousedown={onEditableMouseDown}
      onfocus={onEditableFocus}
      onkeydown={onEditableKeyDown}
      onsubmit={onEditableSubmit}
      bind:textContent={$codeState}
    ></div>
    <div
      class="highlight"
      contenteditable
      spellcheck="false"
      bind:innerHTML={$highlightState}
    ></div>
  </div>
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
      --padding: 12px;
      flex: 1;
      overflow: auto;
      position: relative;
      box-sizing: border-box;
      font-family: monospace;
      white-space: pre;
      word-wrap: break-all;
      padding: var(--padding);
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
      &:focus-within {
        --padding: 10px;
        box-shadow:
          1px 2px 8px var(--shadow-color),
          inset 0 0 1px var(--shadow-color);
        background: var(--bg-1);
        color: var(--fg);
        border: 2px solid var(--color);
        outline: 2px solid var(--color);
      }
      &:empty::before {
        content: "...";
        display: inline;
        opacity: 0.5;
      }
      [contenteditable] {
        outline: none;
      }
      .code {
        z-index: 2;
        position: absolute;
        top: var(--padding);
        left: var(--padding);
        width: calc(100% - (var(--padding) * 2));
        height: calc(100% - (var(--padding) * 2));
        color: #0000;
        caret-color: var(--fg);
        &::selection {
          background: var(--color);
          color: var(--text-color);
        }
      }
      .highlight {
        z-index: 1;
        position: absolute;
        top: var(--padding);
        left: var(--padding);
        pointer-events: none;
        :global(b),
        :global(span) {
          color: var(--color);
        }
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
  :global([theme="light"]) .Pane .content .highlight {
    :global(b),
    :global(span) {
      filter: brightness(0.6);
    }
  }
  :global([theme="dark"]) .Pane .content .highlight {
    :global(span) {
      filter: saturate(0.3) brightness(1.5);
    }
  }
</style>
