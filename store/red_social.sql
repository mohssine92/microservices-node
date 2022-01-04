
ALTER TABLE `red_social`.`user` 
CHANGE COLUMN `iduser` `id` VARCHAR(32) NOT NULL ;

CREATE TABLE `red_social`.`auth` (
  `id` VARCHAR(32) NOT NULL,
  `username` VARCHAR(32) NULL,
  `password` VARCHAR(64) NULL,
  PRIMARY KEY (`id`));


INSERT INTO user ( uid ,username, name) VALUES ( '123','codingcarios',  'carlos');


	DELETE FROM auth	Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.	0.0014 sec
