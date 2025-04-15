# Cardify

Cardify is a Flashcard SaaS application built with modern web technologies to enhance learning and memory retention through customizable flashcards. With features like AI-generated content, user authentication, and secure payments, Cardify is a comprehensive tool for learners and educators.
![image](https://github.com/user-attachments/assets/fac7e739-6c88-415a-bf36-c92b4ea42f22)

## Demo Video

Watch the demo video below to learn more about Cardify:

[![Cardify Demo Video](https://github.com/user-attachments/assets/0e8fbc3d-ef74-4587-b06a-87b3648b622e)](https://www.youtube.com/watch?v=53UeTLfAmr0)




## Features

- **Flashcard Creation:** Create and manage flashcards effortlessly.
- **AI-Powered Suggestions:** Use Groq AI API to generate flashcard content.
- **User Authentication:** Secure login and registration with Clerk API.
- **Subscription Plans:** Manage subscriptions and payments using Stripe API.
- **Responsive UI:** Built with Material UI for a seamless user experience.
- **Real-Time Data:** Firebase integration for real-time storage and updates.

## Tech Stack

- **Frontend:** Next.js, Material UI
- **Backend:** Firebase, Groq AI API, Clerk API
- **Payments:** Stripe API
- **Authentication:** Clerk API
- **Database:** Firebase

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GayathriPCh/Flashcard-saas.git
   cd Flashcard-saas
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory.

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Deployment

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:

   ```bash
   npm start
   # or
   yarn start
   ```

## APIs Used

- **Groq AI API:** Generate AI-powered flashcard suggestions.
- **Clerk API:** User authentication and management.
- **Stripe API:** Subscription and payment processing.
- **Firebase:** Real-time data storage and synchronization.
