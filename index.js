const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs'); // Require the File System module


/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  // Read the user data from user.json file
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Parse the JSON data and send it as a response
    const userData = JSON.parse(data);
    res.json(userData);
  });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  if (username === 'validUser' && password === 'validPassword') {
    res.json({
      status: true,
      message: "User Is valid"
    });
  } else if (username !== 'validUser') {
    res.json({
      status: false,
      message: "User Name is invalid"
    });
  } else {
    res.json({
      status: false,
      message: "Password is invalid"
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;

  res.send(`<b>${username} successfully logout.</b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));