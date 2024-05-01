// import {
//   createContext,
//   useContext,
//   useReducer,
// } from "react";
// import { AuthContext } from "./AuthContext";

// export const ChatContext = createContext();

// export const ChatContextProvider = ({ children }) => {
//   const { currentUser } = useContext(AuthContext);
//   const INITIAL_STATE = {
//     chatId: "null",
//     user: {},
//   };

//   const chatReducer = (state, action) => {
//     switch (action.type) {
//       case "CHANGE_USER":
//         return {
//           user: action.payload,
//           chatId:
//             currentUser.uid > action.payload.uid
//               ? currentUser.uid + action.payload.uid
//               : action.payload.uid + currentUser.uid,
//         };

//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//   return (
//     <ChatContext.Provider value={{ data:state, dispatch }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };


import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

import { ChatContext } from "./ChatContext";


const { GenerativeModel } = require('@google-ai/generativelanguage');

const GOOGLE_API_KEY = "Your_Api_key";
const genai = new GenerativeModel({ apiKey: GOOGLE_API_KEY });
const model = genai.model("gemini-pro");

let chat = model.startChat({ history: [] });




async function getGeminiResponse(question) {
    const response = await chat.sendMessage(question, { stream: true });
    return response;
  }
  export const ChatContext = createContext();
  
const MessageComponent = ({ sender }) => {
  const { data } = useContext(ChatContext);

  // Filter messages from the specified sender
  const senderMessages = data.messages
    .filter(message => message.sender === sender);

  // Concatenate the text of all messages from the specified sender into a single string
  const concatenatedMessages = senderMessages.map(message => message.text).join(" ");

  // Return the concatenated string
  return concatenatedMessages;
};

export default MessageComponent;
export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    messages: [], // To store all messages
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          messages: state.messages, // Maintain messages when changing user
        };

      case "RECEIVE_MESSAGE":
        let input = "hi";
        if (action.payload.recipient === "ChatBOT") {
          // If the message is sent to the ChatBOT, immediately send a reply
          // Dispatch an action to add "HI I am fine" as a message from ChatBOT
          const AnotherComponent = () =>{ 
            const concatenatedMessages = MessageComponent({ sender: action.payload.sender  }); // Call the function with the sender parameter
            // You can now use concatenatedMessages as needed
            return (

              
            input={concatenatedMessages}
  
            );
          };
          let text1=":)\n"
        getGeminiResponse(input)
                      .then(response => {
          console.log(response);
          response.forEach(chunk => {
              console.log(chunk.text);
          });
          text1+=response
      })
      .catch(error => {
          console.error("Error:", error);
      });

          const newMessage = {
            sender: "ChatBOT",
            recipient: action.payload.sender,
            text: text1+"\nThank You for asking me!!",
          };
          return {
            ...state,
            messages: [...state.messages, newMessage],
          };
        }
        return state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);


  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
