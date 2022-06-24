import React, { useEffect, useState } from "react";

const SymptomsOptions = (props) => {
  const [symptoms, setSymptoms] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSymptoms = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/symptoms");
      const result = await response.json();
      const data = result?.symptoms?.map((item, i) => ({
        text: item,
        handler: () => props.actionProvider.handleSymptom(item),
        id: i,
      }));
      setSymptoms(data);
    } catch (error) {
      console.log(error, "eeerrr");
    }
  };

  useEffect(() => {
    getSymptoms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionsMarkup = symptoms?.map((option) => (
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

export default SymptomsOptions;
