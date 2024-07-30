# Crework Project

This is a full-stack project with a Next.js client-side application and a Node.js/Express backend. This README provides setup instructions for both the client and server parts of the project.

Front end is deployed on vercel and backend on render

## Deployment

- **Frontend**: Deployed on [Vercel](https://crework-jade.vercel.app/login).
- **Backend**: Deployed on [Render](https://crework-znkk.onrender.com/).

  **Note**: Render may pause the server if no requests are made. As a result, new requests may take up to 2 minutes to start. Be aware of this potential delay when interacting with the backend.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Setup Instructions

### Clone the Repository

git clone https://github.com/Manojbachhal/Crework.git
cd Crework

# Navigate to the server directory

cd server

# Using npm

npm install

# Using yarn

yarn install

# set up environment variables:

Create a .env file in the server directory with the following content:

PORT=
MONGO=
JWT_SIGN=

# Run the server:

# Using npm

npm start

# Using yarn

yarn start

# Client Setup (Next.js)

Navigate to the client directory:

cd ../client

Install dependencies:

# Using npm:

npm install

# Using yarn:

yarn install

# Set up environment variables:

Create a .env.local file in the client directory with the following content:

NEXT_PUBLIC_API_URL= "backendurl"

# Run the development server:

# Using npm:

npm run dev

# Using yarn:

yarn dev
