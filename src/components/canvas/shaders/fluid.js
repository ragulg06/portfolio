export const vertexShader = `
  precision highp float;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float time;
  uniform vec3 color;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;

  void main() {
    vec2 uv = vUv;
    float t = time * 0.5;
    
    // Create a flowing effect
    float flow = sin(uv.x * 10.0 + t) * 0.5 + 0.5;
    flow *= sin(uv.y * 8.0 + t * 0.8) * 0.5 + 0.5;
    
    // Add some turbulence
    float turbulence = sin(uv.x * 20.0 + t * 1.5) * 
                     sin(uv.y * 15.0 + t * 1.2) * 0.5 + 0.5;
    
    // Mix colors
    vec3 finalColor = mix(color, color * 1.5, flow);
    finalColor = mix(finalColor, color * 0.5, turbulence);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`; 