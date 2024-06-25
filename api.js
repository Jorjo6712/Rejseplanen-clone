
document.addEventListener('DOMContentLoaded', () => {

  const fromInput = document.getElementById('from-input');
  const fromSuggestions = document.getElementById('from-suggestions');
  const toSuggestions = document.getElementById('to-suggestions');
  const toInput = document.getElementById('to-input');
  const submitButton = document.getElementById('data-submit');

  const getData = async (location) => {
    const baseUrl = "http://xmlopen.rejseplanen.dk/bin/rest.exe/";
    let argument = 'location?input=';
    location = '';

    const apiURL = baseUrl.concat(argument, location, '&format=json');

    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const handleInput = () => {

    fromInput.addEventListener('input', async () => {
      let location = fromInput.value;
      console.log(location);
      const data = await getData(location);

      fromSuggestions.innerHTML = '';

      if (data && data.LocationList && data.LocationList.StopLocation) {
        const stopLocations = data.LocationList.StopLocation;


        const filteredLocations = stopLocations.filter(stopLocation => {
          const regex = new RegExp(location, 'i');
          return regex.test(stopLocation.name);
        });


        filteredLocations.forEach(stopLocation => {
          const option = document.createElement('option');
          option.value = stopLocation.name;
          option.innerHTML = stopLocation.name;
          fromSuggestions.appendChild(option);
        });
      } else {
        console.error('No valid data found or LocationList is missing');
      }
    });

  };
  handleInput();
});

