//Object is collection of properties

let person = {
    
    firstName:'Tim',
    lastName:'Joe',
    age: 24,
    fullName: function()
    {
        return this.firstName + this.lastName
    } 

}

//access to property values of an object
console.log(person.lastName)
console.log(person['lastName'])

//access to a function inside object:
console.log("stampa fullName: ")
console.log(person.fullName())

person.firstName = 'Tim Dane'
console.log(person.firstName)




//add a new property to an object
person.gender = 'male'
console.log(person)

//delete a property
delete person.gender
console.log(person)

//iterate attibutes of object
for(let key in person)
{
    console.log(key)
    console.log(person[key])
}

// Classes was introduced starting from ES6 engine

