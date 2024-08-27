<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const gun1 = `︻デ═一`;
  const gun2 = `︻╦╤─`;
  const gun3 = `🔫`;
  const gun1Style = `font: 100px sans-serif; fillStyle: #000; textAlign: center; textBaseline: middle;`;
  import pistol from "../assets/Pistol_5.glb";
  const handType = (index) => {
    return index === 0 ? "left" : "right";
  };

  const gunAnimation = (gun) => {
    const bang = gun.children[0].children[0];
    bang.emit("bang");
  };

  const hideBang = (e) => {
    e.target.emit("hidebang");
  };

  const gunshot = (e) => {
    const gun = e.target;
    const raycasterEl = e.target.querySelector(".gun-raycaster");
    gunAnimation(gun);

    if (raycasterEl.components.raycaster.intersections.length === 0) {
      return;
    }

    const target = raycasterEl.components.raycaster.intersections[0].object.el;

    // Hide the target when hit
    // target.setAttribute('visible', 'false');

    // Emit a custom event to update the score
    target.emit("hit");
    dispatch('hit');
  };

  const animationFinished = (e) => {
    e.target.components["animation-mixer"].stopAction();
  };
</script>

{#each Array(2) as _, index (index)}
  <a-entity
    oculus-touch-controls={`hand: ${handType(index)}; model: true;`}
    on:triggerdown={gunshot}
    haptics="events: triggerdown; dur: 200; force: 0.5"
  >
    <a-gltf-model position="0 0 0" rotation="0 90 0" src={pistol}>
      <a-plane
        position=".17 .04 0"
        rotation="0 90 0"
        geometry="primitive: plane; width: .2; height: .2"
        canvas-material={`width:1024; height:1024`}
        canvas-text={` text: 💥; font: 500px sans-serif; textAlign: center; textBaseline: middle; `}
        animation="startEvents: bang; property: scale; to: 1 1 1; dur: 100;"
        animation__hide="startEvents: hidebang; property: scale; to: 0 0 0; dur: 10;"
        on:animationcomplete={hideBang}
        scale="0 0 0"
      ></a-plane>

      <a-entity
        class="gun-raycaster"
        raycaster="objects: .target; showLine: true; lineColor:red; far: 40; autoRefresh: true; enabled: true"
        position="-.05 .07 0"
        rotation="0 -90 0"
      ></a-entity>
    </a-gltf-model>
  </a-entity>
{/each}
