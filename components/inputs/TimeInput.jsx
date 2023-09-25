"use client";
import React from "react";
import Input from "./Input";

export default function TimeInput({ label, onChange, id, value }) {

  return (
    <div className="">
      <div className="md:flex justify-between gap-x-5">
        <div className="flex-1">
          <Input
            id={id}
            label={label}
            value={value}
            type="time"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
