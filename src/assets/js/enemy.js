AFRAME.registerComponent('canvas-enemy', {
  schema: {
    type: { type: 'string', default: 'fire' },
    size: { type: 'int', default: 512 },
  },

  init: function() {
    this.canvasMaterial = this.el.components['canvas-material'];
    this.ctx = this.canvasMaterial.getContext();
    this.updateCanvas();
  },

  update: function() {
    this.updateCanvas();
  },

  updateCanvas: function() {
    const ctx = this.ctx;
    const w = this.data.size;
    const h = this.data.size;
    ctx.clearRect(0, 0, w, h);

    switch (this.data.type) {
      case 'fire':
        this.drawEnemy(ctx, w, h, 'fire');
        break;
      case 'ice':
        this.drawEnemy(ctx, w, h, 'ice');
        break;
      case 'shamrock':
        this.drawEnemy(ctx, w, h, 'shamrock');
        break;
      case 'metal':
        this.drawEnemy(ctx, w, h, 'metal');
        break;
      default:
        this.drawEnemy(ctx, w, h, 'fire');
        break;
    }

    this.canvasMaterial.updateTexture();
  },

  drawEnemy: function(ctx, w, h, type) {
    const config = this.getEnemyConfig(type);
    this.drawBackground(ctx, w, h, config.bgColors);
    this.drawParticles(ctx, w, h, config.particle);
    this.drawNumber(ctx, w, h, config.number);
    this.drawHat(ctx, w, h, config.hat);
  },

  getEnemyConfig: function(type) {
    const configs = {
      fire: {
        bgColors: ["rgba(100, 25, 0, 0.8)", "rgba(50, 0, 0, 0.3)"],
        particle: { count: 30, sizeRange: [2, 7], color: () => `rgba(255, ${Math.random() * 255}, 0, ${Math.random()})` },
        number: { text: "13", font: "bold 120px Arial", gradient: ["#ff4500", "#ff0000"], shadow: "rgba(255, 69, 0, 0.8)", shadowBlur: 30 },
        hat: { text: "🔥", font: "50px Arial", offsetY: -80 }
      },
      ice: {
        bgColors: ["rgba(0, 150, 255, 0.8)", "rgba(0, 75, 127, 0.3)"],
        particle: { count: 30, sizeRange: [3, 11], color: () => "❄️" },
        number: { text: "13", font: "bold 120px Arial", gradient: ["#00f0ff", "#0077ff"], shadow: "rgba(0, 240, 255, 0.8)", shadowBlur: 15, shadowOffsetX: -5, shadowOffsetY: -5 },
        hat: { text: "❄️", font: "50px Arial", offsetY: -80 }
      },
      shamrock: {
        bgColors: ["rgba(0, 150, 0, 0.8)", "rgba(0, 75, 0, 0.3)"],
        particle: { count: 20, sizeRange: [5, 10], color: () => "🍀" },
        number: { text: "13", font: "bold 120px Arial", gradient: ["#00ff00", "#00cc00"], shadow: "rgba(0, 255, 0, 0.8)", shadowBlur: 20 },
        hat: { text: "🍀", font: "50px Arial", offsetY: -80 }
      },
      metal: {
        bgColors: ["rgba(60, 60, 60, 0.8)", "rgba(30, 30, 30, 0.3)"],
        particle: { count: 20, sizeRange: [2, 6], color: () => `rgba(255, 255, 255, ${Math.random()})` },
        number: { text: "13", font: "bold 120px Arial", gradient: ["#d3d3d3", "#a9a9a9"], shadow: "rgba(192, 192, 192, 0.8)", shadowBlur: 15 },
        hat: { text: "👑", font: "50px Arial", offsetY: -80 }
      }
    };
    return configs[type];
  },

  drawBackground: function(ctx, w, h, colors) {
    const gradientBg = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, 100);
    gradientBg.addColorStop(0, colors[0]);
    gradientBg.addColorStop(1, colors[1]);
    ctx.fillStyle = gradientBg;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 90, 0, Math.PI * 2);
    ctx.fill();
  },

  drawParticles: function(ctx, w, h, particleConfig) {
    for (let i = 0; i < particleConfig.count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const size = Math.random() * (particleConfig.sizeRange[1] - particleConfig.sizeRange[0]) + particleConfig.sizeRange[0];
      ctx.font = `${size}px Arial`;
      ctx.fillText(particleConfig.color(), x, y);
    }
  },

  drawNumber: function(ctx, w, h, numberConfig) {
    ctx.font = numberConfig.font;
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, numberConfig.gradient[0]);
    gradient.addColorStop(1, numberConfig.gradient[1]);
    ctx.fillStyle = gradient;
    ctx.shadowColor = numberConfig.shadow;
    ctx.shadowBlur = numberConfig.shadowBlur;
    if (numberConfig.shadowOffsetX) ctx.shadowOffsetX = numberConfig.shadowOffsetX;
    if (numberConfig.shadowOffsetY) ctx.shadowOffsetY = numberConfig.shadowOffsetY;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(numberConfig.text, w / 2, h / 2);
  },

  drawHat: function(ctx, w, h, hatConfig) {
    ctx.font = hatConfig.font;
    ctx.fillText(hatConfig.text, w / 2, h / 2 + hatConfig.offsetY);
  },
});