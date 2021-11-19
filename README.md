# Github Auditor

### Prerequisites
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) (make sure your node.js version is 16.13.0 (LTS))
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

### Miscellaneous
- Running the following command will allow you to enter the Rails console and interact with the database via [ActiveRecord](https://guides.rubyonrails.org/active_record_basics.html):
```
rails console
```
- Whenever there are changes to the model, make sure you run the following to ensure you have the latest schema version:
```
rails db:schema:load
```
NOTE: if you have any preexisting data in your database, running this command will also wipe all that data
