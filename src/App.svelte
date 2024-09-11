<script>
  // import "aframe";
  import "./assets/js/canvas-text-v2.js";
  import "./assets/js/aframe-canvas.js";
  import "./assets/js/grid.js";
  import Glock from "./lib/Glock.svelte";
  import Targets from "./lib/Targets.svelte";

  let score = 0;
  let highScore = localStorage.getItem("highScore") || 0;
  let gameActive = false; // Single state to track if the game is active

  // Start or restart game
  function toggleGame() {
    if (gameActive) {
      // End game and check for high score
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
    }
    score = 0; // Reset score
    gameActive = !gameActive; // Toggle between game and menu
  }

  // Function to handle target hit
  function onTargetHit() {
    score += 10;
    checkGameOver();
  }

  // Function to handle missed target
  function onTargetMissed() {
    score -= 5;
    checkGameOver();
  }

  // Check for game over condition
  function checkGameOver() {
    if (score < -10) {
      // Define losing condition
      toggleGame(); // Go back to menu when game is over
    }
  }
</script>

<a-scene stats cursor="rayOrigin: mouse">
  <!-- Add the camera with mouse interaction and raycasting -->
  <!-- <a-entity
    id="camera"
    camera
    cursor="rayOrigin: mouse"
    raycaster="objects: .clickable; interval:100;"
    material="color: black; shader: flat"
  >
  </a-entity> -->
  <!-- <a-entity position="0 0 0" gridhelper="size: 50; divisions: 50;"> -->

  <!-- <a-entity geometry="primitive: cylinder; radius: 20; height: 200; segmentsRadial: 4; open-ended: true"
      material="shader: outdoor-sky; side: double"
      position="0 1.5 -10" rotation="90 180 0"></a-entity> -->
  <a-image
    material="shader: glowing-grid-tunnel; side: double"
   width="20" height="20"
    position="0 0.5 -10"
    rotation="90 180 0"
  ></a-image>

  <a-entity
    geometry="primitive: plane; width: 6; height: 6"
    material="shader: transparent-sun-lines-shader;"
    position="0 2.5 -17"
    
  >
  </a-entity>

  <!-- Menu UI (only visible when gameActive is false) -->
  <a-entity visible={!gameActive} position="0 1.5 -4">
    <a-text
      value={score < -10 ? "Game Over" : "Welcome to the Game!"}
      align="center"
      width="6"
      position="0 1 0"
    ></a-text>
    <a-text
      value={"Your Score: " + score}
      align="center"
      width="4"
      position="0 0.5 0"
    ></a-text>
    <a-text
      value={"High Score: " + highScore}
      align="center"
      width="4"
      position="0 0 0"
    ></a-text>

    <!-- Button (using a-plane and a-text for the label) -->
    <a-entity position="0 -0.5 0">
      <a-plane
        color="#4CAF50"
        height="0.3"
        width="1.5"
        class="clickable"
        position="0 0 0"
        event-set__enter="_event: mouseenter; color: #45a049"
        event-set__leave="_event: mouseleave; color: #4CAF50"
        event-set__click="_event: click; color: #333"
        on:click={toggleGame}
      >
      </a-plane>
      <a-text
        value={score < -10 ? "Restart Game" : "Start Game"}
        align="center"
        position="0 0 0.01"
        width="4"
      ></a-text>
    </a-entity>
  </a-entity>

  <!-- Game UI (only visible when gameActive is true) -->
  <a-entity visible={gameActive} position="0 3 -4">
    <a-text value={"Score: " + score} align="center" width="4"></a-text>
    <a-sky color="#1a0033"></a-sky>

    <!-- Game Elements -->
    <Glock on:hit={onTargetHit} />
    <Targets on:miss={onTargetMissed} on:hit={onTargetHit} />
  </a-entity>
</a-scene>

<style>
  .clickable {
    cursor: pointer;
  }
</style>
