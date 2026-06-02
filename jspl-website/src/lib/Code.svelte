<script lang="ts">
  import type { LanguageName } from "jspl/parser";
  import { highlight } from "./highlight";
  import { COLORS } from "./state/editor";
  let {
    code,
    language,
  }: {
    code: string;
    language?: LanguageName;
  } = $props();
  let element = $state<HTMLElement | undefined>();
  let color = $derived(language ? COLORS[language] : "var(--fg)");
  $effect(() => {
    if (!element) return;
    if (!language) element.textContent = code;
    else element.innerHTML = highlight(language, code);
  });
</script>

<code bind:this={element} style:--color={color}></code>

<style>
  code {
    display: inline-block;
    white-space: pre;
    padding-bottom: 1em;
    :global(b),
    :global(span) {
      color: var(--color);
    }
  }
  :global([theme="light"]) code {
    :global(b),
    :global(span) {
      filter: brightness(0.6);
    }
  }
  :global([theme="dark"]) code {
    :global(span) {
      filter: saturate(0.3) brightness(1.5);
    }
  }
</style>
