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


//Задание 2

function second() {
	let num = +prompt("Введите число до 40");

	if (num >= 40) {
		alert("Ошибка! Вы ввели большое число");

		second();

  } else if(Number.isNaN(num)) {
		alert("Ошибка! Введено не число, введи повторно");

		second();

  } else {
		console.log(num);
		alert("Число принято");
	}
}

second ();

//задание 3

(function () {

  let num = + prompt("введите значение");

  let timerid = setInterval(function () {

    console.log(num+=3);

  }, 3000);


  setTimeout(function () {

    clearInterval(timerid);

  }, 9000)


}) () ;


