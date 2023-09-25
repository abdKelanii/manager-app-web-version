 "use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Details from "../../components/steps/Details";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "../../components/steps/Menu";
import BoH from "../../components/steps/BoH";
import AccountDetails from "../../components/steps/AccountDetails";
import FoH from "../../components/steps/FoH";
import Staff from "../../components/steps/Staff";
import Branding from "../../components/steps/Branding";
import { useSelector } from "react-redux";

const steps = [
  "Details",
  "BoH Setup",
  "FoH Setup",
  "Menu",
  "Staff",
  "Account Details",
  "Branding",
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const { isCompleted } = useSelector((state) => state.details);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (!isCompleted && activeStep === 0) {
      alert("Please submit the restaruant details first.");
    } else if (isCompleted && activeStep === 0) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (!isCompleted) {
      alert("Please submit the restaruant details first.");
      setActiveStep(0);
      return;
    } else {
      setActiveStep(step);
    }
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Box
        sx={{
          paddingTop: "30px",
          "@media screen and (min-width: 768px)": {
            width: "60%",
          },
        }}
      >
        {isMobile ? (
          <Box>
            <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
              {steps[activeStep]}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext} sx={{ mr: 1, zIndex: 0 }}>
                Next
              </Button>
            </Box>
          </Box>
        ) : (
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        )}
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <div className="flex mt-6 justify-center items-center">
                  <Details />
                </div>
              )}

              {activeStep === 1 && (
                <div className="flex mt-6 justify-center items-center">
                  <BoH />
                </div>
              )}

              {activeStep === 2 && (
                <div className="flex mt-6 justify-center items-center">
                  <FoH />
                </div>
              )}

              {activeStep === 3 && (
                <div className="flex mt-6 justify-center items-center">
                  <Menu />
                </div>
              )}

              {activeStep === 4 && (
                <div className="flex mt-6 justify-center items-center">
                  <Staff />
                </div>
              )}

              {activeStep === 5 && (
                <div className="flex mt-6 justify-center items-center">
                  <AccountDetails />
                </div>
              )}
              {activeStep === 6 && (
                <div className="flex mt-6 justify-center items-center">
                  <Branding />
                </div>
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1, zIndex: 0 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}
