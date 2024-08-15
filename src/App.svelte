<script>
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  import sky from "./assets/sky.webp";
  import "./assets/js/canvas-text-v2.js";
  import "./assets/js/aframe-canvas.js";

  // const scope ="⚙"
  const scope = "☉";
  const gun1 = `︻デ═一`;
  const gun2 = `︻╦╤─`;
  const gun3 = `🔫`;
  const gun1Style = `font: 100px sans-serif; fillStyle: #000; textAlign: center; textBaseline: middle;`;
</script>

<main>
  <div>
    <!-- <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a> -->

    <!-- <Counter /> -->
    <a-scene>
      <a-entity oculus-touch-controls="hand: left">
        <a-entity class="gun-wrap" position="0 0 0" rotation="0 0 0">
          {#each Array(20) as _, index (index)}
            <a-plane
              position={`0.0${index} 0 0`}
              rotation="0 -90 0"
              width="2"
              height="0.5"
              canvas-material={`width:1024; height:${1024 / 5}`}
              canvas-text={` text: ${gun3}; ${gun1Style} `}
            >
            </a-plane>
          {/each}

          <a-plane
            position="0 1 0.1"
            rotation="0 0 0"
            width="0.1"
            height="0.1"
            canvas-material={`width:512; height:512`}
            canvas-text={`
      text: ${scope}; ${gun1Style} `}
          ></a-plane>
        </a-entity></a-entity>
      <a-entity oculus-touch-controls="hand: right"></a-entity>

      <!-- <a-plana -->

      <a-sky color="#ECECEC" src={sky}></a-sky>
    </a-scene>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
