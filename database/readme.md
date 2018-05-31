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
- get_subscrs(userid), get the list of subscription sources, return:
    - An array of objects. The structure of object is `{SubID, SubDescr, flag}` (name of properties), among which `SubID` is the ID of subscription source, `SubDescr` is its description, and `flag` shows if the user has subscribed it. For example, if you would like know the subscription ID of the second entry,
```js
var result = get_subscrs(`MyUserID`);

console.log(result[1].SubID);
```
- add_subscr(userid, subid), add subscription source for user, return:
    - 0: if success
    - -3: if internal error
- rm_subscr(userid, subid), remove subscription source for user, return:
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
|varchar(32) |varchar(256)|varchar(256)|

- UserSrc
```sql
CREATE TABLE UserSrc (UserID varchar(32), SrcID varchar(32), PRIMARY KEY(UserID, SrcID), FOREIGN KEY (UserID) REFERENCES UserPass(UserID), FOREIGN KEY (SrcID) REFERENCES MsgSrc(SrcID));
```

|UserID      |SrcID       |
|------------|------------|
|varchar(32) |varchar(32) |
