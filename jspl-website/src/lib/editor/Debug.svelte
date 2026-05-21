<script lang="ts">
  import { activePrints, commonTreeStates, languages, treePrintStates } from "$lib/state/editor";
  import { stringify } from "yaml";
  let active = $derived($languages[0]);
  let activePrintState = $derived(treePrintStates[active]);
  let activeCommonTreeState = $derived(commonTreeStates[active]);
</script>

<div id="Debug">
  <div class="pane">
    <div>{$activePrintState}</div>
  </div>
  <div class="pane">
    <div>{stringify($activeCommonTreeState)}</div>
  </div>
  <div>
    <div class="pane">
      <div>{$activePrints.JavaScript}</div>
    </div>
    <div class="pane">
      <div>{$activePrints.Python}</div>
    </div>
    <div class="pane">
      <div>{$activePrints.Lua}</div>
    </div>
  </div>
</div>

<style>
  #Debug {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 0.7rem;
    .pane {
      overflow: auto;
      > div {
        padding: 8px;
        font-family: monospace;
        white-space: pre;
      }
    }
    > * {
      &:not(:first-child) {
        border-left: 1px solid var(--mg);
      }
      &:last-child {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        > :not(:first-child) {
          border-top: 1px solid var(--mg);
        }
      }
    }
  }
</style>
