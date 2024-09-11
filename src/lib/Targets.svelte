<script>
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    let enemies = [
        { id: "enemy-1" },
        { id: "enemy-2" },
        { id: "enemy-3" },
        { id: "enemy-4" },
        { id: "enemy-5" },
    ];

    const weapons = [
        "🗡️", // Dagger
        "🔪", // Kitchen Knife
        "🪓", // Axe
        "🛡️", // Shield
        "🪚", // Saw
        "🪛", // Screwdriver
        "🔧", // Wrench
        "🔨", // Hammer
        "🪤", // Mouse Trap
        "🧲", // Magnet
        "🧯", // Fire Extinguisher
        "🧹", // Broom
        "🦯", // White Cane
        "🧱", // Brick
        "🪝", // Hook
        "📏", // Straight Ruler
        "🦴", // Bone
    ];

    const enemyCount = 5;

    // Generate enemies
    function generateEnemies() {
        for (let i = 0; i < enemyCount; i++) {
            enemies.push({ id: `enemy-${i}` });
        }
    }

    function resetTarget(target) {
        target.setAttribute("position", randomizePosition());
        let el = target.querySelector(".weapon");

        el.removeAttribute("canvas-text");

        console.log(target);

        el.setAttribute("canvas-text", drawWeapon());

        // target.setAttribute("visible", "true");
        target.emit("start-animation"); // Emit the event to restart the animation
    }

    const drawWeapon = () => {
        return `text: ${
            weapons[Math.floor(Math.random() * weapons.length)]
        };font: 1300px  sans-serif; textAlign: center; textBaseline: middle;`;
    };

    function handleAnimationEnd(event) {
        const target = event.target;
        dispatch("miss");
        resetTarget(target); // Respawn the target after it hits the death zone
    }

    function handleTargetHit(event) {
        console.log(event);

        const target = event.target;
        // target.setAttribute("visible", "false"); // Temporarily hide the target
        dispatch("hit");

        resetTarget(target); // Respawn the target after it is hit
    }

    function startAllAnimations() {
        enemies.forEach((enemy, index) => {
            const targetEl = document.querySelector(`.enemy-${index}`);
            if (targetEl) {
                targetEl.emit("start-animation");
            }
        });
    }

    const randomizePosition = () => {
        return `${Math.random() * 26 - 5} 0.2 ${Math.random() * -100 - 10}`;
    };

    onMount(() => {
        generateEnemies();
        startAllAnimations(); // Start all animations at the beginning
    });
</script>

{#each enemies as enemy, index}
    <a-circle
        class={`enemy-${index} target`}
        position={randomizePosition()}
        width="2"
        height="2"
        animation={`startEvents: start-animation; property: position; to: ${
            Math.random() * 2 - 1
        } ${Math.random() * 2} 0; dur: 5000; easing: linear; loop: false`}
        on:animationcomplete={handleAnimationEnd}
        on:hit={handleTargetHit}
        on:loaded={startAllAnimations}
        visible="true"
        text="value:13;align:center;color:black;width: 26"
        alphaTest="0.5"
        canvas-material={`width:2048; height:2048`}
        canvas-text={drawWeapon()}
    >
        <!-- <a-image
            value="13"
            width="1"
            height="1"
            position="0 0 0.1"
            rotation="0 0 0"
            color="black"
            canvas-material={`width:2048; height:2048`}
            canvas-text={'text: 13; font: 1300px  sans-serif; textAlign: center; textBaseline: middle;'}
        /> -->
        
        <a-image
            class="weapon"
            alphaTest="0.5"
            position="-1.3 3.5 0.04"
            rotation="0 0 0"
            side="double"
            width="2"
            height="2"
            canvas-material={`width:2048; height:2048`}
            canvas-text={drawWeapon()}
        />
        {#each Array(2) as _, i}
            <a-entity
                position={`${i === 0 ? 0.7 : -0.7} 0 0`}
                rotation={i === 0 ? "0 0 0" : "0 180 0"}
                animation={`property: rotation; to: 30 0 0; dur: 500; loop: true; dir: alternate`}
            >
                <!-- <a-plane
                    position="0 -1.5 0"
                    side="double"
                    width="2"
                    height="2"
                    canvas-material={`width:2048; height:2048`}
                    canvas-text={` text: 🦵; font: 1000px sans-serif; textAlign: center; textBaseline: middle; `}
                /> -->
            </a-entity>
        {/each}
    </a-circle>
{/each}
