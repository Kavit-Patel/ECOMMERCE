# E-commerce Platform

## Overview

This project is an e-commerce platform built using the T3 stack, featuring user registration, email verification, and category selection. Users can create an account, verify their email, and select their interests from a list of categories.

## Tech Stack

- **Next.js**: A React framework for server-side rendering and building static web applications.
- **tRPC**: A framework for building typesafe APIs using TypeScript.
- **Prisma**: An ORM for Node.js and TypeScript for managing database operations.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **PostgreSQL**: A relational database for storing user and category data.
- **Faker.js**: A library for generating fake data for testing and development.

## Project Structure

The project is organized into the following main sections:

1. **Prisma Schema**: Defines the database models and relationships.
2. **TRPC Routes**: Implements the API endpoints for user registration, email verification, login, and category management.
3. **Pages**: Contains the Next.js pages for registration, verification, and category selection.

## Prisma Schema

The Prisma schema defines three models: `User`, `Category`, and `UserCategory`.

- **User**: Represents the user entity with fields for user information and relationships to categories.
- **Category**: Represents the category entity with fields for category details and relationships to users.
- **UserCategory**: Represents the many-to-many relationship between users and categories.

### User Routes

- **Register**: Creates a new user and sends a verification email.
- **Verify User**: Verifies the user's email using a code.
- **Login User**: Logs in the user using email and password.
- **Cookie Login**: Logs in the user using a token stored in cookies.
- **Get Users**: Retrieves all users.

### Category Routes

- **Get All Categories**: Retrieves all categories with pagination and user's selected categories.
- **Save User Categories**: Saves the user's selected categories.

## Pages

### Register Page

Provides a form for users to create a new account by entering their username, email, and password. On successful registration, a verification email is sent.

### Verify Page

Allows users to verify their email by entering a code received via email. Upon successful verification, the user is redirected to the categories page.

### Categories Page

Displays a list of categories for the user to select their interests. The user's selected categories are saved and managed through this page.

## Getting Started

1. **Clone repo**: https://github.com/Kavit-Patel/ECOMMERCE.git

2. **Install Dependencies**: cd ECOMMERCE then Run `npm install` to install the project dependencies.

3. **Setup Environment**: Create a `.env` file with the following variables:
   DATABASE_URL= 'Your Postgresql database url'
   JWT_SECRET = 'jwt secret'
   EMAILJS_SERVICE_ID = ' '
   EMAILJS_PUBLIC_KEY = ' '
   EMAILJS_TEMPLATE_ID = ' '
   EMAILJS_PRIVATE_KEY =' '

4. **Start the Development Server**: Run `npm run dev` to start the Next.js development server.
