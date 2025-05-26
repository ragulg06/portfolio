import React, { useEffect, useRef } from 'react';

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform vec2 mouse;
  uniform float radius;
  uniform float force;
  uniform vec3 backColor;
  uniform float colorUpdateSpeed;

  // Noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 p = (uv * 2.0 - 1.0) * vec2(resolution.x / resolution.y, 1.0);
    
    // Mouse interaction with smooth falloff
    vec2 mousePos = (mouse * 2.0 - 1.0) * vec2(resolution.x / resolution.y, 1.0);
    float dist = length(p - mousePos);
    float influence = smoothstep(radius, 0.0, dist) * force;
    
    // Create fluid-like motion
    float t = time * 0.5;
    vec2 flow = vec2(
      sin(uv.x * 10.0 + t) * cos(uv.y * 8.0 + t * 0.8),
      cos(uv.x * 8.0 + t * 0.8) * sin(uv.y * 10.0 + t)
    );
    
    // Add noise
    vec2 noise = vec2(
      random(uv + t * 0.1),
      random(uv + t * 0.2)
    );
    
    // Combine flow and noise
    vec2 finalFlow = flow + noise * 0.1;
    
    // Dynamic color
    vec3 color = backColor + vec3(
      sin(time * colorUpdateSpeed + p.x * 2.0) * 0.2,
      cos(time * colorUpdateSpeed + p.y * 2.0) * 0.2,
      sin(time * colorUpdateSpeed + dist * 2.0) * 0.2
    );
    
    // Add flow influence to color
    color += vec3(
      sin(finalFlow.x * 10.0) * 0.1,
      cos(finalFlow.y * 10.0) * 0.1,
      sin(finalFlow.x * finalFlow.y * 10.0) * 0.1
    );
    
    // Add mouse influence
    color += vec3(influence * 0.8);
    
    // Make the effect more visible
    gl_FragColor = vec4(color, 0.5);
  }
`;

export function SplashCursor({
  BACK_COLOR = { r: 0.2, g: 0.3, b: 0.5 },
  COLOR_UPDATE_SPEED = 3,
  SPLAT_RADIUS = 0.8,
  SPLAT_FORCE = 8000,
}) {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    if (!gl) return;
    
    glRef.current = gl;

    // Create shader program
    const program = gl.createProgram();
    const vertexShaderObj = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShaderObj = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShaderObj, vertexShader);
    gl.shaderSource(fragmentShaderObj, fragmentShader);

    gl.compileShader(vertexShaderObj);
    gl.compileShader(fragmentShaderObj);

    gl.attachShader(program, vertexShaderObj);
    gl.attachShader(program, fragmentShaderObj);
    gl.linkProgram(program);

    programRef.current = program;

    // Create buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const timeLocation = gl.getUniformLocation(program, 'time');
    const mouseLocation = gl.getUniformLocation(program, 'mouse');
    const radiusLocation = gl.getUniformLocation(program, 'radius');
    const forceLocation = gl.getUniformLocation(program, 'force');
    const backColorLocation = gl.getUniformLocation(program, 'backColor');
    const colorUpdateSpeedLocation = gl.getUniformLocation(program, 'colorUpdateSpeed');

    // Animation loop
    function animate() {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      const program = programRef.current;
      if (!canvas || !gl || !program) return;

      // Update canvas size
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }

      // Clear canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Use shader program
      gl.useProgram(program);

      // Set uniforms
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, timeRef.current);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(radiusLocation, SPLAT_RADIUS);
      gl.uniform1f(forceLocation, SPLAT_FORCE);
      gl.uniform3f(backColorLocation, BACK_COLOR.r, BACK_COLOR.g, BACK_COLOR.b);
      gl.uniform1f(colorUpdateSpeedLocation, COLOR_UPDATE_SPEED);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Update time
      timeRef.current += 0.01;

      requestAnimationFrame(animate);
    }

    // Handle mouse movement
    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / canvas.width,
        y: 1 - (e.clientY - rect.top) / canvas.height,
      };
    }

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    });

    // Start animation
    animate();

    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShaderObj);
      gl.deleteShader(fragmentShaderObj);
    };
  }, [BACK_COLOR, COLOR_UPDATE_SPEED, SPLAT_RADIUS, SPLAT_FORCE]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
} 