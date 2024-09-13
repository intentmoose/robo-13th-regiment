<script>
  // @ts-nocheck
  import "./assets/js/canvas-text-v2.js";
  import "./assets/js/aframe-canvas.js";
  import "./assets/js/grid.js";
  import "./assets/js/skybox.js";
  import "./assets/js/mountains.js";
  import Glock from "./lib/Glock.svelte";
  import Targets from "./lib/Targets.svelte";

  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;
  let gameActive = false; 

  function toggleGame() {
    if (gameActive) {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
    }
    score = 0; 
    gameActive = !gameActive; 
  }

  function onTargetHit() {
    score += 10;
    checkGameOver();
  }

  function onTargetMissed() {
    score -= 5;
    checkGameOver();
  }

  function checkGameOver() {
    if (score < -10) {
      toggleGame(); 
    }

  }
</script>

<a-scene
  stats
  cursor="rayOrigin: mouse"
  raycaster="objects: .clickable"
  fog="type: exponential; density: 0.001"
>
  <a-image mountains width="35" height="2" position="0 0.8 -45" scale="3 3 3" />
  <a-plane
    scale="35 35 35"
    material="shader: sun-shader;"
    position="0 19 -100"
  />

  <a-image
    material="shader: grid-shader;"
    width="40"
    height="40"
    position="0 -1 -10"
    rotation="90 180 0"
  />

  <a-sky canvas-sky segments-width="8" segments-height="16" />
  <Glock on:hit={onTargetHit} />

  {#if !gameActive}
    <a-entity position="0 1.5 -4">
      <a-text
        value={`${score < -10 ? "Game Over" : "Defend yourself!\n13's are coming!"}\n\nScore: ${score}\n\nHigh Score: ${highScore}`}
        align="center"
        width="6"
        position="0 1 0"
      />

      <a-entity position="0 -0.5 0">
        <a-plane
          color="#4CAF50"
          height="0.3"
          width="1.5"
          class="clickable target"
          position="0 0 0"
          event-set__enter="_event: mouseenter; color: #45a049"
          event-set__leave="_event: mouseleave; color: #4CAF50"
          on:click={toggleGame}
          on:hit={toggleGame}
        />
        <a-text
          value={score < -10 ? "Restart Game" : "Shoot to Start"}
          align="center"
          position="0 0 0.01"
          width="4"
        />
      </a-entity>
    </a-entity>
  {:else}
    <a-entity position="0 3 -4">
      <a-text value={"Score: " + score} align="center" width="4" />
      <Targets on:miss={onTargetMissed} on:hit={onTargetHit}  position="0 -1 0"/>
    </a-entity>
  {/if}
</a-scene>

<style>

</style>
