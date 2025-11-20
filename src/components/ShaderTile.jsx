import { useEffect, useRef, useState } from 'react'

// Lightweight WebGL fragment-shader renderer for preview tiles
// Props: { frag, className }
export default function ShaderTile({ frag, className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const startRef = useRef(performance.now())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, preserveDrawingBuffer: false })
    if (!gl) return
    glRef.current = gl

    // Vertex shader (full-screen quad)
    const vertSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // Wrap fragment shader with uniforms
    const fragSrc = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_res;
      uniform vec2 u_mouse;
      uniform float u_dpr;
      // user fragment body expects a function mainImage(out vec4, in vec2)
      ${frag}
      void main(){
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        vec4 col = vec4(0.0);
        mainImage(col, uv);
        gl_FragColor = col;
      }
    `

    const compile = (type, src) => {
      const sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('Shader compile error:', gl.getShaderInfoLog(sh))
        gl.deleteShader(sh)
        return null
      }
      return sh
    }

    const vs = compile(gl.VERTEX_SHADER, vertSrc)
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc)
    if (!vs || !fs) return

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program))
      return
    }
    programRef.current = program

    const position = gl.getAttribLocation(program, 'position')
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    // two triangles covering clip space
    const verts = new Float32Array([
      -1, -1,  1, -1,  -1,  1,
       -1,  1,  1, -1,   1,  1,
    ])
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)

    gl.useProgram(program)
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const u_time = gl.getUniformLocation(program, 'u_time')
    const u_res = gl.getUniformLocation(program, 'u_res')
    const u_mouse = gl.getUniformLocation(program, 'u_mouse')
    const u_dpr = gl.getUniformLocation(program, 'u_dpr')

    const state = { width: 0, height: 0, mouse: [0, 0], playing: true }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))
      if (width !== state.width || height !== state.height) {
        state.width = width
        state.height = height
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
        gl.uniform2f(u_res, width, height)
        gl.uniform1f(u_dpr, dpr)
      }
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      state.mouse[0] = (e.clientX - rect.left) * (window.devicePixelRatio || 1)
      state.mouse[1] = (rect.bottom - e.clientY) * (window.devicePixelRatio || 1)
    }

    canvas.addEventListener('mousemove', onMouseMove)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // pause when not visible
    const io = new IntersectionObserver((entries) => {
      state.playing = entries[0].isIntersecting
    }, { threshold: 0.1 })
    io.observe(canvas)

    setReady(true)

    const loop = (t) => {
      rafRef.current = requestAnimationFrame(loop)
      if (!state.playing) return
      resize()
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(u_time, (t - startRef.current) * 0.001)
      gl.uniform2f(u_mouse, state.mouse[0], state.mouse[1])
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      if (program) gl.deleteProgram(program)
      if (fs) gl.deleteShader(fs)
      if (vs) gl.deleteShader(vs)
      if (buffer) gl.deleteBuffer(buffer)
    }
  }, [frag])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full block" aria-hidden={!ready} />
      {!ready && (
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-indigo-500/15 to-cyan-500/20" />
      )}
    </div>
  )
}
