var buf = new Buffer("yo");

console.log(buf);
console.log(buf.toString());

buf.write("wo");
console.log(buf.toString());
