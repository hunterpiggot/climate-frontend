type Props = {
  height: "1" | "2" | "3";
  width: "1" | "2" | "3";
  color: "1" | "2" | "3" | "4" | "5";
  className?: string;
  cardBody: JSX.Element;
};

export const BaseCard = ({
  height,
  width,
  color,
  className,
  cardBody,
}: Props) => {
  const colorMap = {
    "1": "bg-dashboard-tile-1",
    "2": "bg-dashboard-tile-2",
    "3": "bg-dashboard-tile-3",
    "4": "bg-dashboard-tile-4",
    "5": "bg-dashboard-tile-5",
  };

  const widthMap = {
    "1": "col-span-1",
    "2": "col-span-2",
    "3": "col-span-3",
  };
  const heightMap = {
    "1": "row-span-1",
    "2": "row-span-2",
    "3": "row-span-3",
  };

  const getCssClass = (): string => {
    const baseClass = [
      "p-[14px] grid justify-items-center rounded-[25px] drop-shadow-lg",
    ];

    // baseClass.push(`col-span-${width}`);
    // baseClass.push(`row-span-${height}`);
    const colorClass = colorMap[color];
    const widthClass = widthMap[width];
    const heightClass = heightMap[height];
    baseClass.push(colorClass);
    baseClass.push(widthClass);
    baseClass.push(heightClass);

    if (className && className.length) {
      baseClass.push(className);
    }

    return baseClass.join(" ").trim();
  };
  return <div className={getCssClass()}>{cardBody}</div>;
};
