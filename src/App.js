import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/sandstone/bootstrap.css";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeList from "./components/EarthquakeList";
import FilterControls from "./components/FilterControls";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useLanguage } from "./context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";

const languageNames = {
  vi: "Tiếng Việt",
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  it: "Italiano",
  ru: "Русский",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
};

function App() {
  const { t, language, setLanguage } = useLanguage();
  const [filters, setFilters] = useState({
    timeRange: "day",
    minMagnitude: "",
    maxMagnitude: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (newFilters) => {
    setIsLoading(true);
    setFilters(newFilters);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [filters, isLoading]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Container
      fluid
      className="p-3"
      style={{ backgroundColor: "var(--seismic-light)" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="scientific-header">
          <FontAwesomeIcon icon={faEarthAsia} className="me-2" />
          {t("appTitle")}
        </h1>
        <DropdownButton
          title={
            <>
              <FontAwesomeIcon icon={faGlobe} className="me-1" />
              {languageNames[language]}
            </>
          }
          id="language-dropdown"
          variant="outline-secondary"
          size="sm"
        >
          {Object.entries(languageNames).map(([code, name]) => (
            <Dropdown.Item
              key={code}
              onClick={() => handleLanguageChange(code)}
              active={language === code}
            >
              {name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <Row>
        <Col md={4}>
          <div className="seismic-card">
            <FilterControls
              onFilterChange={handleFilterChange}
              isLoading={isLoading}
            />
          </div>
          <div className="seismic-card">
            <EarthquakeList filters={filters} isLoading={isLoading} />
          </div>
        </Col>
        <Col md={8}>
          <div className="seismic-card" style={{ padding: 0 }}>
            <EarthquakeMap filters={filters} isLoading={isLoading} />
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
