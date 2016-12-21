$(document).ready(function () {
    $('#set-ip-form').submit(function (e) {
        var ipAddress = $('#ip-address').val();
        e.preventDefault();
        $('.information').find('tr').remove();
        getIpData("http://ip-api.com/json/" + ipAddress)
            .then(function (result) {
                var coordinates = {lat: result.lat, lng: result.lon};
                paintTable(result);
                return coordinates;
            })
            .then(function (result) {
                return initMap(result);
            })
            .catch (function (error) {
                console.log(error)
            })
    });

});
getIpData = function (url) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url,true);
        xhr.onload = function() {
            if(this.status == 200){
                var res = JSON.parse(xhr.responseText);
                resolve(res);
            }
            else {
                var error = new Error(this.statusText);
                reject(error);
            }
        };
        xhr.onerror = function() {
            reject(new Error("Error!!!"))
        };
        xhr.send();
    });
};
function initMap(coordinates) {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        scrollwheel: false,
        zoom: 8
    });
    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: 'Your IP adress here!'
    });
};

function paintTable(data) {
    $('.information').append('<tr>' +
        '<th> Country </th>' +
        '<th> City </th>' +
        '<th> Region name </th>' +
        '<th> Timezone </th>' +
        '</tr>');
    $('.information').append('<tr>' +
        '<td>' + data.country + '</td>' +
        '<td>' + data.city + '</td>' +
        '<td>' + data.regionName + '</td>' +
        '<td>' + data.timezone + '</td>' +
        '</tr>');
};





