#!/usr/bin/env bash

set -e

echo "Building site..."
npm run build

echo "Deploying to GitHub Pages..."

cd dist

git init
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f "https://github.com/jfkeci/x-db.git" master:gh-pages

cd ..

echo "Deployed successfully to https://jfkeci.github.io/x-db"
