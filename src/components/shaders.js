// A few compact GLSL fragment snippets using a Shadertoy-like mainImage signature
// uniforms provided: u_time, u_res, u_mouse, u_dpr

export const neonGrid = `
void mainImage(out vec4 fragColor, in vec2 uv){
  vec2 p = (uv - 0.5) * vec2(u_res.x/u_res.y, 1.0);
  float t = u_time * 0.6;
  // rotate slowly
  float c = cos(t*0.1), s = sin(t*0.1);
  mat2 R = mat2(c,-s,s,c);
  p *= R;
  // moving grid
  vec2 g = abs(fract(p*10.0 + t) - 0.5);
  float line = smoothstep(0.48, 0.49, 0.5 - max(g.x,g.y));
  // glow layers
  float glow = line;
  for(int i=1;i<5;i++){
    float w = float(i) * 0.01;
    glow += smoothstep(0.48-w, 0.49-w, 0.5 - max(g.x,g.y)) * (0.7/float(i));
  }
  vec3 col = 0.6*vec3(0.8,0.2,1.0) * glow + 0.6*vec3(0.0,1.0,1.2) * glow*0.6;
  // vignette
  float v = smoothstep(1.2, 0.2, length(p));
  col *= v;
  // subtle scanlines
  col *= 0.9 + 0.1*sin((uv.y+u_time*0.3)*800.0/u_res.y);
  fragColor = vec4(col, 1.0);
}`

export const plasma = `
void mainImage(out vec4 fragColor, in vec2 uv){
  vec2 p = uv*2.0-1.0; p.x *= u_res.x/u_res.y;
  float t = u_time*0.7;
  float a = sin(p.x*3.0 + t) + cos(p.y*4.0 - t*1.2);
  float b = sin((p.x+p.y)*2.5 - t*0.8);
  float m = a*b;
  vec3 col = 0.5 + 0.5*cos(vec3(0.0, 0.6, 1.0) + m*3.5 + t*0.4);
  // holographic tint
  col *= vec3(0.9,1.2,1.5);
  // bloom-ish boost
  col += pow(max(0.0, m), 3.0) * 0.35;
  fragColor = vec4(col, 1.0);
}`

export const particleFlow = `
// signed distance to line segment
float sdSegment(vec2 p, vec2 a, vec2 b){
  vec2 pa = p-a, ba = b-a; float h = clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0); return length(pa - ba*h);
}
void mainImage(out vec4 fragColor, in vec2 uv){
  vec2 p = uv*2.0-1.0; p.x *= u_res.x/u_res.y;
  float t = u_time*0.8;
  // mouse attractor
  vec2 m = (u_mouse/u_res)*2.0-1.0; m.x *= u_res.x/u_res.y;
  // flow field
  float ang = sin(p.y*2.5 + t) + cos(p.x*3.0 - t);
  vec2 v = vec2(cos(ang), sin(ang))*0.45;
  vec2 q = p + v*0.2;
  float d = sdSegment(p, p, q);
  float glow = 0.0;
  for(int i=0;i<6;i++){
    float tt = t*0.5 + float(i)*0.25;
    vec2 qp = p + vec2(cos(tt+i), sin(tt*1.2+i))*0.2 + v*float(i)*0.06;
    float di = length(qp - m);
    glow += 0.015/(di*di + 0.01);
  }
  vec3 col = mix(vec3(0.02,0.05,0.08), vec3(0.15,0.9,1.2), clamp(glow*0.9,0.0,1.0));
  col += 0.6*exp(-10.0*d);
  // vignette
  col *= smoothstep(1.4, 0.2, length(p));
  fragColor = vec4(col, 1.0);
}`
