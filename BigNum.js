;(function () {
  var formatNum = function (string1) {
    if (typeof string1 !== "string") {
      throw new Error("Number is invalid");
    }
    string1 = string1.trim();
    var sign = "";
    if (string1 === "0" || string1 === "-0" || string1 === "") {
      return "0";
    }
    for (var i = 0; i < string1.length; i ++) {
      if (string1[i] === "-") {
        sign = (sign === "" ? "-" : "");
      } else {
        break;
      }
    }
    string1 = sign + string1.replace(/-/g, "");
    for (var i = 0; i < string1.length; i ++) {
      if (string1[i] === "-") {
        continue;
      } else if (string1[i] === "0" && string1[i + 1]) {
        string1 = string1.replace("0", "");
        i -= 1;
      } else {
        break;
      }
    }
    if (string1.startsWith(".")) {
      string1 = "0" + string1;
    } else if (string1.startsWith("-.")) {
      string1 = "-0" + string1.replace("-", "");
    }
    if (string1.indexOf(".") !== -1) {
      for (var i = string1.length - 1; i > -1; i --) {
        if (string1.endsWith("0")) {
          string1 = string1.slice(0, i);
        }
      }
    }
    if (string1.endsWith(".")) {
      string1 = string1.slice(0, string1.length - 1);
    }
    if ((new RegExp(/^-*\d*(\.)?\d*$/)).test(string1)) {
      return string1;
    } else {
      throw new Error("Number is invalid");
    }
  };
  var isNum = function (string1) {
    string1 = (string1.value ? string1.value : string1);
    if (typeof string1 !== "string") {
      throw new Error("Number is invalid");
    }
    return (new RegExp(/^-*\d*(\.)?\d*$/)).test(string1);
  };
  var isInt = function (string1) {
    string1 = (string1.value ? string1.value : string1);
    if (typeof string1 !== "string") {
      throw new Error("Number is invalid");
    }
    return (new RegExp(/^-*\d*$/)).test(string1);
  };
  var maxNum = function (string1, string2) {
    string1 = formatNum(string1.value ? string1.value : string1);
    string2 = formatNum(string2.value ? string2.value : string2);
    if (isNum(string1) && isNum(string2)) {
      if (string1[0] !== "-" && string2[0] !== "-") {
        var array1 = string1.split(".");
        var array2 = string2.split(".");
        if (!array1[1]) {
          array1[1] = "0";
        }
        if (!array2[1]) {
          array2[1] = "0";
        }
        var difference = array1[1].length - array2[1].length;
        if (difference > 0) {
          for (var i = 0; i < difference; i ++) {
            array2[1] += "0";
          }
        } else if (difference < 0) {
          for (var i = 0; i < -difference; i ++) {
            array1[1] += "0";
          }
        }
        difference = array1[0].length - array2[0].length;
        if (difference > 0) {
          for (var i = 0; i < difference; i ++) {
            array2[0] = "0" + array2[0];
          }
        } else if (difference < 0) {
          for (var i = 0; i < -difference; i ++) {
            array1[0] += "0" + array1[0];
          }
        }
        string1 = array1.join(".");
        string2 = array2.join(".");
        for (var i = 0; i < string1.length; i ++) {
          if (string1[i] !== ".") {
            if (parseInt(string1[i]) > parseInt(string2[i])) {
              return new BigNum(string1);
            } else if (parseInt(string2[i]) > parseInt(string1[i])) {
              return new BigNum(string2);
            }
          }
        }
        return new BigNum(string1);
      } else if (string1[0] === "-" && string2[0] !== "-") {
        return new BigNum(string2);
      } else if (string1[0] !== "-" && string2[0] === "-") {
        return new BigNum(string1);
      } else {
        return new BigNum(maxNum(string1.replace("-", ""), string2.replace("-", "")).value === string1 ? string2 : string1);
      }
    } else {
      throw new Error("Number is invalid");
    }
  };
  var roundNum = function (string1, string2) {
    string1 = formatNum(string1.value ? string1.value : string1);
    if (string2) {
      string2 = formatNum(string2.value ? string2.value : string2);
    } else {
      string2 = "0";
    }
    if (isNum(string1)) {
      if (isInt(string2)) {
        if (!isInt(string1) && string2 !== "0") {
          var array1 = string1.split(".");
          var roundingDigit = array1[1][string2];
          if (roundingDigit && roundingDigit > 4) {
            var num = "1";
            for (var i = 1; i < parseInt(string2); i ++) {
              num = "0" + num;
            }
            array1 = add(string1, "." + num).value.split(".");
          }
          return new BigNum(array1[0] + "." + array1[1].substr(0, string2));
        } else {
          if (!string1.split(".")[1] || string1.split(".")[1][0] < 5) {
            return new BigNum(string1.split(".")[0]);
          } else {
            return add(string1.split(".")[0], "1");
          }
        }
      } else {
        throw new Error("Rounding accuracy must be an integer");
      }
    } else {
      throw new Error("Number is invalid");
    }
  };
  var add = function (string1, string2) {
    if (isNum(string1) && isNum(string2)) {
      string1 = formatNum(string1.value ? string1.value : string1);
      string2 = formatNum(string2.value ? string2.value : string2);
      if (string1[0] !== "-" && string2[0] !== "-") {
        var array1 = string1.split(".");
        var array2 = string2.split(".");
        if (!array1[1]) {
          array1[1] = "0";
        }
        if (!array2[1]) {
          array2[1] = "0";
        }
        var difference = array1[1].length - array2[1].length;
        if (difference > 0) {
          for (var i = 0; i < difference; i ++) {
            array2[1] += "0";
          }
        } else if (difference < 0) {
          for (var i = 0; i < -difference; i ++) {
            array1[1] += "0";
          }
        }
        difference = array1[0].length - array2[0].length;
        if (difference > 0) {
          for (var i = 0; i < difference; i ++) {
            array2[0] = "0" + array2[0];
          }
        } else if (difference < 0) {
          for (var i = 0; i < -difference; i ++) {
            array1[0] = "0" + array1[0];
          }
        }
        var carryOn = 0;
        var result = "";
        string1 = array1.join(".");
        string2 = array2.join(".");
        for (var i = string1.length - 1; i > -1; i --) {
          if (string1[i] !== ".") {
            if (carryOn + parseInt(string1[i]) + parseInt(string2[i]) > 9) {
              result = carryOn + parseInt(string1[i]) + parseInt(string2[i]) - 10 + result;
              carryOn = 1;
            } else {
              result = carryOn + parseInt(string1[i]) + parseInt(string2[i]) + result;
              carryOn = 0;
            }
          } else {
            result = "." + result;
          }
        }
        return new BigNum(carryOn + result);
      } else if (string1[0] === "-" && string2[0] !== "-") {
        return subtract(string2, string1.replace("-", ""));
      } else if (string1[0] !== "-" && string2[0] === "-") {
        return subtract(string1, string2.replace("-", ""));
      } else {
        return new BigNum("-" + add(string1.replace("-", ""), string2.replace("-", "")).value);
      }
    } else {
      throw new Error("Number is invalid");
    }
  };
  var subtract = function (string1, string2) {
    if (isNum(string1) && isNum(string2)) {
      string1 = formatNum(string1.value ? string1.value : string1);
      string2 = formatNum(string2.value ? string2.value : string2);
      if (string1[0] !== "-" && string2[0] !== "-") {
        if (string1 === string2) {
          return new BigNum("0");
        } else if (maxNum(string1, string2).value === string1) {
          var array1 = string1.split(".");
          var array2 = string2.split(".");
          if (!array1[1]) {
            array1[1] = "0";
          }
          if (!array2[1]) {
            array2[1] = "0";
          }
          var difference = array1[1].length - array2[1].length;
          if (difference > 0) {
            for (var i = 0; i < difference; i ++) {
              array2[1] += "0";
            }
          } else if (difference < 0) {
            for (var i = 0; i < -difference; i ++) {
              array1[1] += "0";
            }
          }
          difference = array1[0].length - array2[0].length;
          if (difference > 0) {
            for (var i = 0; i < difference; i ++) {
              array2[0] = "0" + array2[0];
            }
          } else if (difference < 0) {
            for (var i = 0; i < -difference; i ++) {
              array1[0] = "0" + array1[0];
            }
          }
          var borrow = 0;
          var result = "";
          string1 = array1.join(".");
          string2 = array2.join(".");
          for (var i = string1.length - 1; i > -1; i --) {
            if (string1[i] !== ".") {
              if (parseInt(string1[i]) - parseInt(string2[i]) - borrow < 0) {
                result = parseInt(string1[i]) - parseInt(string2[i]) - borrow + 10 + result;
                borrow = 1;
              } else {
                result = parseInt(string1[i]) - parseInt(string2[i]) - borrow + result;
                borrow = 0;
              }
            } else {
              result = "." + result;
            }
          }
          return new BigNum(result);
        } else {
          return new BigNum("-" + subtract(string2, string1).value);
        }
      } else if (string1[0] === "-" && string2[0] !== "-") {
        return new BigNum("-" + add(string1.replace("-", ""), string2.replace("-", "")).value);
      } else if (string1[0] !== "-" && string2[0] === "-") {
        return add(string1, string2.replace("-", ""));
      } else {
        return subtract(string2.replace("-", ""), string1.replace("-", ""));
      }
    } else {
      throw new Error("Number is invalid");
    }
  };
  var multiply = function (string1, string2) {
    if (isNum(string1) && isNum(string2)) {
      string1 = formatNum(string1.value ? string1.value : string1);
      string2 = formatNum(string2.value ? string2.value : string2);
      if (string1[0] !== "-" && string2[0] !== "-") {
        var array1 = string1.split(".");
        var array2 = string2.split(".");
        if (!array1[1]) {
          array1[1] = "0";
        }
        if (!array2[1]) {
          array2[1] = "0";
        }
        var decimalPlaces = array1[1].length + array2[1].length;
        var result = new BigNum("");
        string1 = array1.join("");
        string2 = array2.join("");
        for (var i = string2.length - 1; i > -1; i -= 5) {
          var zeroes = "";
          for (var j = string2.length - 1; j > i; j --) {
            zeroes += "0";
          }
          var partial = "";
          for (var j = 4; j > -1; j --) {
            if (string2[i - j]) {
              partial += string2[i - j];
            }
          }
          result.add(multiplySmallInt(string1, partial) + zeroes);
        }
        var resultLength = result.value.length;
        for (var i = 0; i < decimalPlaces - resultLength; i ++) {
          result.value = "0" + result.value;
        }
        return new BigNum(result.value.substr(0, result.value.length - decimalPlaces) + "." + result.value.substr(result.value.length - decimalPlaces, result.value.length));
      } else if (string1[0] === "-" ^ string2[0] === "-") {
        return new BigNum("-" + multiply(string1.replace("-", ""), string2.replace("-", "")).value);
      } else {
        return multiply(string1.replace("-", ""), string2.replace("-", ""));
      }
    } else {
      throw new Error("Number is invalid");
    }
  };
  var multiplySmallInt = function (string1, string2) {
    var result = "";
    var carryOn = 0;
    for (var i = string1.length - 1; i > -1; i --) {
      if (carryOn + parseInt(string1[i]) * parseInt(string2) > 9) {
        result = (carryOn + parseInt(string1[i]) * parseInt(string2)) % 10 + result;
        carryOn = Math.floor((carryOn + parseInt(string1[i]) * parseInt(string2)) / 10);
      } else {
        result = carryOn + parseInt(string1[i]) * parseInt(string2) + result;
        carryOn = 0;
      }
    }
    return carryOn + result;
  };
  var divide = function (string1, string2, accuracy) {
    if (isNum(string1) && isNum(string2)) {
      string1 = formatNum(string1.value ? string1.value : string1);
      string2 = formatNum(string2.value ? string2.value : string2);
      if (accuracy) {
        accuracy = formatNum(accuracy.value ? accuracy.value : accuracy);
      } else {
        accuracy = "0";
      }
      var aimedAccuracy = add(accuracy, "2");
      if (string1[0] !== "-" && string2[0] !== "-") {
        if (string2 === "0") {
          throw new Error("Division by zero");
        }
        if (string2 === "1") {
          return roundNum(string1, accuracy);
        }
        if (string1 === "0") {
          return new BigNum("0");
        }
        if (!isInt(string2)) {
          for (var i = 0; i < string2.split(".")[1].length; i ++) {
            if (isInt(string1)) {
              string1 += "0";
            } else {
              string1 = formatNum(string1.substr(0, string1.indexOf(".")) + string1[string1.indexOf(".") + 1] + "." + string1.substr(string1.indexOf(".") + 2, string1.length));
            }
          }
          string2 = formatNum(string2.replace(".", ""));
        }
        var guess = new BigNum((1 / parseInt(string2.substr(0, 5))).toPrecision(21));
        var array2 = string2.split(".");
        for (var i = 5; i < array2[0].length; i ++) {
          guess = new BigNum(guess.value.substr(0, guess.value.indexOf(".") - 1) + "." + guess.value[guess.value.indexOf(".") - 1] + guess.value.substr(guess.value.indexOf(".") + 1, guess.value.length));
        }
        for (var i = 0; i < 10000; i ++) {
          var newGuess = multiply("-" + string2, guess).add("2").multiply(guess);
          if (roundNum(multiply(guess, string1), aimedAccuracy).value === roundNum(multiply(newGuess, string1), aimedAccuracy).value) {
            return roundNum(multiply(string1, newGuess), accuracy);
          } else {
            guess = newGuess;
          }
        }
        throw new Error("Maximum iteration value exceeded");
      } else if (string1[0] === "-" ^ string2[0] === "-") {
        return new BigNum("-" + divide(string1.replace("-", ""), string2.replace("-", ""), accuracy).value);
      } else {
        return divide(string1.replace("-", ""), string2.replace("-", ""), accuracy);
      }
    } else {
      throw new Error("Number is invalid");
    }
  };
  var power = function (string1, string2, accuracy) {
    if (isNum(string1) && isNum(string2)) {
      string1 = formatNum(string1.value ? string1.value : string1);
      string2 = formatNum(string2.value ? string2.value : string2);
      if (accuracy) {
        accuracy = formatNum(accuracy.value ? accuracy.value : accuracy);
      } else {
        accuracy = "0";
      }
      if (isInt(string2)) {
        if (string2[0] === "-") {
          return divide("1", power(string1, string2.replace("-", "")), accuracy);
        } else if (string2 === "0") {
          return new BigNum("1");
        } else if (string2 === "1") {
          return new BigNum(string1);
        } else if ((new RegExp(/[02468]$/)).test(string2)) {
          return multiply(string1, string1).power(multiply(string2, "0.5"));
        } else {
          return multiply(string1, string1).power(subtract(string2, "1").multiply("0.5")).multiply(string1);
        }
      } else {
        throw new Error("Power function only supports positive integers for exponents");
      }
    } else {
      throw new Error("Number is invalid");
    }
  };
  BigNum = function (string1) {
    string1 = formatNum(string1.value ? string1.value : string1);
    if (this instanceof BigNum) {
      if (isNum(string1)) {
        this.value = string1;
        this.add = function (string1) {
          this.value = add(this.value, string1).value;
          return this;
        };
        this.subtract = function (string1) {
          this.value = subtract(this.value, string1).value;
          return this;
        };
        this.multiply = function (string1) {
          this.value = multiply(this.value, string1).value;
          return this;
        };
        this.divide = function (string1, accuracy) {
          this.value = divide(this.value, string1, accuracy).value;
          return this;
        };
        this.power = function (string1, string2) {
          this.value = power(this.value, string1, string2).value;
          return this;
        };
        this.round = function (string1) {
          this.value = roundNum(this.value, string1).value;
          return this;
        };
        return this;
      } else {
        throw new Error("Number is invalid");
      }
    } else {
      throw new Error("Expected \"new\" constructer keyword");
    }
  };
  BigNum.add = add;
  BigNum.subtract = subtract;
  BigNum.multiply = multiply;
  BigNum.divide = divide;
  BigNum.power = power;
  BigNum.round = roundNum;
  BigNum.max = maxNum;
  BigNum.min = function (string1, string2) {
    string1 = formatNum(string1.value ? string1.value : string1);
    string2 = formatNum(string2.value ? string1.value : string2);
    if (maxNum(string1, string2) === string1) {
      return new BigNum(string2);
    } else {
      return new BigNum(string1);
    }
  };
  BigNum.format = formatNum;
  BigNum.isNum = isNum;
  BigNum.isInt = isInt;
})();
