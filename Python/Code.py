import pandas as pd
import nltk
import numpy as np
from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
from nltk.stem.porter import PorterStemmer
from gensim import corpora, models
import gensim

perfumeData = pd.read_csv("https://www.dropbox.com/s/wvzevr0z39uf44x/final_perfume_data.csv?dl=1", encoding='latin-1')
perfumeData_clean = perfumeData.dropna(0,'any')

ingredientsFreq = perfumeData_clean.Notes.str.split(pat=", ", expand = True).stack().str.lower().str.strip().value_counts()
ingredientsFreq[0:21].plot(kind="barh", fontsize=12, figsize=(10,7)).invert_yaxis()

from itertools import chain
from collections import Counter
IngList = perfumeData_clean.Notes.str.split(pat=", ").tolist()
RoseList = []
matchword = "rose"
for y in IngList:
  for x in y:
    if matchword == x:
      RoseList.append(y)
RoseFreq = Counter(chain.from_iterable(RoseList))
Rosedf = pd.DataFrame(RoseFreq.items(), columns=['Ingredients', 'Frequencies']).sort_values(by=['Frequencies'], ascending=False)[0:20]
Rosedf

pip install stop-words

tokenizer = RegexpTokenizer(r'\w+')
en_stop = get_stop_words('en')

p_stemmer = PorterStemmer()

pd.set_option("display.max_rows", 20)
des = perfumeData_clean["Description"].str.split('.').apply(pd.Series,1).stack()
des.index = des.index.droplevel(-2)
des.replace('', np.nan, inplace=True)
des.dropna(inplace=True)
print(type(des))
des_lst = des.tolist()
des_lst

tok = []

for i in des_lst:
  raw = i.lower()
  tokens = tokenizer.tokenize(raw)
  stopped_tokens = [i for i in tokens if not i in en_stop]
  stemmed_tokens = [p_stemmer.stem(i) for i in stopped_tokens]
  tok.append(stemmed_tokens)

dictionary = corpora.Dictionary(tok)
corpus = [dictionary.doc2bow(text) for text in tok]

ldamodel = gensim.models.ldamodel.LdaModel(corpus, num_topics=8, id2word = dictionary, passes=20)

lda_topic = print(ldamodel.print_topics(num_topics=8, num_words=20))

print(lda_topic)
