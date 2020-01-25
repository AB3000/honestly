# importing the necessary packages
import requests
from bs4 import BeautifulSoup
import numpy as np
from googlesearch import search




# test link
link = 'https://en.wikipedia.org/wiki/Donald_Trump'


def get_top_results(query):
    my_results_list = []
    for i in search(query,        # The query you want to run
                    tld = 'com',  # The top level domain
                    lang = 'en',  # The language
                    num = 15,     # Number of results per page
                    start = 0,    # First result to retrieve
                    stop = 15,  # Last result to retrieve
                    pause = 3.0,  # Lapse between HTTP requests
                ):
                my_results_list.append(i)
        
    return my_results_list
    

def combine_strings(links):
    for link in links:
            print(scrape_article(link))


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
    ps = root.find_all(['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'])
    ps.insert(0, h1)    # add the title
    content = [tag2md(p) for p in ps]
    
    # print(content)
    return content 


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
    # scrape_article(link)
    combine_strings(get_top_results('dump'))
   
    
