const pdf = require("pdf-parse");
const path = require("path");

module.exports = {

    async countWords(file){

        fetch(file.url)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = file.url + '.pdf'
                a.click()
                URL.revokeObjectURL(url)
            })
        .catch(error => {
            console.error('File download failed:', error)
        })
        console.log(";3")

        let data = await pdf('file.pdf')

        data = data.text
        data = data.replace(/(^\s*)|(\s*$)/gi,"")
        data = data.replace(/[ ]{2,}/gi," ")
        data = data.replace(/\n /,"\n")
        
        l = data.split(" ").length

        unlink(file.url + '.pdf', (err) => {
            if (err) throw err
            console.log(file.url + '.pdf was deleted')
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