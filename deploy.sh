#!/bin/bash
if [ "$1" = "app" ]
then
    if [ "$2" = "prod" ]
    then
        echo "====== DEPLOY APP TO PROD ====="
        scp -r build/* front@120.27.194.242:/home/front/myxx-app
    else
        echo "====== DEPLOY APP TO TEST ====="
        scp -r build/* front@120.26.113.13:/home/front/app
    fi
else
    echo "====== DEPLOY WWW ====="
    mkdir -p ../www/static/mobile && rm -rf ../www/static/mobile/* && cp -r build/* ../www/static/mobile
    scp -r build/* front@120.26.113.13:/home/front/www/static/mobile
    #scp -r build/* front@114.55.72.65:/home/front/apps/www/static/mobile
fi
echo "====== DEPLOY END ====="
