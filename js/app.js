// Personal API Key for OpenWeatherMap API
const apiKey = '<your_api_key>&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, zip, apiKey)
    .then(data => {
      postData('/add', {
        temperature: data.main.temp,
        date: new Date().toLocaleDateString(),
        userResponse: feelings
      });
    })
    .then(() => updateUI());
}

// Function to GET Web API Data
const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(`${baseURL}?zip=${zip}&appid=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to POST data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to GET Project Data and update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.userResponse}`;
  } catch (error) {
    console.log("error", error);
  }
};
