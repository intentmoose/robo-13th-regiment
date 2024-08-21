AFRAME.registerComponent('canvas-material', {
	schema: {
	   width: { type: 'int', default: 200 },
	   height: { type: 'int', default: 200 },
	   byId: { type: 'boolean', default: false },
	   id: { type: 'string', default: '' }
	},
	update: function() {
	   if (!this.canvas) {
		  this.canvas = document.createElement("canvas");
	   }
	   this.canvas.width = this.data.width;
	   this.canvas.height = this.data.height;
	   const texture = new THREE.CanvasTexture(this.canvas);
	   const material = new THREE.MeshStandardMaterial({ map: texture, transparent: true, side: AFRAME.THREE.DoubleSide });
 
	   if (this.data.byId && this.data.id) {
		  this.canvas.setAttribute("id", this.data.id);
		  document.body.appendChild(this.canvas);
		  this.el.setAttribute("src", `#${this.data.id}`);
	   } else {
		  setTimeout(() => {
			 this.el.object3D.children[0].material = material;
		  }, 100);
	   }
 
	   this.getContext = () => this.canvas.getContext("2d");
	   this.updateTexture = () => texture.needsUpdate = true;
	}
 });
 