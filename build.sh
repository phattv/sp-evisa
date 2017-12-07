#!/bin/sh
ENV="prod"

for i in "$@"
do
case $i in
    -env=*|--environment=*)
    ENV="${i#*=}"
    shift # past argument=value
    ;;
    *)
          # unknown option
    ;;
esac
done

echo "Environment = ${ENV}"
if [ $ENV == 'dev' ]
then
	docker-compose build
else
	docker-compose -f docker-compose-prod.yml build
fi
