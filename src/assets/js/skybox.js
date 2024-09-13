// @ts-nocheck 
AFRAME.registerComponent('canvas-sky', {
    init: function () {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const c = canvas.getContext('2d');
      const w = canvas.width, h = canvas.height;
      const g = c.createLinearGradient(w / 2, 0, w / 2, h);
      g.addColorStop(0, "#303461");
      g.addColorStop(0.3, "#85536E");
      g.addColorStop(0.6, "#D46A4B");
      g.addColorStop(0.9, "#EB7337");
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
      const t = new THREE.CanvasTexture(canvas);
      this.el.setAttribute('material', 'shader', 'flat');
      this.el.setAttribute('material', 'src', t);
    }
  });