"use client";

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color, Vec2 } from 'ogl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Threads.module.css';

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

interface ThreadsProps {
    color?: [number, number, number];
    amplitude?: number;
    distance?: number;
    enableMouseInteraction?: boolean;
    isLoaded?: boolean;
    [key: string]: unknown;
}

const Threads = ({ color = [0.035, 0.737, 0.541], amplitude = 1, distance = 0, enableMouseInteraction = false, isLoaded = true, ...rest }: ThreadsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number | null>(null);

    useGSAP(() => {
        // Reveal the threads on every route (not only pages that have an #hero).
        if (containerRef.current) {
            // Initial state: hidden
            gsap.set(containerRef.current, {
                opacity: 0,
                maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%)',
                webkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%)',
                maskSize: '200% 100%',
                webkitMaskSize: '200% 100%',
                maskPosition: '100% 0',
                webkitMaskPosition: '100% 0',
                maskRepeat: 'no-repeat',
                webkitMaskRepeat: 'no-repeat',
            });

            if (!isLoaded) return;

            // Timed animation instead of scrolling
            const tl = gsap.timeline({ delay: 0.5 });

            // Reveal opacity immediately then animate mask
            tl.to(containerRef.current, { opacity: 1, duration: 0.05 }, 0)
                .to(containerRef.current, {
                    maskPosition: '0% 0',
                    webkitMaskPosition: '0% 0',
                    duration: 3, // slightly slower for cinematic feel
                    ease: 'power2.inOut'
                }, 0);
        }
    }, { scope: containerRef, dependencies: [isLoaded] });

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        /* DPR limitado a 1.5: el shader evalúa 40 líneas de ruido Perlin por píxel y a
         * DPR nativo (1.25–2 en Windows) satura la GPU integrada, robando frames al
         * scroll. Como fondo difuso, la pérdida de nitidez es imperceptible. */
        const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
        const renderer = new Renderer({ alpha: true, dpr });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                },
                uColor: { value: new Color(...color) },
                uAmplitude: { value: amplitude },
                uDistance: { value: distance },
                uMouse: { value: new Vec2(0.5, 0.5) }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        // Declarada antes de resize() porque resize() se invoca de inmediato más abajo
        // y, tras el fix de reevaluar la pausa en resize, evaluatePause()/setPaused()
        // leen `paused`: debe estar inicializada (fuera del temporal dead zone) para
        // esa primera llamada.
        let paused = false;

        function resize() {
            if (!container) return;
            const { clientWidth, clientHeight } = container;
            renderer.setSize(clientWidth, clientHeight);
            program.uniforms.iResolution.value.r = gl.canvas.width;
            program.uniforms.iResolution.value.g = gl.canvas.height;
            program.uniforms.iResolution.value.b = gl.canvas.width / gl.canvas.height;
            evaluatePause();
        }
        window.addEventListener('resize', resize);
        resize();

        const currentMouse = [0.5, 0.5];
        let targetMouse = [0.5, 0.5];

        function handleMouseMove(e: MouseEvent) {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            targetMouse = [x, y];
        }
        function handleMouseLeave() {
            targetMouse = [0.5, 0.5];
        }
        if (enableMouseInteraction) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);
            container.style.pointerEvents = 'auto'; // Enable pointer events for mouse interaction
        }

        function update(t: number) {
            if (enableMouseInteraction) {
                const smoothing = 0.05;
                currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
                currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
                program.uniforms.uMouse.value.set(currentMouse[0], currentMouse[1]);
            } else {
                program.uniforms.uMouse.value.set(0.5, 0.5);
            }
            program.uniforms.iTime.value = t * 0.001;

            renderer.render({ scene: mesh });
            animationFrameId.current = requestAnimationFrame(update);
        }
        // resize() ya corrió una vez arriba (llamada síncrona en el setup) y puede haber
        // marcado `paused = true` si se monta con una sección clara cubriendo el viewport;
        // no armar el rAF inicial en ese caso o quedaría corriendo pese a la pausa.
        if (!paused) {
            animationFrameId.current = requestAnimationFrame(update);
        }

        /* Pausa invisible: el shader no corre si la pestaña está oculta o si una sección
         * clara (cream, opaca) cubre todo el viewport; ahí los hilos no se ven de todos
         * modos. Al reanudar, iTime sigue de t real: sin salto perceptible. */
        function setPaused(next: boolean) {
            if (next === paused) return;
            paused = next;
            if (paused) {
                if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            } else if (!animationFrameId.current) {
                animationFrameId.current = requestAnimationFrame(update);
            }
        }
        function evaluatePause() {
            if (document.hidden) {
                setPaused(true);
                return;
            }
            const vh = window.innerHeight;
            const covered = Array.from(document.querySelectorAll('.section-light')).some((el) => {
                const r = el.getBoundingClientRect();
                return r.top <= 0 && r.bottom >= vh;
            });
            setPaused(covered);
        }
        let scrollTick = false;
        function onScroll() {
            if (scrollTick) return;
            scrollTick = true;
            requestAnimationFrame(() => {
                scrollTick = false;
                evaluatePause();
            });
        }
        document.addEventListener('visibilitychange', evaluatePause);
        window.addEventListener('scroll', onScroll, { passive: true });
        evaluatePause();

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', evaluatePause);
            window.removeEventListener('scroll', onScroll);

            if (enableMouseInteraction) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
            // gl.getExtension('WEBGL_lose_context')?.loseContext(); // Optional cleanup
        };
    }, [color, amplitude, distance, enableMouseInteraction]);

    return <div ref={containerRef} className={styles['threads-container']} style={{ opacity: 0 }} {...rest} />;
};

export default Threads;
