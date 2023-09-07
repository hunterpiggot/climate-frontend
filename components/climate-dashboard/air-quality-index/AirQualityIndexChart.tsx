export const AirQualityIndexChart = () => {
  return (
    <div className="w-full px-[21px] grid grid-cols-6">
      <div className="col-span-1 h-4 bg-[#61BC52] text-xs text-center">
        0-50
      </div>
      <div className="col-span-1 h-4 bg-[#E7DA66] text-xs text-center">
        51-100
      </div>
      <div className="col-span-1 h-4 bg-[#E49257] text-xs text-center">
        101-150
      </div>
      <div className="col-span-1 h-4 bg-[#E85F5F] text-xs text-center">
        151-200
      </div>
      <div className="col-span-1 h-4 bg-[#F476EF] text-xs text-center">
        201-300
      </div>
      <div className="col-span-1 h-4 bg-[#7D1C1C] text-xs text-center">
        301-500
      </div>
    </div>
  );
};
