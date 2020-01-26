# importing the necessary packages
import requests
from bs4 import BeautifulSoup
import json, numpy as np
import re
import sys
from googlesearch import search
import nltk 
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# test link
link = 'https://en.wikipedia.org/wiki/Donald_Trump'

searchword = ""
def get_top_results(query):
    my_results_list = []
    for i in search(query,        # The query you want to run
                    tld = 'com',  # The top level domain
                    lang = 'en',  # The language
                    num = 10,     # Number of results per page
                    start = 0,    # First result to retrieve
                    stop = 10,  # Last result to retrieve
                    pause = 3.0,  # Lapse between HTTP requests
                ):
                my_results_list.append(i)
        
    return my_results_list
    

def combine_strings(links):
    articles = ""
    i = 0
    for link in links:
           articles+=((scrape_article(link)))
    articles = cutString(articles)
    print(articles)

def cutString(fullText):
    stop = stopwords.words('english')
    fullText = word_tokenize(fullText.lower())
    fullText = [w for w in fullText if not w in stop]
    # try: 
    #     while True:
    #         fullText.remove(searchword)
    # except ValueError:
    #     pass
    index = len(fullText) - 1
    if len(fullText)>10000:
        del fullText[8000: index ]
    listToStr = ' '.join([str(elem) for elem in fullText]) 
    return listToStr

def scrape_article(url):
    res = requests.get(url)
    if (res.status_code == 200 and 'content-type' in res.headers and
        res.headers.get('content-type').startswith('text/html')):
            html = res.text
    else: #webpage had error loading 
        return ""

    soup = BeautifulSoup(html, 'html.parser')  # find the article title

    h1 = soup.body.find('h1')  # find the common parent for <h1> and all <p>s.
    root = h1

    if(root == None): #there is no content 
        return ""

    # an article may not have fewer than 4 paragraphs
    while root.name != 'body' and len(root.find_all('p')) < 4:
        root = root.parent

    # getting all meaningful paragraphs/content
    ps = root.find_all(['h2', 'h3', 'h4', 'h5', 'p', 'pre'])
    ps.insert(0, h1)    # add the title
    content = [tag2md(p) for p in ps]
    strings = str(content)
    #removing special charcters and numbers.
    # strings = preg_replace( '/(\r\n)+|\r+|\n+|\t+/i', ' ', strings )
    strings = strings.replace("\\r","")
    strings = strings.replace("\\n","")
    filter = ''.join([chr(i) for i in range(1, 32)])
    strings.translate(str.maketrans('', '', filter))
    pat = re.compile(r'[^A-Za-za-z ]+')
    answer = re.sub(pat, '', strings)
    #answer = re.sub('[!@#$À-ÿ]', '', strings)
    # print(content)
    #return content
    ##print(answer)
    return answer 


def tag2md(tag):
    if tag.name == 'p':
        return tag.text
    elif tag.name == 'h1':
        return f'{tag.text}\n{"=" * len(tag.text)}'
    elif tag.name == 'h2':
        return f'{tag.text}\n{"-" * len(tag.text)}'
    elif tag.name in ['h3', 'h4', 'h5', 'h6']:
        return f'{"#" * int(tag.name[1:])} {tag.text}'
    elif tag.name == 'pre':
        return f'```\n{tag.text}\n```'

def printResult(query):
    
    combine_strings(get_top_results(query))
    print("Hi there")
    #sys.stdout.flush()

if __name__ == "__main__":
    # nltk.download('stopwords')
    # nltk.download('punkt')
    # nltk.download('words')
    # nltk.download('wordnet')
    query = str(sys.argv[1])
    searchword = query
    combine_strings(get_top_results(query))
    # printResult("Pokemon")
    
