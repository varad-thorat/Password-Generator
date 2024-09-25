// // This function generates a password
// function pass() {
//     const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
//     const numbers = '0123456789';
//     const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
//     const allCharacters = upperCase + lowerCase + numbers + specialChars;
//     const notAllCharacters = upperCase + lowerCase + numbers;
//     const passLength = parseInt(document.getElementById('length').value, 10);

//     if (isNaN(passLength) || passLength <= 0) {
//         alert('Please enter a valid length.');
//         return;
//     }

//     let password = "";
//     const specChar = document.querySelector('input[name="specialChar"]:checked').value === 'yes';

//     if (specChar) {
//         for (let i = 0; i < passLength; i++) {
//             const randomIndex = Math.floor(Math.random() * allCharacters.length);
//             password += allCharacters[randomIndex];
//         }
//         // Ensure at least one special character
//         if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
//             const replaceIndex = Math.floor(Math.random() * passLength);
//             password = password.substring(0, replaceIndex) +
//                        specialChars[Math.floor(Math.random() * specialChars.length)] +
//                        password.substring(replaceIndex + 1);
//         }
//     } else {
//         for (let i = 0; i < passLength; i++) {
//             const randomIndex = Math.floor(Math.random() * notAllCharacters.length);
//             password += notAllCharacters[randomIndex];
//         }
//     }

//     return password;
// }

// // This function generates and displays the password
// function generateAndDisplayPassword() {
//     const password = pass();
//     document.getElementById('generatedPassword').value = password;
// }




// // This function saves the password to the backend
// async function savePassword() {
//     const password = document.getElementById('generatedPassword').value;
//     if (!password) {
//         alert('Please generate a password first!');
//         return;
//     }

//     const title = prompt('Enter a title for this password (e.g., Facebook, Gmail):');
//     if (!title) {
//         alert('Title cannot be empty!');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:8080/save-password', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ title: title, password: password })
//         });

//         const data = await response.json();

//         if (data.success) {
//             alert('Password saved successfully!');
//             fetchPasswords(); // Refresh the password list after saving
//         } else {
//             alert('Failed to save password.');
//         }
//     } catch (error) {
//         console.error('Error saving password:', error);
//     }
// }



// async function register(name,email,password){
//     try {
//         const response = await fetch('http://localhost:8080/registeruser', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name: name, email:email, password: password })
//         });
        
//         // fetchUsers(); // Refresh the user list after deletion
        
//     } catch (error) {
//         console.error('Error deleting user:', error);
//     }
// }

// async function authenticate(email,password){
//     try {
//         const response = await fetch('http://localhost:8080/loginuser', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({email:email, password: password })
//         });
        
//         // fetchUsers(); // Refresh the user list after deletion
        
//     } catch (error) {
//         console.error('Error deleting user:', error);
//     }
// }


// async function fetchPasswords() {
//     try {
//         const response = await fetch('http://localhost:8080/get-passwords', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const data = await response.json();

//         if (data.success) {
//             const passwords = data.passwords;
//             const tableContainer = document.getElementById('password-table-container');
//             const tableBody = document.getElementById('password-table-body');

//             // Clear existing table content
//             tableBody.innerHTML = '';

//             if (passwords.length > 0) {
//                 // Show the table container if passwords are available
//                 tableContainer.style.display = 'block';

//                 passwords.forEach((passwordObj) => {
//                     const row = document.createElement('tr');

//                     // Create the title cell
//                     const titleCell = document.createElement('td');
//                     const titleInput = document.createElement('input');
//                     titleInput.type = 'text';
//                     titleInput.value = passwordObj.title;
//                     titleCell.appendChild(titleInput);
//                     row.appendChild(titleCell);

//                     // Create the password cell
//                     const passwordCell = document.createElement('td');
//                     passwordCell.textContent = passwordObj.password;
//                     row.appendChild(passwordCell);

//                     tableBody.appendChild(row);
//                 });
//             } else {
//                 // Hide the table if no passwords are available
//                 tableContainer.style.display = 'none';
//             }
//         } else {
//             console.error('Failed to fetch passwords');
//         }
//     } catch (error) {
//         console.error('Error fetching passwords:', error);
//     }
// }

