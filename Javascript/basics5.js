// Strings
let day = 'tuesday '
console.log(day.length) //8

// substring
subday=day.slice(0,4) //first 4 chars
console.log(subday)
console.log(day[1]) //extract single char

//split
let splitDay = day.split("s") //return array
console.log(splitDay[0])
console.log(splitDay[0])
console.log(splitDay[1].length)
console.log(splitDay[1].trim().length)

//operators on string
let date = '23'
let nextDate = '27'
let diff = nextDate - date
console.log(diff)
let diff2 = parseInt(nextDate)-parseInt(date)
console.log(diff2)

//convert to string
diff.toString()
console.log(diff)

//concatenate 2 strings
let newQuote = day+"is Funday day"
console.log(newQuote)

//index Of chars
let val = newQuote.indexOf("day")
console.log(val)

let val2 = newQuote.indexOf("day",5)
console.log(val2)


let count = 0
let val3 = newQuote.indexOf("day")
while(val3!==-1)
{
    count++
    val3 = newQuote.indexOf("day",val3+1)
}
console.log(count)



