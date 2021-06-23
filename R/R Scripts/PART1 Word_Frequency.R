##Step 1: Install all required packages and load data
install.packages("devtools")
library(devtools)
library(tidyverse)
library(dplyr)
install_url('https://cran.r-project.org/src/contrib/Archive/rmongodb/rmongodb_1.8.0.tar.gz')
library(rmongodb)
install_github('SMAPPNYU/smappR')
library(smappR)
install_github('haozhu233/kableExtra')
library(kableExtra)
read.csv("https://www.dropbox.com/s/wvzevr0z39uf44x/final_perfume_data.csv?dl=1") -> perfume_data
## Step 2: Data Cleaning! 
perfume_data %>%
  mutate_all(~ifelse(. %in% c("null", ""), NA, .)) %>%
  na.omit() -> perfume_data_clean
str_split(perfume_data_clean$Notes, ", ") -> perfume_data_clean$Notes_new
wordFreq <- word.frequencies(perfume_data_clean$Notes_new)
Notes_frequency <- as.data.frame(wordFreq)
library(data.table)
setDT(Notes_frequency, keep.rownames = "Notes")
tibble(Notes_frequency)
## Step 3: Visualize! 
library(dplyr)
library(ggplot2)
Notes_frequency%>% 
  arrange(desc(wordFreq)) %>%
  slice(1:20) %>%
  ggplot(., aes(x = reorder(Notes, wordFreq), y = wordFreq)) +
  geom_col() +
  labs(title="Ingredients Frequency",
       x = NULL,
       y = "Frequency") +
  coord_flip()