const express = require('express')
const fs = require('fs')
const app = express()

// serve static assets and set root directory of assets to public
app.use(express.static('public'))

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')


app.get('/', (req, res) => {
	console.log('About to render a pug page')
	fs.readFile('users.json', 'utf-8', (err, data) => {
		console.log('readFile is called')
		if (err) throw err
		const users = JSON.parse(data) 
		res.render('index', {users : users})
	})
})



// app.get('/input', (req, res) => {
// 	fs.readFileSync('user.json', 'utf-8', (err, data => {
// 		if (err) throw err
// 		console.log('sync is called')
// 		const userFile = fs.readFileSync('./user.json')
// 		const userList = JSON.parse(userFile)
// 	})) 
 
//   config.push(obj)
//   var configJSON = JSON.stringify(config)
//   fs.writeFileSync('./config.json', configJSON)
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