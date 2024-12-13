
# MyOnlineMeals

**A Vite-based React project with admin, client, and server sections.**

MyOnlineMeals is a web application built using Vite for fast development and React for the front-end. It includes three major sections:

- **Admin Panel:** For managing meals, users, and orders.
- **Client Panel:** For users to browse meals, place orders, and make payments.
- **Server:** The backend API built with Node.js to handle server-side logic, including authentication, meals, orders, and payment processing through Stripe.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Admin Panel:**
  - Manage meals, orders, and users.
  - Configure payment settings with Stripe.
  
- **Client Panel:**
  - Browse available meals, add them to the cart, and place orders.
  - Integrated with Stripe for secure payment processing.

- **Server (Backend):**
  - Built using Node.js and Express to handle authentication, meal data, orders, and Stripe payments.
  - Uses MongoDB for storing data.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/grep-many/myonlinemeals.git
   ```

2. Navigate to the project directory:

   ```bash
   cd myonlinemeals
   ```

3. Install dependencies for all sections:

   - Admin Panel:

     ```bash
     cd admin
     npm install
     ```

   - Client Panel:

     ```bash
     cd client
     npm install
     ```

   - Server:

     ```bash
     cd server
     npm install
     ```

4. Set up environment variables for all three sections:

   - **Admin & Client:**

     In both `admin/.env.local` and `client/.env.local`, add the following:

     ```env
     VITE_SERVER_URL=<your server link>
     ```

   - **Server:**

     In `server/.env.local`, add the following:

     ```env
     MONGODB_URI=<your mongodb uri>
     JWT_SECRET=<your secret key>
     STRIPE_SECRET_KEY=<your stripe secret key>
     FRONTEND_URL=<your client running link>
     PORT=<Your Port>
     ```

     **Note:** Replace `<your secret key>` and `<your stripe secret key>` with your actual secret keys.

5. Run the development server for each section:

   - Admin Panel:

     ```bash
     cd admin
     npm run dev
     ```

   - Client Panel:

     ```bash
     cd client
     npm run dev
     ```

   - Server:

     ```bash
     cd server
     npm run server
     ```

6. Open your browser and navigate to:

   - Admin Panel: `http://localhost:3000/admin`
   - Client Panel: `http://localhost:5173/myonlinemeals`
   - Server: `http://localhost:4000`

---

## Usage

1. **Admin Panel:**
   - Allows the admin to manage meals, view orders, and configure the Stripe payment system.

2. **Client Panel:**
   - Users can browse meals, place orders, and make payments using Stripe.

3. **Payment Gateway Integration (Stripe):**
   - Payments are processed through Stripe in both the admin and client panels. Ensure you add your Stripe API keys in the `.env.local` file.

---

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added a new feature"`).
4. Push your branch (`git push origin feature-name`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to the creators of [Vite](https://vitejs.dev/) for fast and modern development tools.
- Special thanks to [Stripe](https://stripe.com/) for their simple and secure payment processing solution.
