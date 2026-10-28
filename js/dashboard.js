document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadProfile();

        await loadRooms();

        await loadUpcomingReservations();

        initializeRealtime();

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

async function loadRooms() {

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

    data.forEach(room => {

        html += `

        <div class="col-md-6 mb-3">

            <div class="card room-card shadow-sm h-100">

                <div class="card-body">

                    <h5>
                        ${room.room_name}
                    </h5>

                    <p class="room-capacity">
                        Capacity:
                        ${room.capacity}
                    </p>

                    <p>
                        ${room.location ?? ""}
                    </p>

                    <p>
                        ${room.description ?? ""}
                    </p>

                    <button
                        class="btn btn-success"
                        onclick="goReserve(${room.id})">

                        Reserve

                    </button>

                </div>

            </div>

        </div>

        `;

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

            <strong>

                ${item.title}

            </strong>

            <br>

            Room:
            ${item.meeting_rooms?.room_name || "-"}

            <br>

            ${item.reservation_date}

        </div>

        `;
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

//------------------------------------
// REALTIME SUBSCRIPTION
//------------------------------------

function initializeRealtime() {

    supabaseClient

    .channel("reservations-realtime")

    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "reservations"
        },

        async () => {

            console.log(
                "Reservation Updated"
            );

            await loadUpcomingReservations();

        }

    )

    .subscribe();

}