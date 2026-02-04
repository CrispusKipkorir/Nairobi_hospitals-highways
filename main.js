// Center on Nairobi
const map = L.map('map').setView([-1.2921, 36.8219], 12);

// Base layers
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
});

const terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
    attribution: 'Map tiles by Stamen Design',
    subdomains: 'abcd',
    maxZoom: 18
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye'
});

osm.addTo(map);

L.control.layers({
    "OpenStreetMap": osm,
    "Terrain": terrain,
    "Satellite": satellite
}, {}, { position: 'topright' }).addTo(map);

// Hospitals
fetch('data/hospital.geojson')
    .then(res => res.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                    radius: 7,
                    fillColor: "#d32f2f",
                    color: "#ffffff",
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: (feature, layer) => {
                const name = feature.properties?.name || feature.properties?.NAME || 'Hospital';
                layer.bindPopup(`<b>${name}</b><br>Hospital`);
            }
        }).addTo(map);
    })
    .catch(err => console.error('Error loading hospitals:', err));

// Highways
fetch('data/highways.geojson')
    .then(res => res.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: "#1976d2",
                weight: 4,
                opacity: 0.85
            },
            onEachFeature: (feature, layer) => {
                const name = feature.properties?.name || feature.properties?.NAME || 'Major Road';
                layer.bindPopup(`<b>${name}</b><br>Major Highway / Road`);
            }
        }).addTo(map);
    })
    .catch(err => console.error('Error loading highways:', err));