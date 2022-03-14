#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploying maya-meteo '
git push -f git@github.com:Bramslo/maya-meteo.git main:gh-pages 

cd -