import { useEffect, useState } from "react";
import { getCurrentEvent } from "../services/EventService";

export const useEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [currentEvent, setCurrentEvent] = useState<any | null>(null);
  const [nextEvent, setNextEvent] = useState<any | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventList = await getCurrentEvent();
        setEvents(eventList);

        const now = new Date();

        const activeEvent = eventList.find((event: any) => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          return start <= now && now <= end;
        });

        setCurrentEvent(activeEvent || null);

        const upcomingEvents = eventList
          .filter((event: any) => new Date(event.startDate) > now)
          .sort(
            (a: any, b: any) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );

        setNextEvent(upcomingEvents.length > 0 ? upcomingEvents[0] : null);
      } catch (error) {
        console.error("Eroare la evenimente:", error);
      }
    };

    fetchEvent();
  }, []);

  const calculateEventProgress = (event: any): number => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const now = new Date();

    if (now < start) return 0;
    if (now > end) return 100;

    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const progress = (elapsed / total) * 100;

    return Math.min(Math.max(progress, 0), 100);
  };

  return { events, currentEvent, nextEvent, calculateEventProgress };
};
