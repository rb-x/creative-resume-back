const puppeteer = require('puppeteer');
const fs = require('fs-extra')

const generatePDF = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent('<h1>Hello</h1> <p>paragraphe</p>')
        await page.emulateMediaType('screen')
        await page.pdf({
            path :"mypdf.pdf",
            format :'A4',
            printBackground : true
        })
        console.log("done !")
        await browser.close()
        process.exit()
    } catch (error) {
        console.log("our error" , error)
    }
}

generatePDF()
module.exports = generatePDF


// loggg envoie son token + cvcreated : [{id : xxxx , numero de template : },{id : xxxx , numero de template : }]