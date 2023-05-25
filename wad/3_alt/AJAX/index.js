//) Write a JavaScript Program to get the user registration data and push to array/local storage with AJAX POST method and data list in new page.

var div = document.getElementById('backend-status')

function insertUser(e) {
    e.preventDefault()
    document.getElementById('loading').style.visibility = "visible"
    try {
        div.classList.remove('error', 'success')
        div.classList.add('pending')
        div.textContent = 'Adding user...'
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries())
        const stringifiedData = JSON.stringify(data)

        var xhr = new XMLHttpRequest()
        xhr.open("POST", "https://abhishekjadhav2002.up.railway.app/user", false)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(stringifiedData)

        if (xhr.status != 201) {
            const response = JSON.parse(xhr.response)
            if (response.message) {
                div.classList.add('error')
                div.textContent = `Error ${xhr.status}: ${response.message}`
            } else div.textContent = `Error ${xhr.status}: ${xhr.statusText}`
        } else {
            div.classList.add('success')
            div.textContent = `User ${data.name} added successfully`
        }
    } catch (err) {
        console.log(err);
        div.classList.add('error')
        div.textContent = `Request failed ${err?.message}`
    } finally {
        document.getElementById('loading').style.visibility = "hidden"
    }
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