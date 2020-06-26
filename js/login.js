const loginForm = document.querySelector('.login__form');

loginForm.addEventListener('submit', () => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const credentials = {
    username: username,
    password: password,
  };
  localStorage.setItem('credentials', JSON.stringify(credentials));
  login('http://localhost:3000/login', credentials);
});

async function login(url, credentials) {
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, options).then((res) => res.json());

  if (response.errors) {
    console.log(response.errors);
  } else {
    localStorage.setItem('token', response.token);
    window.location.replace('boards.html');
  }
}
