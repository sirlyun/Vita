# 1
EXIST_BLUE=$(docker-compose -f docker-compose-prod-blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    docker-compose -f ./docker-compose-prod-blue.yml up -d
    BEFORE_COLOR="green"
    AFTER_COLOR="blue"
    BEFORE_PORT=8082
    AFTER_PORT=8081
else
    docker-compose -f ./docker-compose-prod-green.yml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
    BEFORE_PORT=8081
    AFTER_PORT=8082
fi

echo "${AFTER_COLOR} server up(port:${AFTER_PORT})"

# 2
for cnt in {1..10}
do
    echo "서버 응답 확인중(${cnt}/10)";
    UP=$(curl -s http://k10a103.p.ssafy.io:${AFTER_PORT}/actuator/health | grep 'UP')
    if [ -z "${UP}" ]
        then
            sleep 10
            continue
        else
            echo "서버가 정상적으로 구동되었습니다."
            break
    fi
done

if [ $cnt -eq 10 ]
then
    echo "서버가 정상적으로 구동되지 않았습니다."
    exit 1
fi


# 3
echo "Nginx Setting..."
echo "현재 디렉토리는: $(pwd)"
sed -i 's/${BACKEND_PORT}/${AFTER_PORT}/' /etc/nginx/conf.d/include/backend-port.inc
systemctl reload nginx
echo "Deploy Completed!!"


# 4
echo "$BEFORE_COLOR server down(port:${BEFORE_PORT})"
docker-compose -f docker-compose-prod-${BEFORE_COLOR}.yml stop