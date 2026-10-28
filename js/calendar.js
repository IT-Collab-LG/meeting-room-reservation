document.addEventListener("DOMContentLoaded", async () => {
  await loadCalendar();
});

async function loadCalendar() {
  const { data, error } = await supabaseClient.from("reservations").select(`
                *,
                meeting_rooms (
                    room_name
                )
            `);

  if (error) {
    console.error(error);

    return;
  }

  const events = [];

  data.forEach((reservation) => {
    events.push({
      id: reservation.id,

      title: `${reservation.meeting_rooms?.room_name}
                - ${reservation.title}`,

      start: `${reservation.reservation_date}T${reservation.start_time}`,

      end: `${reservation.reservation_date}T${reservation.end_time}`,

      color: "#0d6efd",
    });
  });

  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",

    height: "auto",

    selectable: true,

    nowIndicator: true,

    headerToolbar: {
      left: "prev,next today",

      center: "title",

      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },

    events,

    eventClick: function (info) {
      alert(
        `Room Reservation

${info.event.title}

Start:
${info.event.start}

End:
${info.event.end}`,
      );
    },
  });

  calendar.render();
}
