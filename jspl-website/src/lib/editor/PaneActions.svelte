<script lang="ts">
  import Check from "$lib/icons/Check.svelte";
  import Transpile from "$lib/icons/Transpile.svelte";
  import Copy from "$lib/icons/Copy.svelte";
  import type { LanguageName } from "jspl/parser";
  import {
    formatDisabled,
    onCopyClickFn,
    onFormatClick,
    onTranspileClick,
    transpileDisabled,
  } from "./PaneActions";

  let {
    languageName,
    paneIndex,
  }: {
    languageName: LanguageName;
    paneIndex: number;
  } = $props();
</script>

<div class="actions" class:primary={!paneIndex}>
  <img
    draggable="false"
    title={languageName}
    class="language"
    src="/{languageName.toLowerCase()}-plain.svg"
    alt={languageName}
  />
  {#if !paneIndex}
    <button title="Transpile (Ctrl+Enter)" onclick={onTranspileClick} disabled={$transpileDisabled}>
      <Transpile size={20} />
    </button>
    <button title="Format (Ctrl+Shift+F)" onclick={onFormatClick} disabled={$formatDisabled}>
      <Check size={20} />
    </button>
  {/if}
  <button title="Copy" onclick={onCopyClickFn(languageName)}>
    <Copy size={18} />
  </button>
</div>

<style>
  .actions {
    position: absolute;
    right: 12px;
    top: 12px;
    width: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
    > * {
      pointer-events: all;
    }
    button {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      background: none;
      box-shadow: none;
      opacity: 0.8;
      &:disabled {
        opacity: 0.3;
      }
      &:not(:disabled):hover {
        opacity: 1;
      }
    }
    img.language {
      padding: 4px;
      margin: 0 0 4px;
      opacity: 0.75;
      filter: drop-shadow(1px 1px 1px #0008);
    }
    &.primary {
      img.language {
        opacity: 1;
      }
    }
  }
</style>
