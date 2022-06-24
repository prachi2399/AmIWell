import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "./Learning/Option";
import ChatImage from "../../../assets/chatbot.png";
import SymptomsOptions from "./Symptoms/Option";
const config = {
  initialMessages: [
    createChatBotMessage(
      "AmWell provides a general symptom assessment, Tell me How can i help you?",
      {
        widget: "learningOptions",
      }
    ),
  ],
  customStyles: {
    chatButton: {
      backgroundColor: "white",
      color: "white",
    },
  },
  customComponents: {
    header: () => (
      <div className="react-chatbot-kit-chat-header">
        Conversation with AmWell
      </div>
    ),
    botAvatar: (props) => (
      <img src={ChatImage} className="chatbot-message-avtar" alt="chatbot" />
    ),
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "symptomsLinks",
      widgetFunc: (props) => <SymptomsOptions {...props} />,
    },
  ],
};

export default config;
