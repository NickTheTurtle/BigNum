# BigNum
Javascript library to calculate big numbers with indefinite accuracy.

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
console.log(a.value); //will return "8"
a.add("-6"); //add -6 to 8
console.log(a.value); will return "2"
</code>

<code>
b.subtract("11.2"); //subtract 11.2 from 10.3
console.log(b.value); //will return "-0.9"
b.subtract("-1.2"); //subtract -1.2 from -0.9
console.log(b.value); //will return "0.3"
</code>

<code>
c.multiply("12.3456789012345678901234567890");//multiply 12.3456789012345678901234567890 by -2.1
console.log(c.value); //will return "-25.9259256925925925692592592569"
</code>

<code>
d.divide("9.8765", "20");//divide 135938091850180895012598102598102958 by 9.8765 with 30 digits after the decimal place
console.log(c.value); //will return "13763792016420887461408201548939701.108692350529033564521844783071"
</code>

<code>
e.power("-2", "100");//135938091850180895012598102598102958.23425225235 to the -2nd power, 100 digits after the decimal place
console.log(e.value); //will return "0.0000000000000000000000000000000000000000000000000000000000000000000000541149997829605056151514498453"
</code>

<code>
f.round("30");//round 1.23245593809185132598102598102323425225235 to 30 digits after the decimal place
console.log(f.value); //will return "1.232455938091851325981025981023"
</code>
