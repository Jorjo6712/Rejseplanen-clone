document.addEventListener('DOMContentLoaded', () => {
  let fromInput = document.getElementById('from-input');
  let fromSuggestions = document.getElementById('from-suggestions');
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

  fromSuggestions.addEventListener('click', function(event) {
    if (fromSuggestions !== event.target && fromSuggestions.contains(event.target)) {
      fromInput.value = event.target.innerHTML;
      fromSuggestions.style = 'display: none;';
    }
  });

  toSuggestions.addEventListener('click', function(event) {
    if (toSuggestions !== event.target && toSuggestions.contains(event.target)) {
      toInput.value = event.target.innerHTML;
      toSuggestions.style = 'display: none';
    }
  });

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
