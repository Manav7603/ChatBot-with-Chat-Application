import {
  createContext,
  useContext,
  useReducer,
} from "react";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firebase";

import { AuthContext } from "./AuthContext";
// import { db } from "../firebase";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      // case "CHANGE_USER":
      //   return {
      //     user: action.payload,
      //     chatId:
      //       currentUser.uid > action.payload.uid
      //         ? currentUser.uid + action.payload.uid
      //         : action.payload.uid + currentUser.uid,
      //   };
      case "CHANGE_USER":
      return {
        ...state,
        user: action.payload,
        chatId:
          currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid,
      };

        // case "RECEIVE_MESSAGE":
          // Check if the message is sent to the ChatBOT
          // if (action.payload.recipient === "ChatBOT") {
          //   // Dispatch a SEND_MESSAGE action to send a reply
          //   dispatch({
          //     type: "SEND_MESSAGE",
          //     payload: {
          //       sender: action.payload.recipient, // ChatBOT
          //       recipient: action.payload.sender,
          //       text: "HI", // Reply message
          //     },
          //   });
          // }
          // return state;

          
      // case "RECEIVE_MESSAGE":
      //   // Check if the message is sent to the ChatBOT
      //   if (action.payload.recipient === "ChatBOT") {
      //     // Send a reply message
      //     return {
      //       ...state,
      //       // Assuming you have a messages array in your state
      //       messages: [
      //         ...state.messages,
      //         {
      //           sender: action.payload.recipient,
      //           recipient: action.payload.sender,
      //           text: "HI", // Reply message
      //         },
      //       ],
      //     };
      //   }
      //   return state;

      // case "RECEIVE_MESSAGE":
      //   if (action.payload.recipient === "cwrpHMU5oudHn3Zwa4IhdPgFeVt1") {
      //     // Dispatch an action to update the database with the message from the ChatBOT
      //     dispatch({ type: "SEND_MESSAGE_TO_CHATBOT" });
      //   }
      //   return state;
      // case "SEND_MESSAGE_TO_CHATBOT":
      //   // Add a message from the ChatBOT to the respective user in the database
      //   const chatId = state.chatId; // Assuming you have the chatId stored in the state
      //   const message = {
      //     sender: "cwrpHMU5oudHn3Zwa4IhdPgFeVt1",
      //     recipient: currentUser.uid, // Assuming the current user is the recipient
      //     text: "Hi from ChatBOT",
      //     timestamp: new Date().toISOString(),
      //   };
      //   setDoc(doc(db, "chats", chatId), { messages: [message] }, { merge: true });
        // return state;

  

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

 
  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// // // import React, { createContext, useContext, useReducer } from "react";
// // // import { AuthContext } from "./AuthContext";
// // // import { MessageComponent } from "./Google"; 
// // // import { getGeminiResponse } from "./Google";
// // // export const ChatContext = createContext();

// // // export const ChatContextProvider = ({ children }) => {
// // //   const { currentUser } = useContext(AuthContext);
// // //   const INITIAL_STATE = {
// // //     chatId: "null",
// // //     user: {},
// // //     messages: [], // To store all messages
// // //   };

// // //   const chatReducer = (state, action) => {
// // //     switch (action.type) {
// // //       case "CHANGE_USER":
// // //         return {
// // //           user: action.payload,
// // //           chatId:
// // //             currentUser.uid > action.payload.uid
// // //               ? currentUser.uid + action.payload.uid
// // //               : action.payload.uid + currentUser.uid,
// // //           messages: state.messages, // Maintain messages when changing user
// // //         };

// // //       case "RECEIVE_MESSAGE":
// // //         let input = "hi";
// // //         if (action.payload.recipient === "ChatBOT") {
// // //           // If the message is sent to the ChatBOT, immediately send a reply
// // //           // Dispatch an action to add "HI I am fine" as a message from ChatBOT
// // //           const concatenatedMessages = MessageComponent({ sender: action.payload.sender }); // Call the function with the sender parameter
// // //           let text1 = ":)\n";
// // //           getGeminiResponse(input)
// // //             .then(response => {
// // //               console.log(response);
// // //               response.forEach(chunk => {
// // //                 console.log(chunk.text);
// // //               });
// // //               text1 += response;
// // //             })
// // //             .catch(error => {
// // //               console.error("Error:", error);
// // //             });

// // //           const newMessage = {
// // //             sender: "ChatBOT",
// // //             recipient: action.payload.sender,
// // //             text: text1 + "\nThank You for asking me!!",
// // //           };
// // //           return {
// // //             ...state,
// // //             messages: [...state.messages, newMessage],
// // //           };
// // //         }
// // //         return state;

// // //       default:
// // //         return state;
// // //     }
// // //   };

// // //   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

// // //   return (
// // //     <ChatContext.Provider value={{ data: state, dispatch }}>
// // //       {children}
// // //     </ChatContext.Provider>
// // //   );
// // // };
