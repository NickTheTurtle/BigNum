# BigNum
Javascript library for basic operations on big numbers with indefinite accuracy. Allows more accuracy than Javascript's 15 digits and a larger range than ±10^307.

## Examples
Define a number simply like this:

<code>
var a = new BigNum("3");
</code>

<code>
var b = new BigNum("10.3");
</code>

<code>
var c = new BigNum("-2.1");
</code>

<code>
var d = new BigNum("135938091850180895012598102598102958");
</code>

<code>
var e = new BigNum("135938091850180895012598102598102958.23425225235");
</code>

<code>
var f = new BigNum("1.23245593809185132598102598102323425225235");
</code>

You can then perform different operations on the numbers:

<code>
  a.add("5"); //add 5 to 3
</code>

<code>
  console.log(a.value); //will return "8"
</code>

<code>
  a.add("-6"); //add -6 to 8
</code>

<code>
  console.log(a.value); will return "2"
</code>

<br />

<code>
  b.subtract("11.2"); //subtract 11.2 from 10.3
</code>

<code>
  console.log(b.value); //will return "-0.9"
</code>

<code>
  b.subtract("-1.2"); //subtract -1.2 from -0.9
</code>

<code>
console.log(b.value); //will return "0.3"
</code>

<br />

<code>
  c.multiply("12.3456789012345678901234567890");//multiply 12.3456789012345678901234567890 by -2.1
</code>

<code>
  console.log(c.value); //will return "-25.9259256925925925692592592569"
</code>

<br />

<code>
  d.divide("9.8765", "20");//divide 135938091850180895012598102598102958 by 9.8765 with 30 digits after the decimal place
</code>

<code>
  console.log(c.value); //will return "13763792016420887461408201548939701.108692350529033564521844783071"
</code>

<br />

<code>
  e.power("-2", "100");//135938091850180895012598102598102958.23425225235 to the -2nd power, 100 digits after the decimal place
</code>

<code>
  console.log(e.value); //will return "0.0000000000000000000000000000000000000000000000000000000000000000000000541149997829605056151514498453"
</code>

<br />

<code>
  f.round("30");//round 1.23245593809185132598102598102323425225235 to 30 digits after the decimal place
</code>

<code>
  console.log(f.value); //will return "1.232455938091851325981025981023"
</code>

## Guide
Define a BigNum by using the <code>new</code> keyword and a number in the format of a string. BigNum recognizes negatives and decimals. The value is stored in the "value" key.

<code>
var a = new BigNum("-4.23");
</code>

<code>
console.log(a.value);
</code>

BigNum currently has six different operators on BigNum's (add, subtract, multiply, divide, power, and round) and eleven helper functions (add, subtract, multiply, divide, power, round, max, min, format, isNum, isInt). Please note that huge or lengthy values for the parameters will slow the browser.

### Operators
The operators of add, subtract, multiply, divide, and round accept one argument and operates it on the stored BitNum value. Divide and power accept two parameters. The second parameter specifies the number of digits (in string format) to round after the decimal (the default is "0"). Note that the power operation function currently only accept integer values for the exponents.

<code>
var a = new BigNum("3.2");
</code>

<code>
console.log(a.power("2").value); //returns "10.24"
</code>

### Helper functions
BigNum includes several helper functions. The first six (add, subtract, multiply, divide, power, and round) work the same as the operator functions but accept two parameters. "Max" and "min" return the maximum and minimum number of the two parameters. The "format" function formats the number by removing redundant zeroes, double negative signs, etc. (note that this function, unlike other functions, return a string instead of a normal BigNum object). The function "isNum" checks if the number is a BigNum recognized number, while "isInt" checks if the number is an integer that BigNum recognizes.

<code>
BigNum.format("---0000.300000"); //returns "-0.3"
</code>

<code>
BigNum.format("---0000a300000"); //throws an Error
</code>

<code>
BigNum.isNum("--003.002000"); //returns true
</code>

<code>
BigNum.isNum("--003a002000"); //returns false
</code>

<code>
BigNum.isInt("--003.002000"); //returns false
</code>

## Bugs
If you see any bugs, please report an issue and a reproduction of the bug. If you have any suggestions for features, please add it to the pull request.
