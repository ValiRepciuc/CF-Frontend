// hooks/useConversationSignalR.ts
import { useEffect } from "react";
import { startChatConnection } from "../services/ConversationHubService";
import { Message } from "../features/social/hooks/useConversation";

export const useConversationSignalR = (
  conversationId: string,
  onReceive: (msg: Message) => void
) => {
  // Keep a reference to the current handler
  useEffect(() => {
    if (!conversationId) return;

    let connPromise = startChatConnection("http://localhost:5120");
    let isSubscribed = true;

    (async () => {
      const conn = await connPromise;
      await conn.invoke("JoinConversation", conversationId);

      const handler = (messageDto: any) => {
        if (!isSubscribed) return;
        const formatted: Message = {
          senderName: messageDto.senderName,
          content: messageDto.content,
          createdAt: new Date(messageDto.createdAt).toLocaleString(),
        };
        onReceive(formatted);
      };

      // Ensure no duplicate: remove before adding
      conn.off("ReceiveMessage", handler);
      conn.on("ReceiveMessage", handler);
    })();

    return () => {
      isSubscribed = false;
      connPromise.then((conn) => {
        conn.invoke("LeaveConversation", conversationId).catch(console.error);
      });
    };
  }, [conversationId, onReceive]);
};
