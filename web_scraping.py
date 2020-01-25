#for reading the webpage
import pandas as pd

from nltk.stem import SnowballStemmer
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
import urllib.request
from bs4 import BeautifulSoup

import regex as re  # regex matching

"""
Algorithm: 
Crawled the webpage and extracted all the sentences from it.
Then went through each attribute, and picked out relevant sentences.
Then trained the model for each attribute and fed website sentences into it. 
"""
import nltk
# import list of stopwords (conjunctions, prepositions) and dictionary words
from nltk.corpus import stopwords
from nltk.corpus import wordnet 

# import sentence splitting algorithm tools
from gensim.models.doc2vec import Doc2Vec
from gensim.models.doc2vec import TaggedDocument


#test link
link = 'https://www.foxnews.com/politics/new-ukraine-charges-fly-amid-giuliani-evidence-secret-trump-tape'

#function to download any necessary ML packages
def download_packages():
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('wordnet')
    nltk.download('words')

def assess_website(link):
    """
        Parameters: 
            link: the URL to the policy
        Returns: 
            clean_tokens: All sentences on the website 
    """
    # read the webpage
    response = urllib.request.urlopen(link)
    html = response.read()

    # take out sentences/tokens from webapge
    soup = BeautifulSoup(html, 'html5lib')
    text = soup.body.get_text(strip=True)
    sentences = (sent_tokenize(text))

    english_vocab = set(w.lower() for w in nltk.corpus.words.words())

    for words in sentences[:]:
        # lazy way of removing sentences with just html in webpage
        if '{' in words or '}' in words or "[]" in words:
            sentences.remove(words)
            continue

    return sentences


#TO TEST PYTHON CODE SEPARATELY
if __name__ == "__main__":

    #UNCOMMENT IF YOU HAVE NOT DOWNLOADED NLTK PACKAGES
    download_packages()
    print(assess_website(link))
