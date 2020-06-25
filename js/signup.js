const signupForm = document.querySelector('.sign-up__form');

signupForm.addEventListener('submit', () => {
  event.preventDefault();

  const user = {
    user: {
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
      email: document.querySelector('#email').value,
      firstName: document.querySelector('#first-name').value,
      lastName: document.querySelector('#last-name').value,
    },
  };

  signup('http://localhost:3000/users', user);
});

async function signup(url, user) {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, options).then((res) => res.json());

  if (!response.id) {
    console.log(response);
  } else {
    localStorage.setItem('id', response.id);
    localStorage.setItem('token', response.token);
    window.location.replace('boards.html');
  }
}
