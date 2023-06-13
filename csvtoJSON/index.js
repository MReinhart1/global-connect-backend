const csv = require('csvtojson')


async function createJSONFromFile(filepath){
    let results = await csv().fromFile(filepath)
    let contents = await JSON.stringify(results)
    await fs.writeFileSync(`${filepath}.json`, contents)
    return
}


async function createJSONFromString(data){
    let results = await csv().fromString(data)
    let contents = await JSON.stringify(results)
    return contents
}


module.exports = {createJSONFromFile, createJSONFromString}