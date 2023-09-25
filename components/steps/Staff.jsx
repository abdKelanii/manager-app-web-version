import Input from "../inputs/Input";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../redux/stepper/staffSlice";
import { addStaff } from "../../firebase/databaseServices";
import { useState } from "react";

const Staff = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { FoHRate, BoHRate, FoHEmail, BoHEmail } = useSelector(
    (state) => state.staff
  );

  const onChangedInput = (type, value) => {
    dispatch(
      setInput({
        type: type,
        value: value,
      })
    );
  };

  const handleSubmit = async () => {
    if (!FoHRate || !BoHRate) {
      setErrorMessage("Please fill in default hourly rate for BoH and BoH.");
      setSuccessMessage(null);
      return;
    }
    try {
      const staffData = {
        FoHRate,
        BoHRate,
        FoHEmail,
        BoHEmail,
      };
      await addStaff(staffData);

      setSuccessMessage("Staff data added successfully!");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        "Error adding staff data. Please try again later."
      );
      setSuccessMessage(null);
      console.error("Error adding staff data:", error);
    }
  };

  return (
    <div className="md:w-[75%] mb-10">
      <div className="flex justify-center items-center">
        <Header title="Team Management" />
      </div>
      <div className="flex justify-center items-center gap-x-5">
        <div className="flex-1">
          <Input
            label="Default FoH hourly rate"
            placeholder="40$"
            type="number"
            value={FoHRate}
            onChange={(e) => onChangedInput("FoHRate", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Default BoH hourly rate"
            placeholder="40$"
            type="number"
            value={BoHRate}
            onChange={(e) => onChangedInput("BoHRate", e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 justify-center items-center gap-x-5">
        <div>
          <div className="flex flex-1 gap-x-5">
            <div className="flex-1">
              <Input
                label="Enter an email"
                placeholder="name@mail.com"
                value={FoHEmail}
                onChange={(e) => onChangedInput("FoHEmail", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <div className="mt-6">
                <Button name="Invite FoH staff" onClick={() => {}} />
              </div>
            </div>
          </div>
          <div className="flex flex-1 gap-x-5">
            <div className="flex-1">
              <Input
                label="Enter an email"
                placeholder="name@mail.com"
                value={BoHEmail}
                onChange={(e) => onChangedInput("BoHEmail", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <div className="mt-6">
                <Button name="Invite BoH staff" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-5">
        <Button name="Update" onClick={handleSubmit} />
      </div>
      {successMessage && (
        <div className="flex justify-center items-center text-green-500">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="flex justify-center items-center text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Staff;
