
# LocalStorm

An ORM for `window.localStorage` which no one asked for.

## Installation

```sh
npm install @shubhodeep9/localstorm
```

## Usage

```js
import { Model, Schema } from '@shubhodeep9/localstorm';

const UserSchema = new Schema({
    id: "number",
    name: "string",
    phone: "string"
});

const UserStore = Model('user', UserSchema);

// to save an entry
UserStore.save({
    id: 123,
    name: "Shubho",
    phone: "91xxxxx934"
});

// to retrieve
const response = UserStore.get();

// to flush the key
UserStore.flush();
```

## To-Do
- Add more type support
- Global Store fetch and flush
- Dynamic Schema
- Triggers

