document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadRooms();

    }
);

async function loadRooms() {

    const roomSelect =
        document.getElementById(
            "roomId"
        );

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

    roomSelect.innerHTML = "";

    data.forEach(room => {

        roomSelect.innerHTML += `

            <option value="${room.id}">
                ${room.room_name}
            </option>

        `;

    });

    const selectedRoom =
        localStorage.getItem(
            "selectedRoom"
        );

    if (selectedRoom) {

        roomSelect.value =
            selectedRoom;
    }
}

async function saveReservation(
    event
) {

    event.preventDefault();

    const user =
        await getCurrentUser();

    if (!user) {

        alert(
            "Please login."
        );

        return;
    }

    const roomId =
        parseInt(
            document
              .getElementById("roomId")
              .value
        );

    const title =
        document
            .getElementById("title")
            .value
            .trim();

    const reservationDate =
        document
            .getElementById(
                "reservationDate"
            )
            .value;

    const startTime =
        document
            .getElementById(
                "startTime"
            )
            .value;

    const endTime =
        document
            .getElementById(
                "endTime"
            )
            .value;

    const notes =
        document
            .getElementById(
                "notes"
            )
            .value;

    if (
        startTime >= endTime
    ) {

        alert(
            "End time must be later than start time."
        );

        return;
    }

    const { error } =
        await supabaseClient
            .from("reservations")
            .insert({

                room_id:
                    roomId,

                user_id:
                    user.id,

                title,

                reservation_date:
                    reservationDate,

                start_time:
                    startTime,

                end_time:
                    endTime,

                notes

            });

    if (error) {

        console.error(error);

        alert(
            error.message
        );

        return;
    }

    alert(
        "Reservation created successfully."
    );

    localStorage.removeItem(
        "selectedRoom"
    );

    location.href =
        "dashboard.html";
}

//--------------------------------------------------
// LOAD MY RESERVATIONS
//--------------------------------------------------

async function loadMyReservations() {

    const table =
        document.getElementById(
            "reservationTable"
        );

    if (!table)
        return;

    const user =
        await getCurrentUser();

    const { data, error } =
        await supabaseClient
            .from("reservations")
            .select(`
                *,
                meeting_rooms(
                    room_name
                )
            `)
            .eq("user_id", user.id)
            .order(
                "reservation_date",
                {
                    ascending: true
                }
            );

    if (error) {

        console.error(error);

        return;
    }

    let html = "";

    data.forEach(item => {

        html += `

        <tr>

            <td>
                ${item.meeting_rooms?.room_name}
            </td>

            <td>
                ${item.title}
            </td>

            <td>
                ${item.reservation_date}
            </td>

            <td>
                ${item.start_time}
                -
                ${item.end_time}
            </td>

            <td>
                ${item.status}
            </td>

            <td>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="cancelReservation(${item.id})">

                    Cancel

                </button>

            </td>

        </tr>

        `;
    });

    table.innerHTML = html;
}

//--------------------------------------------------
// CANCEL RESERVATION
//--------------------------------------------------

async function cancelReservation(
    reservationId
) {

    const confirmed =
        confirm(
            "Cancel reservation?"
        );

    if (!confirmed)
        return;

    const { error } =
        await supabaseClient
            .from("reservations")
            .delete()
            .eq("id", reservationId);

    if (error) {

        alert(error.message);

        return;
    }

    alert(
        "Reservation cancelled."
    );

    loadMyReservations();
}

//--------------------------------------------------
// PAGE INIT
//--------------------------------------------------

if (
    window.location.pathname.includes(
        "my-reservations.html"
    )
) {

    loadMyReservations();
}