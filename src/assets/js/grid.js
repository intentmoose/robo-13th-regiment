AFRAME.registerShader('glowing-grid-tunnel', {
  schema: {
    time: {type: 'time', is: 'uniform'},
    uvScale: {type: 'float', is: 'uniform', default: 5.0}  // Control the repetition of the texture
  },
  vertexShader: `varying vec2 vUV;uniform float uvScale;void main(){vUV=uv*uvScale;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader: `varying vec2 vUV;uniform float time;void main(){vec3 color1=vec3(1.0,0.0,0.0);vec3 color2=vec3(0.0,0.0,1.0);vec3 color3=vec3(0.0,1.0,0.0);vec3 gridColor;float phase=mod(time*0.001,3.0);if(phase<1.0){gridColor=mix(color1,color2,phase);}else if(phase<2.0){gridColor=mix(color2,color3,phase-1.0);}else{gridColor=mix(color3,color1,phase-2.0);}float gridWidth=0.05;vec2 grid=fract(vec2(vUV.x,vUV.y+time*0.0005)*10.0)-0.5;float line=min(abs(grid.x),abs(grid.y));float intensity=smoothstep(gridWidth,gridWidth-0.02,line);vec3 color=gridColor*intensity;gl_FragColor=vec4(color,0.5);}`
});


AFRAME.registerShader('gradient-skybox', {
  schema: {
    time: {type: 'time', is: 'uniform'},
    color1: {type: 'color', is: 'uniform', default: '#ff0077'}, // Color at the bottom
    color2: {type: 'color', is: 'uniform', default: '#1e90ff'}  // Color at the top
  },
  vertexShader: `varying vec2 vUV;

      void main() {
        vUV = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
  fragmentShader: `precision mediump float;

      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUV;

      void main() {
        vec3 color = mix(color1, color2, vUV.y + 0.01 * sin(time * 0.001));  // Extremely slow animation
        gl_FragColor = vec4(color, 1.0);
      }`
});

AFRAME.registerShader('outdoor-sky', {
  schema: {
    time: {type: 'time', is: 'uniform'},
    colorTop: {type: 'color', is: 'uniform', default: '#87CEEB'}, // Sky blue color at the top
    colorBottom: {type: 'color', is: 'uniform', default: '#FFD700'}, // Golden yellow at the horizon
    cloudColor: {type: 'color', is: 'uniform', default: '#FFFFFF'} // White clouds
  },
  vertexShader: `varying vec2 vUV;

      void main() {
        vUV = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
  fragmentShader: `precision mediump float;

      uniform float time;
      uniform vec3 colorTop;
      uniform vec3 colorBottom;
      uniform vec3 cloudColor;
      varying vec2 vUV;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec3 skyColor = mix(colorBottom, colorTop, vUV.y);
        
        // Cloud movement
        vec2 cloudPos = vUV * 3.0;
        cloudPos.x += time * 0.00005;  // Slow cloud movement
        float clouds = smoothstep(0.3, 0.7, fbm(cloudPos));
        
        vec3 finalColor = mix(skyColor, cloudColor, clouds * 0.5);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }`
});

