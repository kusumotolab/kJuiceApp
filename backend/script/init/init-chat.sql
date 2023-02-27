CREATE TABLE chat (
    id serial primary key,
    message varchar(140),
    date timestamp with time zone default (now() at time zone 'jp')
);

SET SESSION timezone TO 'Asia/Tokyo';

SELECT * FROM chat;