"use client";
import {
  useLoadScript,
  GoogleMap,
  InfoWindow,
  OverlayView,
} from "@react-google-maps/api";
import { useState, useRef, useCallback, useEffect } from "react";

const categories = {
  Entretenimiento: [
    {
      coordinate: { lat: 20.370533, lng: -87.335173 },
      title: "Casino",
      description: "Un lugar para juegos de azar y entretenimiento.",
      color: "green",
    },
    {
      coordinate: { lat: 20.36474, lng: -87.332544 },
      title: "Kay Beach Club",
      description: "Club de playa con beneficios para residentes.",
      color: "green",
    },
    {
      coordinate: { lat: 20.372664, lng: -87.341111 },
      title: "Spa",
      description: "Centro de relajación y bienestar.",
      color: "green",
    },
    {
      coordinate: { lat: 20.372157, lng: -87.337783 },
      title: "Cenote",
      description: "Un hermoso cenote natural.",
      color: "green",
    },
    {
      coordinate: { lat: 20.360824, lng: -87.341545 },
      title: "Cenote Aktunchen",
      description: "Cenote para exploración y aventura.",
      color: "green",
    },
    {
      coordinate: { lat: 20.360461, lng: -87.338469 },
      title: "Secret Cenote",
      description: "Un cenote escondido para descubrir.",
      color: "green",
    },
    {
      coordinate: { lat: 20.380985, lng: -87.332633 },
      title: "Cenote sin Nombre",
      description: "Un cenote sin nombre para explorar.",
      color: "green",
    },
    {
      coordinate: { lat: 20.361966, lng: -87.342836 },
      title: "PGA Riviera Maya",
      description: "Campo de golf con reserva previa.",
      color: "green",
    },
    {
      coordinate: { lat: 20.37276, lng: -87.3359 },
      title: "Campo Profesional / Golf Travel",
      description: "Campo de golf profesional con reserva previa.",
      color: "green",
    },
    {
      coordinate: { lat: 20.37481, lng: -87.340663 },
      title: "Casa Club de Golf",
      description: "Casa club para golfistas con reserva previa.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3679505, lng: -87.3313446 },
      title: "Teatro Raíces",
      description: "Teatro para presentaciones y eventos culturales.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3661677, lng: -87.3331524 },
      title: "Zama Fun Area",
      description: "Área de entretenimiento y diversión.",
      color: "orange",
    },
    {
      coordinate: { lat: 20.3662166, lng: -87.3326762 },
      title: "Eco-Bahía",
      description: "Parque ecológico con actividades al aire libre.",
      color: "green",
    },
  ],
  "Bares y Clubes": [
    {
      coordinate: { lat: 20.371802, lng: -87.34258 },
      title: "Xpu-Ha Pool Bar",
      description: "Bar junto a la piscina para relajarse.",
      color: "green",
    },
    {
      coordinate: { lat: 20.361385, lng: -87.333158 },
      title: "Sport Bar Pakal",
      description: "Bar deportivo para disfrutar de bebidas y deportes.",
      color: "green",
    },
    {
      coordinate: { lat: 20.366698, lng: -87.332244 },
      title: "Snack Bar Las Olas",
      description: "Snack bar para disfrutar de comidas ligeras y bebidas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3685081, lng: -87.3307556 },
      title: "Swim and Walk-Up Bar",
      description: "Bar para nadar y disfrutar de bebidas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3621702, lng: -87.3327466 },
      title: "Bar de Playa BP Coba",
      description: "Bar en la playa para relajarse y disfrutar.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3615083, lng: -87.3322222 },
      title: "Bar de Playa BP Akumal",
      description: "Bar en la playa para relajarse y disfrutar.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3592804, lng: -87.3328445 },
      title: "Bar Coral",
      description: "Bar con vista al mar para disfrutar de bebidas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3579125, lng: -87.333596 },
      title: "Bar de Playa BP Privilege",
      description: "Bar en la playa para relajarse y disfrutar.",
      color: "green",
    },
    {
      coordinate: { lat: 20.370439, lng: -87.334029 },
      title: "Discoteca La Rancherita",
      description: "Club nocturno para bailar y divertirse.",
      color: "green",
    },
  ],
  Restaurantes: [
    {
      coordinate: { lat: 20.36119, lng: -87.338663 },
      title: "Restaurant Portofino",
      description: "Restaurante italiano con platos clásicos.",
      color: "green",
    },
    {
      coordinate: { lat: 20.36261, lng: -87.33667 },
      title: "Restaurant Mikado",
      description: "Restaurante japonés especializado en teppanyaki.",
      color: "green",
    },
    {
      coordinate: { lat: 20.362296, lng: -87.336148 },
      title: "Restaurant Nikkei Mashua",
      description: "Restaurante de fusión japonesa y peruana.",
      color: "green",
    },
    {
      coordinate: { lat: 20.361805, lng: -87.335882 },
      title: "Mediterráneo",
      description: "Restaurante de cocina mediterránea.",
      color: "green",
    },
    {
      coordinate: { lat: 20.361592, lng: -87.335423 },
      title: "La Tattoria Cozumel",
      description: "Trattoria que sirve cocina italiana.",
      color: "green",
    },
    {
      coordinate: { lat: 20.359922, lng: -87.332935 },
      title: "Restaurante Dolce Vita",
      description: "Restaurante informal de comida italiana.",
      color: "green",
    },
    {
      coordinate: { lat: 20.359938, lng: -87.332926 },
      title: "Frutos del Mar",
      description: "Restaurante de mariscos con productos frescos.",
      color: "green",
    },
    {
      coordinate: { lat: 20.362335, lng: -87.332504 },
      title: "Ku'uk",
      description: "Restaurante de alta cocina local.",
      color: "green",
    },
    {
      coordinate: { lat: 20.365473, lng: -87.33262 },
      title: "Restaurante La Gran Tortuga",
      description: "Restaurante de mariscos especializado en tortuga.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3709818, lng: -87.3297514 },
      title: "Tequila Restaurant",
      description: "Restaurante de cocina mexicana.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3695027, lng: -87.3301791 },
      title: "Thali Restaurant",
      description: "Restaurante de cocina india.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3695027, lng: -87.3301791 },
      title: "Yukatan Buffet",
      description: "Buffet con una variedad de platos.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3592804, lng: -87.3328445 },
      title: "Snack Acuario",
      description: "Snack bar con comidas ligeras y bebidas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3655887, lng: -87.3327983 },
      title: "Ándale Burger",
      description: "Restaurante informal de hamburguesas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3653196, lng: -87.3328593 },
      title: "La Gran Tortuga Rodizio",
      description: "Restaurante rodizio especializado en carnes.",
      color: "green",
    },
    {
      coordinate: { lat: 20.36313, lng: -87.337172 },
      title: "Kukulcan Buffet",
      description: "Buffet con una variedad de opciones culinarias.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3694071, lng: -87.3306284 },
      title: "Don Pablo",
      description: "Restaurante de alta cocina con platillos gourmet.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3579125, lng: -87.333596 },
      title: "Los Corales Pool & Rodizio Restaurant",
      description: "Restaurante junto a la piscina con servicio de rodizio.",
      color: "green",
    },
    {
      coordinate: { lat: 20.372674, lng: -87.341783 },
      title: "Alux Restaurant Gourmet",
      description: "Restaurante gourmet ubicado en una cueva natural.",
      color: "green",
    },
    {
      coordinate: { lat: 20.370427, lng: -87.334575 },
      title: "Hacienda Doña Isabel",
      description: "Hacienda mexicana que ofrece comida y entretenimiento.",
      color: "green",
    },
    {
      coordinate: { lat: 20.37074, lng: -87.335185 },
      title: "Capilla de Nuestra Señora de Guadalupe",
      description: "Capilla para servicios religiosos y eventos.",
      color: "green",
    },
  ],
  "Actividades acuáticas": [
    {
      coordinate: { lat: 20.365057, lng: -87.332767 },
      title: "Dolphinaris Tulum",
      description: "Atracción de delfines y centro educativo.",
      color: "orange",
    },
    {
      coordinate: { lat: 20.3643468, lng: -87.3326052 },
      title: "Scubaquatic",
      description: "Centro de buceo y actividades acuáticas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.364197, lng: -87.332548 },
      title: "Jet Ski Rentals",
      description: "Alquiler de motos acuáticas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.372325, lng: -87.342045 },
      title: "Cenote Pool Restaurant",
      description: "Restaurante con vista a una piscina de cenote.",
      color: "green",
    },
    {
      coordinate: { lat: 20.3691906, lng: -87.3312356 },
      title: "Aqua Activewear",
      description: "Tienda de ropa deportiva acuática.",
      color: "green",
    },
    {
      coordinate: { lat: 20.360745, lng: -87.34184 },
      title: "Aktun Chen Snorkel Zipline",
      description: "Parque de aventuras con snorkel y tirolesa.",
      color: "green",
    },
    {
      coordinate: { lat: 20.359123, lng: -87.342604 },
      title: "7Eleven Bahía Príncipe",
      description: "Tienda de conveniencia abierta las 24 horas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.364356, lng: -87.337415 },
      title: "ATM BBVA",
      description: "Cajero automático para servicios bancarios.",
      color: "green",
    },
    {
      coordinate: { lat: 20.363739, lng: -87.337679 },
      title: "Galería Tonalá",
      description: "Galería de arte y tienda de recuerdos.",
      color: "green",
    },
    {
      coordinate: { lat: 20.363486, lng: -87.337293 },
      title: "Privilege Club Bahía Príncipe",
      description: "Club exclusivo para miembros.",
      color: "orange",
    },
    {
      coordinate: { lat: 20.370632, lng: -87.334333 },
      title: "Farmacia",
      description: "Farmacia para necesidades médicas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.369557, lng: -87.330814 },
      title: "GYM",
      description: "Gimnasio para residentes.",
      color: "yellow",
    },
    {
      coordinate: { lat: 20.3579125, lng: -87.333596 },
      title: "Infinity Pool (Adults only)",
      description: "Piscina infinita exclusiva para adultos.",
      color: "orange",
    },
    {
      coordinate: { lat: 20.3606542, lng: -87.336453 },
      title: "Jacuzzi La Iguana",
      description: "Jacuzzi para residentes.",
      color: "yellow",
    },
    {
      coordinate: { lat: 20.36186, lng: -87.338654 },
      title: "Albercas Gran Bahía Príncipe",
      description: "Piscinas del resort para residentes.",
      color: "yellow",
    },
    {
      coordinate: { lat: 20.4307016, lng: -87.2906965 },
      title: "Dolphin Discovery",
      description: "Interacción con delfines y experiencias educativas.",
      color: "green",
    },
    {
      coordinate: { lat: 20.4292621, lng: -87.2940047 },
      title: "Templo Maya Xa'ac",
      description: "Templo maya para exploración y turismo.",
      color: "green",
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
    googleMapsApiKey: "AIzaSyA96s1BlGOisiT3McdyC0fWZOGQhbZNFq8",
    libraries,
  });

  const mapRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hideMarkers, setHideMarkers] = useState(false);
  const [markerKey, setMarkerKey] = useState(0);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = (marker) => {
    setHideMarkers(true);
    const { lat, lng } = marker.coordinate;
    mapRef.current.panTo({ lat, lng });

    const listener = mapRef.current.addListener("idle", () => {
      setSelectedMarker(marker);
      setHideMarkers(false);
      window.google.maps.event.removeListener(listener);
    });
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

  useEffect(() => {
    setMarkerKey((prevKey) => prevKey + 1); // Update markerKey to force re-render
  }, [selectedCategory, hideMarkers]); // Re-render markers when category or hideMarkers changes

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
                  ? "bg-green-600 text-white"
                  : "bg-green-300 hover:bg-green-400"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
        {selectedCategory && (
          <>
            <h2 className="text-lg font-bold mt-4 mb-2 text-gray-700">
              Lugares
            </h2>
            <ul className="space-y-2">
              {categories[selectedCategory].map((marker, index) => (
                <li
                  key={index}
                  className={`p-2 rounded cursor-pointer transition ${
                    marker.color === "green"
                      ? "bg-green-200 hover:bg-green-300"
                      : marker.color === "yellow"
                      ? "bg-yellow-200 hover:bg-yellow-300"
                      : "bg-orange-200 hover:bg-orange-300"
                  }`}
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
          clickableIcons={false} // Make default markers unclickable
        >
          {selectedCategory &&
            categories[selectedCategory].map((marker, index) => (
              <OverlayView
                key={`${marker.title}-${markerKey}`} // Unique key to force re-render
                position={{
                  lat: marker.coordinate.lat,
                  lng: marker.coordinate.lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div
                  className={`marker-label ${
                    hideMarkers ? "hidden" : ""
                  }`}
                  onClick={() => handleMarkerClick(marker)}
                  style={{ backgroundColor: marker.color }}
                >
                  {marker.title}
                </div>
              </OverlayView>
            ))}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.coordinate.lat,
                lng: selectedMarker.coordinate.lng,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="custom-infowindow">
                <button
                  className="custom-infowindow-close"
                  onClick={() => setSelectedMarker(null)}
                  style={{
                    background: "none",
                    border: "none",
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
                <h3 className="font-bold marker-title">
                  {selectedMarker.title}
                </h3>
                <p className="marker-description">
                  {selectedMarker.description}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

