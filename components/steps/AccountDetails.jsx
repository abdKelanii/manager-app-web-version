"use client";
import BillSplitting from "./BillSplitting";
import Header from "../ui/Header";

const AccountDetails = () => {
  return (
    <div className="md:w-[75%]">
      <div className="w-full flex justify-center items-center ">
        <Header title="Acount Details Setup" />
      </div>
      {/* Bill Splitting */}
      <div className="mt-10">
        <BillSplitting />
      </div>

    </div>
  );
};

export default AccountDetails;
