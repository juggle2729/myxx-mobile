#!/bin/bash
if [ "$1" = "prod" ]
then
    echo "====== DEPLOY PROD ====="
    scp -r build/* front@120.27.194.242:/home/front/myxx-app
elif [ "$1" = "www" ]
then
    echo "====== DEPLOY WWW ====="
    cp -r build/* ../www/static/mobile
    scp -r build/* front@114.55.72.65:/home/front/apps/www/static/mobile
else
    echo "====== DEPLOY TEST ====="
    scp -r build/* front@120.26.113.13:/home/front/app
fi
echo "====== DEPLOY END ====="