import { AirQualityIndexCard } from "./air-quality-index";
import { BaseCard } from "./base-cards";
import { CLimateNewsCard } from "./climate-news";
import { CurrentElectricityRate } from "./current-electricity-rate";
import { NaturalEventsCard } from "./natural-events/NaturalEventsCard";
import { WeatherHistoryCard } from "./weather-history";

export const ClimateDashboard = () => {
  return (
    <div className="px-[100px] pt-9 h-full">
      <div className="grid w-full h-full grid-cols-3 grid-rows-3 gap-4">
        <BaseCard
          height="1"
          width="1"
          color="1"
          cardBody={<AirQualityIndexCard />}
        />
        <BaseCard
          height="1"
          width="2"
          color="2"
          cardBody={<WeatherHistoryCard />}
        />
        <BaseCard
          height="2"
          width="1"
          color="3"
          cardBody={<CLimateNewsCard />}
        />
        <BaseCard
          height="1"
          width="1"
          color="4"
          cardBody={<CurrentElectricityRate />}
        />
        <BaseCard
          height="2"
          width="1"
          color="1"
          cardBody={<NaturalEventsCard height="2" width="1" />}
        />
        <BaseCard
          height="1"
          width="1"
          color="5"
          cardBody={<AirQualityIndexCard />}
        />
      </div>
    </div>
  );
};
