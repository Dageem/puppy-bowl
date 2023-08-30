// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "YOUR COHORT NAME HERE";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-ft-sf/players/`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(API_URL + playerId + "/");
    const data = await response.json();
    return data.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
fetchSinglePlayer(1)
function createElement(dt, idx) {
  this.element = document.createElement("div");
  this.names = document.createElement("h1");
  this.names.innerHTML = dt.name;
  this.id = document.createElement("h2");
  this.id.innerHTML = dt.id;
  this.imageUrl = document.createElement("img");
  this.imageUrl.src=dt.imageUrl;
  this.element.addEventListener("click", function () {
    renderSinglePlayer(idx);
  });

  this.element.appendChild(this.names);
  this.element.appendChild(this.id);
  this.element.appendChild(this.imageUrl);

  document.querySelector(".wrapper").appendChild(this.element);
}

const renderAllPlayers = (playerList) => {
  document.querySelector(".wrapper").innerHTML = "";
  fetchAllPlayers(playerList).then((response) => {
    response.forEach((i, idx) => {
      createElement(i, idx + 1);
    });
  });
};
document.getElementById("all").addEventListener("click", function () {
  renderAllPlayers();
});

const renderSinglePlayer = (player) => {
  document.querySelector(".wrapper").innerHTML = "";
  fetchSinglePlayer(player).then((response) => {
    createElement(response);
  });
};
document.getElementById("One").addEventListener("click", function () {
  renderSinglePlayer(3);
});
/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}
