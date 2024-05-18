import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import TechnologySelector from "./options/TechnologySelector";
import Timer from "./options/Timer";
import SettingsCascader from "./options/SettingsCascader";
import SubmitTest from "./options/SubmitTest";

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
      <Grid container alignItems="center" spacing={0}>
        <Grid item>
          <div style={{ width: "4.8rem" }}>
            <Timer />
          </div>
        </Grid>
        <Grid item>
          <TechnologySelector
            programmingLanguages={programmingLanguages}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </Grid>
      </Grid>

      <div className="flex space-x-3 items-center">
        <Tooltip sx={{ marginInlineEnd: "-12px" }} title="Submit">
          <SubmitTest testCasesOutput={testCasesOutput} />
        </Tooltip>
        <Tooltip title="Expand Editor">
          <IconButton onClick={onCodeEditorExpand}>
            <OpenWithIcon className="cursor-pointer text-gray-500 hover:text-gray-800" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset">
          <IconButton onClick={handleReset}>
            <RefreshIcon className="cursor-pointer text-gray-500 hover:text-gray-800" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <SettingsCascader setSelectedTheme={setSelectedTheme} />
        </Tooltip>
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
