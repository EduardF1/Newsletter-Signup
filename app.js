// Setup Node and Express
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
// Needed for specifying static assets (CSS, resources, etc.)
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));

const port = 4200;
const successStatusCode = 200;

app.get('/', ((req, res) => {
    res.sendFile(__dirname + '/signup.html');
}));

app.post('/', ((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const payload = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const list_id = '02a5f32efb';
    const url = `https://us6.api.mailchimp.com/3.0/lists/${list_id}`;
    const options = {
      method: 'POST',
        auth: 'eduard:6411a44b9f8c5118f9e4ad91f8bbf0fe-us6'
    };
    const payloadAsJson = JSON.stringify(payload);

   const request = https.request(url, options, (response)=>{
       if(response.statusCode === successStatusCode){
           res.sendFile(__dirname + '/success.html');
       }else {
           res.sendFile(__dirname + '/failure.html');
       }
        response.on('data', (data)=> {
            console.log(JSON.parse(data));
        })
    });

   request.write(payloadAsJson);
   request.end();
}));

// if the signup fails, redirect the user to the homepage
app.post('/failure', (req, res) => {
   res.redirect('/');
});

// define a port that will be dynamically set according to environment where the app. runs (Heroku) and port for local deployment
app.listen(process.env.PORT || port,()=> {
    console.log(`Server running on port ${port}`);
});
