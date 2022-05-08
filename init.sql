CREATE TABLE `account` (
   `AC_NickName` VARCHAR(16) NOT NULL,
   `AC_Name` VARCHAR(20) NOT NULL,
   `AC_Platform` INT(11) NOT NULL,
   `AC_Platform_Account` VARCHAR(45) NOT NULL,
   `AC_Creation_Date` DATETIME NOT NULL,
   `AC_Last_Access_Date` DATETIME NOT NULL,
   `AC_Reported_Count` INT(11) NOT NULL DEFAULT 0,
   `AC_Scope` TINYINT(4) NOT NULL DEFAULT 0 COMMENT '0 : false',
   `AC_Weight` FLOAT NOT NULL DEFAULT 0,
   `AC_State` INT(11) NOT NULL DEFAULT 1 COMMENT 'domain : Trainer, General, Ban',
   `AC_Gender` TINYINT(4) NOT NULL,
   PRIMARY KEY (`AC_NickName`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;



CREATE TABLE `bc_reporter` (
   `BCR_Code` INT(11) NOT NULL AUTO_INCREMENT,
   `BCR_Reporter_NickName` VARCHAR(16) NOT NULL,
   `BCR_Creation_Date` DATETIME NOT NULL,
   `B_Comment_BC_Code` INT(11) NOT NULL,
   `B_Comment_Board_BO_Code` INT(11) NOT NULL,
   PRIMARY KEY (`BCR_Code`, `B_Comment_BC_Code`, `B_Comment_Board_BO_Code`),
   INDEX `fk_BC_Reporter_B_Comment1` (`B_Comment_BC_Code`, `B_Comment_Board_BO_Code`),
   CONSTRAINT `fk_BC_Reporter_B_Comment1` FOREIGN KEY (`B_Comment_BC_Code`, `B_Comment_Board_BO_Code`) REFERENCES `b_comment` (`BC_Code`, `Board_BO_Code`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


CREATE TABLE `board` (
   `BO_Code` INT(11) NOT NULL AUTO_INCREMENT,
   `BO_Writer_NickName` VARCHAR(16) NOT NULL,
   `BO_Title` VARCHAR(60) NOT NULL,
   `BO_File` VARCHAR(45) NULL DEFAULT NULL,
   `BO_Content` VARCHAR(2000) NOT NULL,
   `BO_Hit` INT(11) NOT NULL DEFAULT 0,
   `BO_Creation_Date` DATETIME NOT NULL,
   PRIMARY KEY (`BO_Code`)
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=6
;


SELECT BO_Code, BO_Title,BO_File,BO_Writer_NickName,BO_Content, BO_Hit, BO_Creation_Date, (SELECT COUNT(BOARD_BO_CODE)  FROM B_COMMENT WHERE BOARD.BO_CODE = B_COMMENT.BOARD_BO_CODE) AS BO_Comment_Count,(SELECT COUNT(BOARD_BO_CODE)  FROM B_HEALTHSEE WHERE BOARD.BO_CODE = B_HEALTHSEE.BOARD_BO_CODE) AS BO_Healthsee_Count, (SELECT COUNT(BOARD_BO_CODE)  FROM B_REPORTER WHERE BOARD.BO_CODE = B_REPORTER.BOARD_BO_CODE) AS BO_Report_Count
FROM BOARD ORDER BY BO_CODE DESC 


SELECT BO_Code, BO_Writer_NickName,BO_Title, BO_Hit, BO_Creation_Date, (SELECT COUNT(BOARD_BO_CODE)  FROM B_COMMENT WHERE BOARD.BO_CODE = B_COMMENT.BOARD_BO_CODE) AS BO_Comment_Count,(SELECT COUNT(BOARD_BO_CODE)  FROM B_HEALTHSEE WHERE BOARD.BO_CODE = B_HEALTHSEE.BOARD_BO_CODE) AS BO_Healthsee_Count, (SELECT COUNT(BOARD_BO_CODE)  FROM B_Reporter WHERE BOARD.BO_CODE = B_REPORTER.BOARD_BO_CODE) AS BO_Report_Count
FROM BOARD ORDER BY BO_CODE DESC 


CREATE TABLE `b_comment` (
   `BC_Code` INT(11) NOT NULL AUTO_INCREMENT,
   `BC_Writer_NickName` VARCHAR(16) NOT NULL,
   `BC_Content` VARCHAR(1000) NOT NULL,
   `BC_Creation_Date` DATETIME NOT NULL,
   `BC_Re_Ref` INT(11) NULL DEFAULT NULL,
   `Board_BO_Code` INT(11) NOT NULL,
   PRIMARY KEY (`BC_Code`, `Board_BO_Code`),
   INDEX `fk_B_Comment_Board1` (`Board_BO_Code`),
   CONSTRAINT `fk_B_Comment_Board1` FOREIGN KEY (`Board_BO_Code`) REFERENCES `board` (`BO_Code`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=16
;


CREATE TABLE `b_healthsee` (
   `BH_Code` INT(11) NOT NULL AUTO_INCREMENT,
   `BH_Push_NickName` VARCHAR(16) NOT NULL,
   `BH_Creation_Date` DATETIME NOT NULL,
   `Board_BO_Code` INT(11) NOT NULL,
   PRIMARY KEY (`BH_Code`, `Board_BO_Code`),
   INDEX `fk_B_Heathsee_Board1` (`Board_BO_Code`),
   CONSTRAINT `fk_B_Heathsee_Board1` FOREIGN KEY (`Board_BO_Code`) REFERENCES `board` (`BO_Code`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


CREATE TABLE `b_reporter` (
   `BR_Code` INT(11) NOT NULL AUTO_INCREMENT,
   `BR_Reporter_NickName` VARCHAR(16) NOT NULL,
   `BR_Creation_Date` DATETIME NOT NULL,
   `Board_BO_Code` INT(11) NOT NULL,
   PRIMARY KEY (`BR_Code`, `Board_BO_Code`),
   INDEX `fk_B_Reporter_Board1` (`Board_BO_Code`),
   CONSTRAINT `fk_B_Reporter_Board1` FOREIGN KEY (`Board_BO_Code`) REFERENCES `board` (`BO_Code`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


CREATE TABLE `token` (
   `TK_Refresh_Token` VARCHAR(200) NOT NULL,
   `TK_NickName` VARCHAR(16) NULL DEFAULT NULL,
   `TK_Platform_Account` VARCHAR(45) NULL DEFAULT NULL,
   `TK_Creation_Date` DATE NULL DEFAULT NULL,
   PRIMARY KEY (`TK_Refresh_Token`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;


