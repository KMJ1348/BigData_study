import {
    launch,
    goto,
    checkPopup,
    evalCode,
    evalSigungu,
    closeAlert,
    getPageLength,
    getData,
    writeFile

} from './module/crawler.js'

async function main() {
    console.log('start')
    await launch()

    await goto()

    await checkPopup()

    await evalCode('Seoul')

    await evalSigungu('songpa_gu')

    await closeAlert()

    await getPageLength()

    await getData()

    await writeFile()

    console.log('end')

}

main()