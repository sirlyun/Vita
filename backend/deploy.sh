docker-compose -f ./docker-compose-prod.yml up -d
# 1
echo "$(docker ps -a)"
EXIST_BLUE=$(docker ps -f "name=prod_spring_container_blue" -q)
echo "블루 상태: ${EXIST_BLUE}"
if [ -n "$EXIST_BLUE" ]; then
    echo "yes blue"
    docker-compose -f ./docker-compose-prod-green.yml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
    BEFORE_PORT=8081
    AFTER_PORT=8082
else
  echo "no blue"
  docker-compose -f ./docker-compose-prod-blue.yml up -d
  BEFORE_COLOR="green"
  AFTER_COLOR="blue"
  BEFORE_PORT=8082
  AFTER_PORT=8081
fi

echo "${AFTER_COLOR} server up(port:${AFTER_PORT})"

# 2
for cnt in {1..10}
do
    echo "서버 응답 확인중(${cnt}/10)";
    UP=$(curl -s http://k10a103.p.ssafy.io:${AFTER_PORT}/actuator/health | grep 'UP')
    echo "서버 상태: ${UP}"
    if [ -n "${UP}" ]
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
sed -i 's/${BACKEND_PORT}/${AFTER_PORT}/' /etc/nginx/conf.d/backend-port.inc
systemctl reload nginx
echo "Deploy Completed!!"


# 4
echo "$BEFORE_COLOR server down(port:${BEFORE_PORT})"
docker-compose -f docker-compose-prod-${BEFORE_COLOR}.yml stop