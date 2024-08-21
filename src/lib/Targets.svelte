<script>
    import { onMount } from "svelte";

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

    onMount(() => {
        generateEnemies();
    });

</script>


{#each enemies as enemy, index}
    
    <a-circle
        position={`${Math.random() * 10 - 5} ${Math.random() * 5 + 1} ${Math.random() * -10}`}
        canvas-material={`width:200; height:200; byId: true; id: ${enemy.id}`}
        canvas-enemy={`type: metal; size: 200`}
        width="2"
        height="2"
    ></a-circle>
{/each}

