const getXCoord = (longitude: number) => {
  // long + 90 / 180 -6 if long >=6
  const adjustedLongitude = longitude + 180;
  if (adjustedLongitude >= 6) {
    const nonSkewedPixles = (adjustedLongitude / 360) * 367;
    const skewedPixlePoints = nonSkewedPixles - 6;
    return Math.round(skewedPixlePoints * 100) / 100;
  } else {
    const coords = 367 - adjustedLongitude;
    return Math.round(coords * 100) / 100;
  }
};

const getYCoords = (latitude: number) => {
  let adjustedLatitude = 0;

  if (latitude >= 0) {
    adjustedLatitude = Math.abs(latitude - 90);
  } else {
    adjustedLatitude = Math.abs(latitude + 90);
  }

  const heightPercent = adjustedLatitude / 180;

  const pixles = heightPercent * 281;
  return Math.round(pixles * 100) / 100 + 7;
};

interface IGetCoords {
  latitude: number;
  longitude: number;
}

interface IGetCoordsResponse {
  class: string;
  top: number;
  left: number;
}
export const getCoords = ({
  latitude,
  longitude,
}: IGetCoords): IGetCoordsResponse => {
  const baseCss = ["absolute inset-0 z-0 w-[373px]"];

  const left = getXCoord(longitude);
  const top = getYCoords(latitude);
  baseCss.push(`left-[${left}px]`);
  baseCss.push(`top-[${top}px]`);

  return { class: baseCss.join(" ").trim(), top, left };
};
