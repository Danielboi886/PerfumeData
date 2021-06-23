## Step 1: Load Data and Required Pacakages

install.packages("devtools")
library(devtools)
library(tidyverse)
install_url('https://cran.r-project.org/src/contrib/Archive/rmongodb/rmongodb_1.8.0.tar.gz')
library(rmongodb)
install_github('SMAPPNYU/smappR')
library(smappR)
install_github('haozhu233/kableExtra')
library(kableExtra)
read.csv("https://www.dropbox.com/s/wvzevr0z39uf44x/final_perfume_data.csv?dl=1") -> perfume_data
perfume_data %>%
  mutate_all(~ifelse(. %in% c("null", ""), NA, .)) %>%
  na.omit() -> perfume_data_clean
str_split(perfume_data_clean$Notes, ", ") -> perfume_data_clean$Notes_new
wordFreq <- word.frequencies(perfume_data_clean$Notes_new, verbose = FALSE)
wordFreq[(1:50)] %>%
  kbl() %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed", "responsive"))%>%
  scroll_box(width = "100%", height = "200px")

## Step 2: Using grep and slice to make a palette! (Here I chose Rose)
wordFreq[(1:50)] %>%
  kbl() %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed", "responsive"))%>%
  scroll_box(width = "100%", height = "200px")
grep('rose', perfume_data_clean$Notes_new, value=TRUE) -> rose_list 
rose_match <- word.frequencies(rose_list, verbose = FALSE)
rose_match_df <- as.data.frame(rose_match)
library(data.table)
setDT(rose_match_df, keep.rownames = "Notes")
slice(rose_match_df,2:31) %>%
  kbl() %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed", "responsive"))%>%
  scroll_box(width = "100%", height = "400px")

## Step 3: Multiple formulas

grep('bergamot.*jasmine.*rose', perfume_data_clean$Notes_new, value=TRUE) -> bergamotjasminerose_list
bergamotjasminerose_match <- word.frequencies(bergamotjasminerose_list, verbose = FALSE)
```
```{R, echo = TRUE, message = FALSE, warning = FALSE, results = TRUE}
bergamotjasminerose_match_df <- as.data.frame(bergamotjasminerose_match)
library(data.table)
setDT(bergamotjasminerose_match_df, keep.rownames = "Notes")
slice(bergamotjasminerose_match_df,2:31) %>%
  kbl() %>%
  kable_styling(bootstrap_options = c("striped", "hover", "condensed", "responsive"))%>%
  scroll_box(width = "100%", height = "400px")
```
```{R, echo = FALSE, message = FALSE, warning = FALSE, results = FALSE}
rm(bergamotjasminerose_list)
rm(bergamotjasminerose_match)
rm(bergamotjasminerose_match_df)