const now = Date.now();

const dateObj = new Date(now);


console.log(now);
console.log(dateObj.toString().split("(")[1].split(")")[0]);