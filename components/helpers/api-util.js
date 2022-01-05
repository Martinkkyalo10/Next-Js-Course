export async function getAllEvents() {
  const myEvents = await fetch(
    "https://next-meetups-project-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json(myEvents);

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}