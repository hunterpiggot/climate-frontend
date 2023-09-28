"use client";
import {
  NaturalEventDownArrowSvg,
  NaturalEventUpArrowSvg,
  SortDescArrowSvg,
} from "@/assets";
import { NaturalEventDetails } from ".";
import { MutableRefObject, useEffect, useRef } from "react";
import { INaturalEvent } from "@/models/INaturalEvents.interface";
import { useCallNaturalEventsList } from "./natural-events-slice/NaturalEvents.hooks";
import { useAppDispatch, useAppSelector } from "@/shared-hooks/useAppSelector";
import {
  selectNaturalEventsList,
  selectedNaturalEventChanged,
} from "./natural-events-slice";

export const NaturalEventsList = () => {
  const events = useCallNaturalEventsList();
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const updatedEvents = useAppSelector(selectNaturalEventsList);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = scrollDivRef.current.scrollTop;

      let offset = 0;
      if (scrollDivRef.current.children.length) {
        const clientHeight = scrollDivRef.current.children[0].clientHeight;
        offset = (clientHeight - 28) / 2;
      }

      if ((scrollPosition - offset) % 28 === 0) {
        const eventIndex = (scrollPosition - offset) / 28;

        const event = events[eventIndex];

        if (event) {
          dispatch(selectedNaturalEventChanged(event));
        }
      }
    };

    // if (scrollDivRef.current) {
    //   console.log("Ref has been set");
    // }
    const currentScrollDivRef = scrollDivRef?.current;

    if (currentScrollDivRef) {
      currentScrollDivRef.addEventListener("scroll", handleScroll);

      return () => {
        currentScrollDivRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollDivRef]);

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
        <div className="self-center">
          <div className="pb-2 cursor-pointer" onClick={scrollUp}>
            {NaturalEventUpArrowSvg}
          </div>
          <div className="pt-2 cursor-pointer" onClick={scrollDown}>
            {NaturalEventDownArrowSvg}
          </div>
        </div>
      </div>
    </>
  );
};
