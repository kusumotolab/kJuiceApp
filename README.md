# これは
ジュース会販売管理アプリケーション

# How to Use
## Start Server
```
git clone git@github.com:kusumotolab/kJuiceApp
cd kJuiceApp
docker-compose up --build
```
http://localhost:80 にアクセス．

下記のコマンドで，デモ用のデータを入れることができます．
```
./init/init-database.sh
```

## Backup
1. `.env.template`を`.env`にコピー
2. バックアップ先のホスト名とそのホスト上のアカウント名を指定
3. バックアップ先の`authorized_keys`に公開鍵を設置
4. `./secret/private_key`ファイルに秘密鍵を設置

## Restore
1. バックアップ先のホストから`yyyymmddhhMM.sql`を`./restore.sql`にコピー
2. dbボリュームが存在しないことを確認（`docker volume ls | grep kjuiceapp_dbdata`が空）
3. `docker compoose up restore-db`
4. `database system is ready to accept connections`が出たらリストア完了
5. `Ctrl+C`でコンテナを終了し，`docker compose down`で削除
5. （`docker compose up`で起動）

# How to Contribute
Devcontainerで開発環境を立ち上げられます．
VScodeなどの対応エディタで開いてください．

## SSH
Devcontainer内からSSH（例：GitHubにpush）する際，`ssh-agent`を用いるとホストの鍵を使用できます．

`ssh-agent`有効化の方法は環境によって異なります．
Windowsは特に[大変そう](https://qiita.com/slotport/items/e1d5a5dbd3aa7c6a2a24)です．
* Windows
    1. 「Win+Q」で「サービス」と入力しサービスアプリを起動
    2. サービスのリストから「OpenSSH Authentication Agent」のスタートアップの種類を「自動」などに変更
    3. `ssh-add ~/秘密鍵へのパス`
    4. (`ssh-add -l`で登録を確認)
* Mac
    1. `ssh-add -l` or `ssh-add ~/秘密鍵へのパス`で起動
