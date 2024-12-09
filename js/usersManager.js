let id = 1;
class Users {
    constructor(id, firstName, lastName, email, password, role = 'USER', loggedIn = false) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.loggedIn = false;
        this.role = role;
    }
}

class UsersManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }

    addUser(firstName, lastName, email, password, role = 'USER') {
        this.users.push(new Users(this.nextId++, firstName, lastName, email, password, role));
    }

    deleteUser(id) {
        this.users = this.users.filter((user) => user.id != id);
    }

    updateUser(id, newFirstName, newLastName, newEmail, newPassword) {
        let userToUpdate = this.users.find((user) => user.id === id);
        if (userToUpdate) {
            userToUpdate.firstName = newFirstName;
            userToUpdate.lastName = newLastName;
            userToUpdate.email = newEmail;
            userToUpdate.password = newPassword;
        }
    }

    changeStatus(id) {
        let userToUpdate = this.users.findIndex((user) => user.id == id);
        if (userToUpdate) {
            userToUpdate.loggedIn = !userToUpdate.loggedIn;
        }
    }
}

let userManage = new UsersManager();

function showUsersInTable() {
    const currentUser = userManage.users.find(user => user.loggedIn);

    // בדיקה אם המשתמש המחובר הוא מנהל
    if (!currentUser || currentUser.role !== 'ADMIN') {
        alert('רק מנהל יכול לראות את רשימת המשתמשים. אם אתה מנהל אנא בצע התחברות, אם אתה משתמש חדש אנא בצע רישום');
        return;
    }

    let tableBody = document.getElementById('showUsers');
    tableBody.innerHTML = '';
    for (let user of userManage.users) {
        tableBody.innerHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.loggedIn ? 'true' : 'false'}</td>
            <td>
             <button class="btn btn-warning"onclick="changeStatus(${user.id})"><i class="fa-solid fa-link"></i></button>
            <button class="btn btn-danger"onclick="deleteUser(${user.id})"><i class="fa-solid fa-trash"></i></button>
             <button class="btn btn-primary" onclick="updateUser(${user.id})"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
        </tr>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadUsersFromLocalStorage();
});

function addNewUser() {
    let fName = document.getElementById('userFirstName').value;
    let lName = document.getElementById('userLastName').value;
    let mail = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let role = document.getElementById('userRole').value; // קבלת התפקיד

    if (fName && lName && mail && pass && role) {
        userManage.addUser(fName, lName, mail, pass, role); // העברת התפקיד לפונקציה addUser
        console.log(userManage.users);
        alert('הרישום בוצע בהצלחה!')
        showUsersInTable();
        document.getElementById('userFirstName').value = '';
        document.getElementById('userLastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('userRole').value = 'USER';

        console.log(userManage.users);

    } else {
        alert('יש למלא את כל השדות!');
    }
    saveUsersToLocalStorage();
}

function loggin() {
    let mailLog = document.getElementById('mail').value;
    let passLog = document.getElementById('pass').value;

    if (mailLog && passLog) {
        let userToLogin = userManage.users.find(
            (user) => user.email === mailLog && user.password === passLog
        );

        if (userToLogin) {
            userToLogin.loggedIn = true;

            // הודעה בהתאם לתפקיד המשתמש
            if (userToLogin.role === 'ADMIN') {
                alert(`ברוך הבא, ${userToLogin.firstName}! אתה מחובר כמנהל.`);
            } else {
                alert(`ברוך הבא, ${userToLogin.firstName}!`);
            }

            showUsersInTable(); // הצגת רשימת המשתמשים (אם מנהל)
            saveUsersToLocalStorage();

            // איפוס שדות הטופס
            document.getElementById('mail').value = '';
            document.getElementById('pass').value = '';
        } else {
            alert('אחד הפרטים שהזנת שגויים, נסה שוב');
        }
    } else {
        alert('יש למלא את כל השדות');
    }
}

function updateUser(id) {
    let userToUpdate = userManage.users.find((user) => user.id === id);
    if (userToUpdate) {
        let newFirstName = prompt("הכנס שם פרטי חדש:", userToUpdate.firstName);
        let newLastName = prompt("הכנס שם משפחה חדש:", userToUpdate.lastName);
        let newEmail = prompt("הכנס מייל חדש:", userToUpdate.email);
        let newPassword = prompt("הכנס סיסמא חדשה:", userToUpdate.password);

        if (newFirstName && newLastName && newEmail && newPassword) {
            userToUpdate.firstName = newFirstName;
            userToUpdate.lastName = newLastName;
            userToUpdate.email = newEmail;
            userToUpdate.password = newPassword;
            showUsersInTable();
        } else {
            alert("יש למלא את כל השדות!");
        }
    }
    saveUsersToLocalStorage();
}

function deleteUser(id) {
    userManage.deleteUser(id);
    showUsersInTable();
    saveUsersToLocalStorage();
}

function changeStatus(id, forceLogout = false) {
    let userToUpdate = userManage.users.find((user) => user.id === id);
    if (userToUpdate) {
        if (forceLogout) {
            userToUpdate.loggedIn = false;
            alert(`${userToUpdate.firstName} נותק בהצלחה`);
        }
        else {
            userToUpdate.loggedIn = !userToUpdate.loggedIn;
        }
        console.log('Updated User:', userToUpdate);
        showUsersInTable();
        saveUsersToLocalStorage();
    }
    else {
        alert('משתמש לא נמצא');
    }
}

function saveUsersToLocalStorage() {
    console.log('Saving to Local Storage:', userManage.users);
    localStorage.setItem('users', JSON.stringify(userManage.users));
}

function loadUsersFromLocalStorage() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        userManage.users = JSON.parse(savedUsers).map(user =>
            new Users(user.id, user.firstName, user.lastName, user.email, user.password, user.role, user.loggedIn)
        );
        console.log('Loaded Users:', userManage.users); // בדיקה בקונסול
        userManage.nextId = userManage.users.length > 0 ? Math.max(...userManage.users.map(user => user.id)) + 1 : 1;
        showUsersInTable();
    }
}

document.addEventListener('DOMContentLoaded', () => loadUsersFromLocalStorage());
