# Server side

## Continuous deployment

https://docs.travis-ci.com/user/deployment/heroku/

```
sudo snap install --classic heroku
sudo gem install travis
```

```
heroku login
heroku buildpacks:set heroku/nodejs
```

Deploy to heroku
```
git push heroku master
```

Only deploy subfolder
```
git subtree push --prefix server heroku master
```

Push force a subtree
```
git push heroku `git subtree split --prefix server master`:master --force
```

```
travis encrypt $(heroku auth:token) --add deploy.api_key
```


Test locally before deploying
```
heroku local web
```

Get logs
```
heroku logs --tail
```