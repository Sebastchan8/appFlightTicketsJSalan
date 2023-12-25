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
    user_id int primary key auto_increment,
    firstname varchar(50),
    lastname varchar(50),
    phone varchar(10),
    address text,
    card varchar(16),
    email varchar(100),
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
    user_id int references users(user_id),
    icon varchar(255),
    title varchar(255),
    description text
);

-- AEROLINES --------------------------------------
INSERT INTO aerolines (aeroline_name, aeroline_img) VALUES
    ('Avianca', 'https://media.staticontent.com/media/pictures/70a7eb77-8187-4cdb-bfd2-59c48268d3cf/605x107'),
    ('American Airlines', 'https://s202.q4cdn.com/986123435/files/doc_downloads/logos/american-airlines/THUMB-aa_aa__ahz_4cp_grd_pos-(1).png'),
    ('GOL', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/GOL_logo.svg/1200px-GOL_logo.svg.png'),
    ('Jet Blue', 'https://stafftraveler.com/img/airlines/tails/B6.png');


-- CITIES --------------------------------------
INSERT INTO cities (city, country, continent, img) VALUES
    ('Ambato', 'Ecuador', 'America', 'https://ecuadors.live/wp-content/uploads/2022/11/Turismo-en-el-canton-Ambato-Ecuador.png'),
    ('São Paulo', 'Brazil', 'America', 'https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic2755922.jpg?w=1600&h=1068'),
    ('Ottawa', 'Canada', 'America', 'https://a.cdn-hotels.com/gdcs/production159/d204/01ae3fa0-c55c-11e8-9739-0242ac110006.jpg'),
    ('Miami', 'USA', 'America', 'https://to-name.ru/images/historical-events/statue-liberty-usa.jpg'),
    ('Santiago', 'Chile', 'America', 'https://a.cdn-hotels.com/gdcs/production162/d454/b70026db-db9b-42e5-86ab-17c066571d32.jpg?impolicy=fcrop&w=800&h=533&q=medium'),
    ('México D.F.', 'Mexico', 'America', 'https://media.nomadicmatt.com/2022/mexicocitylove2.jpg'),
    ('Bogotá', 'Colombia', 'America', 'https://www.colombia-travels.com/wp-content/uploads/adobestock-266299444-1.jpeg'),
    ('Montevideo', 'Uruguay', 'America', 'https://nordicwalkingworldleague.com/uploads/event/5/0eaac084a417c5cb36e09614adcf412bfc77c64e.jpg'),
    ('Buenos Aires', 'Argentina', 'America', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEkQZWELtfDRRzJq0Rbx1BIKqjoSXtX4jQvg&usqp=CAU');

INSERT INTO cities (city, country, continent, img) VALUES
    ('Barcelona', 'Spain', 'Europe', 'https://a.cdn-hotels.com/gdcs/production81/d1983/1441d9b5-d0e6-4230-9923-646d58ba66d8.jpg'),
    ('Rome', 'Italy', 'Europe', 'https://www.italia.it/content/dam/tdh/es/interests/lazio/roma/roma-in-48-ore/media/20220127150143-colosseo-roma-lazio-shutterstock-756032350.jpg'),
    ('Paris', 'France', 'Europe', 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg'),
    ('Bern', 'Switzerland', 'Europe', 'https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg'),
    ('Stockholm', 'Sweden', 'Europe', 'https://sweden.se/_next/image?url=https%3A%2F%2Fcms.sweden.se%2Fapp%2Fuploads%2F2021%2F04%2Fklippan-gothenburg.jpg&w=3840&q=75'),
    ('Lisbon', 'Portugal', 'Europe', 'https://imgproxy.natucate.com/Mc5sJOhYWZgXlvE6s7FOL8BKQnOE7Q-8c_sJG8zVMIk/rs:fill/g:ce/w:3000/h:1688/aHR0cHM6Ly93d3cubmF0dWNhdGUuY29tL21lZGlhL3BhZ2VzL3JlaXNlemllbGUvMDJiMGEzYWEtOWNkNS00NDc0LWFkY2MtMzA2NmI3NDg1ZjhhL2M1YjgyODczMjUtMTY3OTQ4NjY5OS9sYWVuZGVyaW5mb3JtYXRpb25lbi1wb3J0dWdhbC1jYXJ2b2Vpcm8ta3Vlc3RlLW5hdHVjYXRlLmpwZw'),
    ('Berlin', 'Germany', 'Europe', 'https://s7g10.scene7.com/is/image/stena/20150820_berlin-brandenburg-gate:16-9?ts=1688733511559&dpr=off'),
    ('Moscow', 'Russia', 'Europe', 'https://lp-cms-production.imgix.net/image_browser/Red%20Square.jpg?auto=format&q=75');

INSERT INTO cities (city, country, continent, img) VALUES
    ('Nairobi', 'Kenya', 'Africa', 'https://cdn.britannica.com/59/153459-050-BC7B5FD8/Herd-zebras-Kenya-Maasai-Mara-National-Reserve.jpg'),
    ('Accra', 'Ghana', 'Africa', 'https://www.brookings.edu/wp-content/uploads/2021/02/shutterstock_1177833901_small.jpg'),
    ('Pretoria', 'South Africa', 'Africa', 'https://lp-cms-production.imgix.net/2019-06/542087321_full.jpg'),
    ('Cairo', 'Egypt', 'Africa', 'https://images.adsttc.com/media/images/64a2/cdae/cb9c/464f/a63a/9764/large_jpg/cairo-architecture-city-guide-exploring-the-unique-architectural-blend-of-historical-and-contemporary-in-egypts-bustling-capital_23.jpg?1688391095'),
    ('Abuja', 'Nigeria', 'Africa', 'https://www.brookings.edu/wp-content/uploads/2023/03/shutterstock_1833385567.jpg?w=1500');

INSERT INTO cities (city, country, continent, img) VALUES
    ('Tokyo', 'Japan', 'Asia', 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/10/13/tokyo-main.jpg'),
    ('Seoul', 'South Korea', 'Asia', 'https://a.cdn-hotels.com/gdcs/production144/d1960/191730c7-8e21-4540-825c-65954ae4d132.jpg?impolicy=fcrop&w=800&h=533&q=medium'),
    ('Beijing', 'China', 'Asia', 'https://cdn.britannica.com/03/198203-050-138BB1C3/entrance-Gate-of-Divine-Might-Beijing-Forbidden.jpg'),
    ('New Delhi', 'India', 'Asia', 'https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg'),
    ('Jakarta', 'Indonesia', 'Asia', 'https://lp-cms-production.imgix.net/image_browser/Jakarta_city_S.jpg'),
    ('Bangkok', 'Thailand', 'Asia', 'https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg');


-- USERS -----------------------
INSERT INTO users values(null, 'super', 'user', '9999999999', 'admin user', '9999999999999999', 'admin@avianca.com', '123');
INSERT INTO users values(null, 'Joan', 'Salán', '0998599526', 'Huachi Chico', '2738492817948374', 'jsalan@gmail.com', '123');