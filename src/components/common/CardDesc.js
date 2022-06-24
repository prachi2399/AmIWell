import React from "react";

function CardDesc(props) {
  return (
    <div className="col-md-4 col-12 ">
      <div className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
        <div className="my-3 py-3">
          <h2 style={{ color: "white" }} className="display-5">
            {props?.name}
          </h2>
          <p className="lead">Expertise - {props?.symptoms.join(", ")}</p>
        </div>
        <div
          className="bg-light shadow-sm mx-auto text-dark rounded p-3"
          alt="doctor"
          style={{
            width: "80%",
            height: "200px",
            borderRadius: "21px 21px 0 0",
          }}
        >
          <p>Email - {props?.email}</p>
          <p>Address - {props?.address}</p>
          <p>City - {props?.city}</p>
          <p>State - {props?.state}</p>
        </div>
        <div class="d-grid gap-2 my-3">
          <button type="button" class="btn btn-light d-block">
            Contact - {props?.phone}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDesc;
