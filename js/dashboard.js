async function loadRooms() {

    const { data } =
        await supabaseClient
            .from("meeting_rooms")
            .select("*")
            .order("room_name");

    let html = "";

    data.forEach(room => {

        html += `

        <div
            class="col-md-6 mb-3">

            <div
                class="card shadow">

                <div
                    class="card-body">

                    <h5>

                        ${room.room_name}

                    </h5>

                    <p>

                        Capacity:
                        ${room.capacity}

                    </p>

                    <p>

                        ${room.location}

                    </p>

                    <button
                        class="btn btn-success">

                        Reserve

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    document
        .getElementById(
            "roomContainer"
        )
        .innerHTML = html;
}

loadRooms();
