#!/usr/bin/env bash
set -e

echo "checkout client release"
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

echo "checkout server release"
git checkout server/release
echo "reset to master"
git reset --hard master
echo "copy procfile"
cp Procfile.gameserver Procfile
echo "commit procfile for release"
git add Procfile
git commit -m "server release"
echo "push to heroku"
git push game-server server/release:master -f

git checkout master

echo FINISHED
