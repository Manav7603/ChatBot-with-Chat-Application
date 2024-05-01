import os
import google.generativeai as genai

GOOGLE_API_KEY="API_Key"
genai.configure(api_key=GOOGLE_API_KEY)
model=genai.GenerativeModel("gemini-pro") 

chat = model.start_chat(history=[])

def get_gemini_response(question):
    
    response=chat.send_message(question,stream=True)
    return response

input="hi"
response=get_gemini_response(input)
print(response)
for chunk in response:
    print(chunk.text)
    
