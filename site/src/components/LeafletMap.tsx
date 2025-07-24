import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
    className?: string;
    style?: React.CSSProperties;
}

export function LeafletMap({ className = '', style = {} }: LeafletMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let map: any;
        let leaflet: typeof import('leaflet');
        let geoLayer: any;

        (async () => {
            leaflet = await import('leaflet');
            if (!mapRef.current) return;

            map = leaflet.map(mapRef.current).setView([-23.7, -53.5], 9.2);

            leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors',
            }).addTo(map);

            fetch('https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-41-mun.json')
                .then(res => res.json())
                .then((geojson: any) => {
                    const nomes = [
                        "Altonia", "Sao Jorge do Patrocinio", "Esperanca Nova", "Icarai", "Nova Olimpia",
                        "Maria Helena", "Douradina", "Cruzeiro do Oeste", "Francisco Alves", "Mariluz",
                        "Brasilandia", "Perola", "Umuarama", "Ivate", "Xambre", "Ipora", "Alto Piquiri"
                    ];

                    const fim: GeoJSON.FeatureCollection = {
                        type: "FeatureCollection",
                        features: geojson.features.filter((f: any) => {
                            const nm = f.properties.name.normalize('NFD').replace(/[^\w\s]/g, '');
                            return nomes.map(n => n.toUpperCase()).includes(nm.toUpperCase());
                        })
                    };

                    geoLayer = leaflet.geoJSON(fim, {
                        style: {
                            fillColor: '#F7B733',
                            fillOpacity: 0.5,
                            color: '#2D2F93',
                            weight: 2,
                            stroke: true
                        },
                        onEachFeature: (feature, layer) => {
                            if (feature.properties?.name) {
                                layer.bindPopup(`<b>${feature.properties.name}</b>`);
                            }
                        }
                    }).addTo(map);
                })
                .catch(console.error);
        })();

        return () => { if (map) map.remove(); };
    }, []);

    return (
        <div
            ref={mapRef}
            className={`w-full h-full ${className}`}
            style={{ ...style }}
        />
    );
}
