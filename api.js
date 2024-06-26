
document.addEventListener('DOMContentLoaded', () => {

  const fromInput = document.getElementById('from-input');
  const fromSuggestions = document.getElementById('from-suggestions');
  const toSuggestions = document.getElementById('to-suggestions');
  const toInput = document.getElementById('to-input');
  const dateTimeInput = document.getElementById('date-time-input');
  const submitButton = document.getElementById('data-submit');

  const baseUrl = "http://xmlopen.rejseplanen.dk/bin/rest.exe/";

  const getData = async (location) => {

    const argument = 'location?input=';
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

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    return { formattedDate, formattedTime };
  };

  const getTripData = async (origin, destCoordX, destCoordY, destination, dateTimeStr) => {
    const { formattedDate, formattedTime } = dateTimeStr ? formatDateTime(dateTimeStr) : {};
    const params = new URLSearchParams({
      originID: origin,
      destCoordX,
      destCoordY,
      destCoordName: destination,
      ...(dateTimeStr && { date: formattedDate, time: formattedTime })
    });

    const apiURL = `${baseUrl}trip?${params.toString()}&format=json`;
    console.log(apiURL);

    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  submitButton.addEventListener('click', async () => {
    const origin = fromInput.value;
    const destCoordX = toInput.value;
    const destCoordY = toInput.value;
    const destination = toInput.value;
    const dateTimeStr = dateTimeInput.value;

    const tripData = await getTripData(origin, destCoordX, destCoordY, destination, dateTimeStr);
    console.log(tripData);
  });

  const debounce = (func, delay) => {
    let timeoutId;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const handleSuggestionsInput = async (data, suggestionsElement) => {
    suggestionsElement.innerHTML = '';

    if (data && data.LocationList && data.LocationList.StopLocation) {
      const stopLocations = data.LocationList.StopLocation;

      stopLocations.forEach(stopLocation => {
        const option = document.createElement('option');
        option.value = stopLocation.name;
        option.innerHTML = stopLocation.name;
        suggestionsElement.appendChild(option);
      });
    } else {
      console.error('No valid data found or LocationList is missing');
    }
  };


  const handleFromInput = debounce(async () => {
    let location = fromInput.value;
    const data = await getData(location);
    handleSuggestionsInput(data, fromSuggestions);
  }, 300);

  const handleToInput = debounce(async () => {
    let location = toInput.value;
    const data = await getData(location);
    handleSuggestionsInput(data, toSuggestions);
  }, 300);

  fromInput.addEventListener('input', handleFromInput);
  toInput.addEventListener('input', handleToInput);
});
