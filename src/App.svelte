<script>
  import "./assets/js/canvas-text-v2.js";
  import "./assets/js/aframe-canvas.js";
  import "./assets/js/enemy.js";
  import "./assets/js/grid.js";

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

  <a-scene stats background="color: green" >
    <!-- make a cube out of grids -->
    <!-- <a-entity position="0 0 0" gridhelper="size: 50; divisions: 50;"> -->

    <!-- <a-entity geometry="primitive: cylinder; radius: 20; height: 200; segmentsRadial: 4; open-ended: true"
      material="shader: outdoor-sky; side: double"
      position="0 1.5 -10" rotation="90 180 0"></a-entity> -->
    <!-- <a-entity geometry="primitive: cylinder; radius: 20; height: 200; segmentsRadial: 4; open-ended: true"
      material="shader: glowing-grid-tunnel; side: double"
      position="0 1.5 -10" rotation="90 180 0"></a-entity> -->
    <a-image material="shader: glowing-grid-tunnel; side: double" position="0 0 -5" rotation="90 180 0" width="50" height="50"></a-image>

    <!-- <a-sky rotation="90 0 0" material="shader: glowing-grid-tunnel;"></a-sky> -->
    <a-sky rotation="0 0 0" material="shader: gradient-skybox;"></a-sky>
    <!-- <a-sky rotation="0 0 0" material="shader: outdoor-sky;"></a-sky> -->
    <!-- <a-entity
      geometry="primitive: box; depth: 30; height: 30; width: 30"
      material="shader: outdoor-sky; side: double"
      position="0 0 -20"
    ></a-entity> -->

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

    <a-text value={score} position="0 2 -5" scale="10 10 10"></a-text>

    <Glock on:hit={onTargetHit} />
    <Targets on:miss={onTargetMissed} on:hit={onTargetHit} />
  </a-scene>
</main>
