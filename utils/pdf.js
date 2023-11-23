const pdf = require("pdf-parse");
const path = require("path");

module.exports = {

    async countWords(file){
        console.log("file.url")
        let data = await pdf(file.url)
        console.log(";3")
        data = data.text
        console.log(";3")
        data = data.replace(/(^\s*)|(\s*$)/gi,"")
        data = data.replace(/[ ]{2,}/gi," ")
        data = data.replace(/\n /,"\n")
        console.log(";3")
        return data.split(" ").length

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