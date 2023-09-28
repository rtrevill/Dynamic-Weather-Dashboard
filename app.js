$(document).ready(function() {

    var citySearch = "Sydney";
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&units=metric&appid=df3c903c708377f2df8e6006f9343fde';

    
    

// var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=df3c903c708377f2df8e6006f9343fde';
    // var weatherByCityName2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&units=metric&appid=df3c903c708377f2df8e6006f9343fde';
    var weatherByCityName = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&mode=json&appid=df3c903c708377f2df8e6006f9343fde'
    // var newWeatherdemo = ''
    getCurrentWeather();
    getForecast();


function getForecast(){ 
    weatherByCityName = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&mode=json&appid=df3c903c708377f2df8e6006f9343fde'   
    fetch(weatherByCityName)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var weatherArray = [];
            for (let j = 1; j < data.list.length+1; j++){
                if (j%8===0){
                var readingNumber = data.list[j-1];
                console.log(readingNumber);
                weatherArray.push(readingNumber);
                }
            }

            for (let i = 0; i < weatherArray.length; i++){
            //    $('#forecast-box h4:nth-child([i])').text("Yay!!");
                // var cardNum = document.getElementById('card' + [i]);
                var cardIcon = weatherArray[i].weather[0].icon
                var iconForCard = "https://openweathermap.org/img/wn/"+ cardIcon +"@2x.png";
                var cardTemp = weatherArray[i].main.temp
                var cardWind = weatherArray[i].wind.speed
                var cardHumid = weatherArray[i].main.humidity
                console.log(cardTemp);
                var cardy = $('#card' + [i]);
                // console.log(cardNum);
                console.log(cardy);
                $(cardy).find('img').prop('src', iconForCard)
                $(cardy).find('h4').text("Hello" + [i]);
                $(cardy).find('p:first').text('Temp: ' +cardTemp);
                $(cardy).find('p:nth-of-type(2)').text('Wind: ' +cardWind);
                $(cardy).find('p:nth-of-type(3)').text('Humidity: ' +cardHumid);
                // cardNum.append("Hello!!");                
            };
            return data;
        })
    }

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
        getForecast();
        

    });


});