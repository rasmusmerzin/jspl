<script lang="ts">
  import type { LanguageName } from "jspl/parser";
  import { highlight } from "./highlight";
  import { COLORS, TEXT_COLORS } from "./state/editor";
  let {
    code,
    language,
  }: {
    code: string;
    language?: LanguageName;
  } = $props();
  let highlightElement = $state<HTMLElement | undefined>();
  let overlayElement = $state<HTMLElement | undefined>();
  let color = $derived(language ? COLORS[language] : "var(--fg)");
  let textColor = $derived(language ? TEXT_COLORS[language] : "var(--bg)");
  $effect(() => {
    if (highlightElement) {
      if (!language) highlightElement.textContent = code;
      else highlightElement.innerHTML = highlight(language, code);
    }
    if (overlayElement) overlayElement.textContent = code;
  });
</script>

<div style:--color={color} style:--text-color={textColor}>
  <code class="highlight" bind:this={highlightElement}></code>
  <code class="overlay" bind:this={overlayElement}></code>
</div>

<style>
  div {
    position: relative;
  }
  code {
    display: inline-block;
    white-space: pre;
    padding-bottom: 1em;
  }
  .highlight {
    pointer-events: none;
    :global(b),
    :global(span) {
      color: var(--color);
    }
  }
  .overlay {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    color: #0000;
    &::selection {
      background: var(--color);
      color: var(--text-color);
    }
  }
  :global([theme="light"]) .highlight {
    :global(b),
    :global(span) {
      filter: brightness(0.6);
    }
  }
  :global([theme="dark"]) .highlight {
    :global(span) {
      filter: saturate(0.3) brightness(1.5);
    }
  }
</style>
