const express = require('express')
const app = express()
const port = 8081
var childProcess = require('child_process');

const githubUsername = 'ThomasAndrewMacLean';


app.get('/thomas', (req, res) => res.send('Hello world! ' + githubUsername))
app.post('/thomas', (req,res)=> {

deploy(res)

//      var sender = req.body.sender;
//      var branch = req.body.ref;

//      if(branch.indexOf('master') > -1 && sender.login === githubUsername){
//              deploy(res)
//      }
})

function deploy(res){
    childProcess.exec('cd /var/www/ && ./deploy.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        res.send(200);
      });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


