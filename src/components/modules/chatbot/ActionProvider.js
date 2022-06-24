import { getDoctorsByPincode } from "../../../api/product";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleFirstQuestion = (txt) => {
    const message = this.createChatBotMessage(
      txt === "My Self" ? "Tell me your age:" : "Tell me his/her age:"
    );

    this.updateChatbotState(message);
  };

  handleSecondQuestion = () => {
    const message = this.createChatBotMessage("Tell me your gender?");

    this.updateChatbotState(message);
  };

  handleGetDoctorByPin = async (pincode) => {
    const message = this.createChatBotMessage(
      "Please wait while we are fetching the doctors near you."
    );

    this.updateChatbotState(message);

    const doctors = await getDoctorsByPincode(pincode);

    if (doctors.length > 0) {
      const doctorNames = doctors.map((doctor) => doctor.name);
      const doctorMobile = doctors.map((doctor) => doctor.phone);
      const message = this.createChatBotMessage(
        `We found ${doctors.length} doctors near you. ${doctorNames.join(
          ", "
        )} and their mobile numbers are: ${doctorMobile.join(", ")}`
      );

      this.updateChatbotState(message);
    } else {
      const message = this.createChatBotMessage(
        "Sorry, we could not find any doctors near you."
      );

      this.updateChatbotState(message);
    }
  };

  NotFound = (txt) => {
    const message = this.createChatBotMessage(
      "I'm sorry, I have no information on about " + txt
    );

    this.updateChatbotState(message);
  };

  handleSymptomsQuestion = () => {
    const message = this.createChatBotMessage("Enter your symptoms!!", {
      widget: "symptomsLinks",
    });

    this.updateChatbotState(message);
  };

  handleSymptom = (item) => {
    const getDiagnosis = async () => {
      let message;
      try {
        const response = await fetch(
          "http://localhost:4001/api/get-diagnosis",
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ symptoms: item }),
          }
        );
        const result = await response.json();
        if (!result.error) {
          message = this.createChatBotMessage("you might have " + result.data);
        } else {
          message = this.createChatBotMessage(
            "I'm sorry, I have no information on about " + item
          );
        }
      } catch (error) {
        message = this.createChatBotMessage(
          "I'm sorry, I have no information on about " + item
        );
      }
      this.updateChatbotState(message);
      message = this.createChatBotMessage("Enter Your Pincode");
      this.updateChatbotState(message);
    };

    getDiagnosis();
  };

  handleEnterPin = () => {
    const message = this.createChatBotMessage("Enter Your Pincode");

    this.updateChatbotState(message);
  };

  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.");
    this.updateChatbotState(greetingMessage);
  }

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
