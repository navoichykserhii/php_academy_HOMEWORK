function Animals(weight, height) {
    this.weight = weight;
    this.height = height;
};
Animals.prototype.eat = true;
Animals.prototype.run = true;
Animals.prototype.sleep = true;

var animal = new Animals('','');

function Vegans(name) {
    this.name = name;
};
Vegans.prototype = new Animals();
var vegan = new Vegans("Vegans");
vegan.eat = function (food) {
    var veganFood = ['Grass', 'Vegetables'];
    if(veganFood.indexOf(food) != -1){
        showResult(true, 'Vegans');
    }
    else{
        showResult(false, 'Vegans')
    }
}

function Predators(name) {
    this.name = name;
};
Predators.prototype = new Animals();
var predator = new Predators("Predators");
predator.eat = function (food) {
    if (food instanceof Vegans){
        showResult(true, 'Predators');
    }
    else{
        showResult(false, 'Predators')
    }
};

function Cat() {};
Cat.prototype = new Predators();
function Dog() {};
Dog.prototype = new Predators();
function Cow() {};
Cow.prototype = new Vegans();
function Mouse() {};
Mouse.prototype = new Vegans();

var cat = new Cat();
var dog = new Dog();
var cow = new Cow();
var mouse = new Mouse();


function showResult(result, thisKind) {
    if(result){
        $('textarea').text("That's right: " + thisKind + " eat that");
    }
    else{
        $('textarea').text("Is not true: " + thisKind + " don't eat that");
    }
}

$('button').on('click', function () {
    var thisAnimal = $('#animals').find('option:checked').text();
    var thisFood = $('#food').find('option:checked').text();

    switch (thisFood){
        case 'Cat':
            thisFood = cat;
            break;
        case 'Dog':
            thisFood = dog;
            break;
        case 'Cow':
            thisFood = cow;
            break;
        case 'Mouse':
            thisFood = mouse;
            break;
    };
    switch (thisAnimal){
        case 'Cat':
            predator.eat(thisFood);
            break;
        case 'Dog':
            predator.eat(thisFood);
            break;
        case 'Cow':
            vegan.eat(thisFood);
            break;
        case 'Mouse':
            vegan.eat(thisFood);
            break;

    };
});