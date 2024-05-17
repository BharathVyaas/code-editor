import React from "react";
import { Select, MenuItem } from "@mui/material";

function TechnologySelector({
  programmingLanguages,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <Select
      labelId="technology-selector-label"
      id="technology-selector-select"
      size="small"
      sx={{ minWidth: "7rem" }}
      value={selectedLanguage}
      onChange={handleChange}
      label="Technology"
    >
      {programmingLanguages.map((language) => (
        <MenuItem key={language.id} value={language.id}>
          {language.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default TechnologySelector;
