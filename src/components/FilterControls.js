import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

const FilterControls = ({ onFilterChange, isLoading }) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    minMagnitude: "",
    maxMagnitude: "",
    timeRange: "day",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onFilterChange(filters);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="scientific-header">
        <FontAwesomeIcon icon={faFilter} className="me-2" />
        {t("filters")}
      </h4>
      <Form.Group className="mb-3">
        <Form.Label>{t("minMagnitude")} (M)</Form.Label>
        <Form.Control
          type="number"
          name="minMagnitude"
          value={filters.minMagnitude}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          placeholder="e.g. 2.5"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("maxMagnitude")} (M)</Form.Label>
        <Form.Control
          type="number"
          name="maxMagnitude"
          value={filters.maxMagnitude}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          placeholder="e.g. 5.0"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("timeRange")}</Form.Label>
        <Form.Select
          name="timeRange"
          value={filters.timeRange}
          onChange={handleChange}
        >
          <option value="day">{t("pastDay")}</option>
          <option value="month">{t("pastMonth")}</option>
        </Form.Select>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            {t("loading")}
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            {t("applyFilters")}
          </>
        )}
      </Button>
    </Form>
  );
};

export default FilterControls;
