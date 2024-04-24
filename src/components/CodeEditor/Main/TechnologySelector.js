import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";

function TechnologySelector({
  programmingLanguages,
  selectedLanguage,
  setSelectedLanguage,
}) {
  return (
    <div className="w-60">
      <FormControl fullWidth>
        <InputLabel id="technology-selector-label">Language</InputLabel>
        <Select
          labelId="technology-selector-label"
          id="technology-selector-select"
          leabel="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {programmingLanguages.map((language) => (
            <MenuItem key={language.id} value={language.id}>
              {language.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default TechnologySelector;
