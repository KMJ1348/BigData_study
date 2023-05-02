import puppeteer from 'puppeteer-core'
import os from 'os'
import fs from 'fs'
import { addressToCoord } from './parser.js'


const macUrl = 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const winUrl = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"

const currentOs = os.type()
const launchConfig = {
    headless: false,
    defaultViewport: null,
    ignoreDefaultArgs: ['--disable-extensions'],
    args:['--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-notifications',
    '--disable-extensions'],
    executablePath: currentOs == 'Darwin' ? macUrl : winUrl
}

const pagingSelector = 'body > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table:nth-child(5) > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3)'
let browser
let page
let pageNum
let sido
let sigungu
let finalData = []

const launch = async () => {
    browser = await puppeteer.launch(launchConfig)
    const pages = await browser.pages()  //페이지 (탭) 가져오기
    page = pages[0]
}

const goto = async() => {
    await page.goto('https://www.pharm114.or.kr/main.asp')
}
//팝업창 끄기
const checkPopup = async function () {
    const pages = await browser.pages()
    console.log(pages.length,'닫기 전')
    await pages.at(-1).close()
    console.log(pages.length,'닫은 후')
}

const evalCode = async sidoCode => {
    sido = sidoCode
    await page.evaluate((sido) => {
        const selector = `#continents > li.${sido} > a`
        document.querySelector(selector).click()

    }, sido)
}

const evalSigungu = async sigunguCode => {
    sigungu = sigunguCode
    const selector = `#continents > li.${sigungu} > a`
    await page.waitForSelector(selector) // 해당 셀렉터가 생성 될 때 까지 기다린다.

    await page.evaluate((selector) => {
        document.querySelector(selector).click()
    },selector)

}

const closeAlert = async () => {
    await page.on('dialog', async function(dialog){
        await dialog.accept()

    })
}

const getPageLength = async () =>{
    const pagingSelector = 'body > table:nth-child(2) > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table:nth-child(5) > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(3)'

    await page.waitForSelector(pagingSelector) // 해당 셀렉터가 생성될 때 까지 기다린다.

    //페이지의 수
    pageNum = await page.evaluate((pagingSelector) => {
        const pageLength = document.querySelector(pagingSelector).children.length
        return pageLength
    }, pagingSelector)

    console.log('pageNum:', pageNum)
}

const getData = async () => {

    for(let i=0; i<pageNum; i++) {
        await page.waitForSelector(pagingSelector)

        const info = await page.evaluate(() => {
            var trArr = Array.from(document.querySelectorAll('#printZone > table:nth-child(2) > tbody tr'))
         
         var data = trArr.map(el => {
                 return {
                     name : el.querySelectorAll('td')[0]?.innerText,
                     address : el.querySelector('.class_addr')?.innerText?.replaceAll('\t', '')?.replaceAll('\n', ''),
                     tel : el.querySelector('td')[3]?.innerText,
                     hours : el.querySelectorAll('td')[4]?.innerText
                 }
             })
             .filter(val => val.address != undefined)
         
             return data
         })
         
         finalData = finalData.concat(info)

         console.log('finalData.length: ', finalData.length)

         if(pageNum != i) {
            await page.evaluate((pagingSelector, i) => {
                document.querySelector(pagingSelector).children[i].click()
            },pagingSelector, i)

            await page.waitForSelector('#printZone')
         }

    }

    browser.close()

}

const writeFile = async () => {

    //for(let i=0; i<finalData; i++) {
        //좌표 변환 하나당 1초
    //finalData[i] = await addressToCoord(finalData[i])
    //}

    
    try {
        const promiseArr = finalData.map(data => addressToCoord(data))
        finalData = await Promise.all(promiseArr)

        const dirPath = `./json/${sido}`
        const filePath = `${dirPath}/${sigungu}.json`
        const exist = fs.existsSync(`./json/${sido}`)

        if(!exist) {
            fs.mkdir(dirPath, {recursive : true}, err => {
                console.log(err)
            })
        }

        await fs.writeFileSync(filePath, JSON.stringify(finalData))
    
    } catch(e) {

    }
}

export {
    launch,
    goto,
    checkPopup,
    evalCode,
    evalSigungu,
    closeAlert,
    getPageLength,
    getData,
    writeFile,
}