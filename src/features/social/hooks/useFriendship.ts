import { toast } from "react-toastify";
import {
  getFriendshipRequests,
  getFriendships,
  sendFriendshipRequest,
  acceptFriendshipRequest,
} from "../services/FriendshipService";
import { useEffect, useState } from "react";

export interface Friendship {
  id: string;
  isAccepted: boolean;
  requester: {
    id: string;
    userName: string;
  };
  receiver: {
    id: string;
    userName: string;
  };
}

export const useGetFriendships = () => {
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await getFriendships();
        const formattedFriends = response.map((friend: any) => ({
          id: friend.id,
          isAccepted: friend.isAccepted,
          requester: {
            id: friend.requester.id,
            userName: friend.requester.userName,
          },
          receiver: {
            id: friend.receiver.id,
            userName: friend.receiver.userName,
          },
        }));
        setFriendships(formattedFriends);
      } catch (error) {
        console.error("Error fetching friendships:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  return { friendships, loading };
};

export const useGetFriendshipsRequests = () => {
  const [friendshipRequests, setFriendshipRequests] = useState<Friendship[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getFriendshipRequests();
        const formattedRequests = response.map((request: any) => ({
          id: request.id,
          isAccepted: request.isAccepted,
          requester: {
            id: request.requester.id,
            userName: request.requester.userName,
          },
          receiver: request.receiver
            ? {
                id: request.receiver.id,
                userName: request.receiver.userName,
              }
            : { id: "", userName: "" },
        }));
        setFriendshipRequests(formattedRequests);
      } catch (error) {
        console.error("Error fetching friendship requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);
  return { friendshipRequests, loading };
};

export const useSendFriendshipRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async (username: string) => {
    setLoading(true);
    try {
      const response = await sendFriendshipRequest(username);
      toast.success(`Cererea de prietenie a fost trimisa către ${username}`);
      return response;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("A apărut o eroare la trimiterea cererii de prietenie.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading };
};

export const useAcceptFriendshipRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const acceptRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const response = await acceptFriendshipRequest(requestId);
      toast.success("Cererea de prietenie a fost acceptată.");
      return response;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("A apărut o eroare! Cererea nu a fost acceptată.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { acceptRequest, loading };
};
