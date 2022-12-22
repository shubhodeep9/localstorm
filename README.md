
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
    id: {
        required: true, // validates the field as mandatory
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    hobbies: Array // will assume field as optional
});

const UserStore = Model('user', UserSchema);

// to save an entry
UserStore.save({
    id: 123,
    name: "Shubho",
    phone: "91xxxxx934",
    hobbies: ['sleeping']
});

// if you want to bypass validations
UserStore.save({
    id: 123,
    name: "Shubho",
    phone: "91xxxxx934",
    hobbies: ['sleeping']
}, true) // pass skipValidation as true

// to retrieve
const response = UserStore.get();

// to flush the key
UserStore.flush();

// hooks
UserSchema.pre('save', (saveObj) => {
    // will be executed before saving
    // do something with saveObj
})

UserSchema.post('save', (saveObj) => {
    // will be executed post saving
    // do something with saveObj
})
```

## To-Do
- Global Store fetch and flush
- Dynamic Schema
- Triggers
  - [x] Pre and Post Save
  - [x] Pre and Post Flush
  - [ ] Pre and Post validate
  - [ ] Async hooks

