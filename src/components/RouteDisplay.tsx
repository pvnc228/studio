"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const RouteDisplay = () => {
  return (
    <Card className="w-full">
      <CardContent className="grid gap-4">
        <h2 className="text-lg font-semibold">Route Display</h2>
        <p>Map and list of selected places will be displayed here.</p>
        {/* Placeholder for map */}
        <div className="h-64 w-full bg-secondary rounded-md flex items-center justify-center">
          <MapPin className="h-9 w-9 text-muted-foreground" />
          <span className="text-muted-foreground">Map Placeholder</span>
        </div>
        {/* Placeholder for list of places */}
        <div>
          <h3>Selected Places:</h3>
          <p className="text-muted-foreground">No places selected yet.</p>
        </div>
      </CardContent>
    </Card>
  );
};

    