<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", async () => {
  await loadProfile();

  await loadRooms();

  await loadUpcomingReservations();

  initializeRealtime();
});

//------------------------------------
// PROFILE
//------------------------------------

async function loadProfile() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "index.html";

    return;
  }

  const profile = await getCurrentProfile();

  if (!profile) return;

  document.getElementById("loggedInUser").innerText = profile.full_name;

  if (profile.role === "admin") {
    document.getElementById("adminMenu").classList.remove("d-none");
  }
}

//------------------------------------
// ROOM STATUS
//------------------------------------

function isRoomReservedNow(reservations) {
  const now = new Date();

  const today = now.toISOString().split("T")[0];

  const currentTime = now.toTimeString().substring(0, 5);

  return reservations.some((reservation) => {
    return (
      reservation.reservation_date === today &&
      reservation.start_time.substring(0, 5) <= currentTime &&
      reservation.end_time.substring(0, 5) > currentTime
    );
  });
}

async function getRoomStatus(roomId) {
  const { data } = await supabaseClient

    .from("reservations")

    .select("*")

    .eq("room_id", roomId)

    .eq("status", "active");

  return isRoomReservedNow(data || []);
}

//------------------------------------
// LOAD ROOMS
//------------------------------------

=======
document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadProfile();

        await loadRooms();

        await loadUpcomingReservations();

    }
);

async function loadProfile() {

    const user =
        await getCurrentUser();

    if (!user) {

        window.location.href =
            "index.html";

        return;

    }

    const profile =
        await getCurrentProfile();

    if (!profile) return;

    document.getElementById(
        "loggedInUser"
    ).innerText =
        profile.full_name;

    if (
        profile.role === "admin"
    ) {

        document
            .getElementById(
                "adminMenu"
            )
            .classList
            .remove("d-none");
    }
}

>>>>>>> 8c02875 (added changes)
async function loadRooms() {
  const { data, error } = await supabaseClient

<<<<<<< HEAD
    .from("meeting_rooms")

    .select("*")
=======
    const { data, error } =
        await supabaseClient
            .from("meeting_rooms")
            .select("*")
            .eq("active", true)
            .order("room_name");

    if (error) {

        console.error(error);
        return;

    }

    let html = "";
>>>>>>> 8c02875 (added changes)

    .eq("active", true)

    .order("room_name");

<<<<<<< HEAD
  if (error) {
    console.error(error);

    return;
  }

  let html = "";

  for (const room of data) {
    const reserved = await getRoomStatus(room.id);

    const lang = localStorage.getItem("language") || "en";

    const t = translations[lang];

    const badge = reserved
      ? `
<span class="badge bg-danger mb-2">
    🔴 ${t.reservedNow}
</span>
`
      : `
<span class="badge bg-success mb-2">
    🟢 ${t.available}
</span>
`;

    html += `

        <div class="col-md-6 mb-3">

            <div
                class="card room-card shadow-sm h-100">
=======
        <div class="col-md-6 mb-3">

            <div class="card room-card shadow-sm h-100">
>>>>>>> 8c02875 (added changes)

                <div class="card-body">

                    <h5>
                        ${room.room_name}
                    </h5>

<<<<<<< HEAD
                    ${badge}

                    <p class="room-capacity">

    ${lang === "ko" ? "수용 인원" : lang === "es" ? "Capacidad" : "Capacity"}

    : ${room.capacity}

</p>

                    <p>

                        ${room.location ?? ""}

=======
                    <p class="room-capacity">
                        Capacity:
                        ${room.capacity}
>>>>>>> 8c02875 (added changes)
                    </p>

                    <p>
                        ${room.location ?? ""}
                    </p>

<<<<<<< HEAD
                        ${room.description ?? ""}

                    </p>

                    <button
    class="btn btn-success"
    onclick="goReserve(${room.id})">
=======
                    <p>
                        ${room.description ?? ""}
                    </p>

                    <button
                        class="btn btn-success"
                        onclick="goReserve(${room.id})">
>>>>>>> 8c02875 (added changes)

    ${t.reserve}

</button>

                </div>

            </div>

        </div>

        `;
  }

<<<<<<< HEAD
  document.getElementById("roomContainer").innerHTML = html;
}

//------------------------------------
// UPCOMING RESERVATIONS
//------------------------------------

async function loadUpcomingReservations() {
  const { data, error } = await supabaseClient

    .from("reservations")

    .select(
      `
                *,
                meeting_rooms(room_name)
            `,
    )

    .order("reservation_date")

    .limit(10);

  if (error) {
    console.error(error);

    document.getElementById("reservationContainer").innerHTML =
      "No reservations";

    return;
  }

  if (!data.length) {
    document.getElementById("reservationContainer").innerHTML =
      "<p>No reservations found.</p>";

    return;
  }

  let html = "";

  data.forEach((item) => {
    html += `

        <div
            class="border-bottom pb-2 mb-2">
=======
    });

    document.getElementById(
        "roomContainer"
    ).innerHTML = html;
}

async function loadUpcomingReservations() {

    const { data, error } =
        await supabaseClient
            .from("reservations")
            .select(`
                *,
                meeting_rooms(room_name)
            `)
            .order("reservation_date")
            .limit(10);

    if (error) {

        console.error(error);

        document.getElementById(
            "reservationContainer"
        ).innerHTML =
            "No reservations";

        return;
    }

    if (!data.length) {

        document.getElementById(
            "reservationContainer"
        ).innerHTML =
            "<p>No reservations found.</p>";

        return;

    }

    let html = "";

    data.forEach(item => {

        html += `

        <div class="border-bottom pb-2 mb-2">
>>>>>>> 8c02875 (added changes)

            <strong>

                ${item.title}

            </strong>

            <br>

            Room:
<<<<<<< HEAD

=======
>>>>>>> 8c02875 (added changes)
            ${item.meeting_rooms?.room_name || "-"}

            <br>

            ${item.reservation_date}

        </div>

        `;
<<<<<<< HEAD
  });

  document.getElementById("reservationContainer").innerHTML = html;
}

//------------------------------------
// RESERVE
//------------------------------------

function goReserve(roomId) {
  localStorage.setItem("selectedRoom", roomId);

  location.href = "reservations.html";
}

//------------------------------------
// REALTIME
//------------------------------------

function initializeRealtime() {
  supabaseClient

    .channel("reservations-realtime")

    .on(
      "postgres_changes",

      {
        event: "*",
        schema: "public",
        table: "reservations",
      },

      async () => {
        console.log("Reservation Updated");

        await loadRooms();

        await loadUpcomingReservations();
      },
    )

    .subscribe();
}
=======
    });

    document.getElementById(
        "reservationContainer"
    ).innerHTML = html;
}

function goReserve(roomId) {

    localStorage.setItem(
        "selectedRoom",
        roomId
    );

    location.href =
        "reservations.html";
}
>>>>>>> 8c02875 (added changes)
