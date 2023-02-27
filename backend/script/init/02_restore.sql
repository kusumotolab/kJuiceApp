\c user1;
--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: user1; Type: SCHEMA; Schema: -; Owner: user1
--

CREATE SCHEMA user1;


ALTER SCHEMA user1 OWNER TO user1;

CREATE TABLE history (
    id serial primary key,
    name varchar(20),
    item varchar(20),
    price integer,
    date varchar(50)
);

