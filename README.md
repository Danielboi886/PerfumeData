# PerfumeData
In this project I used a data base that includes name, description, notes and image of more than 2000 perfumes to build a perfume evaluation system. 

The database can you find it over <https://www.kaggle.com/nandini1999/perfume-recommendation-dataset>

## First part: Data Preperation

It contains two version: Python and R.

There are three parts in this project:

1. Data Clean and Word Frequency Count

2. String matching 

3. LDA and emotional analysis

For Projects in R, please go to PerfumeData/R. I dumped both rmd files and knitted HTMLS in the repo. 

For Projects in Python, please go to PerfumeData/Python. There's a jupyter notebook file. I also upload it on my Google Colab:<https://colab.research.google.com/drive/1OFxqTxruJoGZp6c22hrT6caxH2JrOM8Y?usp=sharing> 


## Second part: Data Presentation 

I will be working with HTML/CSS and Javascript to let user get access to the perfume they want. 

*Update: Since there's no Perfume API for this assignment, I chose to persent a peom that includes the notes & emotions in its line. 

User will put in notes & emotions they are looking for (search matrix), and the corresponding search results will be retrived from the JavaScript database.

The search matrix (aka notes) have already been worked out and database have been cleaned. 

Now the roadmap will be 

1. Convert retrived data into JavaScript Object Notation. 
2. Write the search function where the script will return corresponding data based on search matrix. 
3. Beautify the user interface. 

You can have a look at it here

<https://danielboi886.github.io/Pick-A-Poem-API-Project/index.html>

------------------------------------------------------------
## Some highlights of my research: 

* Musk,sandalwood, vanilla, patchouli, jasmine, bergamot and amber are among the most used ingredients in my perfume data list. 

* With string macthing, I created my own perfume formulas based on the exsisting perfume formulas in the data base. 

  * My perfume is called : **Zesty While** 
  
   * **Zesty White's formula: Bergamot, Jasmine, Rose, Musk, Incense, Ylang-ylang, Tuberose, Pepper, Labdanum, Lily, Benzoin**
   
* After Latent Dirichlet Allocation analysis, I worked out 8 notes and their corresponding projections from the database. 

Notes	|Projections
------------- | -------------
Vetiver & Sandalwood |	Classical and elegant
Oud & Oriental |	Exotic, mysterious and dark
Vanilla & Gourmand |	Sweet, warm and delicous
Spicy & Woody |	Mordern, unique, sexy and complex
Rose & White Flowers | Beautiful, gentle, romantic, feminine, and light
Earthy & Dry | Aromatic and natural
Iris & Musk | Warm, delicate, sensual and feminine
Citrus & Sea | Summer, bright, fresh, and cool

--------------------------------------------------------------
Please also have a look at these books/articles! They helped me a lot throughout the project! 

Debbie Lieske’s Machine Learning and NLP using R: Topic Modeling and Music Classification
<https://www.datacamp.com/community/tutorials/ML-NLP-lyric-analysis>

Jordan Barber's Blog Post: Latent Dirichlet Allocation (LDA) with Python 
<https://http://rstudio-pubs-static.s3.amazonaws.com/79360_850b2a69980c4488b1db95987a24867a.html>

Julia Silge & David Robinson's Text Mining with R: A Tidy Approach 
<https://www.tidytextmining.com/index.html>

String Matching in R Programming 
<https://www.geeksforgeeks.org/string-matching-in-r-programming/>
