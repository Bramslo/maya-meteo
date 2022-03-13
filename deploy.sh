#!/usr/bin/env sh

set -e

npm run build

cd dist

git add -A
git commit -m 'MAYA METEO DEPLOY 1'
git push -f git@github.com:Bramslo/maya-meteo.git main:gh-pages 

cd -