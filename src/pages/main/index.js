(function signFun() {

  var button = document.querySelector(".header__nav-item_js");
  var signInForm = document.querySelector(".modal_sign-js");
  var buttonClose = document.querySelector(".form__x_sign-js");
  var input = document.querySelector(".form__input_sign-js");


  //открытие
  button.addEventListener("click", function () {
    signInForm.classList.remove("modal_sign-none")
    input.focus();
  });

  //Закрытие
  buttonClose.addEventListener("click", function () {
    signInForm.classList.add("modal_sign-none")
    button.focus();
  });

  //Закрытие escape
  window.addEventListener("keydown", function (event) {
    if (event.code == "Escape" && !signInForm.classList.contains("modal_sign-none")) {
      signInForm.classList.add("modal_sign-none");
      button.focus()
    }
  });


}) ();


(function regFun() {

  var button1 = document.querySelector(".header__nav-item-reg_js");
  var regForm = document.querySelector(".modal_register-js");
  var buttonClose1 = document.querySelector(".form__x_js");
  var input1 = document.querySelector(".form__input_js");


  //открытие
  button1.addEventListener("click", function () {
    regForm.classList.remove("modal_register-none")
  input1.focus();
});

//Закрытие
  buttonClose1.addEventListener("click", function () {
    regForm.classList.add("modal_register-none")
  button1.focus();
});

//Закрытие escape
  window.addEventListener("keydown", function (event) {
  if (event.code == "Escape" && !regForm.classList.contains("modal_register-none")) {
    regForm.classList.add("modal_register-none");
    button1.focus()
  }
});
  
} ) ();



(function messageFun() {

  var button2 = document.querySelector(".footer__button_js");
  var messageForm = document.querySelector(".modal_massage-js");
  var buttonClose2 = document.querySelector(".form__x_massage-js");
  var input2 = document.querySelector(".form__input_massage-js");


  //открытие
  button2.addEventListener("click", function () {
    messageForm.classList.remove("modal_masage-none")
  input2.focus();
});

//Закрытие
  buttonClose2.addEventListener("click", function () {
    messageForm.classList.add("modal_masage-none")
  button2.focus();
});

//Закрытие escape
  window.addEventListener("keydown", function (event) {
  if (event.code == "Escape" && !messageForm.classList.contains("modal_masage-none")) {
    messageForm.classList.add("modal_masage-none");
    button2.focus()
  }
});
  
} ) ();




(function  () {

  let buttonScroll = document.querySelector(".button-scroll_js")
  let buttonUp = document.querySelector(".button-scroll-up_js")


  window.addEventListener('scroll', function (event) {


    if (window.pageYOffset > 1500) {
      buttonScroll.classList.remove("button-scroll_none")

    } else {
      buttonScroll.classList.add("button-scroll_none")
    };

  });

  buttonUp.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });

})()




