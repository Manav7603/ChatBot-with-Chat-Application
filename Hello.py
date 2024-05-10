# import os
# import google.generativeai as genai

# GOOGLE_API_KEY="API_Key"
# genai.configure(api_key=GOOGLE_API_KEY)
# model=genai.GenerativeModel("gemini-pro") 

# chat = model.start_chat(history=[])

# def get_gemini_response(question):
    
#     response=chat.send_message(question,stream=True)
#     return response

# input="hi"
# response=get_gemini_response(input)
# print(response)
# for chunk in response:
#     print(chunk.text)
import pandas as pd    

df=pd.read_csv('data.csv')
df.fillna(0)
def get_data(r):
    columns=df.columns.tolist()
    error=""
    data=[]
    for x in r:
        d=df[df['Stone ID']==int(x)]
        # print(d.values.tolist()[0])
        if d.empty:
             error="Given Diamond is not present"
        else:
            data.append(d.values.tolist()[0])

    return columns,data,error