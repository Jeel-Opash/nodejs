import readline from 'readline/promises';

const API_KEY = '27cfc8d0c4b8df5f08069ec450b5cff7'; // keep your key private
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWeather = async (city) => {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('City not found');
        }

        const weatherData = await res.json();

        console.log('\nWeather Information:');
        console.log(`City: ${weatherData.name}`);
        console.log(`Temperature: ${weatherData.main.temp}°C`);
        console.log(`Description: ${weatherData.weather[0].description}`);
        console.log(`Humidity: ${weatherData.main.humidity}%`);
        console.log(`Wind Speed: ${weatherData.wind.speed} m/s\n`);

    } catch (error) {
        console.log('Error:', error.message);
    }
};

const city = await rl.question('Enter a city name to get its weather: ');
await getWeather(city);
rl.close();
