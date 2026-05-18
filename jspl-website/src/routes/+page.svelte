<script lang="ts">
  import Header from "$lib/Header.svelte";
  import { examples } from "$lib/state";
</script>

<main>
  <Header />
  <div id="hero">
    <div id="title">
      <img alt="JsPL" src="/jspl.svg" />
      <h1>JsPL</h1>
      <em id="subtitle">Write a library in three languages simultaneously!</em>
    </div>
    <div id="example">
      <div>
        <img title="JavaScript" alt="JavaScript" src="/javascript-original.svg" />
        <pre aria-label="Hello.js">{Object.values($examples)[0].JavaScript}</pre>
        <div class="separator"><img alt="⇆" src="/sync.svg" /></div>
      </div>
      <div>
        <img title="Python" alt="Python" src="/python-original.svg" />
        <pre aria-label="Hello.py">{Object.values($examples)[0].Python}</pre>
        <div class="separator"><img alt="⇆" src="/sync.svg" /></div>
      </div>
      <div>
        <img title="Lua" alt="Lua" src="/lua-original.svg" />
        <pre aria-label="Hello.lua">{Object.values($examples)[0].Lua}</pre>
      </div>
    </div>
    <div class="links">
      <a class="button" href="/editor">Try Online Editor</a>
      <a title="Coming Soon!" aria-disabled="true">See Common Library</a>
    </div>
  </div>
</main>

<style>
  main {
    box-sizing: border-box;
    max-width: 1080px;
    margin: auto;
    padding: 0 16px 32px;
  }
  #hero {
    margin: 72px 0;
    @media (max-width: 760px) {
      margin: 48px 0;
    }
    .links {
      margin: 24px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      grid-gap: 32px;
    }
    #title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h1 {
        margin: 24px 0 16px;
      }
      @media (max-width: 760px) {
        img {
          height: 128px;
        }
      }
    }
    #subtitle {
      text-align: center;
      font-size: 20px;
      font-weight: 300;
    }
    #example {
      display: grid;
      margin: 112px 16px 64px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 32px;
      > div {
        background: var(--bg-1);
        padding: 10px 10px 12px;
        border-radius: 8px;
        position: relative;
        > img {
          height: 32px;
          position: absolute;
          bottom: calc(100% + 24px);
          left: 50%;
          transform: translateX(-50%);
        }
        pre {
          height: 96px;
          &::before {
            content: attr(aria-label);
            display: block;
            color: var(--fg-2);
            margin: -10px -10px 4px;
            padding: 8px 10px 4px;
            border-bottom: 1px solid var(--mg);
          }
        }
        .separator {
          position: absolute;
          left: calc(100% + 16px);
          top: 50%;
          transform: translate(-50%, -50%);
          img {
            height: 16px;
            width: 16px;
          }
        }
      }
      @media (max-width: 760px) {
        grid-template-columns: 1fr;
        width: 300px;
        margin: 48px auto;
        > div {
          > img {
            left: unset;
            transform: unset;
            top: 6px;
            right: 6px;
            height: 16px;
          }
          pre {
            height: min-content;
          }
          .separator {
            left: 50%;
            top: calc(100% + 16px);
            transform: translate(-50%, -50%) rotate(90deg);
          }
        }
      }
    }
  }
</style>
