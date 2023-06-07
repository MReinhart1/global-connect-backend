const csv = require('csvtojson')


async function createJSON(filepath){
    let results = await csv().fromFile(filepath)
    let contents = await JSON.stringify(results)
    await fs.writeFileSync(`${filepath}.json`, contents)
    return
}
