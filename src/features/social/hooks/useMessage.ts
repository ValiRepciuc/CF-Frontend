import { postMessage } from "../services/MessageService";
import { useState, useEffect } from "react";

export interface Message {
  content: string;
}

export const useMessage = (conversationId: string) => {
  const [message, setMessage] = useState<Message>({ content: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!conversationId || !message.content.trim()) return;

    setLoading(true);
    try {
      await postMessage(conversationId, message.content);
      setMessage({ content: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return { message, setMessage, sendMessage, loading };
};
