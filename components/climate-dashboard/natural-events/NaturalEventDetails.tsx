interface INaturalEvent {
  name: string;
  source: string;
  magnitude: {
    current: number;
    minimum: number;
    maximum: number;
  };
  date: Date;
}

type Props = {
  event: INaturalEvent;
  fadeAway: "top" | "bottom" | null;
};

export const NaturalEventDetails = ({ event, fadeAway }: Props) => {
  const { name, source, date, magnitude } = event;

  const { current, minimum, maximum } = magnitude;

  const getGradientClassName = () => {
    const baseCss = ["absolute inset-0 z-10 flex items-center justify-center"];

    if (fadeAway === "bottom") {
      baseCss.push("bg-gradient-to-t from-dashboard-tile-1");
    } else if (fadeAway === "top") {
      baseCss.push("bg-gradient-to-b from-dashboard-tile-1");
    }

    return baseCss.join(" ").trim();
  };
  return (
    <div className="relative z-0 snap-center">
      <div className="flex gap-x-[18px] h-full">
        <div className="col-span-1 overflow-hidden text-lg font-light text-center text-external-link text-ellipsis">
          {name}
        </div>
        <div className="flex">
          <div className="gap-x-[9px] font-extralight justify-items-stretch flex">
            <div>Current: {current}kts</div>
            <div>min: {minimum}kts</div>
            <div>max: {maximum}kts</div>
          </div>
        </div>
      </div>
      <div className={getGradientClassName()}></div>
    </div>
  );
};
