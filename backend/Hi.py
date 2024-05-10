import pandas as pd
print("Hello")

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

user_query = data["query"]
e=user_query.split()
r=e[1].split(',')
error=""

columns,data,error=get_data(r)

if e[0].lower() is not "compare":
    error="wrong query input."
if error=="": 
    return json.dumps({"columns":columns,"data":data,"error":"NaN"}),200
else:
    return json.dumps({"columns":"NaN","data":"NaN","error":error}),200
except Exception as e:
return {"error": str(e)},500