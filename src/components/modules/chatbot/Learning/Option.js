import React from "react";

const LearningOptions = (props) => {
  const options = [
    {
      text: "Myself",
      handler: () => props.actionProvider.handleFirstQuestion("My Self"),
      id: 1,
    },
    {
      text: "Someone else",
      handler: () => props.actionProvider.handleFirstQuestion("Someone"),
      id: 2,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="symptoms-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="symptoms-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;
