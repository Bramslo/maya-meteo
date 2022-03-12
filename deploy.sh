#!/usr/bin/env sh

set -e

npm run deploy

cd dist

git init 
git add -A
git commit -m 'MAYA METEO IS LANDING UP'
git push -f git@github.com:Bramslo/maya-meteo.git main:gh-pages 

cd -