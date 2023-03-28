#!/bin/bash
set -eu

readonly DOCKER_HOST="gateway.docker.internal"

# ユーザー追加関数
# arg: (api_host, name, displayName, attribute)
# example: ("localhost", "r-takaic", "髙市", "m2")
function add_user() {
    local header="Content-Type:application/json"
    local api_path="/backend/member/add"
    local uri="http://$1$api_path"
    local data="{\"name\":\"$2\",\"displayName\":\"$3\",\"attribute\":\"$4\"}"

    curl -X POST -H $header -d $data $uri
    
    return 0
}

# 商品追加関数
# arg: (api_host, name, sellingprice, costprice, grouping)
# example: ("localhost", "CocaCola", "80", "70", "juice")
function add_item() {
    local header="Content-Type:application/json"
    local api_path="/backend/item/add"
    local uri="http://$1$api_path"
    local data="{\"name\":\"$2\",\"sellingprice\":\"$3\",\"costprice\":\"$4\",\"grouping\":\"$5\"}"

    curl -X POST -H $header -d $data $uri
    
    return 0
}

# api_hostを設定
# コンテナ内から実行しているならばDockerのホスト，そうでないならば自分
if [ -e /.dockerenv ];then
    api_host=$DOCKER_HOST
else
    api_host="localhost"
fi

# デモ用のユーザを追加
add_user $api_host "r-takaic" "髙市" "m2"
add_user $api_host "r-takagi" "高木" "m2"
add_user $api_host "h-watanb" "渡辺" "m2"
add_user $api_host "shu-hsmt" "橋本" "m2"
add_user $api_host "m-tanigt" "谷口" "m2"
add_user $api_host "k-kotou" "古藤" "m2"
add_user $api_host "m-iriyam" "入山" "m2"
add_user $api_host "h-yosiok" "吉岡" "m1"
add_user $api_host "t-ishino" "石野" "m1"
add_user $api_host "tk-iwase" "岩瀬" "m1"
add_user $api_host "fumy-oda" "小田" "m1"
add_user $api_host "r-kaichi" "開地" "m1"
add_user $api_host "h-takesg" "竹重" "m1"
add_user $api_host "t-ou" "王" "m1"
add_user $api_host "y-kaimor" "皆森" "b4"
add_user $api_host "hkr-kubo" "久保" "b4"
add_user $api_host "w-mabuti" "馬渕" "b4"
add_user $api_host "k-mihara" "三原" "b4"
add_user $api_host "ryg-wtnb" "渡邊" "b4"
add_user $api_host "kusumoto" "楠本" "teature"
add_user $api_host "shinsuke" "柗本" "teature"
add_user $api_host "higo" "肥後" "teature"

# デモ用のアイテムを追加
add_item $api_host "CocaCola" "80" "70" "juice"
add_item $api_host "Fanta" "80" "70" "juice"
add_item $api_host "GogoTea" "100" "80" "juice"
add_item $api_host "Water" "100" "40" "juice"
add_item $api_host "PotatoChips" "100" "80" "food"
add_item $api_host "Dagashi" "100" "80" "food"
