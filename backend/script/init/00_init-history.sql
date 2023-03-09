CREATE TABLE history (
    id serial primary key,
    name varchar(20),
    item varchar(20),
    price integer,
    date timestamp with time zone default (now() at time zone 'jp')
);

SET SESSION timezone TO 'Asia/Tokyo';
