import sys

from flask import Flask, render_template, request, redirect, Response
from flask_cors import CORS, cross_origin
import random, json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from sentimentAnalysis import test as sent_ana
print("loaded Sentiment Analysis")
# from spamClassification import test as spam_cls
# print("loaded Spam Classification")

@app.route('/review', methods = ['POST'])
@cross_origin()
def getRev():
  # return 1;
  # pass
  # print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  # return 1
  data = request.get_json()
  # print(data)
  # res = spam_cls(data["review"])
  # if res == 0:
  # return
  sentiment = sent_ana(data["review"])
  print(sentiment)
  return json.dumps({"sentiment":sentiment, "spam":False})
  # else :
    # return json.dumps({"spam":True})


if __name__ == '__main__':
	app.run(debug=True)
