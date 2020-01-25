# importing the necessary packages
import requests
from bs4 import BeautifulSoup
import numpy as np 


#test link
link = 'https://en.wikipedia.org/wiki/Donald_Trump'


def scrape_article(url):
    res = requests.get(link)
    if (res.status_code == 200 and 'content-type' in res.headers and
        res.headers.get('content-type').startswith('text/html')):
            html = res.text
   
    soup = BeautifulSoup(html, 'html.parser')# find the article title
    
    h1 = soup.body.find('h1')# find the common parent for <h1> and all <p>s.
    root = h1

    #an article may not have fewer than 4 paragraphs
    while root.name != 'body' and len(root.find_all('p')) < 4:
        root = root.parent

    #getting all meaningful paragraphs/content
    ps = root.find_all(['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'])
    ps.insert(0, h1)    # add the title
    content = [tag2md(p) for p in ps]
    print(content)

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

if __name__ == "__main__":
    scrape_article(link) 
    
