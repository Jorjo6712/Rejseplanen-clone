
document.addEventListener('DOMContentLoaded', () => {

  const fromInput = document.getElementById('from-input');
  const fromSuggestions = document.getElementById('from-suggestions');
  const toSuggestions = document.getElementById('to-suggestions');
  const toInput = document.getElementById('to-input');
  const submitButton = document.getElementById('data-submit');

  const getData = async (location) => {
    const baseUrl = "http://xmlopen.rejseplanen.dk/bin/rest.exe/";
    let argument = 'location?input=';

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
  
  fromSuggestions.addEventListener('click', function(event) {
    if (fromSuggestions !== event.target && fromSuggestions.contains(event.target)) {
      fromInput.innerHTML = event.target.innerHTML;
    }
  })

});
