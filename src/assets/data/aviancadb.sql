create table aerolines(
    aeroline_id int primary key auto_increment,
    aeroline_name varchar(50),
    aeroline_img text
);

create table cities(
    id int primary key auto_increment,
    city varchar(60),
    country varchar(60),
    continent varchar(20),
    img text
);

create table users(
    user_id int auto_increment,
    firstname varchar(50),
    lastname varchar(50),
    phone varchar(10),
    address text,
    card varchar(16),
    email varchar(100) primary key,
    password varchar(30)
);

create table flights(
    flight_id int primary key auto_increment,
    aeroline_id int references aerolines(aeroline_id),
    departure_city_id int references cities(id),
    destination_city_id int references cities(id),
    departure_date datetime,
    destination_date datetime,
    adult_price decimal(9,2),
    child_price decimal(9,2),
    adult_available int,
    child_available int
);

create table reservations(
    reservation_id int primary key auto_increment,
    user_id int references users(user_id),
    departure_flight_id int,
    return_flight_id int,
    adults int,
    children int,
    total decimal(10,2),
    status int
);

create table notifications(
    user_id int references users(user_id)
    icon varchar(255),
    title varchar(255),
    description text
);