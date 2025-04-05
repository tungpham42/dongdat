import React, { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import {
  fetchEarthquakes,
  getIntensityClass,
} from "../utils/earthquakeService";
import LoadingSpinner from "./LoadingSpinner";

const EarthquakeList = ({ filters, isLoading }) => {
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h4 className="scientific-header">
        {t("recentEarthquakes")}{" "}
        {filters.timeRange === "month" ? t("lastMonth") : t("lastDay")}
      </h4>
      <ListGroup style={{ maxHeight: "500px", overflowY: "auto" }}>
        {earthquakes.map((quake) => (
          <ListGroup.Item
            key={quake.id}
            className={`${getIntensityClass(quake.properties.mag)} mb-2`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div>
                  <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                  <strong>{quake.properties.place}</strong>
                </div>
                <small className="text-muted">
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  {new Date(quake.properties.time).toLocaleString()}
                </small>
              </div>
              <Badge
                bg={quake.properties.mag >= 5 ? "danger" : "warning"}
                className="magnitude-badge"
              >
                {quake.properties.mag.toFixed(1)}
              </Badge>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default EarthquakeList;
