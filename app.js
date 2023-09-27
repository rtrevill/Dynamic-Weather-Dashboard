

// var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=df3c903c708377f2df8e6006f9343fde';
var weatherByCityName = 'https://api.openweathermap.org/data/2.5/forecast?q=Richmond,au&units=metric&appid=df3c903c708377f2df8e6006f9343fde';
fetch(weatherByCityName)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        return data;
    })

    var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Richmond,au&units=metric&appid=df3c903c708377f2df8e6006f9343fde';
    fetch(currentWeather)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var newImg = document.createElement('img');
        newImg.setAttribute("src", "https://openweathermap.org/img/wn/02d@2x.png");
        var body = document.getElementById('body');
        body.appendChild(newImg);
        var timestamp = data.dt.toString();
        console.log(timestamp);
        var currentTime = dayjs.unix(timestamp);
        console.log(currentTime.format('H mm ss DD MMMM YYYY'));
        return data;
    })

