cd "$(dirname "$0")"

DATE=`date "+%Y%m%d%H%M"`

# generate backup file
pg_dump --file ./data/$DATE.sql

# sync ./data
rsync -az -e "ssh -i ~/.ssh/private_key" ./data/ $BACKUP_USER@$BACKUP_HOST:~/kJuiceApp-backup/
