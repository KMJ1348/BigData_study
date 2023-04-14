from flask import Flask, render_template
from flask import request
app = Flask(__name__)

@app.route('/') #접속하는 url
def index():
 
    return render_template('index.html')

@app.route('/test') #접속하는 url
def index2():

    return render_template('index2.html')

@app.route('/test4') #접속하는 url
def index4():
 
    return render_template('index4.html')

@app.route('/table') #접속하는 url
def index5():
 
    return render_template('index5.html')
if __name__=="__main__":
    app.run(debug=True)

