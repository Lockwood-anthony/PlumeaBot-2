const path = require("path")
let request = require(`request`)
let fs = require(`fs`)

module.exports = {

    async countWords(file){

        let count = 0
        test = ""
        let p = await import("pdfreader")
        request({url:file.url}, pdfBuffer => {

            let reader = new p.PdfReader({ debug: true })

            reader.parseBuffer(pdfBuffer, async (err, item) => {
                if (err) console.error("error:", err)
                else if(! item) return
                else if (item.text){
                    text = item.text
                    text = text.replace(/\s/g, "")
                    count += text.length
                    test += text
                }
            })

        })

        await new Promise(r => setTimeout(r, 2000))
        console.log(test)
        console.log(Math.round(count/4.8))
        return Math.round(count/4.8)

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