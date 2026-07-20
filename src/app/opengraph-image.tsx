import { ImageResponse } from "next/og";

export const alt = "oito, lo hace por ti: automatización con IA para pymes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Composición de marca sobre forest-deep. Tipografía del sistema (bold, redondeada
 * donde se pueda): la ImageResponse no carga las fuentes del sitio sin embeber el
 * archivo; si más adelante se quiere Varela Round exacta, se añade el .ttf en assets
 * y se pasa en `fonts`. Decisión consciente para no bloquear la fase. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#002a2c",
          color: "#eafff6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: 0,
            right: 0,
            height: 240,
            display: "flex",
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(9,188,138,0.28), rgba(9,188,138,0) 70%)",
          }}
        />
        <div style={{ fontSize: 160, fontWeight: 700, letterSpacing: -4, display: "flex" }}>
          oito
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: 14,
            color: "#09bc8a",
            display: "flex",
          }}
        >
          LO HACE POR TI
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "rgba(234,255,246,0.78)",
            display: "flex",
          }}
        >
          Automatización con IA para tu negocio
        </div>
      </div>
    ),
    { ...size },
  );
}
