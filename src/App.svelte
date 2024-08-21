<script>

  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  // import sky from "./assets/sky.webp";
  
  import "./assets/js/canvas-text-v2.js";
  import "./assets/js/aframe-canvas.js";
  import "./assets/js/enemy.js"
  import Glock from "./lib/Glock.svelte";
  import Targets from "./lib/Targets.svelte";
  // import Targets from "./lib/Targets.svelte";
  // import "./assets/js/glock-texture.js";
  
  // Texture generation code from previous examples
</script>

<main>
  <div>
    <!-- <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a> -->
    <!-- style="display:none;" -->

    <!-- <Counter /> -->
     
    <a-scene stats>


      <!-- <a-entity oculus-touch-controls="hand: left">
        <a-entity class="gun-wrap" position="0 0 0" rotation="0 0 0">
          {#each Array(20) as _, index (index)}
            <a-plane
              position={`0.00${index} 0 0`}A
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
        </a-entity>
      </a-entity>
      <a-entity oculus-touch-controls="hand: right">
        <a-entity class="gun-wrap" position="0 0.1 0" rotation="0 0 0">
          {#each Array(20) as _, index (index)}
            <a-plane
              position={`0.00${index} 0 0`}
              rotation="0 90 0"
              width="2"
              height="0.5"
              canvas-material={`width:1024; height:${1024 / 5}`}
              canvas-text={` text: ${gun2}; ${gun1Style} `}
            >
            </a-plane>
          {/each}

          {#each Array(10) as _, index (index)}
            <a-plane
              position={`0 -0.035 0.00${index}`}
              rotation="0 0 0"
              width="0.3"
              height="0.3"
              canvas-material={`width:512; height:512`}
              canvas-text={`
        text: ${scope}; ${gun1Style} `}
            ></a-plane>
          {/each}
        </a-entity>
      </a-entity> -->

      <!-- <a-plana -->
      <!-- <a-entity
        position="0 1 -3"
        rotation="0 0 0"
        scale="1 1 1"
        material="color: red"
        geometry="primitive: plane; width: 2; height: 2"
        canvas-material={`width:1024; height:${1024}`}
        canvas-text={` text: 🞖; font: 500px sans-serif; textAlign: center; textBaseline: middle;ext `}
      ></a-entity> -->

      <!-- <a-cylinder color="cyan" segments-radial="6" scale="0.5 1 1"></a-cylinder> -->
      <Targets />
      <Glock />
      <a-sky color="#ffffff" segments-width="8" segment-height="4"></a-sky>
    </a-scene>
  </div>
</main>
