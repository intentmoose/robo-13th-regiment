<script>
  const gun1 = `︻デ═一`;
  const gun2 = `︻╦╤─`;
  const gun3 = `🔫`;
  const gun1Style = `font: 100px sans-serif; fillStyle: #000; textAlign: center; textBaseline: middle;`;
import pistol from "../assets/Pistol_5.glb"
  const handType = (index) => {
    return index === 0 ? "left" : "right";
  };

  const gunAnimation = (gun) => {
    const bang = gun.children[0].children[0];
    // console.log("bang", bang);
    bang.emit("bang");
    // if (gun.hasAttribute("animation-mixer")) {
    //   gun.components["animation-mixer"].playAction();
    // } else {
    //   gun.setAttribute(
    //     "animation-mixer",
    //     "clip: handgun_01_slider|Take 001|BaseLayer; loop: repeat;",
    //   );
    // }
  };

  const hideBang = (e) => {
    e.target.emit("hidebang");
  };

  const gunshot = (e) => {
    console.log("bang");
    const gun = e.target;
    console.log("gun", gun);
    // const raycasterEl = e.target.children[0].children[0];
    gunAnimation(gun);
    // scoreStore.decrementScore(1);

    // when shot is fired, check for intersection with bandit
    // if (raycasterEl.components.raycaster.intersections.length === 0) {
    //   return;
    // }

    // createIntersectionEntity(
    //   raycasterEl.components.raycaster.intersections[0].point,
    // );

    // raycasterEl.components.raycaster.intersections[0].object.el.emit(
    //   "drop-target",
    // );

    // scoreStore.incrementScore(5);
  };

  const createIntersectionEntity = (position) => {
    const intersectionEntity = document.createElement("a-image");

    intersectionEntity.setAttribute("src", "bullet_hole.webp");
    intersectionEntity.setAttribute("scale", "0.15 0.15 0.15");
    intersectionEntity.setAttribute("position", position); // Set the position of the sphere to the intersection point

    // Append the entity to the A-Frame scene
    const scene = document.querySelector("a-scene"); // Select the A-Frame scene
    scene.appendChild(intersectionEntity); // Append the new entity to the scene
  };

  const animationFinished = (e) => {
    e.target.components["animation-mixer"].stopAction();
  };
</script>

<!-- A-Frame element to load the Glock model and apply the texture -->
<!-- <canvas
  bind:this={htmlCanvas}
  on:loaded={htmlCanvasLoaded}
  id="glockTexture"
  width="512"
  height="512"
/> -->

{#each Array(2) as _, index (index)}
  <a-entity
    oculus-touch-controls={`hand: ${handType(index)}; model: true;`}
    on:triggerdown={gunshot}
    haptics="events: triggerdown; dur: 200; force: 0.5"
  >
    <a-gltf-model
      position="0 0 0"
      rotation="0 90 0"
      src={pistol}
    >
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
      <!-- <a-cylinder
        class="jacket"
        position=".083 .07 0"
        rotation="0 0 90"
        radius=".008"
        height=".026"
        color="gold"
      /> -->
      <a-entity
        raycaster="objects: .target; showLine: true; lineColor:red; far: 40; autoRefresh: true; enabled: true"
        position="-.05 .07 0"
        rotation="0 -90 0"
      ></a-entity>
    </a-gltf-model>
  </a-entity>
{/each}
