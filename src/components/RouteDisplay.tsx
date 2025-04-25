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
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

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

  if (!apiKey) {
    return (
      <Card className="w-full">
        <CardContent className="grid gap-4">
          <h2 className="text-lg font-semibold">Отображение Маршрута</h2>
          <p className="text-muted-foreground">
            Не удалось загрузить API ключ Google Maps.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="grid gap-4">
        <h2 className="text-lg font-semibold">Отображение Маршрута</h2>
        {places.length > 0 ? (
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
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
          </LoadScript>
        ) : (
          <div className="h-64 w-full bg-secondary rounded-md flex items-center justify-center">
            <MapPin className="h-9 w-9 text-muted-foreground" />
            <span className="text-muted-foreground">
              Карта: Места не выбраны
            </span>
          </div>
        )}
        <div>
          <h3>Выбранные Места:</h3>
          {places.length > 0 ? (
            <ul>
              {places.map((place) => (
                <li key={place.name}>
                  {place.name} ({place.category}) - {place.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Места еще не выбраны.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
