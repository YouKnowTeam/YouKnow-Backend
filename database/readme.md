Import by `require` the folder `./database`.

For example,

```js
const database = require('./database');

database.sign_in(id, pass);
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
