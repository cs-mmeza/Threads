# Threads App Clone
This repository contains a project that replicates the functionality of the popular Threads app. Threads is a platform where users can create accounts, post threads, and engage with other users' content. This clone project aims to provide similar features and functionalities using modern web development tools and technologies.

Technologies Used:
- Next.js
- React
- TypeScript
- Zod: Used for schema declaration and validation to ensure data consistency and integrity.
- MongoDB: A NoSQL database used for storing user account information and thread data.
- Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- Clerk: Provides user authentication functionality, enabling users to create accounts and securely log in.
- Clerk Webhooks: Utilized for handling authentication events and integrating with other systems.
- TailwindCSS: A utility-first CSS framework for building custom and responsive user interfaces.
- Shadcn-UI: A UI component library used for creating a visually appealing and consistent user interface design.

## Features
- User Account Creation: Users can create accounts by providing basic information such as name, email, and bio.
- User Authentication: Utilizing Clerk for secure user authentication, ensuring that user accounts are protected.
- Thread Posting: Authenticated users can create threads and share content with other users.
- User Activity: The app displays user activity and information related to each user's account, enhancing engagement and interaction within the platform.

## Getting Started
To run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using npm install or yarn install.
3. Set up a MongoDB database and configure the connection settings in the project.
4. Set up Clerk for user authentication and configure the necessary environment variables.
5. Run the development server using npm run dev or yarn dev.
6. Access the app in your web browser at the specified localhost address.

## Source
Figma UI and project code bases provided by [adrianhajdin](https://github.com/adrianhajdin/adrianhajdin) > [tutorial](https://github.com/adrianhajdin/threads/blob/main/README.md)

____

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
