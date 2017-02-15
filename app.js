// User Information App - AJAX Server

// Part 1: Autocomplete Modify your form so that every time the user enters a key, it makes an AJAX call that populates the search results.
// Do this work in a git branch called "autocomplete". Then, merge this branch into master with a pull request.

// Part 2: Bandwidth optimization Modify your form again so that AJAX requests happen at most once every 300 milliseconds.
// Do this work in a git branch called "bandwidth-optimization". Then, merge this branch into master with a pull request.

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

app.post('/search', urlencodedParser, function(req, res) {
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) throw err
        const userData = JSON.parse(data)

        // request handling
        const searchQuery = req.body.name.toLowerCase()
        console.log('You searched for: ' + searchQuery)

        // compare if searchQuery is somewhere included in the array
        function findMatch(data) {
            const matches = []
            for (var i = 0; i < userData.length; i++) {
                for (key in userData[i]) {
                    if (userData[i][key].toLowerCase().startsWith(searchQuery)) {
                        matches.push(userData[i][key])
                    }
                }
            }
            return matches.slice(0, 5) //return first 5 suggestions
        }
        const matchResults = findMatch(userData)

        // send results to user input
        res.send(matchResults)
    })
})

app.post('/searchresult', urlencodedParser, function(req, res) {
    console.log('search result is called')
    fs.readFile('users.json', 'utf-8', (err, data) => {
        if (err) throw err
        const userData = JSON.parse(data)
        const searchQuery = req.body.name.toLowerCase()
        console.log('submit: ' + searchQuery)
        for (var i = 0; i < userData.length; i++) {
            for (key in userData[i]) {
                if (userData[i][key].toLowerCase() === searchQuery) {
                    console.log('match found')
                    res.send('user found: ' + userData[i].firstname + ' ' + userData[i].lastname)
                    return
                }
            }
        }
    })
})


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

app.listen(3000, () => {
    console.log('server started')
})