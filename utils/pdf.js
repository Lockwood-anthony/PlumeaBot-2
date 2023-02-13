const pdf = require("pdf-parse")

module.exports = {

    async countWords(file){
        let data = await pdf(file.url)
        data = data.text
        data = data.replace(/(^\s*)|(\s*$)/gi,"")
        data = data.replace(/[ ]{2,}/gi," ")
        data = data.replace(/\n /,"\n")
        return data.split(" ").length


    }

}