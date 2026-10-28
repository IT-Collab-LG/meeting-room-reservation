document.addEventListener("DOMContentLoaded", async () => {
  await loadMeetingRooms();

  document.getElementById("roomSearch").addEventListener("keyup", filterRooms);
});

//------------------------------------
// LOAD ROOMS
//------------------------------------

async function loadMeetingRooms() {
  const roomList = document.getElementById("roomList");

  const { data, error } = await supabaseClient
    .from("meeting_rooms")
    .select("*")
    .eq("active", true)
    .order("room_name");

  if (error) {
    console.error(error);

    return;
  }

  let html = "";

  data.forEach((room) => {
    html += `

        <div
            class="col-md-6 col-lg-4 mb-4 room-card">

            <div
                class="card shadow h-100">

                <div
                    class="card-body">

                    <h4>

                        ${room.room_name}

                    </h4>

                    <hr>

                    <p>

                        <strong>
                        Capacity:
                        </strong>

                        ${room.capacity}

                    </p>

                    <p>

                        <strong>
                        Location:
                        </strong>

                        ${room.location ?? "-"}

                    </p>

                    <p>

                        <strong>
                        Description:
                        </strong>

                        ${room.description ?? "-"}

                    </p>

                    <button
                        class="btn btn-success"
                        onclick="reserveRoom(${room.id})">

                        Reserve Room

                    </button>

                </div>

            </div>

        </div>

        `;
  });

  roomList.innerHTML = html;
}

//------------------------------------
// SEARCH
//------------------------------------

function filterRooms() {
  const keyword = document.getElementById("roomSearch").value.toLowerCase();

  const cards = document.querySelectorAll(".room-card");

  cards.forEach((card) => {
    const text = card.innerText.toLowerCase();

    card.style.display = text.includes(keyword) ? "" : "none";
  });
}

//------------------------------------
// RESERVE
//------------------------------------

function reserveRoom(roomId) {
  localStorage.setItem("selectedRoom", roomId);

  location.href = "reservations.html";
}
