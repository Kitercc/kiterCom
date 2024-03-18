const fs = require("fs")
const filelist = ['types/index.d.ts', 'es/index.js']
const rewrite = file => {
    try {
        const data = fs.readFileSync(file).toString(), dataArray = data.split('\n')
        dataArray.splice(0, 1)
        const newFile = dataArray.join('\n')

        fs.writeFile(file, newFile, err => {
            if (err) throw err;
            console.log('Successfully updated the file!');
        })
    } catch (error) {
        throw error;
    }
}
filelist.forEach(file => void rewrite(file))