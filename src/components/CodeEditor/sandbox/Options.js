import RefreshIcon from "@mui/icons-material/Refresh";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ThemeSelector from "./options/ThemeSelector";
import TechnologySelector from "./options/TechnologySelector";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import SubmitTest from "./options/SubmitTest";

const themes = ["vs-dark", "hc-light", "hc-black"];

function Options({
  programmingLanguages,
  selectedLanguage,
  setSelectedLanguage,
  selectedTheme,
  setSelectedTheme,
  onReset,
  setCodeEditorExtend,
  testCasesOutput,
}) {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const handleReset = () => {
    setOpenConfirmationModal(true);
  };

  const handleResetConfirmed = () => {
    onReset();
    setOpenConfirmationModal(false);
  };

  const handleResetCancelled = () => {
    setOpenConfirmationModal(false);
  };

  const onCodeEditorExpand = () => {
    setCodeEditorExtend(true);
  };

  return (
    <>
      <div className="flex items-center space-x-2 w-auto">
        <label
          htmlFor="technology-selector-select"
          className="font-medium text-gray-600"
        >
          Language:
        </label>
        <TechnologySelector
          programmingLanguages={programmingLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>

      <div className="">
        <SubmitTest testCasesOutput={testCasesOutput} />
      </div>

      <div className="flex justify-between w-full lg:flex-row-reverse xl:flex-row sm:w-auto sm:space-x-4 items-center">
        <div className="flex items-center space-x-2 lg:invisible xl:visible lg:w-0 lg:h-0 xl:w-auto xl:h-auto w-auto h-auto">
          <label htmlFor="theme-select" className="font-medium text-gray-600">
            Theme:
          </label>
          <ThemeSelector
            themes={themes}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        </div>

        <span
          onClick={onCodeEditorExpand}
          className="cursor-pointer text-gray-500 hover:text-gray-800"
        >
          <OpenWithIcon />
        </span>

        <span
          onClick={handleReset}
          className="cursor-pointer text-gray-500 hover:text-gray-800"
        >
          <RefreshIcon />
        </span>
      </div>

      <Dialog
        open={openConfirmationModal}
        onClose={handleResetCancelled}
        aria-labelledby="reset-confirmation-modal"
      >
        <DialogTitle id="reset-confirmation-modal">Confirm Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset the editor? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleResetCancelled}
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleResetConfirmed} autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Options;
