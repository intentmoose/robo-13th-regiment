AFRAME.registerShader('grid-shader', {
  schema: {
    time: {type: 'time', is: 'uniform'}, uvScale: {type: 'float', is: 'uniform', default: 5.0}  // Control the repetition of the texture
  },
  vertexShader: `varying vec2 vUV;uniform float uvScale;void main(){vUV=uv*uvScale;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader: `varying vec2 vUV;uniform float time;void main(){vec3 color1=vec3(1.0,0.0,0.0);vec3 color2=vec3(0.0,0.0,1.0);vec3 color3=vec3(0.0,1.0,0.0);vec3 gridColor;float phase=mod(time*0.0001,3.0);if(phase<1.0){gridColor=mix(color1,color2,phase);}else if(phase<2.0){gridColor=mix(color2,color3,phase-1.0);}else{gridColor=mix(color3,color1,phase-2.0);}float gridWidth=0.05;vec2 grid=fract(vec2(vUV.x,vUV.y+time*0.00005)*10.0)-0.5;float line=min(abs(grid.x),abs(grid.y));float intensity=smoothstep(gridWidth,gridWidth-0.02,line);vec3 color=gridColor*intensity;float alpha=intensity>0.0?0.5:0.0;gl_FragColor=vec4(color,alpha);}`
});

AFRAME.registerShader('sun-shader', {
  schema: { time: { type: 'time', is: 'uniform' } },
  vertexShader: `varying vec2 vUV;void main(){vUV=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader: `precision mediump float;uniform float time;varying vec2 vUV;void main(){vec2 uv=vUV;vec2 sunCenter=vec2(0.5,0.5);float sunRadius=0.45;vec3 topColor=vec3(1.2,0.9,0.0);vec3 bottomColor=vec3(1.2,0.3,0.4);float dist=length(uv-sunCenter);vec3 color=mix(bottomColor,topColor,smoothstep(0.0,1.0,uv.y));float glowIntensity=smoothstep(sunRadius-0.02,sunRadius,dist);if(dist<sunRadius&&uv.y<0.5){float lineThickness=0.2;float speed=time*0.0001;float lines=mod(uv.y*2.0+speed,0.3);if(step(lineThickness,lines)>0.0){discard;}}if(dist<sunRadius){gl_FragColor=vec4(color,1.0);}else{discard;}}`
});