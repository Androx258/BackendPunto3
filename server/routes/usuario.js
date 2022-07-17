const express = require('express');
const app = express();
const puppeteer = require('puppeteer')
//Confirmar usuario

app.get('/user', async (req, res) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://careers.arrivia.com/travel-job-listings/");
    await page.screenshot({ path: "prueba2.png" });
    const jobsx = await page.evaluate(() => {
        let jobsArray = [];
        let jobs = document.querySelectorAll('.job-wrap'); 
        for (let i = 0; i < jobs.length; i++) {
            let obj = {}
            let elem = jobs[i]; 

            obj.title = elem.querySelector('.job-title').textContent;
            obj.locacion = elem.querySelector('.job-location').textContent;
            obj.url = elem.querySelector('.job-element').getAttribute('onclick').split("('")[1].split("',")[0];
            jobsArray.push(obj);
        }
        return jobsArray
    });
    await browser.close();
    return res.json({ jobsx });
});


module.exports = app;