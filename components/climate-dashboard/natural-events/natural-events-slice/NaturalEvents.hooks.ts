import { useAppDispatch, useAppSelector } from "@/shared-hooks/useAppSelector";
import { useEffect } from "react";
import {
  fetchNaturalEvents,
  selectNaturalEventsList,
  selectNaturalEventsStatus,
  selectedNaturalEventChanged,
} from "./NaturalEvents.slice";

export function useCallNaturalEventsList() {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectNaturalEventsStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNaturalEvents());
    }
  }, []);

  return useAppSelector(selectNaturalEventsList);
}

export function useHandleEventListScroll(scrollDivRef: any) {
  const dispatch = useAppDispatch();

  const eventList = useAppSelector(selectNaturalEventsList);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = scrollDivRef.current.scrollTop;

      if (scrollPosition % 28 === 0) {
        const eventIndex = scrollPosition / 28;

        const event = eventList[eventIndex];

        if (event) {
          dispatch(selectedNaturalEventChanged(event));
        }
      }
    };

    const currentScrollDivRef = scrollDivRef?.current;

    if (currentScrollDivRef) {
      currentScrollDivRef.addEventListener("scroll", handleScroll);

      return () => {
        currentScrollDivRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollDivRef]);
}
