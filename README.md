# Pistachio by Masala Twist - Restaurant Website

A modern, responsive restaurant website showcasing Indian and Middle Eastern fusion cuisine with an elegant design and interactive features.

---

## 🌟 Features

### Design & User Experience
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices  
- **Dark/Light Mode:** Toggle between themes with persistent preference storage  
- **Smooth Animations:** Hover effects, transitions, and interactive elements  
- **Hero Carousel:** Auto-rotating image slideshow with navigation dots  
- **Modern Typography:** Playfair Display font for elegant branding  

### Interactive Elements
- **Interactive Menu Preview:** Hover effects reveal dish descriptions  
- **Signature Dishes Gallery:** Grid layout with spicy/vegan badges  
- **Chatbot Interface:** AI-powered customer service assistant  
- **Mobile-First Navigation:** Collapsible menu for mobile devices  
- **Smooth Scrolling:** Seamless navigation between sections  

### Content Sections
- **Hero Section:** Rotating image carousel with brand introduction  
- **Menu Taste:** Visual preview of different dish categories  
- **Our Story:** Brand narrative with core values  
- **Signature Dishes:** Featured menu items with descriptions  
- **Customer Reviews:** Social proof and testimonials  
- **Feedback Form:** Contact form for customer inquiries  
- **Location & Hours:** Business information and embedded map  

---

## 🚀 Technologies Used
- **HTML5:** Semantic markup structure  
- **CSS3:** Custom styling with Tailwind CSS framework  
- **JavaScript:** Interactive functionality and DOM manipulation  
- **Tailwind CSS:** Utility-first CSS framework  
- **Google Fonts:** Playfair Display typography  
- **Google Maps:** Embedded location map  


# Pistachio Chatbot Assistant

