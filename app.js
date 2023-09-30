$(document).ready(function() {

    var citySearch = "Sydney";
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&units=metric&appid=df3c903c708377f2df8e6006f9343fde';
    var weatherByCityName = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&mode=json&appid=df3c903c708377f2df8e6006f9343fde'
    getCurrentWeather();
    getForecast();
    saveAndDisplay();


function getForecast(){ 
    weatherByCityName = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&units=metric&mode=json&appid=df3c903c708377f2df8e6006f9343fde'   
    fetch(weatherByCityName)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var weatherArray = [];
            for (let j = 1; j < data.list.length+1; j++){
                if (j%8===0){
                var readingNumber = data.list[j-1];
                weatherArray.push(readingNumber);
                }
            }

            for (let i = 0; i < weatherArray.length; i++){
                var cardIcon = weatherArray[i].weather[0].icon
                var iconForCard = "https://openweathermap.org/img/wn/"+ cardIcon +"@2x.png";
                var cardTemp = weatherArray[i].main.temp
                var cardWind = weatherArray[i].wind.speed
                var cardHumid = weatherArray[i].main.humidity
                var cardy = $('#card' + [i]);
                $(cardy).find('img').prop('src', iconForCard);
                $(cardy).find('p:first').text('Temp: ' +cardTemp + " C");
                $(cardy).find('p:nth-of-type(2)').text('Wind: ' +cardWind + " km/h");
                $(cardy).find('p:nth-of-type(3)').text('Humidity: ' +cardHumid + " %");
                var timeFuture = convertDate(weatherArray[i]);
                var timeFuture2 = timeFuture.format('DD/MM/YY');
                $(cardy).find('h4').text(timeFuture2);
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
            var iconCode = data.weather[0].icon;
            var currentIcon = "https://openweathermap.org/img/wn/"+ iconCode +"@2x.png";
            $('#icon-now').removeProp('src');
            $('#icon-now').prop('src', currentIcon);
            var cityName = data.name;
            var currentTemp = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;
           
            $('#current-conditions h2').text(cityName + "   ");
            $('#current-conditions p:first').text("Temp: " + currentTemp + " C");
            $('#current-conditions p:nth-of-type(2)').text("Wind: " + currentWind + " km/h");
            $('#current-conditions p:nth-of-type(3)').text("Humidity: " + currentHumid + " %");
            var timeNow = convertDate(data);
            timeNow = timeNow.format('DD/MM/YYYY');
            $('#current-conditions h2').append("(" + timeNow + ")");
            return data;
        })
    };

    function saveAndDisplay(input){
        var searchArray = [];
        var uList = document.getElementById('past-searches');
        $('#past-searches').empty();
        if (typeof input === 'undefined'){
            displayExistSaves();
        }
        else{
            saveNew(input);
        }
    }

    function displayExistSaves(){
        if ((localStorage.getItem('weatherSearches'))===null){
            return;
        }
        else {
            searchArray = JSON.parse(localStorage.getItem('weatherSearches'));
            createList();
    }}


    function createList(){
        for (let j = 0; j < searchArray.length; j++){
            var newLi = document.createElement("li");
            newLi.innerText = searchArray[j];
            var uList = document.getElementById('past-searches');
            uList.appendChild(newLi);

            $('li').on('click', function(event){
                var prevSearch = event.target.innerText;
                citySearch = prevSearch;
                getCurrentWeather();
                getForecast();
            });
    }}

    function saveNew(input){
            if ((localStorage.getItem('weatherSearches'))===null){
                searchArray = [];
                searchArray.push(input);
            }
            else {
                searchArray = JSON.parse(localStorage.getItem('weatherSearches'));
                searchArray.unshift(input);
            }

            createList();
            
            if (searchArray.length > 8){
                searchArray.pop();
            }
            localStorage.setItem('weatherSearches', JSON.stringify(searchArray));
        };


    $('#search-btn').on('click', function(){
        citySearch = $('input').val();
        $('input').val("")
        saveAndDisplay(citySearch);
        getCurrentWeather();
        getForecast();
    });


    $('#clr-btn').on('click', function(){
        if ((localStorage.getItem('weatherSearches'))===null){
            return;
        }
        else {
            $('#past-searches').empty();
            var tempStore = JSON.parse(localStorage.getItem('weatherSearches'));
            tempStore = []
            localStorage.setItem('weatherSearches',JSON.stringify(tempStore));
        }
    });


    function convertDate(data){
        var timestamp = data.dt.toString();
        var currentTime = dayjs.unix(timestamp);
        return currentTime;
    };


});