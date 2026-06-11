const apiKey = 'e2186c5ae019826c8c3101a511a6d0c5';
const card = document.getElementById('card');
const search = document.getElementById('search');
const button = document.getElementById('button');
const temp = document.getElementById('temp');
const city = document.getElementById('city');
const data = document.querySelector('.data');
const date = document.getElementById('date');
const time = document.getElementById('time');
const tempTime = document.getElementById('tempTime');
const icon = document.querySelector('#icon');

function showData() {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleString('en', { month: 'long' });
    console.log(now)
    date.textContent = `${day} ${monthName}`
}

showData();
getWeather("Minsk");

async function getWeather(cityName) {
    console.log(cityName)

    if (!cityName) return;
    cityName = cityName.trim();

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

        if (!response.ok) throw new Error('City not found');

        let result = await response.json();

        temp.textContent = `${Math.round(result.main.temp)}°C`;
        city.textContent = result.name;

        response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error('City not found');

        result = await response.json();
        data.innerHTML = "";
        result.list.slice(0, 7).forEach(item => {
            data.innerHTML += timeWeather(item);
        });


    } catch (err) {
        alert(err.message);
    }

}


button.addEventListener('click', function () {
    getWeather(search.value);
});


function timeWeather(item) {
    console.log(item);
    const date = new Date(item.dt_txt);

    const time = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const iconCode = item.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    let timeDate = `<div class="bg_data">
                <img id="icon" class="icon" src="${iconUrl}">
                <div class="text_data">
                    <span id="time" class="time">${time}</span>
                    <div id="tempTime" class="weather size">
                        <span><strong>${Math.round(item.main.temp)}</strong></span>
                        <span><strong>.</strong></span>
                        <sapn><strong>C</strong></sapn>
                    </div>
                </div>
            </div>`
    return timeDate;
}