-- Create Database
create database ecommerce;

-- Use database
use ecommerce201;

-- Create Table
create table products(
	id int auto_increment primary key,
    name varchar(255) not null,
    category varchar(255) default '0',
    description text
);

create table category(
	id int auto_increment primary key,
    name varchar(255) not null
);