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
- get_subscrs(userid), return:
    - An array of objects. The structure of object is `{SubID, SubDescr, flag}` (name of properties), among which `SubID` is the ID of subscription source, `SubDescr` is its description, and `flag` shows if the user has subscribed it. For example, if you would like know the subscription ID of the second entry,
```js
var result = get_subscrs(`MyUserID`);

console.log(result[1].SubID);    
```

__Note__:
1. All the passwords needed when you invoke the APIs are in _PLAINTEXT_. The passwords will be hashed and stored in database, which is encapsulated and intransparent to callers.
