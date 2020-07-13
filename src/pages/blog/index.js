
(function () {




  function getAllValuesFromForm(form) {
    let body = {};
    const inputs = form.querySelectorAll("input");
    for (let input of inputs) {
      switch (input.type) {
        case "radio":
          if (input.checked)
            body[input.name] = input.value;
          break;
        case "checkbox":
          if (!body[input.name]) {
            body[input.name] = [];
          }
          if (input.checked) {
            body[input.name].push(input.value);
          }
          break;
        default:
          body[input.name] = input.value;
      };
    };

    return body;
  };


  function setAllValuesForForm(form, values) {
    const inputs = form.querySelectorAll("input");
    let l = inputs.length;
    for (let input of inputs) {
      switch (input.type) {
        case "radio":
          if (values[input.name] && values[input.name] === input.value) {
            input.checked = true;
          }
          break;
        case "checkbox":
          if (values[input.name]) {
            if (typeof values[input.name] === "object") {
              for (let i = 0; i < values[input.name].length; i++) {
                if (values[input.name][i] === input.value) {
                  input.checked = true;
                }
              }
            } else {
              if (values[input.name] === input.value) {
                input.checked = true;
              }
            }
          }
          break;
        default:
          if (values[input.name]) {
            input.value = values[input.name];
          }
          break;
      };
    };
  };

  function getValuesFromUrl() {
    let params = {};
    if (location.search) {
      let paramsArray = location.search.substring(1).split("&");
      for (let i = 0; i < paramsArray.length; i++) {
        let split = paramsArray[i].split("=");
        let name = split[0];
        let value = split[1].replace(/%20/g, "");
        if (params[name]) {
          if (typeof params[name] === "string") {
            params[name] = [params[name], value];
          } else {
            params[name].push(value);
          }
        } else {
          params[name] = value;
        }
      }
    }
    return params;
  };

  function setValuesToUrl(values) {
    let params = [];
    let names = Object.keys(values);
    for (let i = 0; i < names.length; i++) {
      if ((typeof values[names[i]]) === "string") {
        params.push(names[i] + "=" + values[names[i]]);
      } else {
        for (let j = 0; j < values[names[i]].length; j++) {
          params.push(names[i] + "=" + values[names[i]][j]);
        }
      }
    }
    window.history.replaceState({}, document.title, "?" + params.join("&"));
  };

  const SERVER_URL = "https://academy.directlinedev.com";
  let cardsBox = document.querySelector(".cards-box_js");



  function call(method, path, fn, onstart, onerror) {
    if (onstart)
      onstart();
    let xhr = new XMLHttpRequest();
    xhr.open(method, SERVER_URL + path);
    xhr.send();
    xhr.onload = function () {
      fn(xhr)
    }
    xhr.onerror = function () {
      if (onerror)
        onerror(xhr)
    }
  };


  function createCard(card) {
    return `
  <li class="blog__item">
            <picture class="blog__img-wrapper">
              <source srcset="${SERVER_URL}${card.mobilePhotoUrl}, ${SERVER_URL}${card.mobile2xPhotoUrl}" media="(max-width: 700px)">
              <source srcset="${SERVER_URL}${card.tabletPhotoUrl}, ${SERVER_URL}${card.tablet2xPhotoUrl}" media="(max-width: 850px)">
              <source srcset="${SERVER_URL}${card.desktopPhotoUrl}, ${SERVER_URL}${card.desktop2xPhotoUrl}">
              <img class="blog__img" src="${SERVER_URL}${card.desktopPhotoUrl}" width="320" height="236" alt="${card.title}"/>
            </picture>
          <div class="blog__content">
            <ul class="blog__tag-list visually-hidden">
            </ul>
            <span class="blog__date blog__general-information">${dateParse(card.date)} </span>
            <span class="blog__views blog__general-information">${card.views} views </span>
            <span class="blog__comments blog__general-information">${card.commentsCount} comments </span>
            <h2 class="blog__title">${card.title} </h2>
            <p class="blog__text">${card.text} </p>
            <a class="blog__link" href="#"> Go to this post </a>
          </div>
        </li>
  `
  };


  function dateParse(cardDate) {
    let date = new Date(cardDate);
    let year = date.getFullYear();
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = 1 + date.getMonth();
    if (month < 10) {
      month = "0" + month;
    }

    return (day + "." + month + "." + year);
  }




  call("GET", "/api/posts", function (res) {
    let response = JSON.parse(res.response);
    if (response.success) {
      const cards = response.data;
      let cardsHtml = "";
      for (let i = 0; i < cards.length; i++) {
        cardsHtml += createCard(cards[i]);
      }
      cardsBox.innerHTML = cardsHtml;
    } else {
      alert("Ошибка");
    }

  });


  let allValuesPage = getValuesFromUrl();
  const filterForm = document.forms.filterForm;

  setAllValuesForForm(filterForm, getValuesFromUrl())

  filterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(getAllValuesFromForm(event.target));
    setValuesToUrl(getAllValuesFromForm(event.target))
  });


  let links = document.querySelectorAll(".link_js");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();
      let value = getAllValuesFromForm(filterForm);
      value.page = i + 1 + "";
      setValuesToUrl(value);
    })
  };

  document.querySelector(".results_js").innerHTML = JSON.stringify(getValuesFromUrl(), null, 2);

})();



