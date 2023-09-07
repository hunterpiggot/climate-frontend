"use client";
import { NaturalEventsList } from "./NaturalEventsList";
import { NaturalEventsTitle } from "./NaturalEventsTitle";
import { NaturalEventsMap } from "./NaturalEventsMap";
import { getCoords } from "./helpers";
import { INaturalEvent } from "@/models/INaturalEvents.interface";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/store";
import { Provider } from "react-redux";
import { useAppSelector } from "@/shared-hooks/useAppSelector";
import { selectSelectedNaturalEvent } from "./natural-events-slice/NaturalEvents.slice";

type Props = {
  width: "1" | "2" | "3";
  height: "1" | "2" | "3";
};

export const NaturalEventsCard = ({ width, height }: Props) => {
  const fakeCoords = {
    latitude: 21.234970922063564,
    longitude: -86.85530067568567,
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <NaturalEventsTitle />
      <NaturalEventsList />
      {height !== "1" ? <NaturalEventsMap /> : null}
    </div>
  );
};
