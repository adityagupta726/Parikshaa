
import pandas as pd
import numpy as np
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer, PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

def textProcessing(df):
    tokens = []
    for i in range(len(df)):
        tokens.append(word_tokenize(df["review"][i]))
        
    stopwordsList = stopwords.words("english")
    stopwordsList.extend([",",".","/","'","\"","\\","?","<",">",";",":","[","]","|","{","}","=","+","-","_",")","(","*","&","^","%","$","#","@","!","`","~"])
    
    wordsList = []
    for tokenList in tokens:
        words = []
        for word in tokenList:
            if word.lower() not in stopwordsList:
                words.append(word.lower())
        wordsList.append(words)
        
    wnet = WordNetLemmatizer()
    for i in range(len(wordsList)):
        for j in range(len(wordsList[i])):
            wordsList[i][j] = wnet.lemmatize(wordsList[i][j], pos="v")
    
    for i in range(len(wordsList)):
        wordsList[i] = " ".join(wordsList[i])
        
    return wordsList

dataset = pd.read_csv('reviewDataset.txt', sep='\t', header=None)
df = pd.DataFrame(dataset)
df.columns = ['review', 'sentiment']

wordsList = textProcessing(df)

cv = CountVectorizer()
vect = cv.fit_transform(wordsList)

y = df['sentiment'].values

x_train,x_test,y_train,y_test = train_test_split(vect,y,test_size=0.1)

reg = LogisticRegression()

reg.fit(x_train,y_train)

def test(rev):
    review = {'review': [rev]}
    df = pd.DataFrame(review) 
    wordsList = textProcessing(df)
    vect = cv.transform(wordsList)
    prediction = reg.predict(vect)
    if prediction[0] == 0:
        return "Negative"
    else:
        return "Positive"
