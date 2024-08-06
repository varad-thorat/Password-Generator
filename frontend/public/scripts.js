// This function generates a password
function pass() {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allCharacters = upperCase + lowerCase + numbers + specialChars;
    const notAllCharacters = upperCase + lowerCase + numbers;
    const passLength = parseInt(document.getElementById('length').value, 10);

    if (isNaN(passLength) || passLength <= 0) {
        alert('Please enter a valid length.');
        return;
    }

    let password = "";
    const specChar = document.querySelector('input[name="specialChar"]:checked').value === 'yes';

    if (specChar) {
        for (let i = 0; i < passLength; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            password += allCharacters[randomIndex];
        }
        // Ensure at least one special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            const replaceIndex = Math.floor(Math.random() * passLength);
            password = password.substring(0, replaceIndex) +
                       specialChars[Math.floor(Math.random() * specialChars.length)] +
                       password.substring(replaceIndex + 1);
        }
    } else {
        for (let i = 0; i < passLength; i++) {
            const randomIndex = Math.floor(Math.random() * notAllCharacters.length);
            password += notAllCharacters[randomIndex];
        }
    }

    return password;
}

// This function generates and displays the password
function generateAndDisplayPassword() {
    const password = pass();
    document.getElementById('generatedPassword').value = password;
}

// This function saves the password to the backend
async function savePassword() {
    const password = document.getElementById('generatedPassword').value;
    if (!password) {
        alert('Please generate a password first.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pass: password })
        });
        const result = await response.text();
        alert(result);
        fetchUsers(); // Refresh the user list after saving
    } catch (error) {
        console.error('Error saving password:', error);
    }
}

// This function fetches and displays all users
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8080/alluser');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// This function displays the fetched users
function displayUsers(users) {
    const userList = document.getElementById('users');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.pass;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteUser(user.id);
        li.appendChild(deleteButton);
        userList.appendChild(li);
    });
}

// This function deletes a user by ID
async function deleteUser(id) {
    try {
        const response = await fetch('http://localhost:8080/deleteuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        const result = await response.text();
        alert(result);
        fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}


// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);
