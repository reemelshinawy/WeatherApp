
let cityInput = document.getElementById("cityInput");
let search = document.getElementById("search");


// ---- Card Group  ------//

//--current day --//

let todayName= document.getElementById("todayname");
let todayDate= document.getElementById("todaydate");
let todayMonth= document.getElementById("todayMonth");
let todayCountry = document.getElementById("todaycountry");
let todayForecast = document.getElementById("todayforecast");
let todayImage= document.getElementById("todayimage");
let todayConditionText= document.getElementById("todaycondition");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let winddirection = document.getElementById("winddir");

//-- next day --//

let nextDayName= document.getElementsByClassName("nextday");
let nextDayImage= document.getElementsByClassName("nextdayimage");
let nextMaxTemp= document.getElementsByClassName("nextmaxtemp");
let nextMinTemp= document.getElementsByClassName("nextmintemp");
let dayTwoText= document.getElementsByClassName("daytwotext");



//--- get data ---//

async function getData(cityName){

   let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=60c6c5fc034d487eac7145630241101&q=${cityName}&days=3`)
   let weatherData= await weatherResponse.json();
   return weatherData;
}


function displayTodayData(data){

    let dateToday= new Date();
    todayName.innerHTML= dateToday.toLocaleDateString("en-US", {weekday: "long"});
    todayDate.innerHTML=dateToday.getDate();
    todayMonth.innerHTML= dateToday.toLocaleDateString("en-US",{month:"long"});

    todayCountry.innerHTML=data.location.name;
    todayForecast.innerHTML=data.current.temp_c +"<sup>o</sup> C ";
    todayConditionText.innerHTML=data.current.condition.text;
    todayImage.setAttribute("src", data.current.condition.icon);
    humidity.innerHTML=data.current.humidity + "%";
    wind.innerHTML=data.current.wind_kph +"Km/h";
    winddirection.innerHTML=data.current.wind_dir ;
    
}



 function getNextData(data){

    let forecastData= data.forecast.forecastday;

    for(let i =0 ; i<2 ; i++){

        let nextDate= new Date(forecastData[i+1].date);
        nextDayName[i].innerHTML=nextDate.toLocaleDateString("en-US", {weekday: "long"});

        nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c+"<sup>o</sup> c";
        nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c +"<sup>o</sup> c";
        nextDayImage[i].setAttribute("src", forecastData[i+1].day.condition.icon);
        dayTwoText[i].innerHTML=forecastData[i+1].day.condition.text;

    }
   
    
   
}


cityInput.addEventListener("input", function(){
    startApp(cityInput.value)

})

 async function startApp(city="cairo"){

    let weatherInfo = await getData(city);
    if (!weatherInfo.error){
    displayTodayData(weatherInfo);
    getNextData(weatherInfo);
    }
}

startApp();