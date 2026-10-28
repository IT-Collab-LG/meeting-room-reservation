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
