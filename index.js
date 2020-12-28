const fs = require('fs')
const { stdin, stdout } = require('process')

// const dirList = fs.readdirSync(__dirname)
// console.log(dirList)
let stats = []

fs.readdir(process.cwd(), (err, files) => {
  if (!files.length) {
    //
  }
  console.log('select which file')

  function file (i) {
    const fileName = files[i]

    fs.stat(__dirname + '/' + fileName, (err, stat) => {
      stats[i] = stat
      
      if (stat.isDirectory()) {
        console.log('       ' + i + '   \033[36m' + fileName + '\033[39m')
      } else {
        console.log('       ' + i + '   \033[34m' + fileName + '\033[39m')
      }

      i++
      if (i === files.length) {
        read()
      } else {
        file(i)
      }
    })
    function read () {
      process.stdout.write('   \033[33mEnter your choice: \033[39m')
      process.stdin.resume();
      process.stdin.setEncoding('utf8')
      stdin.on('data', option)
    }
    
    function option (data) {
      if (!files[Number(data)]) {
        stdout.write('   \033[33mEnter your choice: \033[39m')
      } else {
        stdin.pause()
        if (stats[Number(data)].isDirectory()) {
          fs.readdir(__dirname + '/' + fileName, (err, files) => {
            console.log(files)
            console.log('    (' + files.length + ' files)')
            files.forEach((file) => {
              console.log('      -  ' + file)
            })
          })
        } else {
          fs.readFile(__dirname + '/' + fileName, 'utf8', (err, data) => {
            console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m')
          })
        }
      }
    }
  }

  file(0)
})