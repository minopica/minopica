//inheritance is the main pillar in Object Oriented programming
//once class can inherit/acquire all the properties/methods of another class
//the class which inherits the properties of other is known as subclass (derived class, child class)
//the class whose properties are inherited is known as superclass (or parent class)
import Person from "./basics7.js"

export default class Pet extends Person
{
    //same constructor of superclass -> call parent class constructor
    constructor(firstName,lastName)
    {
        super(firstName,lastName)
    }

    get location()
    {
        return "BlueCross"
    }
}

// let pet = new Pet("Sam","Sam")
// pet.fullName()
// console.log(pet.location)