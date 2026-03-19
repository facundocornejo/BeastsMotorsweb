"use client";

import { useEffect } from "react";
import { trackVehicleView } from "@/lib/utils/analytics";

interface VehicleViewTrackerProps {
  vehicleName: string;
  vehicleType: string;
}

export default function VehicleViewTracker({
  vehicleName,
  vehicleType,
}: VehicleViewTrackerProps) {
  useEffect(() => {
    trackVehicleView(vehicleName, vehicleType);
  }, [vehicleName, vehicleType]);

  return null;
}
