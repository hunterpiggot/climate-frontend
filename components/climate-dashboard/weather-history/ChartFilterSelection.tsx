import { useState } from "react";
import DatePicker from "react-date-picker";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Aggregation } from "@/api-client/models/historical-data";
import { endOfDay, startOfDay } from "date-fns";

interface IDropdownOption {
  value: Aggregation;
  label: string;
}
export const ChartFilterSelection = () => {
  const [timeRange, setTimeRange] = useState<{
    startTime: Date;
    endTime: Date;
  }>({
    startTime: new Date(),
    endTime: new Date(),
  });
  const [selectedDropdown, setSelectedDropdown] = useState<IDropdownOption>({
    value: Aggregation.Hour,
    label: "Hour",
  });

  const dropdownOptions: IDropdownOption[] = [
    {
      value: Aggregation.Hour,
      label: "Hour",
    },
    {
      value: Aggregation.Day,
      label: "Day",
    },
    {
      value: Aggregation.Week,
      label: "Week",
    },
    {
      value: Aggregation.Month,
      label: "Month",
    },
    {
      value: Aggregation.Year,
      label: "Year",
    },
    {
      value: Aggregation.Decade,
      label: "Decade",
    },
    {
      value: Aggregation.None,
      label: "None",
    },
  ];

  const handleDateChange = (
    startOrEnd: "startTime" | "endTime",
    value: Date
  ) => {
    const date = startOrEnd === "endTime" ? endOfDay(value) : startOfDay(value);
    setTimeRange((state) => {
      return {
        ...state,
        [startOrEnd]: date,
      };
    });
    // TODO: Add Call To API with updated value
  };

  const handleDropdownChange = (option: IDropdownOption) => {
    setSelectedDropdown(option);
    // TODO: Add Call To API with updated value
  };
  return (
    <div className="flex">
      <div className="flex">
        <div>Start Date:</div>
        <DatePicker
          onChange={(value: Date) => handleDateChange("startTime", value)}
          value={timeRange.startTime}
          minDate={new Date("1940-01-01")}
        />
      </div>
      <div className="flex">
        <div>End Date:</div>
        <DatePicker
          onChange={(value: Date) => handleDateChange("endTime", value)}
          value={timeRange.endTime}
          minDate={timeRange.startTime}
        />
      </div>
      <div className="flex">
        <Dropdown
          options={dropdownOptions}
          onChange={(value: IDropdownOption) => handleDropdownChange(value)}
          value={selectedDropdown}
          placeholder="Select an option"
        />
      </div>
    </div>
  );
};
