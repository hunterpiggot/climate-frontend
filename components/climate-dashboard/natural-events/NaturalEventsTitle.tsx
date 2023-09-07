import { NaturalEventLeftArrowSvg, NaturalEventRightArrowSvg } from "@/assets";

export const NaturalEventsTitle = () => {
  return (
    <>
      <div className="text-[40px] leading-[59px] text-center">
        Natural Events
      </div>
      <div className="flex items-center gap-x-[15px] justify-center">
        <div>{NaturalEventLeftArrowSvg}</div>
        <div className="text-[22px] leading-[33px]">Severe Storms</div>
        <div>{NaturalEventRightArrowSvg}</div>
      </div>
    </>
  );
};
