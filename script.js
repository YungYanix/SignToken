// // document.addEventListener("DOMContentLoaded", function() {
// //   var registerForm = document.getElementById("registerForm");
// //   var passwordInput = document.getElementById("password");

// //   registerForm.addEventListener("submit", function(event) {
// //     var username = document.getElementById("username").value;
// //     var password = passwordInput.value;

// //     if (username.length <= 6) {
// //       event.preventDefault();
// //       displayMessage("Логин должен содержать более 6 символов");
// //       return;
// //     }

// //     if (password.length <= 6) {
// //       event.preventDefault();
// //       displayMessage("Пароль должен содержать более 6 символов");
// //       return;
// //     }

// //     if (!/[A-Z]/.test(password) && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]/.test(password)) {
// //       event.preventDefault();
// //       displayMessage("Пароль должен содержать заглавные буквы или специальные символы");
// //       return;
// //     }

// //     if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(password)) {
// //       event.preventDefault();
// //       displayMessage("Пароль должен состоять только из английских букв, цифр или специальных символов");
// //       return;
// //     }

// //     // Очистка недопустимых символов из пароля
// //     var cleanedPassword = password.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g, '');
// //     passwordInput.value = cleanedPassword;
// //   });

// //   passwordInput.addEventListener("input", function() {
// //     this.value = this.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/g, '');
// //   });

// //   function displayMessage(message) {
// //     var messageDiv = document.getElementById("message");
// //     messageDiv.innerText = message;
// //   }
// // });

// document.addEventListener('DOMContentLoaded', function() {
//   checkAuthentication();
// });

// function checkAuthentication() {
//   var accessToken = localStorage.getItem('accessToken');

//   if (accessToken) {
//     // Пользователь аутентифицирован
//     console.log('Пользователь аутентифицирован');
//     window.location.href = './mainPage.html'; // Перенаправляем на страницу mainPage.html
//   } else {
//     // Пользователь не аутентифицирован
//     console.log('Пользователь не аутентифицирован');
//   }
// }

// function registerUser(event) {
//   event.preventDefault();

//   var form = document.getElementById('registerForm');
//   var username = form.elements.username.value;
//   var password = form.elements.password.value;

//   var data = {
//     email: username,
//     password: password
//   };

//   // Отправляем запрос на сервер
//   fetch('http://localhost:4200/api/auth/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Получаем ответ с accessToken
//     var accessToken = data.accessToken;

//     // Сохраняем accessToken в localStorage
//     localStorage.setItem('accessToken', accessToken);

//     // Перенаправляем на страницу mainPage.html
//     window.location.href = './mainPage.html';
//   })
//   .catch(error => {
//     console.log('Ошибка при регистрации:', error);
//     document.getElementById('message').textContent = 'Ошибка при регистрации. Пожалуйста, попробуйте еще раз.';
//   });
// }

// // Слушатель события submit для формы регистрации
// var form = document.getElementById('registerForm');
// form.addEventListener('submit', registerUser);
document.addEventListener("DOMContentLoaded", function(){


const form = document.getElementById('registerForm');
console.log(form);
if(form) {
form.addEventListener('submit', function(event) {
      event.preventDefault(); // Предотвращаем отправку формы
      
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      let wallet = document.getElementById('wallet').value;

      // Отправляем запрос на регистрацию
      registerUser(username, password, wallet);
    });
}
  })

    function registerUser(email, password, wallet) {
      var xhr = new XMLHttpRequest();
      var url = 'http://localhost:4200/api/auth/register'; // Замените на URL вашего PHP-скрипта регистрации

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var accessToken = response.accessToken;

            // Сохраняем accessToken в локальном хранилище
            localStorage.setItem('accessToken', accessToken);

            // Проверяем аутентификацию пользователя
            checkAuthentication();
          } else {
            console.log('Ошибка при регистрации: ' + xhr.status);
            document.getElementById('message').textContent = 'Ошибка при регистрации';
          }
        }
      };

      var data = {
        email: email,
        password: password,
        wallet: wallet
      };

      xhr.send(JSON.stringify(data));
    }
    checkAuthentication();

    function checkAuthentication() {
      var accessToken = localStorage.getItem('accessToken');

      // Проверяем наличие accessToken и выполняем нужные действия
      if (accessToken) {
        // Пользователь аутентифицирован
        console.log('Пользователь аутентифицирован');
        window.location.href = './mainPage.html'; // Перенаправляем на страницу mainPage.html
      } else {
        // Пользователь не аутентифицирован
        console.log('Пользователь не аутентифицирован');
      }
    }


    document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('loginForm');
  if (form) {
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Отправляем запрос на вход
    loginUser(email, password);
  });
  }
  
});

function loginUser(email, password) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost:4200/api/auth/login';

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var accessToken = response.accessToken;

        // Сохраняем accessToken в локальном хранилище
        localStorage.setItem('accessToken', accessToken);

        // Проверяем аутентификацию пользователя
        checkAuthentication();
      } else {
        console.log('Ошибка при входе: ' + xhr.status);
        document.getElementById('message').textContent = 'Ошибка при входе';
      }
    }
  };

  var data = {
    email: email,
    password: password
  };

  xhr.send(JSON.stringify(data));
}

checkAuthentication();

function checkAuthentication() {
  var accessToken = localStorage.getItem('accessToken');

  // Проверяем наличие accessToken и выполняем нужные действия
  if (accessToken) {
    // Пользователь аутентифицирован
    console.log('Пользователь аутентифицирован');
    window.location.href = './mainPage.html'; // Перенаправляем на страницу mainPage.html
  } else {
    // Пользователь не аутентифицирован
    console.log('Пользователь не аутентифицирован');
  }
}
