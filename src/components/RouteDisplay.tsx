"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { Place } from "@/services/places";

interface RouteDisplayProps {
  places: Place[];
}

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ places }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Load the API key from environment variables
    const loadApiKey = () => {
      if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
      } else {
        console.error("Google Maps API key not found in environment variables.");
      }
    };

    loadApiKey();
  }, []);

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 55.7558, // Default to Moscow
    lng: 37.6173,
  };

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place);
  };

    const handleShowMap = () => {
        setShowMap(true);
    };

  return (
    <Card className="w-full">
      <CardContent className="grid gap-4">
        <h2 className="text-lg font-semibold">Отображение Маршрута</h2>

        <div>
          <h3>Выбранные Места:</h3>
          {places.length > 0 ? (
            <ul>
              {places.map((place) => (
                <li key={place.name}>
                  {place.name} ({place.category}) - {place.description}
                  {place.dateFounded && ` - Дата основания: ${place.dateFounded}`}
                  {place.averagePrice && ` - Средняя цена: ${place.averagePrice}`}
                  {place.rating && ` - Рейтинг: ${place.rating}`}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Посмотреть на карте
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Места еще не выбраны.</p>
          )}
        </div>
              {apiKey && showMap && (
                  <LoadScript googleMapsApiKey={apiKey}>
                      <GoogleMap
                          mapContainerStyle={mapStyles}
                          zoom={12}
                          center={places.length > 0 ? places[0].location : defaultCenter}
                      >
                          {places.map((place, index) => (
                              <Marker
                                  key={index}
                                  position={place.location}
                                  title={place.name}
                                  onClick={() => handleMarkerClick(place)}
                              />
                          ))}
                          {selectedPlace && (
                              <InfoWindow
                                  position={selectedPlace.location}
                                  onCloseClick={() => setSelectedPlace(null)}
                              >
                                  <div>
                                      <h3>{selectedPlace.name}</h3>
                                      <p>{selectedPlace.description}</p>
                                      <p>Категория: {selectedPlace.category}</p>
                                      {selectedPlace.dateFounded && <p>Дата основания: {selectedPlace.dateFounded}</p>}
                                      {selectedPlace.averagePrice && <p>Средняя цена: {selectedPlace.averagePrice}</p>}
                                      {selectedPlace.rating && <p>Рейтинг: {selectedPlace.rating}</p>}
                                  </div>
                              </InfoWindow>
                          )}
                      </GoogleMap>
                  </LoadScript>
              ) }
      </CardContent>
    </Card>
  );
};
