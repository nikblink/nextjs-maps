"use client";

import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useRef, useCallback } from 'react';

const categories = {
  "Alojamiento y Entretenimiento": [
    {
      coordinate: { lat: 20.370843, lng: -87.33655 },
      title: "Tulum Country Club",
      description: "Entrada principal al club.",
    },
    {
      coordinate: { lat: 20.370533, lng: -87.335173 },
      title: "Casino",
      description: "Un lugar para juegos de azar y entretenimiento.",
    },
    {
      coordinate: { lat: 20.375091, lng: -87.339944 },
      title: "PGA Riviera Maya",
      description: "Campo de golf y resort.",
    },
    {
      coordinate: { lat: 20.37276, lng: -87.3359 },
      title: "Campo Profesional / Golf Travel",
      description: "Campo de golf profesional y servicios de viaje.",
    },
    {
      coordinate: { lat: 20.37481, lng: -87.340663 },
      title: "Casa Club de Golf",
      description: "Casa club para entusiastas del golf.",
    },
    {
      coordinate: { lat: 20.3704246, lng: -87.3348317 },
      title: "Servicio Médico",
      description: "Centro de atención médica.",
    },
    {
      coordinate: { lat: 20.3679505, lng: -87.3313446 },
      title: "Teatro Raíces",
      description: "Lugar para presentaciones y eventos culturales.",
    },
    {
      coordinate: { lat: 20.3661677, lng: -87.3331524 },
      title: "Zama Fun Area",
      description: "Área de entretenimiento y diversión.",
    },
],
"Servicios y Actividades": [
    {
    coordinate: { lat: 20.369164, lng: -87.331534 },
    title: "EUROPCAR Renta de Automóviles",
    description: "Servicio de alquiler de coches.",
    },
    {
    coordinate: { lat: 20.372664, lng: -87.341111 },
    title: "Spa",
    description: "Centro de relajación y bienestar.",
    },
    {
    coordinate: { lat: 20.365057, lng: -87.332767 },
    title: "Dolphinaris Tulum",
    description: "Atracción de delfines y centro educativo.",
    },
    {
    coordinate: { lat: 20.360745, lng: -87.34184 },
    title: "Aktun Chen Snorkel Zipline",
    description:
    "Parque de aventuras que ofrece actividades de snorkel y tirolesa.",
    },
    {
    coordinate: { lat: 20.3643468, lng: -87.3326052 },
    title: "Scubaquatic",
    description: "Centro de buceo y actividades acuáticas.",
    },
    {
    coordinate: { lat: 20.364197, lng: -87.332548 },
    title: "Jet Ski Rentals",
    description: "Alquiler de motos acuáticas.",
    },
    {
    coordinate: { lat: 20.369557, lng: -87.330814 },
    title: "GYM",
    description: "Gimnasio y centro de fitness.",
    },
    {
    coordinate: { lat: 20.3679505, lng: -87.3313446 },
    title: "Teatro Raíces",
    description: "Teatro para eventos y espectáculos.",
    },
    {
    coordinate: { lat: 20.3662166, lng: -87.3326762 },
    title: "ECO-Bahía",
    description: "Parque ecológico y actividades al aire libre.",
    },
    {
    coordinate: { lat: 20.4307016, lng: -87.2906965 },
    title: "Dolphin Discovery",
    description: "Interacción con delfines y experiencias educativas.",
    },
    {
    coordinate: { lat: 20.4292621, lng: -87.2940047 },
    title: "Templo Maya Xa'ac",
    description: "Templo maya para exploración y turismo.",
    },
    ],
    Cenotes: [
    {
    coordinate: { lat: 20.372157, lng: -87.337783 },
    title: "Cenote",
    description: "Hundidero natural para nadar y explorar.",
    },
    {
    coordinate: { lat: 20.360824, lng: -87.341545 },
    title: "Cenote Aktun Chen",
    description: "Cenote específico para la exploración y la aventura.",
    },
    {
    coordinate: { lat: 20.360461, lng: -87.338469 },
    title: "Secret Cenote",
    description: "Piscina natural escondida para descubrir.",
    },
    {
    coordinate: { lat: 20.380985, lng: -87.332633 },
    title: "Cenote sin Nombre",
    description: "Cenote sin nombre para la exploración.",
    },
    ],
    Restaurantes: [
    {
    coordinate: { lat: 20.362335, lng: -87.332504 },
    title: "Ku'uk",
    description: "Restaurante de alta cocina que ofrece cocina local.",
    },
    {
    coordinate: { lat: 20.36119, lng: -87.338663 },
    title: "Restaurant Portofino",
    description: "Restaurante italiano que sirve platos clásicos.",
    },
    {
    coordinate: { lat: 20.36261, lng: -87.33667 },
    title: "Restaurant Mikado",
    description: "Restaurante japonés especializado en teppanyaki.",
    },
    {
    coordinate: { lat: 20.362296, lng: -87.336148 },
    title: "Restaurant Nikkei Mashua",
    description:
    "Restaurante de fusión que combina cocina japonesa y peruana.",
    },
    {
    coordinate: { lat: 20.361805, lng: -87.335882 },
    title: "Mediterráneo",
    description: "Restaurante de cocina mediterránea.",
    },
    {
    coordinate: { lat: 20.361592, lng: -87.335423 },
    title: "La Tattoria Cozumel",
    description: "Trattoria al estilo Cozumel que sirve cocina italiana.",
    },
    {
    coordinate: { lat: 20.359922, lng: -87.332935 },
    title: "Restaurante Dolce Vita",
    description: "Experiencia informal de comida italiana.",
    },
    {
    coordinate: { lat: 20.359938, lng: -87.332926 },
    title: "Frutos del Mar",
    description: "Restaurante de mariscos que ofrece productos frescos.",
    },
    {
    coordinate: { lat: 20.361385, lng: -87.333158 },
    title: "Sport Bar Pakal",
    description: "Bar deportivo para tomar algo y entretenerse.",
    },
    {
    coordinate: { lat: 20.365473, lng: -87.33262 },
    title: "Restaurante La Gran Tortuga",
    description:
    "Restaurante de mariscos especializado en platillos de tortuga.",
    },
    {
    coordinate: { lat: 20.370427, lng: -87.334575 },
    title: "Hacienda Doña Isabel",
    description:
    "Hacienda tradicional mexicana que ofrece comida y entretenimiento.",
    },
    {
    coordinate: { lat: 20.372674, lng: -87.341783 },
    title: "Alux Restaurant Gourmet",
    description: "Restaurante gourmet ubicado en una cueva natural.",
    },
    {
    coordinate: { lat: 20.372325, lng: -87.342045 },
    title: "Cenote Pool Restaurant",
    description: "Restaurante con vista a una piscina de cenote.",
    },
    {
    coordinate: { lat: 20.3655887, lng: -87.3327983 },
    title: "Ándale Burger",
    description: "Restaurante de hamburguesas estilo informal.",
    },
    {
    coordinate: { lat: 20.3653196, lng: -87.3328593 },
    title: "La Gran Tortuga Rodizio",
    description: "Restaurante rodizio especializado en carnes.",
    },
    {
    coordinate: { lat: 20.3579125, lng: -87.333596 },
    title: "Los Corales Pool & Rodizio Restaurant",
    description: "Restaurante junto a la piscina con servicio de rodizio.",
    },
    {
    coordinate: { lat: 20.3709818, lng: -87.3297514 },
    title: "Tequila Restaurant",
    description: "Restaurante que ofrece cocina mexicana.",
    },
    {
    coordinate: { lat: 20.3695027, lng: -87.3301791 },
    title: "Thali Restaurant",
    description: "Restaurante que ofrece cocina india.",
    },
    {
    coordinate: { lat: 20.3695027, lng: -87.3301791 },
    title: "Yukatan Buffet",
    description: "Buffet que ofrece una variedad de platos.",
    },
    {
    coordinate: { lat: 20.3694071, lng: -87.3306284 },
    title: "Don Pablo",
    description: "Restaurante de alta cocina que ofrece platillos gourmet.",
    },
    ],
    "Bares y Clubes": [
    {
    coordinate: { lat: 20.36474, lng: -87.332544 },
    title: "Kay Beach Club",
    description: "Club frente a la playa para hacer kayak y relajarse.",
    },
    {
    coordinate: { lat: 20.371802, lng: -87.34258 },
    title: "Xpu-Ha Pool Bar",
    description: "Bar junto a la piscina para relajarse y tomar algo.",
    },
    {
    coordinate: { lat: 20.3621702, lng: -87.3327466 },
    title: "Bar de Playa BP Coba",
    description: "Bar en la playa para relajarse y disfrutar.",
    },
    {
    coordinate: { lat: 20.3615083, lng: -87.3322222 },
    title: "Bar de Playa BP Akumal",
    description: "Bar en la playa para relajarse y disfrutar.",
    },
    {
    coordinate: { lat: 20.3592804, lng: -87.3328445 },
    title: "Bar Coral",
    description: "Bar con vista al mar para disfrutar de bebidas.",
    },
    {
    coordinate: { lat: 20.3592804, lng: -87.3328445 },
    title: "Snack Acuario",
    description: "Snack bar para disfrutar de comidas ligeras y bebidas.",
    },
    {
    coordinate: { lat: 3579125, lng: -87.333596 },
    title: "Bar de Playa BP Privilege",
    description: "Bar exclusivo para miembros del Privilege Club.",
    },
    ],
    "Servicios Religiosos": [
    {
    coordinate: { lat: 20.37074, lng: -87.335185 },
    title: "Capilla de Nuestra Señora de Guadalupe",
    description: "Capilla para servicios religiosos y eventos.",
    },
    {
    coordinate: { lat: 20.3667122, lng: -87.3422059 },
    title: "Colegio Internacional Alemán de la Riviera Maya",
    description: "Institución educativa de nivel internacional.",
    },
    ],
    "Servicios Generales": [
    {
    coordinate: { lat: 20.359123, lng: -87.342604 },
    title: "7Eleven Bahía Príncipe",
    description: "Tienda de conveniencia abierta las 24 horas.",
    },
    {
    coordinate: { lat: 20.364356, lng: -87.337415 },
    title: "ATM BBVA",
    description: "Cajero automático para servicios bancarios.",
    },
    {
    coordinate: { lat: 20.363739, lng: -87.337679 },
    title: "Galería Tonalá",
    description: "Galería de arte y tienda de recuerdos.",
    },
    {
    coordinate: { lat: 20.363486, lng: -87.337293 },
    title: "Privilege Club Bahía Príncipe",
    description: "Club exclusivo para miembros de Bahía Príncipe.",
    },
    {
    coordinate: { lat: 20.36313, lng: -87.337172 },
    title: "Kukulcan Buffet",
    description: "Buffet que ofrece una variedad de opciones culinarias.",
    },
    {
    coordinate: { lat: 20.370632, lng: -87.334333 },
    title: "Farmacia",
    description: "Farmacia para necesidades médicas y de salud.",
    },
    {
    coordinate: { lat: 20.370439, lng: -87.334029 },
    title: "Discoteca La Rancherita",
    description: "Club nocturno para bailar y divertirse.",
    },
    ],
    "Actividades Acuáticas": [
    {
    coordinate: { lat: 20.36186, lng: -87.338654 },
    title: "Albercas Gran Bahía Príncipe",
    description: "Piscinas del resort para disfrutar del agua.",
    },
    {
    coordinate: { lat: 20.3606542, lng: -87.336453 },
    title: "Jacuzzi La Iguana",
    description: "Jacuzzi para relajarse.",
    },
    {
    coordinate: { lat: 3579125, lng: -87.333596 },
    title: "Infinity Pool (Adults only)",
    description: "Piscina infinita exclusiva para adultos.",
    },
    ],
    };
    
    const libraries = ["places"];
    const mapContainerStyle = {
    height: "100%",
    width: "100%",
    };
    const center = {
    lat: 20.363417,
    lng: -87.343017,
    };
    
    const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA96s1BlGOisiT3McdyC0fWZOGQhbZNFq8", // Add your API key here
    libraries,
    });
    
    const mapRef = useRef();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    
    const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    }, []);
    
    const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    const { lat, lng } = marker.coordinate;
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
    };
    
    const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const markers = categories[category];
    if (markers.length > 0) {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) => {
    bounds.extend({
    lat: marker.coordinate.lat,
    lng: marker.coordinate.lng,
    });
    });
    mapRef.current.fitBounds(bounds);
    }
    };
    
    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;
    
    return (
        <div className="flex flex-col md:flex-row h-screen">
          <div className="w-full md:w-1/4 p-4 bg-white overflow-y-auto shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Categorías</h2>
            <ul className="space-y-2">
              {Object.keys(categories).map((category) => (
                <li
                  key={category}
                  className={`p-2 rounded cursor-pointer transition ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-green-300 hover:bg-green-400'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            {selectedCategory && (
              <>
                <h2 className="text-lg font-bold mt-4 mb-2 text-gray-700">Lugares</h2>
                <ul className="space-y-2">
                  {categories[selectedCategory].map((marker, index) => (
                    <li
                      key={index}
                      className="p-2 rounded cursor-pointer bg-green-200 hover:bg-green-300 transition"
                      onClick={() => handleMarkerClick(marker)}
                    >
                      {marker.title}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="w-full md:w-3/4 h-full">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={center}
              onLoad={onMapLoad}
            >
              {selectedCategory &&
                categories[selectedCategory].map((marker, index) => (
                  <Marker
                    key={index}
                    position={{ lat: marker.coordinate.lat, lng: marker.coordinate.lng }}
                    onClick={() => handleMarkerClick(marker)}
                  >
                    {selectedMarker === marker && (
                      <InfoWindow
                        position={{ lat: marker.coordinate.lat, lng: marker.coordinate.lng }}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div className="p-2">
                          <h3 className="font-bold marker-title">{marker.title}</h3>
                          <p className="marker-title">{marker.description}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
            </GoogleMap>
          </div>
        </div>
      );
    };
    
    export default Map;