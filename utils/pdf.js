const pdf = require("pdf-parse");
const path = require("path");

module.exports = {

    async countWords(file){
        file_path = file.url + '.pdf'

        fetch(file.url)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = file_path
                a.click()
                URL.revokeObjectURL(url)
            })
        .catch(error => {
            console.error('File download failed:', error)
        })
        console.log(";3")

        let data = await pdf(file_path)

        data = data.text
        data = data.replace(/(^\s*)|(\s*$)/gi,"")
        data = data.replace(/[ ]{2,}/gi," ")
        data = data.replace(/\n /,"\n")
        
        l = data.split(" ").length

        unlink(file_path, (err) => {
            if (err) throw err
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