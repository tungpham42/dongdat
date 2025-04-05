import axios from "axios";

export const fetchEarthquakes = async ({
  timeRange,
  minMagnitude,
  maxMagnitude,
}) => {
  const url =
    timeRange === "month"
      ? "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
      : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

  const response = await axios.get(url);
  let filteredData = response.data.features;

  if (minMagnitude !== "") {
    filteredData = filteredData.filter(
      (quake) => quake.properties.mag >= parseFloat(minMagnitude)
    );
  }
  if (maxMagnitude !== "") {
    filteredData = filteredData.filter(
      (quake) => quake.properties.mag <= parseFloat(maxMagnitude)
    );
  }

  return filteredData;
};

export const getColorForMagnitude = (mag) => {
  if (mag < 3) return "#5bc0de"; // blue
  if (mag < 5) return "#f0ad4e"; // orange
  return "#d9534f"; // red
};

export const getIntensityClass = (mag) => {
  if (mag < 2) return "intensity-1";
  if (mag < 4) return "intensity-2";
  if (mag < 5) return "intensity-3";
  if (mag < 6) return "intensity-4";
  return "intensity-5";
};
