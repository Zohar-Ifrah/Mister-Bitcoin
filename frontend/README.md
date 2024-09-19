# Mister-Bitcoin

**Mister-Bitcoin** is a full-stack cryptocurrency wallet application built using modern web technologies. Users can manage their Bitcoin balance, view their transaction history (moves), and interact with various contacts for trading Bitcoin.

## Features

- **Manage Bitcoin Wallet**: View your balance and recent transactions (moves).
- **Transfer Bitcoin**: Transfer Bitcoin between users and contacts.
- **Real-time Bitcoin Rate**: Display current Bitcoin rate using external API.
- **Contact Management**: Add, edit, and delete contacts.
- **Responsive Design**: Works on all device sizes.

## Demo

Check out the live demo: [Mister-Bitcoin](https://mister-bitcoin-7pqz.onrender.com)

## Technologies Used

- **Frontend**: Angular, HTML, SCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Other**: RxJS, ngx-charts for data visualization
- **Bitcoin Rates**: Uses [Blockchain.info API](https://blockchain.info/tobtc?currency=USD&value=1) to get Bitcoin conversion rates.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Zohar-Ifrah/Mister-Bitcoin.git
    ```

2. Navigate to the backend folder and install dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

4. Navigate to the frontend folder and install dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

5. Start the Angular app:

    ```bash
    ng serve
    ```

6. Open your browser and navigate to `http://localhost:4200`.

## API Endpoints

- `GET /api/user` - Retrieve all users or filter users based on query parameters.
- `GET /api/user/:id` - Get a specific user by ID.
- `POST /api/user` - Add a new user.
- `PUT /api/user/:id` - Update a specific user by ID.
- `DELETE /api/user/:id` - Remove a specific user by ID.
- `GET /api/contact` - Retrieve all contacts or filter contacts based on query parameters.
- `GET /api/contact/:id` - Get a specific contact by ID.
- `POST /api/contact` - Add a new contact.
- `PUT /api/contact/:id` - Update a specific contact by ID.
- `DELETE /api/contact` - Remove all contacts.
- `DELETE /api/contact/:id` - Remove a specific contact by ID.

## Future Improvements

- Implement a notification system for price alerts.
- Improve security with two-factor authentication (2FA).

## License

This project is open-source and available under the MIT License.

## Author

Zohar Ifrah – Full-Stack Developer  
[LinkedIn](https://www.linkedin.com/in/zohar-ifrah)
