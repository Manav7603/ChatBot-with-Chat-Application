import { createContext, useContext } from "react";
import { ChatContext } from './ChatContext';

const { GenerativeModel } = require('@google-ai/generativelanguage');

const GOOGLE_API_KEY = "API_KEY";
const genai = new GenerativeModel({ apiKey: GOOGLE_API_KEY });
const model = genai.model("gemini-pro");

let chat = model.startChat({ history: [] });

async function getGeminiResponse(question) {
    const response = await chat.sendMessage(question, { stream: true });
    return response;
}

export const MessageComponent = ({ sender }) => {
    const { data } = useContext(ChatContext);

    // Filter messages from the specified sender
    const senderMessages = data.messages
        .filter(message => message.sender === sender);

    // Concatenate the text of all messages from the specified sender into a single string
    const concatenatedMessages = senderMessages.map(message => message.text).join(" ");

    // Return the concatenated string
    return concatenatedMessages;
};