// // Call fetchPasswords on page load
// window.onload = fetchPasswords;

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
    if (password) {
        document.getElementById('generatedPassword').value = password;
    }
}

// This function saves the password to the backend
async function savePassword() {
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, password: password })
        });

        const data = await response.json();

        if (data.success) {
            alert('Password saved successfully!');
            fetchPasswords(); // Refresh the password list after saving
        } else {
            alert('Failed to save password.');
        }
    } catch (error) {
        console.error('Error saving password:', error);
    }
}

// This function registers a new user
async function register(name, email, password) {
    try {
        const response = await fetch('http://localhost:8080/registeruser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        });

        const data = await response.json();

        if (data.success) {
            alert('User registered successfully!');
            // Optional: refresh user list or redirect
        } else {
            alert('Failed to register user.');
        }
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

// This function authenticates a user
async function authenticate(email, password) {
    try {
        const response = await fetch('http://localhost:8080/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json();

        if (data.success) {
            alert('Login successful!');
            // Optional: redirect to a different page after login
        } else {
            alert('Login failed.');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
    }
}
// This function deletes the passwords
async function deletePasswords(id){
    try{
        const response = await fetch('http://localhost:8080/delete-passwords',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id})
        });
        const data = await response.json();

        if (data.success) {
            alert('Deleted successfully!');
            fetchPasswords(); // Refresh the password list after saving
        } else {
            alert('Failed to save password.');
        }
    } catch (error) {
        console.error('Error saving password:', error);
    }
}


// This function fetches and displays the stored passwords
async function fetchPasswords() {
    try {
        const response = await fetch('http://localhost:8080/get-passwords', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success) {
            const passwords = data.passwords;
            const tableContainer = document.getElementById('password-table-container');
            const tableBody = document.getElementById('password-table-body');

            // Clear existing table content
            tableBody.innerHTML = '';

            if (passwords.length > 0) {
                // Show the table container if passwords are available
                tableContainer.style.display = 'block';

                passwords.forEach((passwordObj,idx) => {
                    const row = document.createElement('tr');
                    console.log(passwordObj)
                    // Create the title cell
                    

                    const idCell = document.createElement('td');
                    idCell.textContent = idx + 1
                    // for(let i = 0; i<pass)
                    row.appendChild(idCell);
                    
                    const titleCell = document.createElement('td');
                    titleCell.textContent = passwordObj.title
                    row.appendChild(titleCell);

                    // Create the password cell
                    const passwordCell = document.createElement('td');
                    passwordCell.textContent = passwordObj.pass;
                    row.appendChild(passwordCell);
                    
                    const editCell = document.createElement('td');
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click',async()=>{
                        await editPassword(passwordObj.id)
                        fetchPasswords();
                    })
                    editCell.appendChild(editButton);
                    row.appendChild(editCell);

                    const deleteCell = document.createElement('td');
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', async () => {

                        await deletePassword(passwordObj.id);
                        // Refresh the table after deletion
                        fetchPasswords();
                    });
                    deleteCell.appendChild(deleteButton);
                    row.appendChild(deleteCell);

                    tableBody.appendChild(row);
                });
            } else {
                // Hide the table if no passwords are available
                tableContainer.style.display = 'none';
            }
        } else {
            console.error('Failed to fetch passwords');
        }
    } catch (error) {
        console.error('Error fetching passwords:', error);
    }
}

async function editPassword(id) {
    const newTitle = prompt("Enter the new title:");
    if (!newTitle || newTitle.trim() === '') {
        alert('Title should not be empty');
        return;
    }

    // console.log({id: id, title: newTitle.trim()})

    try{
        const response = await fetch(`http://localhost:8080/edit-passwords`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({id: id, title: newTitle.trim()})
        });
    console.log("hello")
        const data = await response.json();
        if (!data.success){
            console.error('Failed to edit password')
        }
    }catch(error){
        console.error("Error deleting password: ", error);
    }
}

async function deletePassword(id) {
    try {
        const response = await fetch(`http://localhost:8080/delete-passwords/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!data.success) {
            console.error('Failed to delete password');
        }
    } catch (error) {
        console.error('Error deleting password:', error);
    }
}

// Call fetchPasswords on page load
window.onload = fetchPasswords;
