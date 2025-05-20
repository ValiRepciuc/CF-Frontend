import { useEffect, useState } from "react";
import { getEvents } from "../services/EventService";

export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [eventsName, setEventsName] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const rawList = await getEvents();

        const eventList: Event[] = rawList.map((event: any) => ({
          id: event.id,
          name: event.name,
          startDate: event.startDate,
          endDate: event.endDate,
        }));

        setEvents(eventList);

        const now = new Date();

        const current = eventList.find((event: Event) => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          return start <= now && now <= end;
        });

        setCurrentEvent(current || null);

        const past = eventList
          .filter((event: Event) => {
            const start = new Date(event.startDate);
            return start <= now;
          })
          .sort((a: Event, b: Event) => {
            return (
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            );
          });

        setPastEvents(past);
        setEventsName(past.map((e: Event) => e.name));
      } catch (error) {
        console.error("Eroare la evenimente:", error);
      }
    };

    fetchEvents();
  }, []);

  return { events, currentEvent, pastEvents, eventsName };
};
