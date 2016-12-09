$(document).ready(function () {
    $('#set-ip-form').submit(function (e) {
        e.preventDefault();
        $('.information').find('tr').remove();
        getIpData();
    });

});
function getIpData() {
    var ipAddress = $('#ip-address').val();
    $.ajax({
        url: "http://ip-api.com/json/" + ipAddress,
        success:function(data){
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
        }

    });
}