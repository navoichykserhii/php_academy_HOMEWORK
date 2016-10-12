var isSunk = false,
    countAttempt = 0,
    countHits = 0,
    shot,
    madeShots = new Array(),   /* позиции по которым уже стреляли */
    tempNumbPosition= new Array(),  /* номера позиций на которых уже есть корабли */
    shipPosition = new Array(7);    /* если shipPosition[i] = 1, то корабль на этой позиции */

function setPosition(){                                         /* расставляем корабли */
    for (var i = 0; i < 3; i++) {
        var position =  Math.floor(Math.random()*7)
        for (var j = 0; j < tempNumbPosition.length; j++) {
            if (tempNumbPosition[j] == position){               /* проверяем нет ли на этой позиции корабля */
                position =  Math.floor(Math.random()*7)
                j = -1;
            }       
        }
       tempNumbPosition[i] = position;
       shipPosition[position] = 1; 
    }
    for (var i = 0; i < shipPosition.length; i++) {
        console.log(shipPosition[i]);
    }
    return shipPosition;
}  

function getShotPosition(){                                         
    var shot = prompt("Укажите позицию выстрела от 0 до 6");
    while(!shot || shot > 6 || shot < 0 || shot != +shot){
        alert("Вы ввели неверную позицию, позици должна быть от 0 до 6!");
        shot = prompt("Укажите позицию выстрела от 0 до 6");
    }
    return shot;
}
    setPosition();
    while(!isSunk){
        shot = getShotPosition();
        for (var i = 0; i < madeShots.length; i++) {
            if (madeShots[i] == shot){
                alert("Вы уже стреляли в эту позицию");
                shot = getShotPosition();
                i = -1;
            }
        }
        madeShots[countAttempt] = shot;
        ++countAttempt;
        if(shipPosition[shot] == 1){
            alert("Вы попали в корабль");
            ++countHits;
            if(countHits == 3){
                isSunk = true;
                alert("Вы потопили корабль!");
            }
        }
        else{
            alert("Промах, стреляйте еще");
        }
    }
    alert("Количество попыток: " + countAttempt);
    alert("Процент попаданий: " + (countHits/countAttempt) * 100 + "%");