import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faGaugeHigh,
  faRulerVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchEarthquakes,
  getColorForMagnitude,
} from "../utils/earthquakeService";
import LoadingSpinner from "./LoadingSpinner";

const EarthquakeMap = ({ filters, isLoading }) => {
  const { t } = useLanguage();
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchEarthquakes(filters);
        setEarthquakes(data);
      } catch (error) {
        console.error("Error loading earthquake data:", error);
      }
    };

    loadData();
  }, [filters]);

  if (isLoading) return <LoadingSpinner height="600px" />;

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "600px", width: "100%" }}
      scrollWheelZoom={true}
      dragging={true}
    >
      <TileLayer
        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        attribution='Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a>'
      />
      {earthquakes.map((quake) => {
        const [longitude, latitude] = quake.geometry.coordinates;
        const magnitude = quake.properties.mag;
        const depth = quake.geometry.coordinates[2];

        return (
          <CircleMarker
            key={quake.id}
            center={[latitude, longitude]}
            radius={Math.max(magnitude * 2, 5)}
            fillColor={getColorForMagnitude(magnitude)}
            color="#333"
            weight={1}
            fillOpacity={0.7}
          >
            <Popup>
              <div>
                <h5>
                  <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                  {quake.properties.place}
                </h5>
                <p>
                  <FontAwesomeIcon icon={faGaugeHigh} className="me-2" />
                  {t("magnitude")}: <strong>{magnitude}</strong> M
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  {t("time")}:{" "}
                  {new Date(quake.properties.time).toLocaleString()}
                </p>
                <p>
                  <FontAwesomeIcon icon={faRulerVertical} className="me-2" />
                  {t("depth")}: {depth} km
                </p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default EarthquakeMap;
