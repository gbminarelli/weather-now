import { Cell } from "./Cell.js";

const e = React.createElement;

export const Output = (props) => {
  // Converting the raw timestamps to local time Date objects:
  const sunriseRaw = new Date(
    (props.data.sys.sunrise + props.data.timezone) * 1000
  );
  const sunsetRaw = new Date(
    (props.data.sys.sunset + props.data.timezone) * 1000
  );
  // Parsing the raw API results:
  const filteredData = {
    name: props.data.name,
    temp: props.data.main.temp,
    temp_min: props.data.main.temp_min,
    temp_max: props.data.main.temp_max,
    feels_like: props.data.main.feels_like,
    wind: props.data.wind.speed,
    humidity: props.data.main.humidity,
    sunrise: `${sunriseRaw.getHours()}:${sunriseRaw.getMinutes()}`,
    sunset: `${sunsetRaw.getHours()}:${sunsetRaw.getMinutes()}`,
  };

  return e(
    "div",
    { className: "output" },
    e("div", { id: "name" }, filteredData.name),
    e(
      "div",
      null,
      e(
        "div",
        { id: "temp" },
        filteredData.temp,
        e("span", { className: "output-unit" }, "°C")
      ),
      e("div", { className: "output-text" }, "FEELS LIKE"),
      e(
        "div",
        null,
        filteredData.feels_like,
        e("span", { className: "output-unit" }, "°C")
      )
    ),
    e(
      "div",
      { id: "output-cell-wrapper" },
      e(Cell, { name: "WIND", value: filteredData.wind, unit: "m/s" }),
      e(Cell, { name: "TEMP MIN", value: filteredData.temp_min, unit: "°C" }),
      e(Cell, { name: "TEMP MAX", value: filteredData.temp_max, unit: "°C" }),
      e(Cell, { name: "HUMIDITY", value: filteredData.humidity, unit: "%" }),
      e(Cell, { name: "SUNRISE", value: filteredData.sunrise }),
      e(Cell, { name: "SUNSET", value: filteredData.sunset })
    )
  );
};
