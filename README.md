# Welcome to Mambo Snake Blood.inc

## Setup
### Dependencies
In your terminal:
- navigate to the project directory and run `npm install`. This will install Express and other server-related dependencies.

- `cd client` and run `npm install`. This will install React client dependencies.

### Database
- CREATE DATABASE msb
- in server folder, create .env file containing:
`DB_HOST=localhost
DB_NAME=msb
DB_USER=root
DB_PASS=[your password]
SECRET_KEY=[your secret key]`

### Add an Image 
- In the in public folder (on the server side) create a folder called productImg. This is the folder where all your uploaded images will be stored
