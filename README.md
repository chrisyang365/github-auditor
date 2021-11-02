# Github Auditor

### Prerequisites
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)
- [Ruby on Rails](https://guides.rubyonrails.org/getting_started.html)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1. Enter PostgreSQL console
```
psql postgres
```
You should see the `postgres=#` prompt now if the above step was completed successfully.

### 2. Change the password for `postgres` user 
Run the following within the PostgreSQL console
```
ALTER USER postgres WITH PASSWORD 'password';
```
The following should have been printed if the password was changed successfully:
```
ALTER ROLE
```
### 3. Setup the database
`cd` into this repository and run the following
```
rails db:setup
```

### 4. Start up the rails server
```
rails server
```
Your local dev app should now be viewable at http://127.0.0.1:3000/