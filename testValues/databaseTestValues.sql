INSERT INTO places(place_name)
VALUES('Київ - Бориспіль');
INSERT INTO places(place_name)
VALUES('Київ - Київ');
INSERT INTO places(place_name)
VALUES('Одеса');
INSERT INTO places(place_name)
VALUES('Львів');
INSERT INTO places(place_name)
VALUES('Лондон');
INSERT INTO places(place_name)
VALUES('Запоріжжя');
INSERT INTO places(place_name)
VALUES('Париж');
INSERT INTO places(place_name)
VALUES('Пекін');
INSERT INTO places(place_name)
VALUES('Нью-Йорк');
INSERT INTO places(place_name)
VALUES('Варшава');
SELECT *
FROM places;

INSERT INTO flights(flight_name, flight_date, from_place, where_place, flight_duration)
VALUES('Рейс номер 1234', '2021-12-31 23:59:59', 7, 8,  '3:59:59.000000');
INSERT INTO flights(flight_name, flight_date, from_place, where_place, flight_duration)
VALUES('Рейс номер 8888', '2022-12-31 20:59:59', 1, 3,  '4:00:00.000000');
INSERT INTO flights(flight_name, flight_date, from_place, where_place, flight_duration)
VALUES('Рейс номер 55', '2023-12-22 23:59:59', 3, 1,  '5:08:57.000000');
INSERT INTO flights(flight_name, flight_date, from_place, where_place, flight_duration)
VALUES('Рейс номер 2', '2021-10-2 14:59:59', 5, 2,  '1:30:59.000000');
INSERT INTO flights(flight_name, flight_date, from_place, where_place, flight_duration)
VALUES('Рейс номер 5', '2021-11-30 01:00:00', 4, 3,  '2:00:00.000000');
INSERT INTO flights(flight_name, flight_date, from_place, where_place, flight_duration)
VALUES('Рейс номер 23', '2021-10-31 23:59:59', 8, 7,  '3:59:59.000000');
SELECT * 
FROM flights;

INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '1', true, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '2', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '3', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '4', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '5', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '6', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '7', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '8', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '9', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '10', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '11', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('1', '12', false, 500);

INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '1', false, 128);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '2', false, 128);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '3', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '4', false, 128);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '5', false, 128);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '6', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '7', false, 128);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '8', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '9', false, 128);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '10', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '11', false, 128);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('2', '12', false, 128);

INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '1', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '2', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '3', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '4', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '5', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '6', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '7', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '8', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '9', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '10', false, 200);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '11', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('3', '12', false, 200);

INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '1', false, 333);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '2', false, 333);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '3', false, 333);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '4', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '5', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '6', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '7', false, 600);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '8', false, 600);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '9', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '10', false, 600);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '11', false, 600);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('4', '12', false, 600);

INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '1', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '2', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '3', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '4', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '5', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '6', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '7', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '8', false, 500);
INSERT INTO tickets(flight_id, sea, 600t_number, taken, ticket_price)
VALUES('5', '9', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '10', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '11', false, 500);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('5', '12', false, 500);

INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '1', false, 100);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '2', false, 300);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '3', false, 100);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '4', false, 400);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '5', false, 400);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '6', false, 400);
INSERT INTO tickets(flight_id, s, 500eat_number, taken, ticket_price)
VALUES('6', '7', false, 400);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '8', false, 400);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '9', false, 400);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '10', false, 400);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '11', false, 400);
INSERT INTO tickets(flight_id, seat_number, taken, ticket_price)
VALUES('6', '12', false, 400);
SELECT * FROM tickets;

INSERT INTO customers(email, phone_number, country, gender, day, month, year, citizenship, document, passport_number, valid, surname, name, middle_name)
VALUES('kkk@gmail.com', '098777777', 'Ukraine', 'male', '14', 'January', '2012', 'Ukrainian', 'Закордонний паспорт', '324453', '2024-10-2 14:59:59', 'Шевченко', 'Тарас', 'Григорович');
INSERT INTO customers(email, phone_number, country, gender, day, month, year, citizenship, document, passport_number, valid, surname, name, middle_name)
VALUES('k1234@gmail.com', '098766777', 'France', 'female', '14', 'January', '2001', 'French', 'Закордонний паспорт', '3245555', '2025-10-5 14:59:59', 'Brown', 'Jane', 'Kate');

INSERT INTO booked_tickets(customer_id, ticket_id)
VALUES(1, 1);
INSERT INTO booked_tickets(customer_id, ticket_id)
VALUES(2, 13);
