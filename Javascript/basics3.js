//declaration of array
var marks = Array(6)
var marks = new Array(20,40,35,12,37,100)

var marks = [20,40,35,12,37,100]

//access to array
console.log(marks[2]) //35
marks[3] = 14
console.log(marks) //[ 20, 40, 35, 14, 37, 100 ]
console.log(marks.length) //6

//add 1 element ad the end of the array
marks.push(65)
console.log(marks) //[ 20, 40, 35, 14, 37, 100, 65 ]
// delete last element
marks.pop() //[ 20, 40, 35, 14, 37, 100 ]
console.log(marks)
// add element at the begigginig
marks.unshift(12)
console.log(marks)


// index of array
console.log(marks.indexOf(100)) // return index of first occurrence of element
marks[3] = 40
console.log(marks)
console.log(marks.indexOf(40))
//search for an elemente in an array and return a boolean true/false
console.log(marks.includes(100))
console.log(marks.includes(120))

//subarray
submarks = marks.slice(2,5)
console.log(submarks) //[ 40, 40, 14 ]

//ciclo for per stampare elementi array
for(let i=0;i<marks.length;i++)
{
    console.log(marks[i])
}

let sum=0
for(let i=0;i<marks.length;i++)
{
    sum=sum+marks[i]
}
console.log(sum)

// reduce filter map (accumulate values of array)
let total = marks.reduce((sum,mark)=>sum+mark,0)
console.log(total)

var scores = [12,13,14,16]
//print even numbers from the array, create new array with even number
let evenScores = []

for(let i=0;i<marks.length;i++)
{
    if(scores[i]%2 == 0)
    {
        evenScores.push(scores[i])
    }
}
console.log(evenScores)


//simple way: filter -> applica condizione su ogni elemento dell'array
let newFilterEvenScores = scores.filter(score=>score%2==0)
console.log(newFilterEvenScores)


//map array function - modifica ogni valore dell'array
// ad es moltiplicare per 3 ogni elemento dell'array
MapEvenScoresMultiplied = newFilterEvenScores.map(score=>score*3)
console.log(MapEvenScoresMultiplied)


// creare array con somma elementi dopo averli moltiplicati per 3
let totalVal = MapEvenScoresMultiplied.reduce((sum,val)=>sum+val,0)
console.log(totalVal)

//chain commands
let scores1 = [12,13,14,16]
let totalVal1 = scores1.filter(score=>score%2==0).map(score=>score*3).reduce((sum,val)=>sum+val,0)
console.log(totalVal1)


//sorting for both number and string
let fruits = ["banana","mango","pomegrante","apple"]
fruits.sort()
console.log(fruits)

var scores = [16,13,14,12]
console.log(scores1.sort())


var scores = [16,13,14,102,12,113]
console.log(scores.sort()) //[ 102, 113, 12, 13, 14, 16 ] -> incorrect

scores.sort(function(a,b){
    return a-b
})

//use syntax for anonymous function (without funcction name) to reduce the text 
console.log(scores.sort((a,b) => a-b)) // bubble sorting

//reverse sort
console.log(fruits.reverse())
console.log(scores.sort((a,b) => b-a))



