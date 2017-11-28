create database blowoffsteam;
create table messages (id serial, content text, recipient text, location point, primary key(id));