function changeInfo(event) {
    event.preventDefault();

    let getHead = document.querySelector(".heading");
    let getPara = document.querySelector(".text");
    let getBtn = document.querySelector(".btn");

    getHead.innerHTML = "Lord Savi";
    getPara.innerHTML = "Lord is a english word";
    getBtn.innerHTML = "Learn more about English words"
}

function changeImg(event) {
    event.preventDefault();

    let img3 = document.querySelector(".img2");
    let img4 = document.querySelector(".mkv");

    img3.src = "./OIP (2).jpg"
    img4.src = "./download.jpg"  
}

// const obj = { 
//     property1: "jake",
//     identifier2: 22,
//   "property n": "vans", 
// }; console.log(obj)

// let x; 
// if (cond)  { 
//    x = { greeting: "hi there" }; 
// } console.log(cond)

const myHonda = { 
    color: "red", 
    wheels: 4, 
    engine: { 
             cylinders: 4, 
             size: 2.2 
       }, 
}; 
console.log(myHonda)
console.log(myHonda.engine)



const newData = [ 
    {
        'task1': 'exercise'
   }, 
   [1, 2 ,3], 
   function hello() {
      console.log('hello')
   } 
 ]; console.log(newData)

 const myArray =['h','e','l','l','o'];
 console.log(myArray[0]);
 console.log(myArray[1]);
 console.log(myArray[2]);
 console.log(myArray[3]);
 console.log(myArray[4]);




 const myCar = { 
    make: "Ford", 
    model: "Mustang", 
    year: 1969, 
};

console.log(myCar["make"])


const myObj = {};
const str = "myString";
const rand = Math.random();
const anotherObj ={};

myObj.type = "Dot syntax for a key named type"; 
myObj["date created"] = "This key has a space"; 
myObj[str] = "This key is in variable str"; 
myObj[rand] = "A random number is the key here";
myObj[anotherObj] = "This key is object anotherObj"; 
myObj[""] = "This key is an empty string";

console.log(myObj);
console.log(myObj.myString);
console.log(rand);

function Person(firstName, lastName) { 
    this.FirstName = firstName; 
    this.LastName = lastName; 
}; 
Person.prototype.getFullName = function () { 
    return this.FirstName + " " + this.LastName; 
}

let dailyActivities = ['eat']; 
dailyActivities.push('exercise','teach'); 
dailyActivities.push('work','sleep');
dailyActivities.unshift('wake','jogging');
dailyActivities[8] = 'Run';
console.log(dailyActivities)


// function Animal(legs) {
//     this.legs = legs; 
//  } 
//  Animal.prototype.walk = function() {
//     console.log('walking on ' + this.legs + ' legs'); }
//  function Bird(legs) { 
//     Animal.call(this, legs);
//  } console.log(Animal.call)

//  Bird.prototype = Object.create(Animal.prototype); Bird.prototype.constructor = Animal;

// Bird.prototype.fly = function() {
//   console.log('flying');
// } 
// var pigeon = new Bird(2); 
// pigeon.walk();
// pigeon.fly(); 

// console.log(pigeon.walk)

let studentsData = [
    ['Jack', 24], 
    ['Sara', 23],
 ];
 studentsData.forEach((still) => {
    still.forEach((data) => {
        console.log(data);
    });
}); 