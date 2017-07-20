#!/bin/sh

docker build -t codewithpassion/www.openrov.com-build . -f Dockerfile.gitlab
docker push codewithpassion/www.openrov.com-build