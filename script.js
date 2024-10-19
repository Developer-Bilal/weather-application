const inputText = document.getElementById("location-input");
const submitBtn = document.getElementById("submit-btn");

let db = {};
console.log(db);

getData();

inputText.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    console.log(inputText.value);

    // fetch data
    getData(inputText.value);
    inputText.value = "";
  }
});

submitBtn.addEventListener("click", () => {
  console.log(inputText.value);
  // fetch data
  getData(inputText.value);
  inputText.value = "";
});

async function getData(val) {
  data = await fetchData(val);
  console.log(data);

  //populate

  document.getElementById("location-name").textContent = data.location.name;
  document.getElementById("location-country").textContent =
    data.location.country;

  document.getElementById("location-local-time").textContent =
    data.location.localtime;

  document.getElementById(
    "current-temperature"
  ).textContent = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;

  document.getElementById(
    "feels-like-temperature"
  ).textContent = `${data.current.feelslike_c}°C / ${data.current.feelslike_f}°F`;

  document.getElementById("humidity").textContent = `${data.current.humidity}%`;

  document.getElementById(
    "wind-speed"
  ).textContent = `${data.current.wind_kph} kph`;
}

async function fetchData(query = "Karachi") {
  try {
    const response = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1b3e542eb6msh88bcc6bc760c1ccp128f7ejsn26fa8f1eeb6f",
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
}
