<script>
    export let id;
    export let texture;

    // Randomly position the plane in the scene
    let position = `${Math.random() * 10 - 5} ${Math.random() * 5 + 1} ${Math.random() * -10}`;
    let rotation = `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`;
    let scale = `${Math.random() * 0.5 + 0.5}`;
</script>

<a-plane {id} {position} {rotation} {scale} width="1" height="1" src={texture}>
</a-plane>
