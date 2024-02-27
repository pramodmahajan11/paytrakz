import React from "react";
import "./Calendar.css";
export default function EventBox({ name, description, start, end }) {
  return (
    <div className="row align-items-center">
      <div className="col">
        <div className="d-flex align-items-center bg-light p-1 row ml-3">
          <div className="text-center col-md-3">
            <h6>{start}</h6>
            <span className="d-block" id="time_to">
              To
            </span>
            <h6 className="mt-2">{end}</h6>
          </div>
          <div className="col-md-8 ">
            <div className="d-flex justify-content-between">
              <h4 className="text-capitalize">{name}</h4>
            </div>
            <div className="">
              <p className="my-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
