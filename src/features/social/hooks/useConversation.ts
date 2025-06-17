import {
  getUserConversations,
  getConversationById,
} from "../services/ConversationService";
import { useState, useEffect } from "react";
import { useConversationsSignalR } from "../../../hooks/useConversationsSignalR";
import { getOrCreateConversation } from "../services/ConversationService";

export interface Conversation {
  id: string;
  otherUsername: string;
  createdAt: string;
}

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getUserConversations();

        const currentUserName = JSON.parse(
          localStorage.getItem("user")!
        ).userName;

        if (!currentUserName) return;

        const formattedConversations = response
          .map((conv: any) => {
            const otherUsername =
              conv.user1Name === currentUserName
                ? conv.user2Name
                : conv.user1Name;

            return {
              id: conv.id,
              otherUsername,
              createdAt: new Date(conv.createdAt).toLocaleString(),
            };
          })
          .sort(
            (a: Conversation, b: Conversation) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setConversations(formattedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  useConversationsSignalR((updatedConv) => {
    setConversations((prev) => {
      const exists = prev.some((c) => c.id === updatedConv.id);
      if (exists) {
        return prev.map((c) => (c.id === updatedConv.id ? updatedConv : c));
      } else {
        return [updatedConv, ...prev];
      }
    });
  });

  return { conversations, loading, setConversations };
};

export interface Message {
  senderName: string;
  content: string;
  createdAt: string;
}

export const useConversationById = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!conversationId) return;
    setLoading(true);
    const fetchMessages = async () => {
      const response = await getConversationById(conversationId);

      const formattedMessages = response.messages
        .map((m: Message) => {
          return {
            senderName: m.senderName,
            content: m.content,
            createdAt: new Date(m.createdAt).toLocaleString(),
          };
        })
        .sort(
          (a: Message, b: Message) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      setMessages(formattedMessages);
      setLoading(false);
    };
    fetchMessages();
  }, [conversationId]);
  return { messages, loadingMessages };
};

export const useGetOrCreateConversation = () => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrCreateConversation = async (userId: string) => {
    setLoading(true);
    try {
      const response = await getOrCreateConversation(userId);

      const currentUserName = JSON.parse(
        localStorage.getItem("user")!
      ).userName;

      const otherUsername =
        response.user1Name === currentUserName
          ? response.user2Name
          : response.user1Name;

      const formattedConversation: Conversation = {
        id: response.id,
        otherUsername,
        createdAt: new Date(response.createdAt).toLocaleString(),
      };

      setConversation(formattedConversation);
      return formattedConversation;
    } catch (error) {
      console.error("Error getting/creating conversation:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { conversation, fetchOrCreateConversation, loading };
};
