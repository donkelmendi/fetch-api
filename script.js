const searchButton = document.getElementById("searchBtn");
const inputField = document.getElementById("nameInput");
const output = document.getElementById("result");

async function getCharacter(name) {
  output.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://swapi.dev/api/people/?search=${name}`);
    const data = await res.json();

    if (data.results.length === 0) {
      output.innerHTML = `<p class="error">No character found. Try a different name!</p>`;
      return;
    }

    const person = data.results[0];
    output.innerHTML = `
      <h3>${person.name}</h3>
      <p><strong>Height:</strong> ${person.height} cm</p>
      <p><strong>Mass:</strong> ${person.mass} kg</p>
      <p><strong>Hair Color:</strong> ${person.hair_color}</p>
      <p><strong>Skin Color:</strong> ${person.skin_color}</p>
      <p><strong>Gender:</strong> ${person.gender}</p>
      <p><strong>Birth Year:</strong> ${person.birth_year}</p>
    `;
  } catch (err) {
    output.innerHTML = `<p class="error">Something went wrong. Please try again later.</p>`;
    console.error(err);
  }
}

searchButton.addEventListener("click", () => {
  const name = inputField.value.trim();

  if (name === "") {
    output.innerHTML = `<p class="error">Please enter a character name!</p>`;
    return;
  }

  getCharacter(name);
});