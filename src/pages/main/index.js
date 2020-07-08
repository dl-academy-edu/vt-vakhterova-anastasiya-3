(function signFun() {

  var button = document.querySelector(".header__nav-item_js");
  var signInForm = document.querySelector(".modal_sign-js");
  var buttonClose = document.querySelector(".form__x_sign-js");
  var input = document.querySelector(".form__input_sign-js");


  //открытие
  button.addEventListener("click", function () {
    signInForm.classList.remove("modal_sign-none");
    input.focus();
  });

  //Закрытие
  buttonClose.addEventListener("click", function () {
    signInForm.classList.add("modal_sign-none");
    button.focus();
  });

  //Закрытие escape
  window.addEventListener("keydown", function (event) {
    if (event.code == "Escape" && !signInForm.classList.contains("modal_sign-none")) {
      signInForm.classList.add("modal_sign-none");
      button.focus();
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
    regForm.classList.remove("modal_register-none");
  input1.focus();
});

//Закрытие
  buttonClose1.addEventListener("click", function () {
    regForm.classList.add("modal_register-none");
  button1.focus();
});

//Закрытие escape
  window.addEventListener("keydown", function (event) {
  if (event.code == "Escape" && !regForm.classList.contains("modal_register-none")) {
    regForm.classList.add("modal_register-none");
    button1.focus();
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
    messageForm.classList.remove("modal_masage-none");
  input2.focus();
});

//Закрытие
  buttonClose2.addEventListener("click", function () {
    messageForm.classList.add("modal_masage-none");
  button2.focus();
});

//Закрытие escape
  window.addEventListener("keydown", function (event) {
  if (event.code == "Escape" && !messageForm.classList.contains("modal_masage-none")) {
    messageForm.classList.add("modal_masage-none");
    button2.focus();
  }
});
  
} ) ();



(function  () {

  let buttonScroll = document.querySelector(".button-scroll_js");

  window.addEventListener('scroll', function (event) {
    if (window.pageYOffset > 1500) {
      buttonScroll.classList.remove("button-scroll_none");

    } else {
      buttonScroll.classList.add("button-scroll_none");
    };

  });

window.onload = function () {
  var scrolled;
  var timer;

  document.querySelector ("button.button-scroll-up_js").onclick = function () {
    scrolled=window.pageYOffset;
    scrollToTop ();
  } 
  function scrollToTop() {
    if (scrolled > 0) {
      window.scrollTo (0,scrolled);
      scrolled = scrolled - 100; // скорость прокрутки
      timer = setTimeout (scrollToTop, 40);
    }
    else {
      clearTimeout (timer);
      window.scrollTo (0,0);
    }
  };
  
};

})();



//валидация формы

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

// function setInvalidTextarea(textarea) {
//   textarea.classList.add ("form__input-invalid");
//   textarea.addEventListener("textarea", function handlerTextarea (event) {
//     textarea.classList.remove("form__input-invalid");
//     textarea.removeEventListener ("textarea", handlerTextarea);
//   });
// };

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

  // for(let i=0; i<T; i++) {
  //   const textarea = textares[i];
  //   switch (textarea) {
  //     default:
  //       if (errors  [textarea.name]) {
  //         setInvalidTextarea (textarea);
  //       };
  //   };
  // };
}

(function () {
  let formRegister= document.forms.register;
  formRegister.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const values =getValuesForm(form);
    console.log (values);
    const email = form.querySelector (".email_js");
    let errors = {}

    if (!mailCheck (values.email)) {
      setInvalidInput (email);
      errors.email = "Please enter a valid email address (your entry is not in the format -somebody@example.com))";
    };

    if (!(values.email && values.email.length)) {
      errors.email = "This field is required";
    };

    if (!(values.name && values.name.length)) {
      errors.name = "This field is required";
    };

    if (!(values.surname && values.surname.length)) {
      errors.surname = "This field is required";
    };

    if (!(values.password && values.password.length)) {
      errors.password = "This field is required";
    };

    if (!(values.location && values.location.length)) {
      errors.location = "This field is required";
    };
    if (!(values.age && values.age.length)) {
      errors.age = "This field is required";
    };

    setFormErrors (form, errors);
  });


  let formSign= document.forms.sign;
  formSign.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const values =getValuesForm(form);
    console.log (values);
    const email = form.querySelector (".email_js");
    let errors = {};

    if (!mailCheck (values.email)) {
      setInvalidInput (email);
      errors.email = "Please enter a valid email address (your entry is not in the format -somebody@example.com))";
    };

    if (!(values.email && values.email.length)) {
      errors.email = "This field is required";
    };

    if (!(values.password && values.password.length)) {
      errors.password = "This field is required";
    };
    setFormErrors (form, errors);
  });


  let formMassage= document.forms.massage;
  formMassage.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const values =getValuesForm(form);
    console.log (values);
    const email = form.querySelector (".email_js");
    let errors = {};

    if (!mailCheck (values.email)) {
      setInvalidInput (email);
      errors.email = "Please enter a valid email address (your entry is not in the format -somebody@example.com))";
    };

    if (!(values.email && values.email.length)) {
      errors.email = "This field is required";
    };

    if (!phoneCheck (values.phone)) {
      const input = form.querySelector (".phone_js");
      input.classList.add ("form__input-invalid")
    };

    if (!(values.name && values.name.length)) {
      errors.name = "This field is required";
    };

    if (!(values.phone && values.phone.length)) {
      errors.phone = "This field is required";
    };

    if (!(values.subject && values.subject.length)) {
      errors.subject = "This field is required";
    };

    setFormErrors (form, errors);
  });
}) ();



