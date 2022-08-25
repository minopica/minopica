// Classes was introduced starting from ES6 engine
export default class Person
{

    age = 25

    //location = "canada"
    get location()
    {
        return "canada"
    }

    //constructor is method which is executed by default when the object of the class is created
    constructor(firstName,lastName)
    {
        this.firstName = firstName
        this.lastName = lastName

    }

    fullName()
    {
        console.log(this.firstName+this.lastName)
    }

}

// let person = new Person("Tim","Joseph")
// let person1 = new Person("Chris","Jones")
// console.log(person.age)
// console.log(person.location)
// console.log(person.fullName())
// console.log(person1.fullName())
