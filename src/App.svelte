<script>
  import "./assets/js/canvas-text-v2.js";
  import "./assets/js/aframe-canvas.js";
  import "./assets/js/enemy.js";
  import "./assets/js/grid.js";
  // import "./assets/js/sky.js";
  import Glock from "./lib/Glock.svelte";
  import Targets from "./lib/Targets.svelte";

  let score = 0;

  function onTargetHit() {
    score += 10; // Add points for hitting a target
  }

  function onTargetMissed() {
    score -= 5; // Subtract points for missing a target
  }
</script>

<main>
  <div class="scoreboard">
    Score: {score}
  </div>

  <a-scene stats background="color: white" fog="type: linear; color: #AAA">
    <!-- make a cube out of grids -->
    <a-entity position="0 0 0" gridhelper="size: 50; divisions: 50;">
      <!-- <a-entity
        position="25 0 0"
        rotation="0 90 0"
        gridhelper="size: 50; divisions: 50;"
      />
      <a-entity
        position="0 0 25"
        rotation="90 0 0"
        gridhelper="size: 50; divisions: 50;"
      />
      <a-entity
        position="0 25 0"
        rotation="0 0 0"
        gridhelper="size: 50; divisions: 50;"
      />
      <a-entity
        position="0 0 -25"
        rotation="90 0 0"
        gridhelper="size: 50; divisions: 50;"
      /> -->
    </a-entity>

    <a-text value={score} position="0 2 -5" scale="10 10 10"></a-text>

    <Glock on:hit={onTargetHit} />
    <Targets on:miss={onTargetMissed} on:hit={onTargetHit} />
  </a-scene>
</main>
