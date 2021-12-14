let flights = null;
let showFlights = true;
let showDeleteFlights = true;

document.getElementById('update-flight').addEventListener('click', async () => {
  document.getElementById('flights').innerHTML = '';
  document.getElementById('flights').style.display = 'none';
  document.getElementById('update').style.display='none';

  showFlights = !showFlights;
  if(showFlights) return;

  const response = await fetch('/getAllFlights', {method: 'GET' });
  flights = await response.json();
  const flight = (flightName, flightId) => `
    <li style="margin:10px;padding:10px;" onclick="flightIdUpdate(${flightId})">
      <p>${flightName}</p>
    </li>`;
  for (const item in flights) {
    document.getElementById('flights').innerHTML += flight(flights[item].flight_name, item)
  }
  
  document.getElementById('flights').style.display = 'block';
});

function flightIdUpdate(flightId) {
  document.getElementById('flights').innerHTML = '';
  document.getElementById('flights').style.display = 'none';
  document.getElementById('update').style.display = 'block';
  document.getElementById('name-to-update').value = flights[flightId].flight_name;
  document.getElementById('from-to-update').value = flights[flightId].from;
  document.getElementById('to-to-update').value = flights[flightId].to;
  document.getElementById('datetime-to-update').value = [flights[flightId].flight_date.split('.')[0].split(':')[0], flights[flightId].flight_date.split('.')[0].split(':')[1]].join(':');
  document.getElementById('duration-to-update').value = flights[flightId].flight_duration;
  document.getElementById('lowerCost-to-update').value = flights[flightId].lower;
  document.getElementById('higherCost-to-update').value = flights[flightId].higher;
  document.getElementById('flight-id').value = flights[flightId].flight_id;
}

document.getElementById('delete-flight').addEventListener('click', async () => {
  document.getElementById('delete-flights').innerHTML = '';
  document.getElementById('delete-flights').style.display = 'none';

  showDeleteFlights = !showDeleteFlights;
  if(showDeleteFlights) return;

  const response = await fetch('/getAllFlights', {method: 'GET' });
  flights = await response.json();
  const flight = (flightName, flightId) => `
    <li style="margin:10px;padding:10px;" onclick="flightIdDelete(${flightId})">
      <p>${flightName}</p>
    </li>`;
  for (const item in flights) {
    document.getElementById('delete-flights').innerHTML += flight(flights[item].flight_name, flights[item].flight_id)
  }
  
  document.getElementById('delete-flights').style.display = 'block';
});

async function flightIdDelete(flightId) {
  let response = await fetch('/deleteFlightById', {method: 'POST', body: JSON.stringify(flightId)});
  console.log(await response.json());
  document.getElementById('delete-flights').innerHTML = '';
  response = await fetch('/getAllFlights', {method: 'GET' });
  flights = await response.json();
  const flight = (flightName, flightId) => `
    <li style="margin:10px;padding:10px;" onclick="flightIdDelete(${flightId})">
      <p>${flightName}</p>
    </li>`;
  for (const item in flights) {
    document.getElementById('delete-flights').innerHTML += flight(flights[item].flight_name, flights[item].flight_id)
  }
}

document.getElementById('create-btn').addEventListener('click', () => {
  document.forms["create"].submit();
  document.getElementById('create').style.display = 'none';
});

document.getElementById('update-btn').addEventListener('click', () => {
  document.forms["update"].submit();
  document.getElementById('update').style.display = 'none';
});
