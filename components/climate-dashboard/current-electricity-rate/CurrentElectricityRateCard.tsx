export const CurrentElectricityRate = () => {
  return (
    <div className="grid content-between grid-rows-2 pb-8">
      <div className="text-[40px] leading-[59px]">Current Electricity Rate</div>
      <div className=" items-end gap-x-[50px] grid grid-cols-3 justify-stretch ">
        <div>
          <div className="text-[28px] leading-[41px] text-center">7.25</div>
          <div className="text-base text-[#6B6B6B] text-center">industrial</div>
        </div>
        <div>
          <div className="text-[40px] leading-[59px] text-center">11.38</div>
          <div className="text-lg text-[#6B6B6B] text-center">residential</div>
        </div>
        <div>
          <div className="text-[28px] leading-[41px] text-center">7.94</div>
          <div className="text-base text-[#6B6B6B] text-center">commercial</div>
        </div>
      </div>
    </div>
  );
};
