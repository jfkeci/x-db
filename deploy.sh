#!/usr/bin/env bash

set -e

echo "Building site..."
npm run build

echo "Deploying to GitHub Pages..."

cd dist

git init
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f git@github.com:jfkeci/x-db.git main:gh-pages

cd ..

echo "Deployed successfully to https://jfkeci.github.io/x-db"
