import https from 'https';
import chalk from 'chalk';

const getJoke = () => {
    const url = 'https://official-joke-api.appspot.com/random_joke';

    https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const joke = JSON.parse(data);
                console.log("\n Random Joke:\n");
                console.log(chalk.red(joke.setup));
                console.log(chalk.blue.bgRed.bold(joke.punchline));
            } catch (err) {
                console.log("JSON Parse Error:", err.message);
            }
        });

    }).on('error', (err) => {
        console.log("Request Error:", err.message);
    });
};

getJoke();
