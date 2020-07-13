(function passwordFun() {

	var button = document.querySelector(".profile__button-password_js");
	var passwordEditForm = document.querySelector(".modal__edit-password_js");
	var buttonClose = document.querySelector(".form__x_sign-js");
	var input = document.querySelector(".form__input_password-js");


	//открытие
	button.addEventListener("click", function () {
		passwordEditForm.classList.remove("modal__edit-password_none");
		input.focus();
	});

	// //Закрытие
	buttonClose.addEventListener("click", function () {
		passwordEditForm.classList.add("modal__edit-password_none");
		button.focus();
	});

	// //Закрытие escape
	window.addEventListener("keydown", function (event) {
		if (event.code == "Escape" && !passwordEditForm.classList.contains("modal__edit-password_none")) {
			passwordEditForm.classList.add("modal__edit-password_none");
			button.focus();
		}
	});

})();

(function dataFun() {

	var button = document.querySelector(".profile__button-data_js");
	var dataEditForm = document.querySelector(".modal__edit-data_js");
	var buttonClose = document.querySelector(".form__x_js");
	var input = document.querySelector(".form__input_js");


	//открытие
	button.addEventListener("click", function () {
		dataEditForm.classList.remove("modal__edit-data_none");
		input.focus();
	});

	// //Закрытие
	buttonClose.addEventListener("click", function () {
		dataEditForm.classList.add("modal__edit-data_none");
		button.focus();
	});

	// //Закрытие escape
	window.addEventListener("keydown", function (event) {
		if (event.code == "Escape" && !dataEditForm.classList.contains("modal__edit-data_none")) {
			dataEditForm.classList.add("modal__edit-data_none");
			button.focus();
		}
	});

})();



function getValuesForm(form) {
  let body = {};
  const inputs  = form.querySelectorAll("input");
  const textares  = form.querySelectorAll("textarea");
  let l = inputs.length;
  for(let i=0; i<l; i++) {
    const input = inputs[i];

    switch (input.type) {
      case "checkbox":
        if (!body [input.name]) {
          body [input.name] = [];
        }
        if (input.checked) {
          const inputL = body [input.name].length;
          body [input.name] [inputL] = input.value ;
        }
        break;

      default:
        body [input.name] = input.value;
        break;
    }
  };

  let T = textares.length;
  for(let i=0; i<T; i++) {
    const textarea = textares[i];
    body [textarea.name] = textarea.value;
  };

  return body;
};


function errorMessageInputCreate(input, text) {
  let message = document.createElement("div");
  message.classList.add("invalid-feedback");
  message.innerText = text;

  input.insertAdjacentElement("afterend", message); 
  input.addEventListener("input", function handlerInput (event) {
    message.remove("");
    input.removeEventListener ("input", handlerInput);
  });
  
};


function mailCheck(email) {
  return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
};

function phoneCheck(phone) {
  return phone.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
};

function setInvalidInput(input) {
  input.classList.add ("form__input-invalid");
  input.addEventListener("input", function handlerInput (event) {
    input.classList.remove("form__input-invalid");
    input.removeEventListener ("input", handlerInput);
  });
};


function setFormErrors(form, errors) {
  const textares  = form.querySelectorAll("textarea");
  const inputs  = form.querySelectorAll("input");
  let l = inputs.length;
  let T = textares.length;

  for(let i=0; i<l; i++) {
    const input = inputs[i];
    switch (input.type) {
      case "checkbox":
        if (errors  [input.name]) {
          setInvalidInput (input);
        };
        break;
      default:
        if (errors  [input.name]) {
          setInvalidInput (input);
          errorMessageInputCreate (input, errors [input.name] );
        };
    };
  };

};



const loaderBox = document.querySelector(".loader-container_js");

function createLoader() {
  return `
  <div class="container-loader">
  <div class="item-1"></div>
  <div class="item-2"></div>
  <div class="item-3"></div>
  <div class="item-4"></div>
  <div class="item-5"></div>
</div>
`
} ;



let SERVER_URL = "https://academy.directlinedev.com";
function sendReq({url, method="GET", body={}, headers={}}) {
  let settings = {
    method,
    body,
    headers,
  };

  if(method === "GET") {
    settings.body = undefined;
  }

  return fetch(SERVER_URL + url, settings);
};


function checkToken() {
  const token = localStorage.getItem("token");
  if (token) {
    document.querySelector(".header__nav-item_js").classList.add ("hidden");
    document.querySelector(".header__nav-item-reg_js").classList.add ("hidden");
    document.querySelector(".header__nav-item-profile_js").classList.remove ("hidden");
  } else {
    document.querySelector(".header__nav-item_js").classList.remove ("hidden");
    document.querySelector(".header__nav-item-reg_js").classList.remove ("hidden");
    document.querySelector(".header__nav-item-profile_js").classList.add ("hidden");
  }
  
};

function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.remove ("token");
  }
  checkToken ();
};

checkToken ();



// function updateUserData() {
// 	sendReq ( {
// 		method: "GET",
// 		url: "/api/users/" + localStorage.getItem ("userID"),
// 	})
//   .then(function (res) {
//     return res.json();
// 	})
	
// };


// updateUserData ();
	



// function changeData(e) {
// 	e.preventDefault ();
// }