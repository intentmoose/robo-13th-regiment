AFRAME.registerShader('glowing-grid-tunnel', {
  schema: {
    time: {type: 'time', is: 'uniform'},
    uvScale: {type: 'float', is: 'uniform', default: 5.0}  // Control the repetition of the texture
  },
  vertexShader: `varying vec2 vUV;uniform float uvScale;void main(){vUV=uv*uvScale;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader: `varying vec2 vUV;uniform float time;void main(){vec3 color1=vec3(1.0,0.0,0.0);vec3 color2=vec3(0.0,0.0,1.0);vec3 color3=vec3(0.0,1.0,0.0);vec3 gridColor;float phase=mod(time*0.0001,3.0);if(phase<1.0){gridColor=mix(color1,color2,phase);}else if(phase<2.0){gridColor=mix(color2,color3,phase-1.0);}else{gridColor=mix(color3,color1,phase-2.0);}float gridWidth=0.05;vec2 grid=fract(vec2(vUV.x,vUV.y+time*0.00005)*10.0)-0.5;float line=min(abs(grid.x),abs(grid.y));float intensity=smoothstep(gridWidth,gridWidth-0.02,line);vec3 color=gridColor*intensity;float alpha=intensity>0.0?0.5:0.0;gl_FragColor=vec4(color,alpha);}`
});



AFRAME.registerShader('transparent-sun-lines-shader', {
  schema: { time: { type: 'time', is: 'uniform' } },
  vertexShader: `varying vec2 vUV;
void main() {
  vUV = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  fragmentShader: `precision mediump float;
uniform float time;
varying vec2 vUV;

void main() {
  vec2 uv = vUV;
  vec2 sunCenter = vec2(0.5, 0.5);
  float sunRadius = 0.45;

  // Color gradient from yellow-orange to pink
  vec3 topColor = vec3(1.0, 0.8, 0.0);
  vec3 bottomColor = vec3(1.0, 0.2, 0.3);

  // Inside the sun, calculate distance from center
  float dist = length(uv - sunCenter);
  vec3 color = mix(bottomColor, topColor, smoothstep(0.0, 1.0, uv.y));

  // Create very thick and slow-moving lines on lower half
  if (dist < sunRadius && uv.y < 0.5) {
    float lineThickness = 0.23;
    float speed = time * 0.0001; // Very slow animation
    float lines = mod(uv.y * 2.0 + speed, 0.3);  // Fewer lines

    // Make the space between the lines transparent
    if (step(lineThickness, lines) > 0.0) {
      discard; // Make the gaps transparent
    }
  }

  // Apply final color only inside the sun
  if (dist < sunRadius) {
    gl_FragColor = vec4(color, 1.0);
  } else {
    discard; // Make everything outside the sun transparent
  }
}`
});


// AFRAME.registerShader('gradient-skybox', {
//   schema: {
//     time: {type: 'time', is: 'uniform'},
//     color1: {type: 'color', is: 'uniform', default: '#ff0077'}, // Color at the bottom
//     color2: {type: 'color', is: 'uniform', default: '#1e90ff'}  // Color at the top
//   },
//   vertexShader: `varying vec2 vUV;

//       void main() {
//         vUV = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }`,
//   fragmentShader: `precision mediump float;

//       uniform float time;
//       uniform vec3 color1;
//       uniform vec3 color2;
//       varying vec2 vUV;

//       void main() {
//         vec3 color = mix(color1, color2, vUV.y + 0.01 * sin(time * 0.001));  // Extremely slow animation
//         gl_FragColor = vec4(color, 1.0);
//       }`
// });

// AFRAME.registerShader('outdoor-sky', {
//   schema: {
//     time: {type: 'time', is: 'uniform'},
//     colorTop: {type: 'color', is: 'uniform', default: '#87CEEB'}, // Sky blue color at the top
//     colorBottom: {type: 'color', is: 'uniform', default: '#FFD700'}, // Golden yellow at the horizon
//     cloudColor: {type: 'color', is: 'uniform', default: '#FFFFFF'} // White clouds
//   },
//   vertexShader: `varying vec2 vUV;

//       void main() {
//         vUV = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }`,
//   fragmentShader: `precision mediump float;

//       uniform float time;
//       uniform vec3 colorTop;
//       uniform vec3 colorBottom;
//       uniform vec3 cloudColor;
//       varying vec2 vUV;

//       float noise(vec2 p) {
//         return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
//       }

//       float fbm(vec2 p) {
//         float value = 0.0;
//         float amplitude = 0.5;
//         for (int i = 0; i < 5; i++) {
//           value += amplitude * noise(p);
//           p *= 2.0;
//           amplitude *= 0.5;
//         }
//         return value;
//       }

//       void main() {
//         vec3 skyColor = mix(colorBottom, colorTop, vUV.y);
        
//         // Cloud movement
//         vec2 cloudPos = vUV * 3.0;
//         cloudPos.x += time * 0.00005;  // Slow cloud movement
//         float clouds = smoothstep(0.3, 0.7, fbm(cloudPos));
        
//         vec3 finalColor = mix(skyColor, cloudColor, clouds * 0.5);
        
//         gl_FragColor = vec4(finalColor, 1.0);
//       }`
// });

// AFRAME.registerShader('custom-grid-shader', {
//   schema: {
//     time: {type: 'time', is: 'uniform'},
//     gridResolution: {type: 'vec2', is: 'uniform', default: {x: 1024, y: 1024}},
//     top: {type: 'float', is: 'uniform', default: 1.0},
//     size: {type: 'float', is: 'uniform', default: 0.5},
//     sidesRatio: {type: 'float', is: 'uniform', default: 1.0},
//     speed: {type: 'float', is: 'uniform', default: 0.5},
//     gridColor: {type: 'color', is: 'uniform', default: '#ffffff'},
//     fadeClamp: {type: 'float', is: 'uniform', default: 1.0}
//   },

//   vertexShader: `
//     precision highp float;

//     attribute vec3 position;
//     attribute vec2 uv;

//     uniform mat4 modelViewMatrix;
//     uniform mat4 projectionMatrix;

//     varying vec2 fragCoord;

//     void main() {
//         fragCoord = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `,

//   fragmentShader: `
//     uniform float time;
//     uniform vec2 gridResolution;

//     uniform float top;
//     uniform float size;
//     uniform float sidesRatio;
//     uniform float speed;
//     uniform vec3 gridColor;
//     uniform float fadeClamp;

//     varying vec2 fragCoord;

//     float grid(vec2 uv, float speed) {
//       vec2 size = vec2(uv.y, uv.y * uv.y * 0.2) * 0.01;
//       uv += vec2(0.0, time * 4.0 * (speed + 0.05));
//       uv = abs(fract(uv) - 0.5);
//       vec2 lines = smoothstep(size, vec2(0.0), uv);
//       lines += smoothstep(size * 5.0, vec2(0.0), uv) * 0.4 * speed;
//       return clamp(lines.x + lines.y, 0.0, fadeClamp);
//     }

//     void main() {
//       vec2 uv = fragCoord;

//       if (uv.y < top) {
//         uv = (2.0 * fragCoord.xy - gridResolution.xy) / gridResolution.y;

//         uv.y = size / (abs(uv.y + 0.2) + 0.05);

//         uv.x *= uv.y * sidesRatio;

//         float gridVal = grid(uv, speed);

//         vec3 col = vec3(0.0, 0.0, 0.0);
//         col = mix(col, gridColor, gridVal);
//         col = mix(gridColor, vec3(1.0, 1.0, 1.0), gridVal - 0.2);
//         gl_FragColor = vec4(col.x, col.y, col.z, gridVal);
//       } else {
//         gl_FragColor = vec4(0, 0, 0, 0);
//       }
//     }
//   `
// });
