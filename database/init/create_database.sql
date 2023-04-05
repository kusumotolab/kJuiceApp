CREATE TABLE item (
    id varchar(20) primary key,
    display_name varchar(20) not null,
    sellingprice integer not null,
    costprice integer not null,
    category varchar(20) not null,
    active boolean default true not null
);

CREATE TABLE member(
    id varchar(20) primary key,
    display_name varchar(20) not null,
    attribute varchar(20) not null,
    active boolean default true not null
);

CREATE TABLE memberimage(
    member_id VARCHAR(20) PRIMARY KEY REFERENCES member(id),
    media_type VARCHAR not null,
    image BYTEA not null
);

CREATE TABLE message (
    id serial primary key,
    message varchar(140) not null,
    post_date timestamp not null
);

CREATE TABLE purchase (
    purchase_id serial primary key,
    member_id varchar(20) not null,
    item_id varchar(20) not null,
    price integer not null,
    purchase_date timestamp not null
);
