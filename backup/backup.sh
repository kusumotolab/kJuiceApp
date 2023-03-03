cd "$(dirname "$0")"

DATE=`date "+%Y%m%d%H%M"`

# generate backup file
pg_dump --file ./data/$DATE.sql
