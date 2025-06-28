# main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Pistachio Restaurant Chatbot API",
    description="Backend API for the Pistachio Restaurant chatbot, powered by Gemini AI.",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
origins = [
    "*",
    # "http://localhost:3000",
    # "https://my-frontend-domain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

# Retrieve Gemini API Key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables. Please set it in your .env file.")

# Configure the Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the Generative Model
# Safety settings are configured to block harmful content.
model = genai.GenerativeModel(
    'gemini-2.0-flash',
    safety_settings={
        'HARASSMENT': 'BLOCK_NONE',
        'HATE': 'BLOCK_NONE',
        'SEXUALLY_EXPLICIT': 'BLOCK_NONE',
        'DANGEROUS': 'BLOCK_NONE'
    }
)

# Define a Pydantic model for incoming chat requests
class ChatRequest(BaseModel):
    message: str

# Define your restaurant's context
RESTAURANT_CONTEXT = """
You are the Pistachio Assistant, a friendly and helpful AI chatbot for "Pistachio Restaurant."
Your goal is to provide accurate, concise, and engaging information about Pistachio Restaurant
in a warm, inviting, and professional tone. Always refer to yourself as "Pistachio Assistant".

Pistachio Restaurant is a vibrant and cozy dining spot specializing in fresh, seasonal ingredients
with a focus on modern European cuisine, infused with delightful Mediterranean flavors.

--- Restaurant Details ---
- **Opening Hours:**
  - Monday to Friday: 11:00 AM - 10:00 PM
  - Saturday: 10:00 AM - 11:00 PM
  - Sunday: 10:00 AM - 9:00 PM
  - We are closed on all major public holidays unless otherwise announced on our website.

- **Recommended and Signature Dishes:**
  - Our most popular dishes include:
    - **Seared Scallops with Lemon-Herb Risotto:** A delicate and flavorful starter.
    - **Pistachio Crusted Lamb Chops:** Our signature main course, perfectly cooked and served with seasonal vegetables.
    - **Mediterranean Sea Bass en Papillote:** Light, healthy, and bursting with fresh flavors.
    - **Pistachio & Rosewater Semifreddo:** A unique and refreshing dessert.
  - We also have daily specials that highlight the freshest seasonal produce.

- **Locations & How to Find Us:**
  - We have one primary location: 123 Green Street, Flavortown, KT1 4PR.
  - We are conveniently located near the central market, easily accessible by public transport (bus routes 42, 78) and have ample street parking available.

- **Booking & Reservations:**
  - Guests can reserve a table directly through our website at www.pistachiorestaurant.com/reservations.
  - You can also call us at (020) 1234 5678 during opening hours to make a reservation.
  - We recommend booking especially for weekend dinners and large groups. Walk-ins are welcome, but subject to availability.

- **Dietary & Special Menu Accommodations:**
  - We offer a wide range of vegetarian, vegan, and gluten-free options clearly marked on our menu.
  - Please inform our staff about any allergies or dietary restrictions when making a reservation or upon arrival, and our chefs will do our best to accommodate your needs.
  - We have a separate allergen menu available upon request.

- **Contact Information:**
  - Phone: (020) 1234 5678
  - Email: info@pistachiorestaurant.com
  - For catering inquiries: catering@pistachiorestaurant.com
  - Our website contact page: www.pistachiorestaurant.com/contact

- **Other Information:**
  - **Ambiance:** Casual yet elegant, perfect for family dinners, romantic dates, or business lunches.
  - **Kids Menu:** Yes, we have a specially curated kids menu.
  - **Private Events:** We offer private dining options for special events. Please contact us for details.
  - **Gift Vouchers:** Available for purchase on our website or directly at the restaurant.
  - **Brand Voice:** Friendly, inviting, knowledgeable, professional, and slightly sophisticated.
"""

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Handles incoming chat messages, processes them with Gemini AI,
    and returns a chatbot response.
    """
    user_message = request.message.strip()

    if not user_message:
        # Return a 400 Bad Request if the message is empty
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    try:
        # Construct the prompt for the AI, combining context and user query
        full_prompt = f"""
        {RESTAURANT_CONTEXT}

        User's question: {user_message}

        Pistachio Assistant's response:
        """

        # Generate content using the Gemini model
        # The prompt is designed to elicit answers specifically about the restaurant.
        response = model.generate_content(full_prompt)

        # Extract the text from the response.
        # Check if response has text content, otherwise handle accordingly.
        if response and response.text:
            chatbot_answer = response.text.strip()
        else:
            # Handle cases where the AI might not return a text response
            raise Exception("Gemini AI did not return a text response.")

        return {"answer": chatbot_answer}

    except genai.types.BlockedPromptException as e:
        # This occurs if the prompt violates safety guidelines.
        print(f"Prompt blocked by safety settings: {e}")
        raise HTTPException(status_code=422, detail="Your message was blocked by safety filters. Please try rephrasing.")
    except Exception as e:
        # Catch any other unexpected errors during the AI generation or processing
        print(f"An error occurred: {e}")
        # Return a generic server error to the frontend, avoiding exposing internal details
        raise HTTPException(status_code=500, detail="An internal server error occurred while processing your request. Please try again.")

@app.get("/")
async def root():
    """
    Root endpoint to confirm the API is running.
    """
    return {"message": "Pistachio Chatbot Backend is running!"}

