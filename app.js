$(document).ready(function() {

    var citySearch = "Sydney";
    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&units=metric&appid=df3c903c708377f2df8e6006f9343fde';

    
    

// var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=df3c903c708377f2df8e6006f9343fde';
    // var weatherByCityName2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&units=metric&appid=df3c903c708377f2df8e6006f9343fde';
    var weatherByCityName = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&mode=json&appid=df3c903c708377f2df8e6006f9343fde'
    // var newWeatherdemo = ''
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
                ;
                $(cardy).find('p:first').text('Temp: ' +cardTemp + " C");
                $(cardy).find('p:nth-of-type(2)').text('Wind: ' +cardWind + " km/h");
                $(cardy).find('p:nth-of-type(3)').text('Humidity: ' +cardHumid + " %");

                var timeFuture = convertDate(weatherArray[i]);
                var timeFuture2 = timeFuture.format('DD/MM/YY');
                console.log(timeFuture2);
                $(cardy).find('h4').text(timeFuture2);
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
            $('#icon-now').removeProp('src');
            $('#icon-now').prop('src', currentIcon);
            var cityName = data.name;
            var currentTemp = data.main.temp;
            var currentWind = data.wind.speed;
            var currentHumid = data.main.humidity;
            console.log(currentTemp);
           
            $('#current-conditions h2').text(cityName + "   ");
            $('#current-conditions p:first').text("Temp: " + currentTemp + " C");
            $('#current-conditions p:nth-of-type(2)').text("Wind: " + currentWind + " km/h");
            $('#current-conditions p:nth-of-type(3)').text("Humidity: " + currentHumid + " %");

            // var timestamp = data.dt.toString();
            // console.log(timestamp);
            // var currentTime = dayjs.unix(timestamp);
            var timeNow = convertDate(data);
            timeNow = timeNow.format('DD/MM/YYYY');
            $('#current-conditions h2').append("(" + timeNow + ")");
            return data;
        })
    };

    function saveAndDisplay(input){
        var searchArray = [];
        var uList = document.getElementById('past-searches');
        console.log(input);
        $('#past-searches').empty();
        if (typeof input === 'undefined'){
            console.log('NULLL')
            displayExistSaves();
        }
        else{
            console.log('Not --- NULLL')
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
        // searchArray.unshift(input);
}}


function createList(){
    for (let j = 0; j < searchArray.length; j++){
        console.log(searchArray[j]);
        var newLi = document.createElement("li");
        newLi.innerText = searchArray[j];
        // $(newLi).addClass('list-group-item list-group-item-success my-2');
        var uList = document.getElementById('past-searches');

        uList.appendChild(newLi);

        $('li').on('click', function(event){
            var prevSearch = event.target.innerText;
            console.log(prevSearch);
            citySearch = prevSearch;
            getCurrentWeather();
            getForecast();
    
        })
    


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
        console.log(searchArray);

        // for (let j = 0; j < searchArray.length; j++){
        //     console.log(searchArray[j]);
        //     var newLi = document.createElement("li");
        //     newLi.innerText = searchArray[j];
            
        //     uList.appendChild(newLi);
        createList();

        
        if (searchArray.length > 8){
            searchArray.pop();
        }

        localStorage.setItem('weatherSearches', JSON.stringify(searchArray));
    }


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
    })

    // $('#past-searches li').on('click', function(event){
    // $('li').on('click', function(event){
    //     var prevSearch = event.target.innerText;
    //     console.log(prevSearch);
    //     citySearch = prevSearch;
    //     getCurrentWeather();
    //     getForecast();

    // })


function convertDate(data){
    var timestamp = data.dt.toString();
    console.log(timestamp);
    var currentTime = dayjs.unix(timestamp);
    return currentTime;
}


});