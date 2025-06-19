# eStore

**eStore** is a full-stack e-commerce web application built using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS). The platform allows users to browse, add products to their cart, and securely process payments via Stripe and Payfast.

## Features
- **Product Management**: Users can browse and filter products.
- **Cart Functionality**: Users can add products to their cart and view a summary before checkout.
- **Secure Payments**: Integrated Stripe and Payfast for handling secure payments.
- **Order Tracking**: Users can track the status of their orders post-purchase.
- **Responsive Design**: Built with mobile and desktop views in mind.

## Technologies Used
### Frontend: 
- **React**: A JavaScript library for building the user interface.
- **TailwindCSS**: Styling for the application.

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend web framework for Node.js.
- **MongoDB**: NoSQL database used for storing user, product, and order data.
- **Stripe API**: For payment processing.
- **Payfast API**: South African payment gateway for handling payments.

### Deployment:
- Deployed on **Vercel**.

## Installation and Setup
To get a copy of the project up and running locally, follow these simple steps:

### Prerequisites
Ensure you have the following installed on your local machine:
- **Node.js** (version 12.x.x or later)
- **MongoDB** (running locally or via a cloud provider like MongoDB Atlas)

### Clone the repository
```bash
git clone https://github.com/SMOKEY1014/eStore.git
cd eStore
```

### Project Structure
```bash
eStore/
├── backend/               # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── controllers/       # API controllers
│   ├── configs/           # configs
│   ├── middleware/        # middleware
│   ├── package.json       # package file
│   └── server.js          # Express server setup
├── frontend/              # Frontend/custormer side source code
│   ├── src/
│   ├── public/
│   ├── index.html         
│   └── package.json
├── admin/                 # admin source code
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
└── README.md
