class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  isNumeric(s) {
    return !isNaN(s - parseFloat(s));
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    } else if (
      this.isNumeric(lowerCaseMessage) &&
      lowerCaseMessage.length < 4
    ) {
      this.actionProvider.handleSecondQuestion();
    } else if (this.isNumeric(lowerCaseMessage)) {
      this.actionProvider.handleGetDoctorByPin(lowerCaseMessage);
    } else if (
      lowerCaseMessage.includes("male") ||
      lowerCaseMessage.includes("female")
    ) {
      this.actionProvider.handleSymptomsQuestion();
    } else if (lowerCaseMessage.includes("you might have")) {
      this.actionProvider.handleEnterPin();
    } else {
      this.actionProvider.NotFound(message);
    }
  }
}

export default MessageParser;
