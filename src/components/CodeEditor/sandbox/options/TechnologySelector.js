function TechnologySelector({
  programmingLanguages,
  selectedLanguage,
  setSelectedLanguage,
}) {
  return (
    <div className="w-60">
      <select
        id="technology-selector-select"
        className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white text-sm"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(Number(e.target.value))}
      >
        {programmingLanguages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TechnologySelector;
