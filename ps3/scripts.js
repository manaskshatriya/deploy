// script.js
$(document).ready(function() {
    $('#registrationForm').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Get input values
      var name = $('#name').val();
      var email = $('#email').val();
      var password = $('#password').val();
  
      // Create user data object
      var userData = {
        name: name,
        email: email,
        password: password
      };
  
      // Send data using AJAX POST
      $.ajax({
        url: 'api/register', // Replace with your server endpoint
        type: 'POST',
        data: userData,
        success: function(response) {
          // Store data in array or local storage
          // Example using local storage:
          var userList = localStorage.getItem('userList');
          if (userList) {
            userList = JSON.parse(userList);
          } else {
            userList = [];
          }
          userList.push(userData);
          localStorage.setItem('userList', JSON.stringify(userList));
  
          // Redirect to data.html page
          window.location.href = 'data.html';
        },
        error: function(error) {
          console.log('Registration failed: ' + error);
        }
      });
    });
  });
  