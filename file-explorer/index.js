const fs = require('fs');
const colors = require('colors');
let stdin = process.stdin;
let stdout = process.stdout;



fs.readdir(process.cwd(), (err, files) => {
    console.log('');
    if (err) {
        console.log(err);
    } else if (!files.length) {
        console.log('There is no files to show in this directory'.red);
    } else {
        console.log('  Select which file or directory you want to see'.yellow);
    }
    let statsArr = [];

    function file(i) {
        let fileName = files[i];

        fs.stat(__dirname + '/' + fileName, (err, stats) => {
            statsArr[i] = stats;
            if (stats.isDirectory()) {
                console.log(`     ${i}  : + ${fileName}`);
            } else {
                console.log(`     ${i}  : + ${fileName}`);
            }

            i++;
            if (i === files.length) {
                read();
            } else {
                file(i)
            }
        });
    }

    function read() {
        console.log('');
        stdout.write('      Enter your choice:'.green);
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data', option);
    }

    function option(data) {
        let fileName = files[Number(data)];
        if (!fileName) {
            stdout.write('      Enter your choice: '.red);
        } else if (statsArr[Number(data)].isDirectory()) {
            fs.readdir(__dirname + '/' + fileName, (err, files) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('');
                    console.log()
                    console.log(`       There is(are) ${files.length} file(s) in this directory`);
                    files.forEach((file) => {
                        console.log(`       -   ${file}`);
                    });
                    stdin.pause();
                }

            });
        } else {
            stdin.pause();
            fs.readFile(__dirname + '/' + fileName, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('');
                    console.log(data);
                }
            });
        }
    }
    file(0);
});