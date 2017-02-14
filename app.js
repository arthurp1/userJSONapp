// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

// now, write a function that finds all the indexes of where the value is located and returns them in an array, and if nothing is found, returns -1
// example:


// User Information App - AJAX Server
//

// Hints:
// you cannot send or render a response more than once per request.
// you must find a way to capture whenever the user's input changes in the search bar.
// This will trigger your Ajax request to your server.

// Part 1: Autocomplete Modify your form so that every time the user enters a key, it makes an AJAX call that populates the search results.
// Do this work in a git branch called "autocomplete". Then, merge this branch into master with a pull request.

// Part 2: Bandwidth optimization Modify your form again so that AJAX requests happen at most once every 300 milliseconds.
// Do this work in a git branch called "bandwidth-optimization". Then, merge this branch into master with a pull request.

const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(express.static('public'))


app.get('/', (req, res) => {
	fs.readFile('users.json', 'utf-8', (err, data) => {
		console.log('readFile is called')
		if (err) throw err
		const value = JSON.parse(data)
		//res.render('view',[local variables])
		res.render('index', {users : value})
	})
})

app.get('/search', (req, res) => {
	res.render('search')

})

app.post('/search', urlencodedParser, function(req, res) {
		fs.readFile('users.json', 'utf-8', (err, data) => {

		console.log('readFile is called')
		if (err) throw err
		const userList = JSON.parse(data)
		// request
		const query = req.body.name
		const counter = req.body.name.length
		console.log('you searched for: ' + query)

		// make all lowercase for comparison

		// compare if query is somewhere included in the array
		function findMatch (data) {
			for (var i = 0; i < userList.length; i++) {
				for (key in userList[i]) {
					if (userList[i][key].indexOf(query) > -1 ) {
						// console.log(userList[i][key])
						res.send(userList[i][key])
						return(userList[i][key])
					}
				}
			}
		}
		const matchResults = findMatch(userList)
		console.log('Do you mean: ' + matchResults +'?')

		// send results to user input
		res.send({matchResults})


	})
})

		//execute only once for the firs time

		// start after 3 words

		// multiple suggestions

		// only first and last name

			// userList[i].firstname.indexOf(query)
			// firstNameArray.push((userList[i].firstname).charAt(counter))
			// lastNameArray.push(userList[i].lastname)


		// var index = firstNameArray.indexOf(query)
		// console.log('index: ' + index)
		// if (index > -1) {
		// 	console.log('suggestion: ' + firstNameArray[index] + ' ' + lastNameArray[index])
		// }



		// step 2 compare letter by letter with database first or last name



	// new array item after space



	//step 3 send data back to form
	// res.send({autocomplete: name})


// app.post('/save', function(req, res) {
//   console.log(req.body.objectData);
//   res.contentType('json');
//   res.send({ some: JSON.stringify({response:'json'}) });
// });

// app.post('/search', urlencodedParser, (req, res) => {
// 	console.log('you searched for:' + JSON.stringify(req.body.name))
// 	const inputName = req.body.name
// 	fs.readFile('users.json', 'utf-8', (err, data) => {
// 		if (err) throw err
// 		const users = JSON.parse(data)
// 		for (var i = 0; i < users.length; i++) {
// 			if (inputName === users[i].firstname) {
// 				res.send('yes, we have this user in the database: \n' + users[i].firstname + ' ' + users[i].lastname)
// 			} else if (inputName === users[i].lastname) {
// 				res.send('yes, we have this user in the database: \n' + users[i].firstname + ' ' + users[i].lastname)
// 			}
// 		}
// 		res.send('no user found with the name: ' + inputName )
// 	})
// })

app.get('/signup', (req, res) => {
	res.render('signup')
})

app.post('/success', urlencodedParser, (req, res) => {
	 if (!req.body) return res.sendStatus(400)
	 	// res.send('thanks for signing up, ' + req.body.firstname)
	 	res.render('success', {newuser : req.body})
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
