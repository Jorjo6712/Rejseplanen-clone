document.addEventListener('DOMContentLoaded', () => {
  let fromInput = document.getElementById('from-input');
  let fromSuggestions = document.getElementById('from-suggestions');
  let fromS
  let toSuggestions = document.getElementById('to-suggestions');
  let toInput = document.getElementById('to-input');

  fromInput.addEventListener('input', () => {
    fromSuggestions.style.display = 'flex';
  });

  document.addEventListener('click', (event) => {
    if (!fromSuggestions.contains(event.target) && !fromInput.contains(event.target)) {
      fromSuggestions.style.display = 'none';
    }
  });

  fromInput.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  fromSuggestions.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  fromSuggestions.appendChild();


  toInput.addEventListener('input', () => {
    toSuggestions.style.display = 'flex';
  });

  document.addEventListener('click', (event) => {
    if (!toSuggestions.contains(event.target) && !toInput.contains(event.target)) {
      toSuggestions.style.display = 'none';
    }
  });

  toInput.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  toSuggestions.addEventListener('click', (event) => {
    event.stopPropagation();
  });

});
