**rtrevill Dynamic-Weather-Dashboard**

The URL of the functional, deployed application: https://rtrevill.github.io/Dynamic-Weather-Dashboard/

The URL of the GitHub repository: https://github.com/rtrevill/Dynamic-Weather-Dashboard

Screenshots of deployed application:

1. On Desktop
![Alt text](<assets/Pictures/Screenshot DWD - Desktop.png>)


2. On Phone size screen

![Alt text](<assets/Pictures/Screenshot DWD - Mobile.png>)


**Server-Side APIs Challenge: Weather Dashboard**

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the 5 Day Weather ForecastLinks to an external site. to retrieve weather data for cities. The base URL should look like the following: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

HINT
You will use localStorage to store any persistent data. For more information on how to work with the OpenWeather API, refer to the Full-Stack Blog on how to use API keysLinks to an external site..

User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
Mock-Up
The following image shows the web application's appearance and functionality:

A screenshot displays a weather dashboard that includes a search function and a five-day forecast.