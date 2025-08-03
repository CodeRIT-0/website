import eventData from "./events";
import EventCard from "@/src/Card/Card1";

export default function EventsPage() {
  // Sort events by Year first (latest year first), then by Priority within each year, then by date
  const sortedEvents = [...eventData].sort((a, b) => {
    // Primary sort: Year (latest first)
    if (a.Year !== b.Year) {
      return b.Year.localeCompare(a.Year);
    }
    // Secondary sort: Priority within the same year (lower number = higher priority)
    if (a.Priority !== b.Priority) {
      return a.Priority - b.Priority;
    }
    // Tertiary sort: Date (latest first for same priority and year)
    return new Date(b.ActualDate) - new Date(a.ActualDate);
  });

  return (
    <div className="mt-24 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedEvents.map((event, index) => (
        <EventCard
          key={index}
          name={event.Name}
          year={event.Year}
          date={event.Date}
          description={event.Description}
          url = {event.img}
        />
      ))}
    </div>
  );
}
