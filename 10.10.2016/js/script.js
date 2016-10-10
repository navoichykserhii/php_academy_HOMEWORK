var AMOUNT_DISCOUNT = 200;
var discount;
function randomDiscount(min, max) {
    discount = min + Math.random() * (max - min)
    discount = Math.round(discount);
    return discount;
}

var purchaseAmount = +prompt("Введите сумму покупки");
while(!purchaseAmount){
    alert("Вы ввели неверное значение, сумма покупки должна быть числом!");
    purchaseAmount = +prompt("Введите сумму покупки");
}
if(purchaseAmount >= AMOUNT_DISCOUNT){
    randomDiscount(0,15);
    alert("Ваша скидка составляет " +discount+ "%" );
    purchaseAmount -= purchaseAmount * discount/100;
}
if(!confirm("B случае оплаты наличными может быть проверена возможность бесплатной доставки. Желаете оплатить наличными?")){
    console.log("Итоговая сумма к оплате за товар: " + purchaseAmount+ " грн.");
}
else {
    var distance = +prompt("Введите расстояние доставки");
    while (!distance) {
        alert("Вы ввели неверное значение, расстояние должно быть числом!");
        distance = +prompt("Введите расстояние доставки");
    }
    if (distance <= 30) {
        console.log("Итоговая сумма к оплате за товар: " + purchaseAmount + " грн. Ваш товар будет доставлен бесплатно.")
    }
    else{
        var surcharge = (distance - 30) * 5;
        var sumTotal = purchaseAmount + surcharge;
        console.log("Итоговая сумма к оплате за товар: " +sumTotal+ " грн. Доплата за доставку товара составляет: " +surcharge+ " грн.")
    }
}