//слайдер

const wrapper = document.querySelector(".page-slider__wrapper");
const innerWrapper = document.querySelector(".page-slider__inner-wrapper");
const pagination = document.querySelector(".page-slider__pagination");
const buttonBack = document.querySelector(".page-slider__button_back");
const buttonNext = document.querySelector(".page-slider__button_next");
const slides = document.querySelectorAll(".page-slider__slide");
innerWrapper.style.transition = "margin-left .5s";
let shearWidth = +getComputedStyle(wrapper).width.split("px")[0];
let numberSlides = innerWrapper.querySelectorAll(".page-slider__slide").length - 1;

let activeSlide = 0;
let dots = [];

//ширина слайдов
function initWidthSlides () {
  shearWidth =+getComputedStyle(wrapper).width.split("px")[0];
  for (let i = 0; i < slides.length; i++)  {
    slides[i].style.width = shearWidth + "px";
  };
};

initWidthSlides () ;

function init () {
  for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement ("button");
    dot.classList.add ("page-slider__dot");
    if (i === activeSlide) {
      dot.classList.add ("page-slider__dot_active");
    }
    dot.addEventListener ("click" , function () {
      setActiveSlide(i);
    })
    dots.push(dot);

    pagination.insertAdjacentElement ("beforeend" , dot );
  };

  if (localStorage.getItem ("activeSlide")) {
    setActiveSlide(+localStorage.getItem ("activeSlide"));
  }
}
init ();


function setActiveSlide (index) {
  if (index < 0 || index > numberSlides) {
    return;
  };
    dots[activeSlide].classList.remove ("page-slider__dot_active");
  dots[index].classList.add ("page-slider__dot_active");
  if (activeSlide - index > 0) {
    buttonNext.removeAttribute("disabled");
  };
  if (activeSlide - index < 0) {
    buttonBack.removeAttribute("disabled");
  };
  if (index === 0) {
    buttonBack.setAttribute("disabled", "disabled");
  };
  if (index === numberSlides) {
    buttonNext.setAttribute("disabled", "disabled");
  };

  innerWrapper.style.marginLeft = "-" + shearWidth*index + "px";
  activeSlide = index;
  localStorage.setItem ("activeSlide" , activeSlide);




};


buttonNext.addEventListener("click" , function () {
  const index = activeSlide + 1;
  setActiveSlide (index);
});

buttonBack.addEventListener("click" , function () {
  const index = activeSlide - 1;
  setActiveSlide (index);
});

window.addEventListener("resize" , function () {
  innerWrapper.style.transition = "";
  initWidthSlides ();
  setActiveSlide(activeSlide);
  innerWrapper.style.transition = "margin-left .5s";
  
});





let mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

})