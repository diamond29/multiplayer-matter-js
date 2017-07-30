#!/usr/bin/env bash
set -e

echo "checkout client relase"
git checkout client/release
echo "reset to master"
git reset --hard master
echo "copy procfile"
cp Procfile.clientserver Procfile
echo "commit procfile for release"
git add Procfile
git commit -m "Client release"
echo "push to heroku"
git push client-server client/release:master -f

git checkout master
