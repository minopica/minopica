//block of code = function

function add(a,b)
{
    return a+b
}
let sum=add(1,2)
console.log(sum)

// Anonymous function -> do not have name -> function expressions

var sumOfIntegers = function(c,d)
{
    return c+d
}

//mimimize the code

var sumOfIntegers = (c,d)=>c+d
console.log(sumOfIntegers(2,3))

//scope of var,let,const
//var - global level/functional
var greet = "Afternoon"
function add(a,b)
{
    var greet2 = "Norming"
    return a+b
}
console.log(greet)

if(1==1)
{
    var greet = "Evening"
}
console.log(greet)


//let - global level/block level {}
let greet2 = "Afternoon"
function add(a,b)
{
    let greet2 = "Norming"
    return a+b
}
console.log(greet2)

if(1==1)
{
    let greet2 = "Evening"
}
console.log(greet2)

//const - almost equal to let but cannot be reinitialize
const greet3 = "Afternoon"
function add(a,b)
{
    let greet3 = "Norming"
    return a+b
}
console.log(greet3)

if(1==1)
{
    let greet3 = "Evening"
}
console.log(greet3)