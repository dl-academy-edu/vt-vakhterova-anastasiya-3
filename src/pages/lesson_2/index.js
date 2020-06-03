//задание 1
function first() {

  let num = + prompt("введите число");


  for (let i = 1; i < num + 1; i++) {

    if (i % 4) {

      console.log(i)

    }

  }
};

first();

//задание 2

(function () {

  let num = + prompt("введите значение");

  let timerid = setInterval(function () {

    console.log(num+=3);

  }, 3000);


  setTimeout(function () {

    clearInterval(timerid);

  }, 9000)


}) () ;


