import { NaturalEventsList } from "./NaturalEventsList";
import { NaturalEventsTitle } from "./NaturalEventsTitle";
import { NaturalEventsMap } from "./NaturalEventsMap";

type Props = {
  width: "1" | "2" | "3";
  height: "1" | "2" | "3";
};

export const NaturalEventsCard = ({ width, height }: Props) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <NaturalEventsTitle />
      <NaturalEventsList />
      {height !== "1" ? <NaturalEventsMap /> : null}
    </div>
  );
};
