$(document).ready(function() {

    var citySearch = "Sydney";
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&units=metric&appid=df3c903c708377f2df8e6006f9343fde';


    getCurrentWeather();

// var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=df3c903c708377f2df8e6006f9343fde';
    var weatherByCityName = 'https://api.openweathermap.org/data/2.5/forecast?q=Richmond,au&units=metric&appid=df3c903c708377f2df8e6006f9343fde';
    fetch(weatherByCityName)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            for (let i = 1; i < 6; i++){
            //    $('#forecast-box h4:nth-child([i])').text("Yay!!");
                var cardNum = document.getElementById('card' + [i]);
                var cardy = $('#card' + [i]);
                console.log(cardNum);
                console.log(cardy);
                $(cardy).find('h4').append("Hello");
                // cardNum.append("Hello!!");                
            };
            return data;
        })

    function getCurrentWeather(){
        currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&units=metric&appid=df3c903c708377f2df8e6006f9343fde';
        fetch(currentWeather)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var iconCode = data.weather[0].icon;
            console.log(iconCode);
            var currentIcon = "https://openweathermap.org/img/wn/"+ iconCode +"@2x.png";
            $('#current-conditions img').removeProp('src');
            $('#current-conditions img').prop('src', currentIcon);
            var cityName = data.name;
            var currentTemp = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;
            console.log(currentTemp);
           
            $('#current-conditions h2').text(cityName);
            $('#current-conditions p:first').text("Temp: " + currentTemp);
            $('#current-conditions p:nth-of-type(2)').text("Wind: " + currentWind);
            $('#current-conditions p:nth-of-type(3)').text("Humidity: " + currentHumid);

            var timestamp = data.dt.toString();
            console.log(timestamp);
            var currentTime = dayjs.unix(timestamp);
            console.log(currentTime.format('H mm ss DD MMMM YYYY'));
            return data;
        })
    };


    $('#search-btn').on('click', function(){
        citySearch = $('input').val();

        getCurrentWeather();
        

    });


});