document.addEventListener('DOMContentLoaded', () => {

  const getData = () => {
    let baseUrl = "http://xmlopen.rejseplanen.dk/bin/rest.exe/";
    let argument = 'location?input=';
    let location = 'Telegrafvej';

    let apiURL = baseUrl.concat(argument, location, '&format=json');

    fetch(apiURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
      })
  };
  getData();
});
