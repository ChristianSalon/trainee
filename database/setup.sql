use trainee;

create table clubs (
  `clubId` varchar(50) not null,
  `name` text not null,
  `photoURL` text not null,
  -- IBAN
  primary key (`clubId`)
);

alter table clubs add column `accountId` varchar(100);
alter table clubs add column `isAccountSetUp` boolean default false;

create table users (
  `userId` varchar(50) not null,
  `name` text not null,
  `photoURL` text not null,
  `email` text not null,
  primary key (`userId`)
);

alter table users add column `customerId` varchar(100);

create table clubs_users (
  `id` int not null auto_increment,
  `clubId` varchar(50) not null,
  `userId` varchar(50) not null,
  `role` text not null,
  primary key (`id`),
  foreign key (`clubId`) references clubs(`clubId`),
  foreign key (`userId`) references users(`userId`)
);

create table themes (
  `id` int not null auto_increment,
  `userId` varchar(50) not null,
  `theme` varchar(6) default "light",
  primary key (`id`),
  foreign key (`userId`) references users(`userId`)
);

create table teams (
  `teamId` varchar(50) not null,
  `name` text not null,
  `photoURL` text not null,
  `clubId` varchar(50) not null,
  primary key (`teamId`), 
  foreign key (`clubId`) references clubs(`clubId`)
);

create table teams_users (
  `id` int not null auto_increment,
  `teamId` varchar(50) not null,
  `userId` varchar(50) not null,
  `role` text not null,
  primary key (`id`),
  foreign key (`teamId`) references teams(`teamId`),
  foreign key (`userId`) references users(`userId`)
);
    
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

alter table attendance add column excuseNote text default null;

create table events_teams (
  `id` int not null auto_increment,
  `teamId` varchar(50) not null,
  `eventId` varchar(50) not null,
  primary key (`id`),
  foreign key (`teamId`) references teams(`teamId`),
  foreign key (`eventId`) references events(`eventId`)
);
   
create table requests (
  `id` int not null auto_increment,
  `teamId` varchar(50) not null,
  `userId` varchar(50) not null,
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
   
create table payments_teams (
  `id` int not null auto_increment,
  `paymentId` int not null,
  `teamId` varchar(50) not null,
  primary key (`id`),
  foreign key (`paymentId`) references payments(`paymentId`),
  foreign key (`teamId`) references teams(`teamId`)
);

create table payments_users (
  `id` int not null auto_increment,
  `userId` varchar(50) not null,
  `paymentId` int not null,
  `settledAt` date,
  primary key (`id`),
  foreign key (`userId`) references users(`userId`),
  foreign key (`paymentId`) references payments(`paymentId`)
);

create table notification_tokens (
  `id` int not null auto_increment,
  `userId` varchar(50) not null,
  `token` text not null,
  primary key (`id`),
  foreign key (`userId`) references users(`userId`)
);

/* SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY','')); */

DELIMITER $$
CREATE PROCEDURE createClub (IN clubId VARCHAR(50), IN name TEXT, IN photoURL TEXT, IN userId VARCHAR(50), IN role TEXT)
BEGIN
	INSERT INTO clubs (clubId, name, photoURL) VALUES (clubId, name, photoURL);
    INSERT INTO clubs_users (clubId, userId, role) VALUES (clubId, userId, role);
END $$

DELIMITER $$
CREATE PROCEDURE deleteClub (IN _clubId VARCHAR(50))
BEGIN
    DELETE FROM clubs_users WHERE clubId = _clubId;
    DELETE FROM clubs WHERE clubId = _clubId;
END $$

DELIMITER $$
CREATE PROCEDURE createTeam (IN teamId VARCHAR(50), IN clubId VARCHAR(50), IN name TEXT, IN photoURL TEXT, IN userId VARCHAR(50), IN role TEXT)
BEGIN
	INSERT INTO teams (teamId, clubId, name, photoURL) VALUES (teamId, clubId, name, photoURL);
    INSERT INTO teams_users (teamId, userId, role) VALUES (teamId, userId, role);
END $$

DELIMITER $$
CREATE PROCEDURE deleteTeam (IN _teamId VARCHAR(50))
BEGIN
    DELETE FROM teams_users WHERE teamId = _teamId;
    DELETE FROM events_teams WHERE teamId = _teamId;
    DELETE FROM teams WHERE teamId = _teamId;
END $$

DELIMITER $$
CREATE PROCEDURE createEvent (IN eventId VARCHAR(50), IN name TEXT, IN details TEXT, IN attendanceNumber SMALLINT, IN location TEXT, IN startTime TEXT, IN endTime TEXT, IN startDate DATETIME, IN endDate DATETIME)
BEGIN
    INSERT INTO events (`eventId`, `name`, `details`, `attendanceNumber`, `location`, `startTime`, `endTime`, `startDate`, `endDate`) VALUES
		(eventId, name, details, attendanceNumber, location, startTime, endTime, startDate, endDate);
END $$

DELIMITER $$
CREATE PROCEDURE deleteEvent (IN eventId VARCHAR(50))
BEGIN
    DELETE FROM events_teams WHERE eventId = eventId;
    DELETE FROM attendance WHERE eventId = eventId;
	DELETE FROM events WHERE eventId = eventId;
END $$

DELIMITER $$
CREATE PROCEDURE acceptRequest (IN requestId VARCHAR(50), IN teamId VARCHAR(50), IN userId VARCHAR(50))
BEGIN
    DELETE FROM requests WHERE id = requestId;
    INSERT INTO teams_users (`teamId`, `userId`, `role`) VALUES (teamId, userId, "MEMBER");
END$$

DELIMITER $$
CREATE PROCEDURE deletePayment (IN _paymentId int)
BEGIN
	DELETE FROM payments_teams WHERE paymentId = _paymentId;
    DELETE FROM payments_users WHERE paymentId = _paymentId;
    DELETE FROM payments WHERE paymentId = _paymentId;
END $$

DELIMITER $$
CREATE PROCEDURE createPayment (IN name text, IN details text, IN amount decimal(7, 2), IN createdAt date, IN dueDate date, IN teamIds text)
BEGIN

	DECLARE _insertedId INT DEFAULT 0;

    INSERT INTO payments (name, details, amount, createdAt, dueDate) VALUES (name, details, amount, createdAt, dueDate);
    SET _insertedId = LAST_INSERT_ID();
    
	INSERT INTO payments_teams (paymentId, teamId) 
		SELECT _insertedId, teamId FROM teams WHERE FIND_IN_SET(teamId, teamIds);
	INSERT INTO payments_users (paymentId, userId) 
		SELECT _insertedId, u.userId FROM teams_users AS tu 
			INNER JOIN users AS u ON tu.userId = u.userId
			WHERE FIND_IN_SET(tu.teamId, teamIds) AND tu.role = "MEMBER"
            GROUP BY u.userId;
END $$

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
CREATE TRIGGER payments_teamsInserted AFTER INSERT ON payments_teams
FOR EACH ROW
BEGIN
	DECLARE _teamId varchar(50);
	DECLARE _paymentId int;
    
	SELECT teamId INTO _teamId FROM teams WHERE teamId = NEW.teamId;
	SELECT paymentId INTO _paymentId FROM payments WHERE paymentId = NEW.paymentId;
    
    INSERT INTO payments_users (userId, paymentId, settledAt)
	SELECT tu.userId, _paymentId, NULL FROM teams_users AS tu
	INNER JOIN users AS u ON tu.userId = u.userId
	WHERE tu.teamId = _teamId AND tu.role = "MEMBER";
    
END $$