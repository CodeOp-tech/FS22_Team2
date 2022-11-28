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

- ### Folder for Image upload
- Create a new folder called 'productImg' in the Public folder(server side). This will allow you to upload images directly from your device.
