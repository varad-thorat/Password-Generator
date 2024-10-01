// Constants for character sets
const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Generates a password based on user specifications.
 * @returns {string|null} The generated password or null if input is invalid.
 */
function generatePassword() {
    const passLength = parseInt(document.getElementById('length').value, 10);
    const includeSpecialChars = document.querySelector('input[name="specialChar"]:checked').value === 'yes';

    if (isNaN(passLength) || passLength <= 0) {
        alert('Please enter a valid length.');
        return null;
    }

    const allCharacters = UPPER_CASE + LOWER_CASE + NUMBERS + (includeSpecialChars ? SPECIAL_CHARS : '');
    let password = Array.from({length: passLength}, () => allCharacters[Math.floor(Math.random() * allCharacters.length)]).join('');

    // Ensure at least one special character if specified
    if (includeSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        const replaceIndex = Math.floor(Math.random() * passLength);
        password = password.substring(0, replaceIndex) +
                   SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)] +
                   password.substring(replaceIndex + 1);
    }

    return password;
}

/**
 * Generates and displays the password.
 */
function generateAndDisplayPassword() {
    const password = generatePassword();
    if (password) {
        document.getElementById('generatedPassword').value = password;
    }
}

/**
 * Saves the generated password to the backend.
 * @returns {Promise<void>}
 */
async function savePassword() {
    
    // const cookie = document.cookie;
    // console.log(cookie)
    const password = document.getElementById('generatedPassword').value;
    if (!password) {
        alert('Please generate a password first!');
        return;
    }

    const title = prompt('Enter a title for this password (e.g., Facebook, Gmail):');
    if (!title) {
        alert('Title cannot be empty!');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/savePassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, password }),
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            alert('Password saved successfully!');
            fetchPasswords();
        } else {
            alert('Failed to save password.');
        }
    } catch (error) {
        console.error('Error saving password:', error);
    }
}

/**
 * Registers a new user.
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<void>}
 */
async function registerUser(name, email, password) {
    try {
        const response = await fetch('http://localhost:8080/registeruser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.success === "true") {
            alert('User registered successfully!');
            // Redirect to login page or automatically log in the user
        } else {
            alert(`Failed to register user: ${data.message}`);
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred during registration. Please try again.');
    }
}

/**
 * Authenticates a user.
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<void>}
 */
async function authenticateUser(email, password) {
    try {
        const response = await fetch('http://localhost:8080/loginuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success === "true") {
            alert('Login successful!');
            // Implement post-login logic (e.g., redirect to dashboard)
            window.location.href = '/dashboard';  // Adjust the URL as needed
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        alert('An error occurred during login. Please try again.');
    }
}

async function logoutUser() {
    try {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            alert('Logout successful!');
            // Redirect to login page
            window.location.href = '/login';  // Adjust the URL as needed
        } else {
            alert('Logout failed.');
        }
    } catch (error) {
        console.error('Error logging out user:', error);
        alert('An error occurred during logout. Please try again.');
    }
}

/**
 * Fetches and displays stored passwords.
 * @returns {Promise<void>}
 */
async function fetchPasswords(id) {
    try {
        const response = await fetch('http://localhost:8080/get-passwords', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            // body: JSON.stringify({})
        });

        const data = await response.json();
        console.log(data)
        if (data.success) {
            displayPasswords(data.passwords);
            // savePassword(data.passwords);
        } else {
            console.error('Failed to fetch passwords');
            alert('Failed to fetch passwords. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching passwords:', error);
        alert('An error occurred while fetching passwords. Please try again.');
    }
}

/**
 * Displays passwords in a table format.
 * @param {Array} passwords - Array of password objects
 */
function displayPasswords(passwords) {
    const tableContainer = document.getElementById('password-table-container');
    const tableBody = document.getElementById('password-table-body');

    tableBody.innerHTML = '';

    if (passwords.length > 0) {
        tableContainer.style.display = 'block';

        passwords.forEach((passwordObj, idx) => {
            console.log(passwordObj)
            const row = createPasswordRow(passwordObj, idx);
            tableBody.appendChild(row);
        });
    } else {
        tableContainer.style.display = 'none';
    }
}

/**
 * Creates a table row for a password entry.
 * @param {Object} passwordObj - Password object
 * @param {number} idx - Index of the password
 * @returns {HTMLTableRowElement}
 */
function createPasswordRow(passwordObj, idx) {
    const row = document.createElement('tr');

    const cells = [
        { content: String(idx + 1) },
        { content: passwordObj.title },
        { content: passwordObj.pass },
        { content: 'Edit', onClick: () => editPassword(passwordObj.p_id) },
        { content: 'Delete', onClick: () => deletePassword(passwordObj.p_id) }
    ];

    cells.forEach(cell => {
        const td = document.createElement('td');
        if (typeof cell.content === 'string') {
            if (cell.content === 'Edit' || cell.content === 'Delete') {
                const button = document.createElement('button');
                button.textContent = cell.content;
                button.addEventListener('click', cell.onClick);
                td.appendChild(button);
            } else {
                td.textContent = cell.content;
            }
        } else if (cell.content instanceof Node) {
            td.appendChild(cell.content);
        }
        row.appendChild(td);
    });

    return row;
}

/**
 * Edits a password entry.
 * @param {number} id - Password ID
 * @returns {Promise<void>}
 */
async function editPassword(p_id) {
    const newTitle = prompt("Enter the new title:");
    if (!newTitle || newTitle.trim() === '') {
        alert('Title should not be empty');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/edit-passwords`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ p_id, title: newTitle.trim() }),
            credentials: 'include'
        });

        const data = await response.json();
        if (!data.success) {
            console.error('Failed to edit password');
            alert('Failed to edit password. Please try again.');
        } else {
            fetchPasswords();
        }
    } catch (error) {
        console.error("Error editing password: ", error);
        alert('An error occurred while editing the password. Please try again.');
    }
}

/**
 * Deletes a password entry.
 * @param {number} id - Password ID
 * @returns {Promise<void>}
 */
async function deletePassword(p_id) {
    console.log(p_id)
    const isConfirmed = confirm("Are you sure you want to delete this password?");
    // console.log(id)
    if(!isConfirmed) {
        return;
    }

    try {
        console.log(p_id)
        const response = await fetch(`http://localhost:8080/delete-passwords/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ p_id })
        });

        const data = await response.json();
        // console.log(data)

        if (!data.success) {
            console.error('Failed to delete password');
            alert('Failed to delete password. Please try again.');
        } else {
            // alert("password deleted!")
            fetchPasswords();
        }
    } catch (error) {
        console.error('Error deleting password:', error);
        alert('An error occurred while deleting the password. Please try again.');
    }
}

// Initialize the application
window.onload = fetchPasswords;