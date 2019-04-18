# Backend

## Getting Started

To install the required dependencies navigate to the project folder and run yarn:
```bash
$ cd ~/<pathname>/Backend
```
```bash
$ yarn
```
For the server to work properly you need to generate an `sqlite` database file on your local machine:
```bash
$ npx knex migrate:latest
```
This will generate an `app.sqlite3` file under the `database/` directory.

Then we can get the server up an running on `http://localhost:5000`:
```bash
$ yarn server
```

## Endpoints
### Auth Endpoints
---
`[POST] /api/auth/register`

**Purpose:** Creates a new user on the database.

**Input Fields:**
```json
{
  "email": "",
  "password": ""
}
```
**Required Fields:** `email`, `password`.

**Response:**
```json
{
  "message": "Successfully created user <user_email>"
}
```
---

`[POST] /api/auth/login`

**Purpose:** Authenticates an existing user.

**Input Fields:**
```json
{
  "email": "",
  "password": ""
}
```
**Required Fields:** `email`, `password`.

**Response:**
```json
{
  "message": "Welcome <user_email>"
}
```
---

`[GET] /api/auth/verify`

**Purpose:** Checks whether a user's token is valid.

**Expected Header:**
```plaintext
Authorization: <token>
```

**Success Response:**
```json
{
  "currentUserIsVerified": true
}
```

**Failure Response:**
```json
{
  "currentUserIsVerified": false
}
```
### User Endpoints
---
`[GET] /api/me`

**Purpose:** Returns current user object.

**Expected Header:**
```plaintext
Authorization: <token>
```

**Response:**
```json
{
  "email": "<user_email>"
}
```
---
`[PUT] /api/me`

**Purpose:** Edit current user fields.

**Expected Header:**
```plaintext
Authorization: <token>
```

**Input Fields:**
```json
{
  "<field_to_edit>": ""
}
```

**Required Fields:** At least one of the following: `email` or `password`.

**Response:**
```json
{
  "email": "<new_user_email>"
}
```
