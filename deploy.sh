#!/bin/bash
if [ "$1" = "app" ]
then
    echo "====== DEPLOY APP ====="
    scp -r build/* front@120.26.113.13:/home/front/app
    scp -r build/* front@120.27.194.242:/home/front/myxx-app
else
    echo "====== DEPLOY WWW ====="
    mkdir -p ../www/static/mobile && rm -rf ../www/static/mobile/* && cp -r build/* ../www/static/mobile
    scp -r build/* front@120.26.113.13:/home/front/www/static/mobile
    scp -r build/* front@114.55.72.65:/home/front/apps/www/static/mobile
fi
echo "====== DEPLOY END ====="