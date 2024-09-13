// @ts-nocheck 
AFRAME.registerComponent('mountains', {
    init: function () {
      const el = this.el;
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      const colors = ["#813945", "#7B3647", "#753146", "#663047"];
      colors.forEach(color => {
        let x = 0, y = canvas.height * (Math.random() * 0.2 + 0.7);
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        while (x < canvas.width) {
          let dx = Math.random() * 20 + 50, dy = (Math.random() - 0.5) * 100;
          x += dx;
          y += dy;
          if (y < 0 || y > canvas.height) y -= 2 * dy;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, y);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, canvas.height * 0.7);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
      });
  
      const tex = new THREE.CanvasTexture(canvas);
      el.setAttribute('material', 'src', tex);
    }
  });