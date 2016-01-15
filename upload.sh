#!/bin/bash
#/yxjiao/myxx-mobile
export APP_ROOT=`pwd`
export WEB_APP_FOLDER="myxx-app"
export DEPLOY_FILES="test.png"
export time=`date +"%Y%m%d%H%M%S"`
export WEB_APP_TARBALL=$WEB_APP_FOLDER-$time.tar.gz

#default settings
parent="/home"
REMOTE="front@120.26.113.13"
REMOTE_DIR="myxx-artist"
SSH="sshpass -p front!@#$ ssh"
SCP="sshpass -p front!@#$ scp"

deploy() {
    root=$REMOTE_DIR
    echo "... begin deploying to [$REMOTE:$root]"
    #backup
    ssh $REMOTE "cd $root && tar -cf $WEB_APP_TARBALL $DEPLOY_FILES && mkdir -p backup && mv $WEB_APP_TARBALL backup/"
    #upload file
    scp $APP_ROOT/$WEB_APP_TARBALL  $REMOTE:$root/$WEB_APP_TARBALL
    #untar file
    ssh $REMOTE "tar --touch -xf $root/$WEB_APP_TARBALL -C $root && rm -f $root/$WEB_APP_TARBALL"

    echo "... deploy to [$REMOTE:$root] done"
}
build() {
    #print header
    echo ""
    echo "--------- deploy start ---------"

    #npm run build

    rm -f $APP_ROOT/$WEB_APP_TARBALL
    echo "... remove local old tar.gz"
    #tar file
    tar -cf $APP_ROOT/$WEB_APP_TARBALL $DEPLOY_FILES
    echo "... tar $DEPLOY_FILES to tar.gz"
    # deploy
}

build

if [ $# -eq 0 ]
  then
    REMOTE_DIR="myxx-app-test"
    deploy
    REMOTE_DIR="myxx-app-dev"
    deploy
fi
while [ $# -gt 0 ]; do
    case "$1" in
        --dev)
            REMOTE_DIR="myxx-app-dev"
            deploy
            shift
            ;;
        --test)
            REMOTE_DIR="myxx-app-test"
            deploy
            shift
            ;;
        --all)
            REMOTE_DIR="myxx-app-test"
            deploy
            REMOTE_DIR="myxx-app-dev"
            deploy
            shift
            ;;
        *)
            echo "--------- deploy env not exist ---------"
            exit 1
            ;;
    esac
done
#rm tar.gz
rm -f $APP_ROOT/$WEB_APP_TARBALL
echo "--------- deploy end ---------"
exit 0
