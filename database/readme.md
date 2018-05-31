Import by `require` the folder `database`.

For example,

```js
var database = require('../database');

var return_code = database.sign_in(id, pass);
```

The provided APIs:

- sign_in(id, pass), return:
    - 0 if success
    - -2 if user ID already exists
    - -3 if internal error
- sign_up(id, pass), return:
    - 0 if success
    - -1 if password incorrect
    - -2 if user ID does not exist
    - -3 if internal error
- get_msgsrcs(userid), get the list of message sources, return:
    - An array of objects. The structure of object is `{SrcID, SrcDesc, URL, flag}` (name of properties), among which `SrcID` is the ID of message source, `SrcDesc` is its description, URL is its URL link, and `flag` shows if the user has subscribed it. For example, if you would like know the message source ID of the second entry,
```js
var result = get_msgsrcs(`MyUserID`);

console.log(result[1].SrcID);
```
- add_msgsrc(userid, srcid), add message source for user, return:
    - 0: if success
    - -3: if internal error
- rm_msgsrc(userid, srcid), remove message source for user, return:
    - 0: if success
    - -3: if internal error

__Note__:
1. All the passwords needed when you invoke the APIs are in _PLAINTEXT_. The passwords will be hashed and stored in database, which is encapsulated and intransparent to callers.
2. The structure of database tables:
- UserPass

```sql
CREATE TABLE UserPass ( UserID varchar(32), Password char(60), PRIMARY KEY(UserID));
```

|UserID       |Password|
|-------------|--------|
|varchar(32)  |char(60)|

- MsgSrc
```sql
CREATE TABLE MsgSrc (SrcID varchar(32), SrcDesc varchar(256), URL varchar(256), PRIMARY KEY(SrcID));
```

|SrcID       |SrcDesc     |URL         |
|------------|------------|------------|
|varchar(32) |varchar(255)|varchar(255)|

- UserSrc
```sql
CREATE TABLE UserSrc (UserID varchar(32), SrcID varchar(32), PRIMARY KEY(UserID, SrcID), FOREIGN KEY (UserID) REFERENCES UserPass(UserID), FOREIGN KEY (SrcID) REFERENCES MsgSrc(SrcID));
```

|UserID      |SrcID       |
|------------|------------|
|varchar(32) |varchar(32) |

- Msg
```sql
CREATE TABLE Msg (MsgID int AUTO_INCREMENT, SrcID varchar(32) NOT NULL, Brief varchar(255), Detail mediumtext, PRIMARY KEY (MsgID), FOREIGN KEY (SrcID) REFERENCES MsgSrc(SrcID));
```

|MsgID       |SrcID       |Brief       |Detail    |Timestamp|
|------------|------------|------------|----------|---------|
|varchar(32) |varchar(32) |varchar(255)|mediumtext|timestamp|
