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
import BackupIcon from "@mui/icons-material/Backup";

const themes = ["vs-dark", "hc-light", "hc-black"];

function Options({
  programmingLanguages,
  selectedLanguage,
  setSelectedLanguage,
  selectedTheme,
  setSelectedTheme,
  onReset,
  setCodeEditorExtend,
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
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-600">Language:</label>
        <TechnologySelector
          programmingLanguages={programmingLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>

      <div className="flex space-x-4 items-center justify-between">
        <div>
          <Button
            className="text-green-400 cursor-pointer"
            color="success"
            startIcon={<BackupIcon />}
          >
            Submit
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-600">Theme:</label>
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