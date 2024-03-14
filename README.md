# React ERP System

----------------------------------------------

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Dashboard
- View Orders and Order details in ```/Orders``` page
- Modify Order Status and Delete
- View Products and details in ```/Products``` page
- Add, Update, Delete Products Details

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sriteja987/erp-system.git
```

2. Install dependencies:

```bash
cd erp-system
npm install
```
3. Update the ```src/firebase.js``` file with project details

    - First create the project in Firebase
    - Add firestore to your project
    - Create Two colections ```Orders``` and ```Products```
    - Orders have below fields
        - id
        - customer_name
        - order_date
        - status
    - Products have below fields
        - id
        - name
        - price
        - stock
        - category

## Usage

1. Start the development server:

```bash
npm start
```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

3. Navigate to the products page([http://localhost:3000/Products](http://localhost:3000/Products)) to view the Products Page.

4. Navigate to the Orders page([http://localhost:3000/Orders](http://localhost:3000/Orders)) to view the Orders Details

## Contributing

Contributions are welcome! Here are a few ways you can contribute:

- Submit bug reports or feature requests
- Help improve the documentation
- Fix bugs and implement new features

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.