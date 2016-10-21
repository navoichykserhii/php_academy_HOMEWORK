var contactList = {
		Vasya: {
			name: 'Vasiliy',
			surname: 'Petrov',
			number: '0669852364',
			city: 'Kiyv',
			birthday: '23.10.1995'
		},
		Petya: {
			name: 'Petr',
			surname: 'Ivanov',
			number: '0958963214',
			city: 'Odessa',
			birthday: '11.09.1990'
		},
		Dima: {
			name: 'Dmitriy',
			surname: 'Sidorov',
			number: '0978596325',
			city: 'Zhytomir',
			birthday: '05.08.1988'
		},
		showContact: function(name){
	    	if(!this[name]){	
	    		console.log("Такого контакта нет");
	    	}
	    	else{
        	console.log("Контакт: " + name);
				for(key in this[name]){
					console.log(key + ': ' + this[name][key]);
				}
			}
    	},
  		countContacts: function(){
  			var count = 0;
  			for(key in this){
  				if(typeof(this[key]) != 'function'){
  					++count;	
  				}
  			}
  			console.log("Количество контактов: " + count);
  		},
  		searchContact: function(){
  			var searchParam = prompt("Введите параметр поиска(имя, фамилия, номер телефона и т.д.)");
  			var isContact = false;
  			for(keySearch in this){
  				for( param in this[keySearch]){
  					if(this[keySearch][param] == searchParam){
  						this.showContact(keySearch);
  						isContact = true;
  						break;
  					}	
  				}
  			}
  			if(!isContact){
  				console.log("Контакта с заданными параметрами нет в вашем списке!")
  			}
  		}
	}
contactList.searchContact();