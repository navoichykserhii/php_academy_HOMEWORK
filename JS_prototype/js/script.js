function Animals(weight, height) {
    this.weight = weight;
    this.height = height;
};
var Animal = new Animals('','');

function Vegans(name) {
    this.name = name;
};
Vegans.prototype = Animal;
var Vegan = new Vegans("Vegans");

function Predators(name) {
    this.name = name;
};
Predators.prototype = Animal;
var Predator = new Predators("Predators");

function Cat() {};
Cat.prototype = Predator;
function Dog() {};
Dog.prototype = Predator;
function Cow() {};
Cow.prototype = Vegan;
function Mouse() {};
Mouse.prototype = Vegan;

Animals.prototype.eat = true;
Animals.prototype.run = true;
Animals.prototype.sleep = true;
Vegan.eat = ['Grass', 'Vegetables'];
Predator.eat = ['Vegans'];

var Cat = new Cat();
var Dog = new Dog();
var Cow = new Cow();
var Mouse = new Mouse();
$('button').on('click', function () {
    var thisAnimal = $('#animals').find('option:checked').text();
    var thisFood = $('#food').find('option:checked').text();
    var animalEat,
        thisKind;
    if (thisFood == "Cow" || thisFood == "Mouse"){
        thisFood = "Vegans";
    }
    switch (thisAnimal){
        case 'Cat':
            animalEat = Cat.eat;
            thisKind = Cat.name;
            break;
        case 'Dog':
            animalEat = Dog.eat;
            thisKind = Dog.name;
            break;
        case 'Cow':
            animalEat = Cow.eat;
            thisKind = Cow.name;
            break;
        case 'Mouse':
            animalEat = Mouse.eat;
            thisKind = Mouse.name;
            break;

    };
    for( i = 0; i < animalEat.length; ++i){
        if(animalEat[i] == thisFood){
            $('textarea').text("That's right: " + thisKind + " eat that");
            break;
        }
        else{
            $('textarea').text("Is not true: " + thisKind + " don't eat that");
        }
    }
});