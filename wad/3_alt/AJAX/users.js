//) Write a JavaScript Program to get the user registration data and push to array/local storage with AJAX POST method and data list in new page.

var div = document.getElementById('backend-status')

function fetchDataFromAPI() {
    try {
        div.classList.add('pending')
        div.innerText = 'Fetching users from API...'
        var xhr = new XMLHttpRequest()
        xhr.open("GET", "https://abhishekjadhav2002.up.railway.app/users", false)
        xhr.send()

        if (xhr.status != 200) {
            if (xhr.response) {
                div.classList.add('error')
                div.textContent = `Error ${xhr.status}: ${xhr.response?.message}`
            } else div.textContent = `Error ${xhr.status}: ${xhr.statusText}`
        }
        if (xhr.response?.length > 0) {
            localStorage.setItem("users", xhr.response)
            div.classList.remove('pending')
            div.classList.remove('error')
            div.classList.add('success')
            div.innerText = `Users fetched successfully from API`
        } else {
            div.classList.add('error')
            div.textContent = `No users found in API`
        }
    } catch (err) {
        div.classList.add('error')
        div.textContent = `Request failed ${err?.message}`
    }
    displayData()
}

function fetchDataFromLocal() {
    try {
        div.textContent = 'Fetching users from Local Storage...'
        div.classList.add('pending')
        const users = localStorage.getItem("users")
        if (!users) {
            div.classList.add('error')
            throw new Error("No users found in Local Storage (Don't forget to sync local storage with API)")
        }
        div.classList.remove('pending')
        div.classList.add('success')
        div.textContent = `Users fetched successfully from Local Storage (Don't forget to sync local storage with API)`
    } catch (err) {
        div.classList.add('error')
        div.textContent = `Request failed ${err?.message}`
    }
    displayData()
}

function displayData() {
    let tbody = document.getElementById("tbody")
    let users = JSON.parse(localStorage.getItem("users"))
    tbody.textContent = ""
    users.forEach(element => {
        tbody.innerHTML +=
            `
        <tr>
            <td>${element.name}</td>
            <td><img src=${element.avatar} width="50" height="50"></td>
            <td>${element.email}</td>
        </tr>
    `
    });
}

window.onload = () => {
    try {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", "https://abhishekjadhav2002.up.railway.app/", false)
        xhr.send();

        div.classList.add('pending')
        div.textContent = 'Checking backend status...'

        if (xhr.status != 200) {
            div.classList.add('error')
            div.textContent = `Backend is down: ${xhr.statusText}`
        } else if (xhr.status == 200) {
            div.classList.add('success')
            div.textContent = 'Backend is up and running'
        }
    } catch (err) {
        div.classList.add('error')
        div.textContent = `Error connecting with backend: ${err?.message?.split(': ')[1]}`
    }
}