psql -U admin template1 -f /docker-entrypoint-initdb.d/init-db.sql

psql -U haruka "test-db" -f /docker-entrypoint-initdb.d/init-history.sql
psql -U haruka "test-db" -f /docker-entrypoint-initdb.d/init-member.sql
psql -U haruka "test-db" -f /docker-entrypoint-initdb.d/init-item.sql
psql -U haruka "test-db" -f /docker-entrypoint-initdb.d/init-chat.sql
psql -U haruka "test-db" -f /docker-entrypoint-initdb.d/init-sales.sql
psql -U haruka "test-db" -f /docker-entrypoint-initdb.d/init-member-image.sql