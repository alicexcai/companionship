import React, { useEffect, useRef, useState } from "react";
import Compose from "../Compose";
import Message from "../Message";
import moment from "moment";

import "./MessageList.css";
import Toolbar from "../Toolbar";
import GPTService from "../../services/gpt";
import MessageBuilderService from "../../services/message-builder";
import TypingIndicator from "../TypingIndicator";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const MY_USER_ID = "Me";

export interface Message {
  author: string;
  message: string;
  timestamp: number;
}

export default function MessageList({option, options, setOption }: any) {
  type Conversation = { speaker: string, message: string };
  let speakerDict = new Map<string, Conversation>();
  speakerDict.set("Intellectual Conversation", { speaker: "Professor", message: "Hello, I am a professor. Let's talk about something interesting. What is the most fascinating concept you've learned about lately?" });
  speakerDict.set("Theraputic Conversation", { speaker: "Therapist", message: "Hello, I am a therapist. I am here to help you with your mental health. How do you feel?" });
  speakerDict.set("Reflective Conversation", { speaker: "Self", message: "Hello, I am you, yourself. I am here to help you reflect on your life. What's new in your life?" });
  speakerDict.set("Problem-solving Conversation", { speaker: "Counselor", message: "Hello, I am a counselor. I am here to help you solve any problems you may have. What is one thing you're struggling with right now?" });
  speakerDict.set("Open-ended Conversation", { speaker: "Friend", message: "Hello, I am your friend. I'm here to talk about something fun!" });


  const handleOptionChange = (option: string) => {
    setOption(option);
    console.log("Option: ", option); setMessages([
      {
        author: speakerDict.get(option)!.speaker,
        message: speakerDict.get(option)!.message,
        timestamp: new Date().getTime(),
      },
    ]);
    console.log("Conversation info: ", messages)
  };

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      author: speakerDict.get(option)!.speaker,
      message: speakerDict.get(option)!.message,
      timestamp: new Date().getTime(),
    },
  ] as Message[]);

  // Stays scrolled to bottom.
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef) {
      (messagesEndRef.current as any)?.scrollIntoView({ behavior: "smooth" })
    }
  });
  const addMyMessage = async (value: string) => {
    const newMessage = {
      author: MY_USER_ID,
      message: value,
      timestamp: new Date().getTime(),
    };
    
    setMessages((previous) => [...previous, newMessage]);
    setLoading(true);
    const withMine = [...messages, newMessage];
    const response = await GPTService.getAIResponse(withMine, option);
    const responseMessage = {
      author: speakerDict.get(option)!.speaker,
      message: response,
      timestamp: new Date().getTime(),
    };
    setMessages((previous) => [...previous, responseMessage]);
    setLoading(false);
  };

  return (
    <div className="message-list">
      <Toolbar title="Chat with GPT3" />
      {/* <Dropdown title="Select conversatio type" /> */}
      <h4>What kind of conversation do you want to have?</h4>
      <Dropdown options={options} onChange={(e) => handleOptionChange(e.value)} value={option} placeholder="Select conversation type" />

      <div className="message-list-container">{MessageBuilderService.getMessages(messages, MY_USER_ID)}
      {loading && <TypingIndicator />}
      <div ref={messagesEndRef} />
      </div>
      

      <Compose addMessage={addMyMessage} />
    </div>
  );
}
