const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({
    extended: true
})

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(express.static('public'))


app.get('/', (req, res) => {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        console.log('readFile is called')
        if (err) throw err
        const value = JSON.parse(data)
        //res.render('view',[local variables])
        res.render('index', {
            users: value
        })
    })
})

app.get('/search', (req, res) => {
    res.render('search')
})

app.post('/search', urlencodedParser, (req, res) => {
    console.log('you searched for:' + JSON.stringify(req.body.name))
    const inputName = req.body.name
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) throw err
        const users = JSON.parse(data)
        for (var i = 0; i < users.length; i++) {
            if (inputName === users[i].firstname) {
                res.send('yes, we have this user in the database: \n' + users[i].firstname + ' ' + users[i].lastname)
            } else if (inputName === users[i].lastname) {
                res.send('yes, we have this user in the database: \n' + users[i].firstname + ' ' + users[i].lastname)
            }
        }
        res.send('no user found with the name: ' + inputName)
    })
})

console.log('som')
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/success', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400)
    // res.send('thanks for signing up, ' + req.body.firstname)
    res.render('success', {
        newuser: req.body
    })
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) throw err
        const userList = JSON.parse(data)
        const userInput = (req.body)
        userList.push(userInput)
        const userListUpdated = JSON.stringify(userList)
        console.log(userListUpdated)
        fs.writeFileSync('users.json', userListUpdated)
    })

})

// load method loads data from a server and returns it
// $(selector).load(URL,data,callback);



app.listen(3000, () => {
    console.log('server started')
})