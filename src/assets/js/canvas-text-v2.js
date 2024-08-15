(function () {
  /**
   * Draw multi line text.
   * Font size must be specified in px unit.
   */
  function drawMultiLineText(context, text) {
    let matchRes = context.font.match(/(\d+)px/);

    // extract font size
    let fontSize = matchRes ? Number(matchRes[1]) : 10;

    let x = getDrawTextX(context);
    let y = fontSize;

    text.split(/\n/).forEach((line) => {
      while (true) {
        let rest = drawAndGetRest(context, line, x, y);
        y += fontSize;
        if (line === rest) break;

        line = rest;
        if (!line) break;
      }
    });
  }

  /**
   * Returns drawing text X position.
   */
  function getDrawTextX(context) {
    switch (context.textAlign) {
      case 'start':
        return 0;
      case 'center':
        return context.canvas.width * 0.5;
      case 'right':
        return context.canvas.width;
    }

    throw new Error('Unknown textAlign: ' + context.textAlign);
  }

  /**
   * Draw line. Returns rest of line if overflowed from canvas.
   */
  function drawAndGetRest(context, line, x, y) {
    let canvasWidth = context.canvas.width;

    for (let i = 1; i < line.length; ++i) {
      let str = line.substr(0, i);
      let size = context.measureText(str);

      // Test if str will be overflowed from canvas
      if (size.width > canvasWidth) {
        // Draw until previous word or character
        let spaceIndex = line.lastIndexOf(' ', i);
        let endIndex = spaceIndex === -1 ? i - 1 : spaceIndex + 1;
        let drawStr = str.substr(0, endIndex);

        context.fillText(drawStr, x, y);

        // Rest of line
        return line.substr(endIndex);
      }
    }

    // Draw all of line
    context.fillText(line, x, y);

    // and no rest of line
    return null;
  }

  AFRAME.registerComponent('canvas-text', {
    dependencies: ['canvas-material'],
    schema: {
      text: {
        type: 'string',
      },
      font: {
        type: 'string',
      },
      strokeStyle: {
        type: 'string',
      },
      fillStyle: {
        type: 'string',
      },
      textAlign: {
        type: 'string',
      },
      textBaseline: {
        type: 'string',
      },
      direction: {
        type: 'string',
      },
      shadowBlur: {
        type: 'number',
      },
      shadowColor: {
        type: 'string',
      },
      papyrus: {
        type: 'boolean',
      },
      column: {
        type: 'boolean',
      },
      columnTop: {
        type: 'boolean',
      },
      heaven: {
        type: 'boolean',
      },
    },
    update() {
      // this.el.addEventListener('loaded', () => {
      // Get canvas context from canvas-material component
      let canvasMaterial = this.el.components['canvas-material'];
      let w = canvasMaterial.data.width;
      let h = canvasMaterial.data.height;
      let ctx = this.ctx;
      ctx = canvasMaterial.getContext();
      ctx.clearRect(0, 0, w, h);



      // Apply data
      ctx.font = this.data.font;
      ctx.strokeStyle = this.data.strokeStyle;
      ctx.fillStyle = this.data.fillStyle;
      ctx.textAlign = this.data.textAlign;
      ctx.textBaseline = this.data.textBaseline;
      ctx.direction = this.data.direction;
      ctx.shadowBlur = this.data.shadowBlur;
      ctx.shadowColor = this.data.shadowColor;

      drawMultiLineText(ctx, this.data.text);

      canvasMaterial.updateTexture();
      //   console.log(this.el.components['material'].material.side);
      // this.el.components['material'].material.side = THREE.DoubleSide;

      // this.el.components['material'].material.needsUpdate = true;
      // });
    },
  });
})();
