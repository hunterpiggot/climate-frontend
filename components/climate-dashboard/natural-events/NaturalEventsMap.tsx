"use client";
import { NaturalEventMapSvg } from "@/assets";
import { useEffect, useRef, useState } from "react";
import { getCoords } from "./helpers";
import { useAppSelector } from "@/shared-hooks/useAppSelector";
import { selectSelectedNaturalEvent } from "./natural-events-slice/NaturalEvents.slice";
import { INaturalEvent } from "@/models/INaturalEvents.interface";

export const NaturalEventsMap = () => {
  const currentEvent: INaturalEvent = useAppSelector(
    selectSelectedNaturalEvent
  );
  const [cssClass, setCssClass] = useState<string>(
    "absolute inset-0 z-0 w-[373px] left-0 top-0"
  );

  const [directions, setDirections] = useState({
    top: 0,
    left: 0,
  });

  const [leftBuffer, setLeftBuffer] = useState<number>(0);

  useEffect(() => {
    const clientWidth = mapRef.current.clientWidth;
    const newLeftBuffer = (clientWidth - 373) / 2;
    setLeftBuffer(newLeftBuffer);
  }, []);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    const setCoords = (leftBuffer) => {
      if (JSON.stringify(currentEvent) !== "{}") {
        const validCurrentEvent = currentEvent as INaturalEvent;
        const coordinates = validCurrentEvent.coordinates;
        const newCoordinates = getCoords({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          leftBuffer: leftBuffer,
        });

        setCssClass(newCoordinates.class);

        setDirections({
          top: newCoordinates.top,
          left: newCoordinates.left,
        });
      }
    };
    setCoords(leftBuffer);

    const handleResize = () => {
      const clientWidth = mapRef.current.clientWidth;

      const newLeftBuffer = (clientWidth - 373) / 2;

      setCoords(newLeftBuffer);
    };

    const currentScrollDivRef = mapRef?.current;

    if (currentScrollDivRef) {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [currentEvent, mapRef]);

  return (
    <div className="w-full h-[281px]">
      <div ref={mapRef} className="relative z-0 flex h-full justify-center">
        <div className="">{NaturalEventMapSvg}</div>
        <div
          className={cssClass}
          style={{ left: `${directions.left}px`, top: `${directions.top}px` }}
        >
          {" "}
          <div className="w-1 h-1 bg-black"></div>
        </div>
      </div>
    </div>
  );
};
