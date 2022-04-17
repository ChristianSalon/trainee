use trainee;

create table clubs (
  `clubId` varchar(50) not null,
  `name` text not null,
  `photoURL` text not null,
  -- IBAN
  primary key (`clubId`)
);

insert into clubs (`clubId`, `name`, `photoURL`) values
	("tBzkJLT7XE9E9mvZ4zQA", "FBC Mikulas Presov", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FaQtYSI4Xr16ypOGBzeYH.png?alt=media&token=5e715e04-50d7-49bb-ab9f-176effda98f4"),
	("urI3ZiiUl3yCoFnEBtZJ", "Redbull Racing Honda F1 Team", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FurI3ZiiUl3yCoFnEBtZJ?alt=media&token=e4b76103-e463-4528-86bb-d30170ce0e86"),
    ("GsNAtaoCDboBZh2VQTf4", "Indianapolis Colts", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FR8ioquIKepp7lVMOs8jM.png?alt=media&token=0bdabc5f-ec05-4a92-abe5-4b3b864ebc4f");

create table users (
  `userId` varchar(50) not null,
  `name` text not null,
  `photoURL` text not null,
  `email` text not null,
  primary key (`userId`)
);

insert into users (`userId`, `name`, `photoURL`, `email`) values
	("HZVm04WIs4aVriRAQBbeKDhnYGI2", "Christian Saloň", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2FHZVm04WIs4aVriRAQBbeKDhnYGI2?alt=media&token=225fb258-b933-43ad-9fc5-da41605ce921", "chsalon02@gmail.com");

create table clubs_users (
  `id` int not null auto_increment,
  `clubId` varchar(50) not null,
  `userId` varchar(50) not null,
  `role` text not null,
  primary key (`id`),
  foreign key (`clubId`) references clubs(`clubId`),
  foreign key (`userId`) references users(`userId`)
);

insert into clubs_users (`clubId`, `userId`, `role`) values
	("tBzkJLT7XE9E9mvZ4zQA", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "MEMBER"),
	("GsNAtaoCDboBZh2VQTf4", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "COACH"),
	("GsNAtaoCDboBZh2VQTf4", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "MEMBER"),
	("urI3ZiiUl3yCoFnEBtZJ", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "MEMBER"),
	("urI3ZiiUl3yCoFnEBtZJ", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "COACH"),
	("urI3ZiiUl3yCoFnEBtZJ", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "MANAGER");
    
create table teams (
  `teamId` varchar(50) not null,
  `name` text not null,
  `photoURL` text not null,
  `clubId` varchar(50) not null,
  primary key (`teamId`), 
  foreign key (`clubId`) references clubs(`clubId`)
);

insert into teams (`teamId`, `clubId`, `name`, `photoURL`) values
	("aQtYSI4Xr16ypOGBzeYH", "tBzkJLT7XE9E9mvZ4zQA", "Juniori U19", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FaQtYSI4Xr16ypOGBzeYH.png?alt=media&token=5e715e04-50d7-49bb-ab9f-176effda98f4"),
    ("R8ioquIKepp7lVMOs8jM", "GsNAtaoCDboBZh2VQTf4", "Men's Team", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FR8ioquIKepp7lVMOs8jM.png?alt=media&token=0bdabc5f-ec05-4a92-abe5-4b3b864ebc4f"),
	("TWsAkjtqo9GqGtudyL5M", "urI3ZiiUl3yCoFnEBtZJ", "Team Max", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FurI3ZiiUl3yCoFnEBtZJ?alt=media&token=e4b76103-e463-4528-86bb-d30170ce0e86"),
	("iRm3uMD2W5ebOQPwlck9", "urI3ZiiUl3yCoFnEBtZJ", "Team Perez", "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FurI3ZiiUl3yCoFnEBtZJ?alt=media&token=e4b76103-e463-4528-86bb-d30170ce0e86");

create table teams_users (
  `id` int not null auto_increment,
  `teamId` varchar(50) not null,
  `userId` varchar(50) not null,
  `role` text not null,
  primary key (`id`),
  foreign key (`teamId`) references teams(`teamId`),
  foreign key (`userId`) references users(`userId`)
);

insert into teams_users (`teamId`, `userId`, `role`) values
	("aQtYSI4Xr16ypOGBzeYH", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "MEMBER"),
	("R8ioquIKepp7lVMOs8jM", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "COACH"),
	("TWsAkjtqo9GqGtudyL5M", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "MANAGER"),
	("iRm3uMD2W5ebOQPwlck9", "HZVm04WIs4aVriRAQBbeKDhnYGI2", "MANAGER");
    
create table events (
  `eventId` varchar(50) not null,
  `name` text not null,
  `details` text,
  `attendanceNumber` smallint not null,
  `location` text not null,
  `startTime` text not null,
  `endTime` text not null,
  `startDate` datetime not null,
  `endDate` datetime not null,
  primary key (`eventId`)
);

INSERT INTO events (`eventId`, `name`, `details`, `attendanceNumber`, `location`, `startTime`, `endTime`, `startDate`, `endDate`) VALUES 
	("2NV5eAI2Ozf1PF7WZmLm", "Predzapasovy trening v novej modernej hale...", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 1, "Mestska hala PO", "11:00", "12:30", "2021-12-15T11:00:00", "2021-12-15T12:30:00"),
	("4Wc9Qi9qJkz5z9kURGZk", "Trening po korone s MAXOM!", null, 0, "ZŠ Sibírska", "18:00", "19:30", "2022-01-07T18:00:00", "2022-01-07T19:30:00");

create table attendance (
  `id` int not null auto_increment,
  `userId` varchar(50) not null,
  `eventId` varchar(50) not null,
  `isComing` bool not null default false,
  `date` datetime not null,
  primary key (`id`),
  foreign key (`eventId`) references events(`eventId`),
  foreign key (`userId`) references users(`userId`)
);

INSERT INTO attendance (`userId`, `eventId`, `isComing`, `date`) VALUES
	("HZVm04WIs4aVriRAQBbeKDhnYGI2", "2NV5eAI2Ozf1PF7WZmLm", true, "2021-12-13T15:34:00");

create table events_teams (
  `id` int not null auto_increment,
  `teamId` varchar(50) not null,
  `eventId` varchar(50) not null,
  primary key (`id`),
  foreign key (`teamId`) references teams(`teamId`),
  foreign key (`eventId`) references events(`eventId`)
);

INSERT INTO events_teams (`teamId`, `eventId`) VALUES
	("aQtYSI4Xr16ypOGBzeYH", "2NV5eAI2Ozf1PF7WZmLm"),
	("aQtYSI4Xr16ypOGBzeYH", "4Wc9Qi9qJkz5z9kURGZk"),
	("TWsAkjtqo9GqGtudyL5M", "4Wc9Qi9qJkz5z9kURGZk");
    
create table requests (
  `id` int not null auto_increment,
  `teamId` varchar(50) not null,
  `userId` varchar(50) not null,
  `role` text not null,
  `date` datetime not null,
  primary key (`id`),
  foreign key (`teamId`) references teams(`teamId`),
  foreign key (`userId`) references users(`userId`)
);

create table payments (
  `paymentId` int not null auto_increment,
  `name` text not null,
  `details` text,
  `amount` decimal(7, 2) not null,
  `createdAt` date not null,
  `dueDate` date not null,
  primary key (`paymentId`)
);

INSERT INTO payments (`name`, `details`, `amount`, `createdAt`, `dueDate`) VALUES 
	("Australia poplatky", "Zaplatit!!!", 2000, "2022-04-09", "2022-04-20"),
	("Shakir poplatky", "Zaplatit!!!", 1000.99, "2022-02-01", "2022-02-20"),
	("Mladez Februar", "Zaplatit!!!", 25, "2022-02-01", "2022-02-20");
    
create table payments_teams (
  `id` int not null auto_increment,
  `paymentId` int not null,
  `teamId` varchar(50) not null,
  primary key (`id`),
  foreign key (`paymentId`) references payments(`paymentId`),
  foreign key (`teamId`) references teams(`teamId`)
);

INSERT INTO payments_teams (`paymentId`, `teamId`) VALUES 
	(1, "TWsAkjtqo9GqGtudyL5M"),
	(2, "TWsAkjtqo9GqGtudyL5M"),
	(3, "aQtYSI4Xr16ypOGBzeYH");

create table payments_users (
  `id` int not null auto_increment,
  `userId` varchar(50) not null,
  `paymentId` int not null,
  `settledAt` datetime not null,
  primary key (`id`),
  foreign key (`userId`) references users(`userId`),
  foreign key (`paymentId`) references payments(`paymentId`)
);
   
drop table events_teams;
drop table attendance;
drop table clubs_users;
drop table teams_users;
drop table events;
drop table teams;
drop table clubs;
drop table users;
drop table requests;
drop table payments_users;
drop table payments_teams;
drop table payments;
    
select * from clubs;
select * from users;
select * from clubs_users;
select * from teams_users;
select * from events;
select * from attendance;
select * from events_teams;
select * from teams;
select * from requests;
select * from payments;
select * from payments_users;
select * from payments_teams;

SELECT c.clubId, c.name, c.photoURL FROM clubs_users AS cu 
    INNER JOIN clubs AS c ON cu.clubId = c.clubId 
    INNER JOIN users AS u ON cu.userId = u.userId 
    WHERE u.userId = "HZVm04WIs4aVriRAQBbeKDhnYGI2" AND cu.role = "MANAGER";

SELECT teamId, name FROM teams WHERE clubId = "urI3ZiiUl3yCoFnEBtZJ";

SELECT role FROM teams_users WHERE userId = "HZVm04WIs4aVriRAQBbeKDhnYGI2" AND teamId = "TWsAkjtqo9GqGtudyL5M"

/*
SELECT c.club_id, c.name, c.photoURL FROM clubs as c INNER JOIN clubs_users as cu ON c.club_id = cu.club_id WHERE user_id = 1 AND role = "MANAGER";

SELECT c.club_id, c.name, c.photoURL FROM clubs_users as cu INNER JOIN clubs as c ON cu.club_id = c.club_id inner join users as u on cu.user_id = u.user_id WHERE u.firebase_id = "HZVm04WIs4aVriRAQBbeKDhnYGI2" AND cu.role = "MANAGER";

DELETE FROM clubs_users WHERE club_id = 1;
DELETE FROM clubs WHERE club_id = 1;

UPDATE clubs SET name = 'Redbull Racing Honda' WHERE club_id = 4;

INSERT INTO clubs (firebase_id, name, photoURL) VALUES ('p0JdLwuuGCBATh5lZbo0', 'Acura NSX', 'https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2Fp0JdLwuuGCBATh5lZbo0?alt=media&token=d0e97287-9370-4ef9-9565-111abd83d6b9');

SELECT e.* FROM events_teams as et 
    INNER JOIN events AS e ON et.event_id = e.event_id 
    INNER JOIN teams AS t ON et.team_id = t.team_id 
    WHERE et.team_id = "aQtYSI4Xr16ypOGBzeYH";

SELECT * FROM users WHERE name LIKE "%Chr%";
*/

DELIMITER $$
CREATE PROCEDURE createClub (IN clubId VARCHAR(50), IN name TEXT, IN photoURL TEXT, IN userId VARCHAR(50), IN role TEXT)
BEGIN
	INSERT INTO clubs (clubId, name, photoURL) VALUES (clubId, name, photoURL);
    INSERT INTO clubs_users (clubId, userId, role) VALUES (clubId, userId, role);
END$$

DELIMITER $$
CREATE PROCEDURE deleteClub (IN _clubId VARCHAR(50))
BEGIN
    DELETE FROM clubs_users WHERE clubId = _clubId;
    DELETE FROM clubs WHERE clubId = _clubId;
END$$

drop procedure deleteClub;

DELIMITER $$
CREATE PROCEDURE createTeam (IN teamId VARCHAR(50), IN clubId VARCHAR(50), IN name TEXT, IN photoURL TEXT, IN userId VARCHAR(50), IN role TEXT)
BEGIN
	INSERT INTO teams (teamId, clubId, name, photoURL) VALUES (teamId, clubId, name, photoURL);
    INSERT INTO teams_users (teamId, userId, role) VALUES (teamId, userId, role);
END$$

DELIMITER $$
CREATE PROCEDURE deleteTeam (IN _teamId VARCHAR(50))
BEGIN
    DELETE FROM teams_users WHERE teamId = _teamId;
    DELETE FROM events_teams WHERE teamId = _teamId;
    DELETE FROM teams WHERE teamId = _teamId;
END$$

drop procedure deleteTeam;

DELIMITER $$
CREATE PROCEDURE createEvent (IN eventId VARCHAR(50), IN name TEXT, IN details TEXT, IN attendanceNumber SMALLINT, IN location TEXT, IN startTime TEXT, IN endTime TEXT, IN startDate DATETIME, IN endDate DATETIME, IN teamId VARCHAR(50))
BEGIN
    INSERT INTO events (`eventId`, `name`, `details`, `attendanceNumber`, `location`, `startTime`, `endTime`, `startDate`, `endDate`) VALUES
		(eventId, name, details, attendanceNumber, location, startTime, endTime, startDate, endDate);
	INSERT INTO events_teams (`teamId`, `eventId`) VALUES
		(teamId, eventId);
END$$

DELIMITER $$
CREATE PROCEDURE deleteEvent (IN eventId VARCHAR(50))
BEGIN
    DELETE FROM events_teams WHERE eventId = eventId;
    DELETE FROM attendance WHERE eventId = eventId;
	DELETE FROM events WHERE eventId = eventId;
END$$

DELIMITER $$
CREATE PROCEDURE acceptRequest (IN requestId VARCHAR(50), IN teamId VARCHAR(50), IN userId VARCHAR(50), IN role TEXT)
BEGIN
    DELETE FROM requests WHERE id = requestId;
    INSERT INTO teams_users (`teamId`, `userId`, `role`) VALUES (teamId, userId, role);
END$$

drop procedure acceptRequest;

DELIMITER $$
CREATE PROCEDURE deletePayment (IN _paymentId int)
BEGIN
	DELETE FROM payments_teams WHERE paymentId = _paymentId;
    DELETE FROM payments_users WHERE paymentId = _paymentId;
    DELETE FROM payments WHERE paymentId = _paymentId;
END$$

drop procedure deletePayment;

DELIMITER $$
CREATE TRIGGER attendanceInserted AFTER INSERT ON attendance
FOR EACH ROW
BEGIN
	DECLARE _attendanceNumber SMALLINT;
	SELECT attendanceNumber INTO _attendanceNumber FROM events WHERE eventId = NEW.eventId;
	IF (NEW.isComing) THEN
		SET _attendanceNumber = _attendanceNumber + 1;
	END IF;
	UPDATE events SET attendanceNumber = _attendanceNumber WHERE eventId = NEW.eventId;
END $$

DELIMITER $$

drop trigger attendanceInserted;
drop trigger attendanceUpdated;