[![GitHub Pages](https://github.com/joyyy-99/Pistachio/actions/workflows/deploy-frontend.yml/badge.svg)](https://joyyy-99.github.io/Pistachio/)
[![Render Deploy](https://img.shields.io/badge/Deployed%20on-Render-46E097?style=flat&logo=render)](https://pistachio-hgr6.onrender.com/)

An intelligent web-based conversational AI powered by Google's Gemini API, designed to provide helpful and interactive responses.

---

## 1. Project Overview

The Pistachio Chatbot Assistant is a sophisticated conversational agent built with a decoupled architecture. It features a static web frontend, hosted conveniently on GitHub Pages, and a robust FastAPI backend. This backend leverages the power of Google's Gemini AI API for natural language understanding and generation, with its deployment managed on Render.

Users can seamlessly interact with the chatbot by posing questions or providing prompts, which are then processed by the AI backend to deliver relevant and intelligent replies.

## 2. Features

* **Interactive Chat Interface:** A user-friendly and engaging web interface for seamless conversations.
* **AI-Powered Responses:** Utilizes the cutting-edge Google Gemini API for advanced natural language understanding and generation capabilities.
* **FastAPI Backend:** A high-performance, asynchronous Python backend for efficient handling of API requests.
* **Containerized Backend:** Dockerized for consistent, reliable, and portable deployment across various environments.
* **Separated Frontend & Backend:** A decoupled architecture promoting scalable development, independent deployments, and clear separation of concerns.

## 3. Local Development Setup

Follow these steps to set up the Pistachio Chatbot Assistant for local development.

### 3.1. Prerequisites

Ensure you have the following installed on your system:

* **Git:** For version control operations.
* **Python 3.8+:** The required Python version for the backend.
* **pip:** Python package installer (typically included with Python).
* **Docker Desktop:** (Optional) If you prefer to build and run the backend within a Docker container.
* **A Google Gemini API Key:** Obtain this crucial key from the [Google AI Studio](https://aistudio.google.com/).

### 3.2. Frontend Setup

The frontend is a static web application.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/joyyy-99/Pistachio.git](https://github.com/joyyy-99/Pistachio.git)
    cd Pistachio
    ```

2.  **Open in Browser:**
    You can directly open `index.html` in your web browser. However, for full functionality and to interact with the chatbot, you will need the backend running locally.

3.  **Configure Backend URL:**
    Locate the `chatbot.js` file (e.g., within `scripts/chatbot.js` or `src/chatbot.js`) and update the `backend_url` variable to point to your local backend instance.

    ```javascript
    // In chatbot.js
    const backend_url = '[http://127.0.0.1:8000/chat](http://127.0.0.1:8000/chat)'; // Change this for local testing
    ```

    * Use `http://127.0.0.1:8000/chat` if running the backend directly.
    * Use `http://localhost:8000/chat` if running the backend in Docker.

### 3.3. Backend Setup

The backend is a Python FastAPI application.

1.  **Navigate to Backend Directory:**
    ```bash
    cd chatbot_backend
    ```

2.  **Create and Activate Virtual Environment:**
    ```bash
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    ```

3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    (Note: The original text mentioned Poetry, but `pip install -r requirements.txt` is the standard way after `py -m venv venv` and it seems `requirements.txt` would be generated for `pip`.)

4.  **Set up Environment Variables:**
    Create a `.env` file in the `chatbot_backend` directory with your Gemini API Key:

    ```ini
    GOOGLE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```

    **Important:** Do **NOT** commit your `.env` file to Git. Add `.env` to your `.gitignore` file.

5.  **Run the Backend (Directly):**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The backend will be accessible at `http://127.0.0.1:8000`.

6.  **Run the Backend (using Docker - Optional):**
    Ensure Docker Desktop is running before proceeding.

    * **Build the Docker image:**
        ```bash
        docker build -t pistachio-chatbot-backend .
        ```
    * **Run the container:**
        ```bash
        docker run -p 8000:8000 --env-file ./.env pistachio-chatbot-backend
        ```
    The backend will be accessible at `http://localhost:8000`.

---

## 5. Deployment

The Pistachio Chatbot Assistant utilizes continuous deployment for both its frontend and backend components.

* **Frontend (GitHub Pages):**
    The static frontend is automatically deployed via GitHub Actions to GitHub Pages. Any changes pushed to the `main` branch will trigger a redeployment.
    **Live URL:** [https://joyyy-99.github.io/Pistachio/](https://joyyy-99.github.io/Pistachio/)

* **Backend (Render):**
    The FastAPI backend is deployed on Render. Continuous deployment is configured to automatically redeploy the service whenever changes are pushed to the relevant branch in the backend repository.
    **Live API Endpoint:** [https://pistachio-hgr6.onrender.com/](https://pistachio-hgr6.onrender.com/)

---

## 6. API Usage (Postman Examples)

The chatbot backend exposes a single primary endpoint for all conversational AI interactions.

**Base URL:** `https://pistachio-hgr6.onrender.com`

**Endpoint:** `/chat`

**Method:** `POST`

**Description:**
Sends a user message to the chatbot assistant and receives an AI-generated response.

**Request Body:**
A JSON object with a single `message` field.

**Response Body:**
A JSON object with a `response` field containing the AI's reply.

### Example 1: Successful Chat Interaction

**Request:**
* **URL:** `https://pistachio-hgr6.onrender.com/chat`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**
    ```json
    {
        "message": "Hello, how are you today?"
    }
    ```

**Response:**
* **Status:** `200 OK`
* **Body:**
    ```json
    {
        "response": "I'm doing well, thank you for asking! How can I assist you today?"
    }
    ```

### Example 2: Error - Missing `message` Field in Request Body

**Request:**
* **URL:** `https://pistachio-hgr6.onrender.com/chat`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**
    ```json
    {
        "user_input": "This field is not 'message'"
    }
    ```

**Response (Example - actual content may vary slightly based on Pydantic/FastAPI error formatting):**
* **Status:** `422 Unprocessable Entity`
* **Body:**
    ```json
    {
      "detail": [
        {
          "type": "missing",
          "loc": [
            "body",
            "message"
          ],
          "msg": "Field required",
          "input": {
            "user_input": "This field is not 'message'"
          }
        }
      ]
    }
    ```

### Example 3: Error - Empty `message` Field

**Request:**
* **URL:** `https://pistachio-hgr6.onrender.com/chat`
* **Method:** `POST`
* **Headers:** `Content-Type: application/json`
* **Body:**
    ```json
    {
        "message": ""
    }
    ```

**Response (Example - actual content may vary based on your backend's specific handling of empty messages):**
* **Status:** `400 Bad Request` (or `422` if configured differently in your backend logic)
* **Body:**
    ```json
    {
        "detail": "Message cannot be empty."
    }
    ```