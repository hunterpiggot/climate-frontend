"use client";
import { NaturalEventMapSvg } from "@/assets";
import { useEffect, useState } from "react";
import { getCoords } from "./helpers";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/store";
import { Provider } from "react-redux";
import { useAppSelector } from "@/shared-hooks/useAppSelector";
import { selectSelectedNaturalEvent } from "./natural-events-slice/NaturalEvents.slice";
import { INaturalEvent } from "@/models/INaturalEvents.interface";

type Props = {
  className: string;
  directions: {
    left: number;
    top: number;
  };
};

interface ICoordinates {
  latitude: number;
  longitude: number;
}

export const NaturalEventsMap = () => {
  const currentEvent: INaturalEvent = useAppSelector(
    selectSelectedNaturalEvent
  );
  console.log(
    "🚀 ~ file: NaturalEventsMap.tsx:27 ~ NaturalEventsMap ~ currentEvent:",
    currentEvent.coordinates
  );
  const [coordinates, setCoordinates] = useState<ICoordinates>({
    latitude: 0,
    longitude: 0,
  });

  const [cssClass, setCssClass] = useState<string>(
    "absolute inset-0 z-0 w-[373px] left-0 top-0"
  );

  const [directions, setDirections] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const setCoords = () => {
      if (JSON.stringify(currentEvent) !== "{}") {
        const validCurrentEvent = currentEvent as INaturalEvent;
        const coordinates = validCurrentEvent.coordinates;
        const newCoordinates = getCoords({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
        setCssClass(newCoordinates.class);

        setDirections({
          top: newCoordinates.top,
          left: newCoordinates.left,
        });
      }
    };
    setCoords();
  }, [currentEvent]);

  return (
    <div className="w-full h-[281px]">
      <div className="relative z-0 flex h-full">
        <div className="">{NaturalEventMapSvg}</div>
        <div
          className={cssClass}
          style={{ left: `${directions.left}px`, top: `${directions.top}px` }}
        >
          {" "}
          {/* Inline style as a last resort */}
          <div className="w-1 h-1 bg-black"></div>
        </div>
      </div>
    </div>
  );
};
