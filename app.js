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
	 	let inputUser = JSON.stringify(req.body.firstname)
	 	res.send('thanks for signing up, ' + req.body.firstname)
	 	
})

// app.post('/success', jsonParser, (req, res) => {
// 	fs.readFileSync('users.json', 'utf-8', (err, data) => {
// 		if (err) throw err
// 		console.log('readFileSync is called')
// 		const userList = JSON.parse(data)
// 		userList.push(userInput)
// 		const userJSON = JSON.stringify(userList)
// 		fs.writeFileSync('./users.json', userJSON)
// 		res.render('signup', { firstname: req.body.firstname })
// 	})
// })


// original function
// var fs = require('fs')
// function appendObject(obj){
//   var configFile = fs.readFileSync('./config.json')
//   var config = JSON.parse(configFile)
//   config.push(obj)
//   var configJSON = JSON.stringify(config)
//   fs.writeFileSync('./config.json', configJSON)
// }
// appendObject({OnetimeCode : WEAS_Server_NewOneTimeCode})

// <form enctype='application/json'>
//   <input name='name' value='Bender'>
//   <select name='hind'>
//     <option selected>Bitable</option>
//     <option>Kickable</option>
//   </select>
//   <input type='checkbox' name='shiny' checked>
// </form>

// // produces
// {
//   "name":   "Bender"
// , "hind":   "Bitable"
// , "shiny":  true
// }

app.listen(3000, () => {
	console.log('server started')
})