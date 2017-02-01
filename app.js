const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
// serve static assets and set root directory of assets to public


app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(express.static('public'))


var urlencodedParser = bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json()
 

app.get('/', (req, res) => {
	fs.readFile('users.json', 'utf-8', (err, data) => {
		console.log('readFile is called')
		if (err) throw err
		const users = JSON.parse(data)
		//res.render('view',[local variables])
		res.render('index', {users : users})
	})
})

app.get('/search', (req, res) => {
	res.render('search')
})

app.post('/search', urlencodedParser, (req, res) => {
	console.log('you searched for:' + JSON.stringify(req.body.name))
	let inputName = req.body.name
	fs.readFile('users.json', 'utf-8', (err, data) => {
		if (err) throw err
		const users = JSON.parse(data)
		for (var i = 0; i < users.length; i++) {
			if (inputName === users[i].firstname) {
				res.send('yes, we have this user in the database: \n' + users[i].firstname + ' ' + users[i].lastname)
			}
		}
		res.send('no user found with the name: ' + inputName )
	})
})


app.get('/signup', (req, res) => {
	res.render('signup')
})

app.post('/signup', urlencodedParser, (req, res) => {
	 if (!req.body) return res.sendStatus(400)
	 	res.send('thanks for signing up, ' + req.body.firstname)
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