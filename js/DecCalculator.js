import Calculator from "./Calculator";

class DecCalculator extends Calculator {
  constructor(settings) {
    super(settings);
    console.log(this.getName());
  }

  // el.setAttribute("contenteditable", "true");

  /* Method changing number
  */
  changeNumber(root) {
    let activeElement = root.querySelector(".active");
    activeElement.setAttribute("contenteditable", "true");

    [...activeElement.parentElement.children].forEach(el => {
      if (el !== activeElement) {
        el.classList.add("active");
      }
    });

    // this.checkNumber();
    // this.updateResult();
  }

  //Klikanie w plusa i mnozenie
  initEvents() {
    super.initEvents();
    const plus = document.querySelector("#plus");
    // console.log(plus)
    plus.addEventListener("click", (event) => {
      this.checkNumber()
      this.updateResult()
      // this.add()
    });
    const multi = document.querySelector("#multi");
    multi.addEventListener("click", (event) => {
      this.checkNumber()
      this.updateResult2()
      // this.add()
    });
  }

  //update obiektu z klasy abstrakcyjnej
  checkNumber() {
    super.checkNumber();
    let root = this.$calculatorDOMElement;
    let $firstNumber = root.querySelectorAll(".group-number label:first-child");
    let $secondNumber = root.querySelectorAll(".group-number label:nth-child(2)");
    let $resultNumber = root.querySelectorAll(".group-number .result-bit");

    for (let i = $firstNumber.length - 1, j = 0; i >= 0; i--, j++) {
      this.resultNumberArray2[i] = parseInt($resultNumber[j].querySelector(".active").innerText);
    }
    this.resultNumberArray2 = this.multiplay(this.firstNumberArray, this.secondNumberArray);
    console.log(this.resultNumberArray2)
  }

  //Dodawanie
  add(numberX, numberY) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = numberX.length - 1; i >= 0; i--) {
      let carrynum = numberX[i] + numberY[i] + result[i];
      if (carrynum == 10) {
        result[i] = 0;
        result[i - 1] = 1;
      } else if (carrynum > 10) {
        result[i] = carrynum -10;
        result[i - 1] = 1;
      } else {
        result[i] = carrynum;
      }
    }
    return result;
  }

  //Mnozenie
  multiplay(numberX, numberY) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = numberX.length - 1; i >= 0; i--) {

      let carrynum = numberX[i] * numberY[i] +result[i];

      console.log(carrynum)
      if (carrynum == 10) {
        result[i] = 0;
        result[i - 1] = 1;
      } else if (carrynum > 10 && carrynum < 20) {
        result[i] = carrynum -10;
        result[i - 1] = 1;
      } else if (carrynum > 20 && carrynum < 30) {
        result[i] = carrynum -20;
        result[i - 1] = 2;
      } else if (carrynum > 30 && carrynum < 40) {
        result[i] = carrynum -30;
        result[i - 1] = 3;
      } else if (carrynum > 40 && carrynum < 50) {
        result[i] = carrynum -40;
        result[i - 1] = 4;
      } else if (carrynum > 50 && carrynum < 60) {
        result[i] = carrynum -50;
        result[i - 1] = 5;
      } else {
        result[i] = carrynum;
      }
    }
    return result;
  }
  //Aktualizacja wyniku Dodawania
  updateResult() {
    let root = this.$calculatorDOMElement;
    let $resultNumber = root.querySelectorAll(".result-bit");

    // console.log(this.resultNumberArray)
    // console.log($resultNumber.length)
    //dodawanie
    for (let i = this.resultNumberArray.length - 1, j = 0; i >= 0; i--, j++) {
      $resultNumber[j].querySelector(".active").innerText = this.resultNumberArray[i];
    }
  }
  // Aktualizacja wyniku mnozeznia
  updateResult2() {
    let root = this.$calculatorDOMElement;
    let $resultNumber = root.querySelectorAll(".result-bit");

    // console.log(this.resultNumberArray)
    // console.log($resultNumber.length)
   //mnozenie
    for (let i = this.resultNumberArray2.length - 1, j = 0; i >= 0; i--, j++) {
      $resultNumber[j].querySelector(".active").innerText = this.resultNumberArray2[i];
    }
  }
}

  export default DecCalculator;