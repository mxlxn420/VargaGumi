# Varga Gumi — Prémium Gumiabroncs Szerviz

Modern, cinematic weboldal a Varga Gumi & Autószerviz Szikszó számára.

## Tech stack

| Csomag | Szerepe |
|---|---|
| Vite + React + TypeScript | Alap framework |
| Three.js / @react-three/fiber / @react-three/drei | 3D jelenet |
| GSAP + ScrollTrigger | Scroll animációk, kamera path |
| Framer Motion | Drag-scroll karussel |
| Lenis | Smooth scroll |

## Funkciók

- **Hero** — full-viewport 3D gumiabroncs (TorusGeometry, piros wireframe overlay, alumínium felni, particle rendszer), cinematic kamera scroll animáció
- **Sticky scroll szekció** — wireframe tire panelonként lerp-elt pózzal és színnel (piros → narancssárga → arany), floating 3D stat szöveg (drei `<Text>`)
- **Marquee ticker** — GSAP végtelen horizontális scroll
- **Vélemények** — Framer Motion `drag="x"` karussel, floating R3F tire középen
- **Szolgáltatások grid** — ScrollTrigger stagger belépő animáció, hover border effect
- **Stats szekció** — count-up animáció (IntersectionObserver + rAF), diagonal clip-path
- **Kapcsolat** — Google Maps embed, GSAP ScrollTrigger belépő animáció
- **Mobil optimalizált** — egyszerűsített geometria, alacsonyabb DPR, sticky canvas elrejtve, hook-alapú responsive layout

## Fejlesztői indítás

```bash
npm install
npm run dev
```

Telefonos tesztelés (hálózaton):

```bash
npm run dev -- --host
```

## Elérhetőség

**Varga Gumi & Autószerviz**  
Szikszó, Kassai út 52. — 3800  
Tel: [(06 46) 796 692](tel:+3646796692)  
H–P: 07:00–17:00 | Szo: 07:00–12:00
