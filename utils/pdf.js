const pdf = require("pdf-parse");
const path = require("path");
let request = require(`request`);
let fs = require(`fs`);

module.exports = {

    async countWords(file){
        file_path = "~/" + file.url + '.pdf'

        fs.appendFile(file_path)
        request.get(file.url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(file_path))

        console.log(";3")

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        await sleep(10000)
        console.log(";3")

        let data = await pdf(file_path)
        console.log(";3")

        data = data.text
        data = data.replace(/(^\s*)|(\s*$)/gi,"")
        data = data.replace(/[ ]{2,}/gi," ")
        data = data.replace(/\n /,"\n")
        console.log(";3")

        l = data.split(" ").length
        console.log(";3")

        unlink(file_path, (err) => {
            if (err){
                throw err
            }
            console.log(file_path + ' was deleted')
        })

        return l

    },

    rename(file, name){
        Object.defineProperty(file, 'name', {
            writable: true,
            value: name + this.getExtension(file)
        })
    },

    checkExtension(file, extensionDesired){
        const extension = this.getExtension(file)
        return extension === '.' + extensionDesired
    },

    getExtension(file){
        return path.extname(file.name)
    }

}