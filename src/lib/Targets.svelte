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

    const enemyCount = 5;

    // Generate enemies
    function generateEnemies() {
        for (let i = 0; i < enemyCount; i++) {
            enemies.push({ id: `enemy-${i}` });
        }
    }

    function resetTarget(target) {
        target.setAttribute("position", randomizePosition());
        target.removeAttribute("canvas-enemy");
        target.setAttribute(
            "canvas-enemy",
            `type: ${
                typesOfEnemies[
                    Math.floor(Math.random() * typesOfEnemies.length)
                ]
            }; size: 200`,
        );
        // target.setAttribute("visible", "true");
        target.emit("start-animation"); // Emit the event to restart the animation
    }

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

    const typesOfEnemies = ["fire", "ice", "shamrock", "metal"];

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
x
        animation={`startEvents: start-animation; property: position; to: ${
            Math.random() * 2 - 1
        } ${Math.random() * 2} 0; dur: 5000; easing: linear; loop: false`}
        on:animationcomplete={handleAnimationEnd}
        on:hit={handleTargetHit}
        on:loaded={startAllAnimations}
        visible="true"
    >
        <a-plane
            position="0 0.5 0.5"
            rotation="0 10 90"
            side="double"
            width="2"
            height="2"
            canvas-material={`width:2048; height:2048`}
            canvas-text={` text: 🔪; font: 550px sans-serif; textAlign: center; textBaseline: middle; `}
        />
    </a-circle>
{/each}
<!-- text="value:55;align:center;color:black;width: 10" -->
