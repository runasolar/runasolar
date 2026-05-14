"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Tooltip,
} from "react-leaflet";
import L, { type GeoJSON as LeafletGeoJSON, type PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";

const KHM: [number, number] = [49.4229, 26.9871];

/* Installations — 3 individual objects scattered across Khmelnytskyi */
const INSTALLATIONS: {
  id: string;
  index: number;
  pos: [number, number];
  title: string;
  power: string;
  area: string;
}[] = [
  {
    id: "i1",
    index: 1,
    pos: [49.4310, 26.9710], // Razinsky / north-west
    title: "Приватний дім",
    power: "12 кВт",
    area: "вул. Прибузька",
  },
  {
    id: "i2",
    index: 2,
    pos: [49.4150, 27.0050], // South-east (Vyhulivka)
    title: "Готель",
    power: "25 кВт",
    area: "район Виставка",
  },
  {
    id: "i3",
    index: 3,
    pos: [49.4080, 26.9650], // South-west (Dubove)
    title: "Виробничий цех",
    power: "40 кВт",
    area: "район Дубове",
  },
];

/* Other landmark cities in the oblast (no installations there yet) */
const OBLAST_CITIES: {
  id: string;
  name: string;
  pos: [number, number];
}[] = [
  { id: "shp", name: "Шепетівка", pos: [50.1851, 27.0625] },
  { id: "skn", name: "Старокостянтинів", pos: [49.7569, 27.2122] },
  { id: "kp", name: "Кам'янець-Подільський", pos: [48.6747, 26.5827] },
];

const NEIGHBOUR_CAPITALS: {
  id: string;
  name: string;
  oblast: string;
  pos: [number, number];
}[] = [
  { id: "ter", name: "Тернопіль", oblast: "Тернопільська", pos: [49.5535, 25.5948] },
  { id: "riv", name: "Рівне", oblast: "Рівненська", pos: [50.6199, 26.2516] },
  { id: "zhy", name: "Житомир", oblast: "Житомирська", pos: [50.2547, 28.6587] },
  { id: "vin", name: "Вінниця", oblast: "Вінницька", pos: [49.2331, 28.4682] },
  { id: "che", name: "Чернівці", oblast: "Чернівецька", pos: [48.2920, 25.9358] },
];

/* Custom HTML icons */
const installationIcon = (n: number) =>
  L.divIcon({
    className: "rs-marker rs-marker-install",
    html: `<div class="rs-pin-install"><span class="rs-pin-install-ring"></span><span class="rs-pin-install-core">${n}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

const cityIcon = L.divIcon({
  className: "rs-marker rs-marker-city",
  html: `<span class="rs-pin-city"></span>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const neighbourIcon = L.divIcon({
  className: "rs-marker rs-marker-neighbour",
  html: `<span class="rs-pin-neighbour"></span>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

/* GeoJSON feature styling — green for home oblast, gold for neighbours */
function oblastStyle(feature?: GeoJSON.Feature): PathOptions {
  const isHome = feature?.properties?.isHome === true;
  return isHome
    ? {
        color: "rgb(var(--color-leaf-600))",
        weight: 2.5,
        opacity: 0.95,
        fillColor: "rgb(var(--color-leaf-600))",
        fillOpacity: 0.1,
      }
    : {
        color: "rgb(var(--color-sun-500))",
        weight: 2,
        opacity: 0.85,
        dashArray: "6 5",
        fillColor: "rgb(var(--color-sun-500))",
        fillOpacity: 0.05,
      };
}

export default function ServiceAreaMap() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/oblasts.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!mounted) return null;

  return (
    <>
      <MapContainer
        center={KHM}
        zoom={7}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={false}
        style={{
          width: "100%",
          height: "100%",
          background: "rgb(var(--color-bg-warm))",
        }}
        className="rs-map"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png"
          pane="markerPane"
        />

        {/* Oblast borders */}
        {data && (
          <GeoJSON
            data={data}
            style={oblastStyle as L.StyleFunction}
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.name ?? "";
              const isHome = feature.properties?.isHome === true;
              const label = isHome
                ? `<b>${name} область</b><br/><span style="color: rgb(var(--color-leaf-600))">Працюємо повноцінно</span>`
                : `<b>${name} область</b><br/><span style="color: rgb(var(--color-sun-600))">Виїжджаємо за домовленістю</span>`;
              layer.bindTooltip(label, {
                direction: "top",
                sticky: true,
              });
              layer.on({
                mouseover: (e) => {
                  const target = e.target as LeafletGeoJSON;
                  target.setStyle({
                    weight: isHome ? 3.5 : 3,
                    fillOpacity: isHome ? 0.2 : 0.1,
                  });
                },
                mouseout: (e) => {
                  const target = e.target as LeafletGeoJSON;
                  target.setStyle(oblastStyle(feature) as PathOptions);
                },
              });
            }}
          />
        )}

        {/* Installations — 3 real objects across Khmelnytskyi */}
        {INSTALLATIONS.map((inst) => (
          <Marker
            key={inst.id}
            position={inst.pos}
            icon={installationIcon(inst.index)}
          >
            <Popup>
              <div className="rs-popup">
                <div className="rs-popup-title">
                  Об'єкт №{inst.index} · {inst.power}
                </div>
                <div className="rs-popup-sub">
                  {inst.title} · {inst.area}, Хмельницький
                </div>
              </div>
            </Popup>
            <Tooltip direction="top" offset={[0, -18]}>
              <b>Об'єкт №{inst.index}</b> · {inst.power}
              <br />
              {inst.title}
            </Tooltip>
          </Marker>
        ))}

        {/* Landmark cities in the oblast */}
        {OBLAST_CITIES.map((c) => (
          <Marker key={c.id} position={c.pos} icon={cityIcon}>
            <Tooltip direction="top" offset={[0, -8]}>
              {c.name}
            </Tooltip>
          </Marker>
        ))}

        {/* Neighbouring oblast capitals */}
        {NEIGHBOUR_CAPITALS.map((n) => (
          <Marker key={n.id} position={n.pos} icon={neighbourIcon}>
            <Popup>
              <div className="rs-popup">
                <div className="rs-popup-title">{n.name}</div>
                <div className="rs-popup-sub">
                  {n.oblast} область · за домовленістю
                </div>
              </div>
            </Popup>
            <Tooltip direction="top" offset={[0, -8]}>
              {n.name} · {n.oblast.toLowerCase()} обл.
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <style jsx global>{`
        /* Restore native Leaflet cursors */
        html.cursor-hidden .rs-map.leaflet-container,
        html.cursor-hidden .rs-map.leaflet-container * {
          cursor: grab !important;
        }
        html.cursor-hidden .rs-map.leaflet-container.leaflet-dragging,
        html.cursor-hidden .rs-map.leaflet-container.leaflet-dragging * {
          cursor: grabbing !important;
        }
        html.cursor-hidden .rs-map .leaflet-interactive,
        html.cursor-hidden .rs-map .leaflet-marker-icon,
        html.cursor-hidden .rs-map .leaflet-marker-icon *,
        html.cursor-hidden .rs-map .leaflet-popup,
        html.cursor-hidden .rs-map .leaflet-popup *,
        html.cursor-hidden .rs-map .leaflet-control-zoom a {
          cursor: pointer !important;
        }

        .rs-map.leaflet-container {
          font-family: var(--font-sans);
          font-size: 13px;
        }
        .rs-map .leaflet-control-zoom {
          border: 1px solid rgb(var(--color-line));
          border-radius: 12px;
          overflow: hidden;
          margin: 12px;
        }
        .rs-map .leaflet-control-zoom a {
          background: rgb(var(--color-bg));
          color: rgb(var(--color-ink));
          border: none;
          width: 30px;
          height: 30px;
          line-height: 30px;
        }
        .rs-map .leaflet-control-zoom a:hover {
          background: rgb(var(--color-bg-warm));
        }
        .rs-map .leaflet-popup-content-wrapper {
          background: rgb(var(--color-bg));
          color: rgb(var(--color-ink));
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(26, 31, 27, 0.18);
        }
        .rs-map .leaflet-popup-tip {
          background: rgb(var(--color-bg));
        }
        .rs-popup-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 14px;
          color: rgb(var(--color-ink));
        }
        .rs-popup-sub {
          margin-top: 4px;
          font-size: 12px;
          color: rgb(var(--color-ink-muted));
        }
        .rs-map .leaflet-tooltip {
          background: rgb(var(--color-ink));
          color: rgb(var(--color-bg));
          border: none;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 14px rgba(26, 31, 27, 0.3);
          line-height: 1.4;
        }
        .rs-map .leaflet-tooltip b {
          font-weight: 700;
        }
        .rs-map .leaflet-tooltip-top:before,
        .rs-map .leaflet-tooltip-bottom:before,
        .rs-map .leaflet-tooltip-left:before,
        .rs-map .leaflet-tooltip-right:before {
          display: none;
        }

        /* Remove blue focus rectangle when clicking polygons/markers */
        .rs-map .leaflet-interactive,
        .rs-map .leaflet-marker-icon,
        .rs-map path.leaflet-interactive {
          outline: none !important;
        }
        .rs-map .leaflet-interactive:focus,
        .rs-map .leaflet-marker-icon:focus,
        .rs-map path.leaflet-interactive:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        /* Installation pin (numbered 1/2/3 for individual objects) */
        .rs-pin-install {
          position: relative;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
        }
        .rs-pin-install-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgb(var(--color-sun-500) / 0.3);
          animation: rs-pulse 2.4s ease-out infinite;
        }
        .rs-pin-install-core {
          position: relative;
          z-index: 1;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 11px;
          color: rgb(var(--color-ink));
          background: rgb(var(--color-sun-500));
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          display: grid;
          place-items: center;
          box-shadow: 0 3px 10px rgba(26, 31, 27, 0.35);
          border: 2px solid rgb(var(--color-ink));
          transition: transform 0.2s ease;
        }
        .rs-marker-install:hover .rs-pin-install-core {
          transform: scale(1.15);
        }
        @keyframes rs-pulse {
          0% { transform: scale(0.55); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .rs-pin-city {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: rgb(var(--color-leaf-600));
          border: 2px solid rgb(var(--color-bg));
          box-shadow: 0 2px 6px rgba(26, 31, 27, 0.25);
          transition: transform 0.2s ease;
        }
        .rs-marker-city:hover .rs-pin-city {
          transform: scale(1.4);
        }

        .rs-pin-neighbour {
          display: block;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          background: rgb(var(--color-bg));
          border: 2px solid rgb(var(--color-sun-500));
          box-shadow: 0 2px 6px rgba(26, 31, 27, 0.25);
          transition: transform 0.2s ease;
        }
        .rs-marker-neighbour:hover .rs-pin-neighbour {
          transform: scale(1.3);
          border-width: 3px;
        }
      `}</style>
    </>
  );
}
