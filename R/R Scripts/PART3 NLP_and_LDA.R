## Step 1: Load Data and Required Pacakages

install.packages("devtools")
library(devtools)
library(tidyverse)
install_github('haozhu233/kableExtra')
library(kableExtra)
install.packages("topicmodels")
library(topicmodels)
library(tm)
library(formattable)
install.packages("tidytext")
library(tidytext)
library(tidyr)
install_github('SMAPPNYU/smappR')
library(smappR)
install.packages("ggrepel")
library(ggrepel)
install.packages("qdap")
library(qdap)
library(remotes)
install_github("EmilHvitfeldt/textdata")
library(textdata)
read.csv("https://www.dropbox.com/s/wvzevr0z39uf44x/final_perfume_data.csv?dl=1") -> perfume_data
perfume_data %>%
  mutate_all(~ifelse(. %in% c("null", ""), NA, .)) %>%
  na.omit() -> perfume_data_clean
des <- perfume_data_clean$Description
des_df <- tibble(line= 1:2111, text = des)
des_df_raw <- des_df %>% 
  unnest_tokens(word, text) %>% 
  anti_join(stop_words)
rm(des)
rm(des_df)

## Step 2: Notes Popularity
des <- perfume_data_clean$Description
des_df <- tibble(line= 1:2111, text = des)
des_df_duo <- des_df %>%
  unnest_tokens(bigram, text, token = "ngrams", n = 2) %>%
  separate(bigram, c("word1", "word2"), sep = " ") %>%
  filter(!word1 %in% stop_words$word,
         !word2 %in% stop_words$word) %>%
  count(word1, word2, sort = TRUE) 
rm(des)
rm(des_df)

notes_trend <- des_df_duo %>%
  filter(!word1 %in% c("top", "middle", "base"), 
         word2 == "notes") %>%
  slice(1:50) 
ggplot(notes_trend, aes(x = reorder (word1, n), y = n)) +
  geom_col() +
  labs(title="Notes Popularity",
       x = "Notes",
       y = "Frequency") +
  coord_flip()

## Step 3:  Topic Modeling using LDA
my_colors <- c("#E69F00", "#A2CFE8", "#8FE3CC", "#CC79A7", "#D55E00", "#D5000, #E391E6","#EFF5BF" )

theme_lyrics <- function(aticks = element_blank(),
                         pgminor = element_blank(),
                         lt = element_blank(),
                         lp = "none")
{
  theme(plot.title = element_text(hjust = 0.5), 
        axis.ticks = aticks, 
        panel.grid.minor = pgminor, 
        legend.title = lt, 
        legend.position = lp)
}

my_kable_styling <- function(dat, caption) {
  kable(dat, "html", escape = FALSE, caption = caption) %>%
    kable_styling(bootstrap_options = c("striped", "condensed", "bordered"),
                  full_width = FALSE)
}

word_chart <- function(data, input, title) {
  data %>%
    ggplot(aes(as.factor(row), 1, label = input, fill = factor(topic) )) +
    geom_point(color = "transparent") +
    geom_label_repel(nudge_x = .2,  
                     direction = "y",
                     box.padding = 0.1,
                     segment.color = "transparent",
                     size = 3) +
    facet_grid(~topic) +
    theme_lyrics() +
    theme(axis.text.y = element_blank(), axis.text.x = element_blank(),
          panel.grid = element_blank(), panel.background = element_blank(),
          panel.border = element_rect("lightgray", fill = NA),
          strip.text.x = element_text(size = 11)) +
    labs(x = NULL, y = NULL, title = title) +
    coord_flip()
}

dtm <- des_df_raw %>%
  count(line, word, sort = TRUE) %>%
  ungroup() %>%
  cast_dtm(line, word, n)

k <- 8 
seed = 1234
lda <- LDA(dtm, k = k, method = "GIBBS", control = list(seed = seed))

num_words <- 20 

top_terms_per_topic <- function(lda_model, num_words) {
  topics_tidy <- tidy(lda_model, matrix = "beta")
  top_terms <- topics_tidy %>%
    group_by(topic) %>%
    arrange(topic, desc(beta)) %>%
    slice(seq_len(num_words)) %>%
    arrange(topic, beta) %>%
    mutate(row = row_number()) %>%
    ungroup() %>%
    mutate(topic = paste("Topic", topic, sep = " "))
  title <- paste("Top terms for", k, "Notes")
  word_chart(top_terms, top_terms$term, title)
}
top_terms_per_topic(lda, num_words)

## Step 4: Emotional value detection 

adj_adv_depo <- des_df_raw %>%
  left_join(parts_of_speech) %>%
  filter(pos %in% c("Adjective","Adverb")) %>%
  pull(word) %>%
  unique

head(adj_adv_depo)

adj_adv_depo_df <- data.frame(adj_adv_depo)
colnames(adj_adv_depo_df) <- c("word") 
nrc_dict <- get_sentiments("nrc")
emo_dict <- inner_join (adj_adv_depo_df, nrc_dict, by = "word") %>%
  filter(sentiment %in% c("anger", "anticipation", "disgust", "fear", "joy", "sadness", "surprise", "trust")) %>% 
  count(sentiment)
emo_dict %>%
  kbl() %>%
  kable_styling() 

sdi_dict <- inner_join (adj_adv_depo_df, nrc_dict, by = "word") %>%
  filter(sentiment %in% c("positive", "negative")) %>% 
  count(sentiment)
sdi_dict %>%
  kbl() %>%
  kable_styling()
