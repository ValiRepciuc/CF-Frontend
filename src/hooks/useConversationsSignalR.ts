import { useEffect } from "react";
import { startChatConnection } from "../services/ConversationHubService";
import { Conversation } from "../features/social/hooks/useConversation";

export const useConversationsSignalR = (
  onUpdate: (conv: Conversation) => void
) => {
  useEffect(() => {
    let mounted = true;

    (async () => {
      const conn = await startChatConnection("http://localhost:5120");

      conn.on("ReceiveConversationUpdate", (conversationDto: any) => {
        if (!mounted) return;

        const currentUserName = JSON.parse(
          localStorage.getItem("user")!
        ).userName;

        const formatted: Conversation = {
          id: conversationDto.id,
          otherUsername:
            conversationDto.user1Name === currentUserName
              ? conversationDto.user2Name
              : conversationDto.user1Name,
          createdAt: new Date(conversationDto.createdAt).toLocaleString(),
        };
        onUpdate(formatted);
      });
    })();

    return () => {
      mounted = false;
    };
  }, [onUpdate]);
};
