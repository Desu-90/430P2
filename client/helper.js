const handleError = (message) => {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('errorContainer').classList.remove('hidden');
};

const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById('errorContainer').classList.add('hidden');

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

const sendPut = (url, data) => fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then((response) => {
  if (response.status === 200 || response.status === 204) {
    return response.json();
  }
  throw new Error('Server error');
}).catch((error) => {
  console.error(error);
});

const hideError = () => {
  document.getElementById('errorContainer').classList.add('hidden');
};

module.exports = {
  handleError,
  sendPost,
  hideError,
  sendPut,
};
