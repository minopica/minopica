//Object is collection of properties

let person = {
    
    firstName:'Tim',
    lastName:'Joe'

}

//access to property values of an object
console.log(person.lastName)
console.log(person['lastName'])

person.firstName = 'Tim Dane'
console.log(person.firstName)

//add a new property to an object
person.gender = 'male'
console.log(person)

//delete a property
delete person.gender
console.log(person)


