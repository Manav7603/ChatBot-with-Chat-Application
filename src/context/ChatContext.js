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
import { MessageComponent } from "./Google"; 
import { getGeminiResponse } from "./Google";
export const ChatContext = createContext();

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
          const concatenatedMessages = MessageComponent({ sender: action.payload.sender }); // Call the function with the sender parameter
          let text1 = ":)\n";
          getGeminiResponse(input)
            .then(response => {
              console.log(response);
              response.forEach(chunk => {
                console.log(chunk.text);
              });
              text1 += response;
            })
            .catch(error => {
              console.error("Error:", error);
            });

          const newMessage = {
            sender: "ChatBOT",
            recipient: action.payload.sender,
            text: text1 + "\nThank You for asking me!!",
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
