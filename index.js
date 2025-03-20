const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/events";
const partyList = document.getElementById("party-list");
const partyForm = document.getElementById("party-form");

// Fetch and Display Parties
async function fetchParties() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderParties(data);
    } catch (error) {
        console.error("Error fetching parties:", error);
    }
}

// Render Parties
function renderParties(parties) {
    partyList.innerHTML = "";
    parties.data.forEach(party => {
        const partyItem = document.createElement("li");
        partyItem.classList.add("party-item");

        partyItem.innerHTML = `
            <h3>${party.name}</h3>
            <p><strong>Date:</strong> ${party.date}</p>
            <p><strong>Time:</strong> ${party.time}</p>
            <p><strong>Location:</strong> ${party.location}</p>
            <p><strong>Description:</strong> ${party.description}</p>
            <button class="delete-btn" data-id="${party.id}">Delete</button>
        `;

        // Add Delete Event Listener
        partyItem.querySelector(".delete-btn").addEventListener("click", () => deleteParty(party.id));

        partyList.appendChild(partyItem);
    });
}

// Delete Party
async function deleteParty(partyId) {
    try {
        await fetch(`${API_URL}/${partyId}`, {
            method: "DELETE",
        });
        fetchParties(); // Refresh party list
    } catch (error) {
        console.error("Error deleting party:", error);
    }
}

// Add New Party
partyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newParty = {
        name: document.getElementById("party-name").value,
        date: document.getElementById("party-date").value,
        time: document.getElementById("party-time").value,
        location: document.getElementById("party-location").value,
        description: document.getElementById("party-description").value,
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newParty),
        });

        partyForm.reset(); // Clear form
        fetchParties(); // Refresh party list
    } catch (error) {
        console.error("Error adding party:", error);
    }
});

// Initial Fetch
fetchParties();