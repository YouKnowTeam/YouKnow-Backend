Import by `require` the folder `./database`.

For example,

```js
const database = require('./database');

database.sign_in(id, pass);
```

The provided APIs:

- sign_in(id, pass), return:
    - true: sign in successfully
    - false: user ID or password incorrect
- sign_up(id, pass), return:
    - true: sign up successfully (no duplicate user ID)
    - false: failure due to duplicate user ID
