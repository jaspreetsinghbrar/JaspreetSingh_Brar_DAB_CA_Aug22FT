# DAB - Course Assignment 1
# Application Installation and Usage Instructions
npm install
npm start

login credentials ( same as in the table)

# Environment Variables

#Development port
DEV_PORT=7000

#DB CONFIG
HOST='localhost'
USER='dabcaowner'
PASSWORD='dabca1234'
DB='adoptiondb'
DIALECT='mysql'


# Additional Libraries/Packages
  {
    "dotenv": "^16.0.3",
    "mysql2": "^3.1.2",
    "sequelize": "^6.28.0"
  }

# NodeJS Version Used
v16.16.0

# DATABASE
CREATE DATABASE adoptiondb;

# DATAINSERTS
  "INSERT INTO `sizes`(`name`) VALUES ('small'), ('medium'), ('large')"
  "INSERT INTO `roles`(`name`) VALUES ('admin'), ('member')"
  "INSERT INTO `temperaments`(`name`) VALUES ('calm'), ('scared'), ('energetic'), ('happy'), ('lazy')"
  "INSERT INTO `species`(`name`) VALUES ('Dwarf Hamster'), ('Tedy bear hamster'), ('Juck-Russel'), ('Budgy'), ('Tortouse'), ('Gold Fish'), ('Lizzard'), ('Bearder Dragon'), ('Parrot'), ('Corn Snake')"
  "INSERT INTO `users`(`fullName`, `username`, `password`, `roleId`) VALUES ('System Admin', 'Admin', 'admin1234', 1), ('User', 'User', 'user1234', 2), ('User2', 'User', 'user1234', 2)"
  "INSERT INTO `animals`(`name`, `birthday`, `speciesId`, `sizeId`, `adopted`)\
                        VALUES\
                        ('Coco', '2020-02-12', 1, 1, false),\
                        ('Ted', '2021-02-12', 2, 1, false),\
                        ('Coco', '2020-02-12', 3, 2, false),\
                        ('Everrest', '2019-02-12', 4, 1, false),\
                        ('Rocko', '2020-02-12', 5, 2, false),\
                        ('Goldy', '2023-02-12', 6, 1, false),\
                        ('Lizzy', '2020-02-12', 7, 2, false),\
                        ('Goga', '2018-02-12', 8, 3, true),\
                        ('Tweet Tweet', '2020-02-12', 9, 3, false),\
                        ('Toothless', '2017-02-12', 10, 2, false),\
                        ('Sophie', '2020-02-12', 1, 1, false),\
                        ('Teddy', '2021-02-12', 2, 1, false),\
                        ('Roger', '2020-02-12', 9, 3, false)"
  "INSERT INTO `animaltemperament`(`AnimalId`, `TemperamentId`) VALUES\
                        ( 1,  1),\
                        ( 1,  2),\
                        ( 2,  1),\
                        ( 2,  2),\
                        ( 3,  3),\
                        ( 4,  1),\
                        ( 4,  4),\
                        ( 5,  1),\
                        ( 5,  5),\
                        ( 6,  1),\
                        ( 7,  1),\
                        ( 7,  5),\
                        ( 8,  1),\
                        ( 8,  3),\
                        ( 8,  2),\
                        ( 9,  1),\
                        ( 9,  4),\
                        ( 10,  2),\
                        ( 11,  1),\
                        ( 11,  2),\
                        ( 12,  1),\
                        ( 12,  2),\
                        ( 13,  1),\
                        ( 13,  4)"

# DATABASEACCESS
CREATE USER 'dabcaowner'@'localhost' IDENTIFIED BY 'dabca1234';
GRANT ALL ON *.* TO 'dabcaowner'@'localhost';

# DATABASEQUERIES
1
SELECT name, COUNT(name) as count 
FROM Animals
GROUP BY name
ORDER BY count DESC
LIMIT 1;

2
SELECT a.name AS animal_name, u.fullName AS adopter_name
FROM Animals AS a
INNER JOIN Adoption AS ad ON a.id = ad.AnimalId
INNER JOIN Users AS u ON ad.UserId = u.id;

3
SELECT name, birthday, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age
FROM Animals
ORDER BY age ASC;

4
SELECT name, birthday
FROM Animals
WHERE birthday BETWEEN '2017-12-31' AND '2020-12-31';

5
SELECT Sizes.name AS size, COUNT(*) AS count FROM Animals JOIN Sizes ON Animals.sizeId = Sizes.id GROUP BY Sizes.id;

6
CREATE TRIGGER new_lizard
AFTER INSERT ON Animals
FOR EACH ROW
BEGIN
  DECLARE last_user INT;
  IF NEW.speciesId = (SELECT id FROM Species WHERE name = 'Lizard') THEN
    SELECT id INTO last_user FROM Users ORDER BY id DESC LIMIT 1;
    INSERT INTO Adoption (animalId, userId) VALUES (NEW.id, last_user);
  END IF;
END;