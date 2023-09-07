"use client";
import { SortDescArrowSvg } from "@/assets";
import { NaturalEventDetails } from ".";
import { MutableRefObject, useEffect, useRef } from "react";
import { INaturalEvent } from "@/models/INaturalEvents.interface";
import { useAppSelector } from "@/shared-hooks/useAppSelector";
import {
  selectNaturalEventsList,
  selectNaturalEventsStatus,
} from "./natural-events-slice/NaturalEvents.slice";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/store";
import { Provider } from "react-redux";
import {
  useCallNaturalEventsList,
  useHandleEventListScroll,
} from "./natural-events-slice/NaturalEvents.hooks";

type Props = {
  ref: MutableRefObject<any>;
};

export const NaturalEventsList = () => {
  const events = useCallNaturalEventsList();

  const status = useAppSelector(selectNaturalEventsStatus);

  const scrollDivRef = useRef<any>(null);
  useHandleEventListScroll(scrollDivRef);

  const scrollUp = () => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop -= 28;
    }
  };
  const scrollDown = () => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop += 28;
    }
  };

  return (
    <>
      <div className="flex justify-center text-sm font-extralight gap-x-5">
        <div className="flex items-center gap-x-1">
          Sort: newest <span className="pt-1">{SortDescArrowSvg}</span>
        </div>
        <div>Show: all</div>
      </div>
      <div className="flex">
        <div className="max-h-[84px] relative z-0">
          <div
            ref={scrollDivRef}
            className="grid px-5 overflow-y-scroll justify-items-center no-scrollbar scroll-smooth snap-y snap-mandatory max-h-[84px] py-7"
          >
            {events.map((event: INaturalEvent) => {
              return (
                <NaturalEventDetails
                  key={event.id}
                  event={event}
                  fadeAway={null}
                />
              );
            })}
          </div>
          <div className="absolute inset-x-0 top-0 z-10 w-full pointer-events-none bg-gradient-to-b from-dashboard-tile-1 h-7"></div>
          <div className="absolute inset-x-0 bottom-0 z-10 w-full pointer-events-none bg-gradient-to-t from-dashboard-tile-1 h-7"></div>
        </div>
        <div>
          <div onClick={scrollUp}>up</div>
          <div onClick={scrollDown}>dw</div>
        </div>
      </div>
    </>
  );
};
