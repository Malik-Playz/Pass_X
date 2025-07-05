// Get current user
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'index.html'; // Ensure redirection to the correct login page
}

// User-specific storage key
function getUserStorageKey() {
    return `passwords_${currentUser}`;
}

// Function to show passwords in the table
function showPasswords() {
    let tableBody = document.querySelector("table tbody");
    let passwords = localStorage.getItem(getUserStorageKey());
    let arr;

    if (passwords === null || passwords === "[]") {
        arr = [];
        tableBody.innerHTML = "<tr><td colspan='4'>No passwords to show. Add one!</td></tr>";
    } else {
        arr = JSON.parse(passwords);
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            str += `<tr>
                        <td>${element.website}</td>
                        <td>${element.username}</td>
                        <td>
                            <input type="password" value="${element.password}" readonly class="password-field">
                            <span class="copy-btn" data-password="${element.password}">📋</span>
                        </td>
                        <td><button class="delete-btn" data-website="${element.website}">Delete</button></td>
                    </tr>`;
        }
        tableBody.innerHTML = str;
    }
    document.getElementById('alert').style.display = 'none'; // Hide "Copied!" alert initially
}

// Function to copy password to clipboard
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn')) {
        const passwordToCopy = e.target.dataset.password;
        navigator.clipboard.writeText(passwordToCopy).then(() => {
            const alertElement = document.getElementById('alert');
            alertElement.style.display = 'inline';
            setTimeout(() => {
                alertElement.style.display = 'none';
            }, 800);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
});

// Function to delete a password
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const websiteToDelete = e.target.dataset.website;
        let passwords = JSON.parse(localStorage.getItem(getUserStorageKey()) || "[]");
        let newPasswords = passwords.filter(item => item.website !== websiteToDelete);
        localStorage.setItem(getUserStorageKey(), JSON.stringify(newPasswords));
        showPasswords(); // Refresh the table
    }
});

// Add password form submission
document.getElementById('addPasswordForm').addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let passwords = JSON.parse(localStorage.getItem(getUserStorageKey()) || "[]");

    // Check if password for the website already exists
    const existingPasswordIndex = passwords.findIndex(item => item.website === website);

    if (existingPasswordIndex > -1) {
        // Update existing password
        passwords[existingPasswordIndex] = { website, username, password };
        alert('Password for this website updated successfully!');
    } else {
        // Add new password
        passwords.push({ website, username, password });
        alert('Password added successfully!');
    }

    localStorage.setItem(getUserStorageKey(), JSON.stringify(passwords));
    showPasswords(); // Refresh the table

    // Clear form fields
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
});

// Initial call to show passwords when the page loads
document.addEventListener('DOMContentLoaded', showPasswords);
// ... existing code ...

// Function to delete a password
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const websiteToDelete = e.target.dataset.website;
        let passwords = JSON.parse(localStorage.getItem(getUserStorageKey()) || "[]");
        let newPasswords = passwords.filter(item => item.website !== websiteToDelete);
        localStorage.setItem(getUserStorageKey(), JSON.stringify(newPasswords));
        showPasswords(); // Refresh the table
    }
});

// Moved inside DOMContentLoaded and added safety check
document.addEventListener('DOMContentLoaded', () => {
    showPasswords();
    
    // Add password form submission
    const addPasswordForm = document.getElementById('addPasswordForm');
    if (addPasswordForm) {
        addPasswordForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default form submission

            let website = document.getElementById("website").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            let passwords = JSON.parse(localStorage.getItem(getUserStorageKey()) || "[]");

            // Check if password for the website already exists
            const existingPasswordIndex = passwords.findIndex(item => item.website === website);

            if (existingPasswordIndex > -1) {
                // Update existing password
                passwords[existingPasswordIndex] = { website, username, password };
                alert('Password for this website updated successfully!');
            } else {
                // Add new password
                passwords.push({ website, username, password });
                alert('Password added successfully!');
            }

            localStorage.setItem(getUserStorageKey(), JSON.stringify(passwords));
            showPasswords(); // Refresh the table

            // Clear form fields
            document.getElementById("website").value = "";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        });
    }
});