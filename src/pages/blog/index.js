
// (function () {
//   let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
//   let date = new Date();

//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();


//   console.log(day + "." + (month + 1) + "." + year)

// })();


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
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs [i];
        switch (input.type) {
          case "radio":
            if (values [input.name] && values [input.name] === input.value) {
              input.checked = true;
            }
            break;
          case "checkbox":
            if (values [input.name]) {
              if (typeof values [input.name] === "object" ) {
                for (let j=0; j < values [input.name].length; j++) {
                  let arr = values [input.name];
                  if (arr [j] === input.value) {
                    input.checked = true;
                  };
                };
              } else {
                if (values [input.name] === input.value) {
                  input.checked = true;
                };
              };
            };
            break;
          default:
            input.value = values[input.name];
      };
    };
  };


function getValuesFromUrl() {
  let params = {};
  if (location.search) {
    let paramsArray = location.search.substring(1).split ("&");

    for (let i=0; i < paramsArray.length; i++) {
      let split = paramsArray[i].split("=");
      let name = split[0];
      let value = split [1];
      if (params [name]) {
        if (typeof params [name] === "string") {
          params [name] = [params [name], value];
        } else {
          params [name].push (value);
        }
      } else {
        params [name] = value;
      }
    }
  }
  return params;
};


function setValuesToUrl(values) {
  let params = [];
  let names = Object.keys(values);
  for (let i=0; i < names.length; i++) {
    if (typeof values [names[i]] === "string") {
      params.push (names [i]+ "=" + values [names [i]]);
    } else {
      for (let j=0; j < values [names [i]].length; j++) { 
        params.push (names[i] + "=" + values[names [i]][j]);
      };
    };
  };


  window.history.replaceState ({},document.title, "?" + params.join ("&"));
};



const filterForm = document.forms.filterForm;

setAllValuesForForm (filterForm, getValuesFromUrl () )

  filterForm.addEventListener ("submit", function (event) {
    event.preventDefault ();
    console.log (getAllValuesFromForm (event.target));
    setValuesToUrl (getAllValuesFromForm (event.target))
  });


  let links = document.querySelectorAll (".link_js");
  for (let i = 0; i < links.length; i++) {
    links [i].addEventListener ("click", function (event) {
      event.preventDefault ();
      let value = getAllValuesFromForm(filterForm);
      value.page = i+1 + "";
      setValuesToUrl (value);  
    })
  }

  document.querySelector (".results_js").innerHTML = JSON.stringify(getValuesFromUrl(),null, 2);
  
}) ();

