# Deploy apps in the cloud with Heroku

1) Make an account at `https://dashboard.heroku.com/apps`.
2) Go to `https://devcenter.heroku.com/`, select your desired backend language.
3) Afterwards, follow the `Get started with NodeJS` (Instead of NodeJS, any backend language can be
   specified) guide.
4) Run `git add .` to add all the files from the working directory.
5) Run `git status` to check that everything is as expected.
6) Run `git commit -m "yourCommitMessage"` to commit the changes.
7) Run `heroku create` to create the heroku app.
8) Run `git push heroku master` to push the changes to the heroku server(s).

- For any changes after the deployment go through steps 6) to 8).