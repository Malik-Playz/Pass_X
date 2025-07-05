// User management functions
function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem('passx_users')) || [];

    // Check if user exists
    if (users.some(user => user.username === username)) {
        return false;
    }

    users.push({ username, password });
    localStorage.setItem('passx_users', JSON.stringify(users));
    return true;
}

function authenticateUser(username, password) {
    const users = JSON.parse(localStorage.getItem('passx_users')) || [];
    return users.some(user => user.username === username && user.password === password);
}

// DOM event handlers
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            if (authenticateUser(username, password)) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'dashbord.html'; // Redirect to manager.html
            } else {
                alert('Invalid username or password');
            }
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            const username = prompt('Enter a username:');
            if (!username) return;

            const password = prompt('Enter a password:');
            if (!password) return;

            if (registerUser(username, password)) {
                alert('Registration successful! Please login.');
            } else {
                alert('Username already exists. Please choose another.');
            }
        });
    }
});