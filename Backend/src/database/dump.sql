CREATE TABLE IF NOT EXISTS User (
  id        INT          NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username  VARCHAR(255) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  mail      VARCHAR(255) NOT NULL UNIQUE,
  biometric_key TEXT     UNIQUE,
  created_at DATETIME    NOT NULL
);