import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);

    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};





// import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { db } from "../firebase";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});

//   const sendMessage = (message, to) => {
//     const messagesRef = db.ref("messages");
//     const newMessageRef = messagesRef.push();
//     newMessageRef.set({
//       from: 'ChatBOT',
//       to: to,
//       message: message,
//       timestamp: new Date().getTime()
//     });
//   };

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       console.log(user);
//     });

//     return () => {
//       unsub();
//     };
//   }, []);

//   useEffect(() => {
//     const messagesRef = db.ref("messages");

//     messagesRef.on("child_added", (data) => {
//       const message = data.val();
//       if (message.to === 'ChatBOT' && message.from!== 'ChatBOT') {
//         // automatically send a response back to the user
//         sendMessage('Wait ChatBot will reply', message.from);
//       }
//     });

//     return () => {
//       messagesRef.off("child_added");
//     };
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, sendMessage }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
