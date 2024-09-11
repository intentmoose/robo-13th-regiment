<script>
    import { createEventDispatcher } from 'svelte';
    
    export let highScore;
    const dispatch = createEventDispatcher();
  
    function startGame() {
      dispatch('start');
    }
  </script>
  
  <main class="start-menu">
    <h1>Welcome to the Game!</h1>
    <p>High Score: {highScore}</p>
    <button on:click={startGame}>Start Game</button>
  </main>
  
  <style>
    .start-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
  
    h1 {
      font-size: 3em;
      color: white;
    }
  
    p {
      font-size: 1.5em;
      color: white;
      margin-bottom: 20px;
    }
  
    button {
      padding: 10px 20px;
      font-size: 1.2em;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>
  