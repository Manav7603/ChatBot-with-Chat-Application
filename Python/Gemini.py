from langchain_google_genai import ChatGoogleGenerativeAI
import os
import google.generativeai as genai


def gemini(text, query):
    os.environ['GOOGLE_API_KEY'] = "API_KEY"
    genai.configure(api_key=os.environ['GOOGLE_API_KEY'])
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    
    def Generate_Response(text, query):
        prompt = "'''\n" + text + "\n'''" + "Task: \n\nAnswer the query strictly based on the above text:\n" + query
        response = llm.invoke(prompt)
        return response.content
    
    response_content = None
    while response_content == None:
        response_content = Generate_Response(text, query)
        print("Hiii")
        # time.sleep(1)  
    
    return response_content



    my_string= gemini(textt,query)

    print(my_string)