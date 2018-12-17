# Packages
library(tidyverse)

# Some random scripts for data extraction

# Data Import
raw <- read.csv("data/sojs18.csv")

##################################################################
##                      JavaScript Flavors                      ##
##################################################################

# Extract flavors of JavaScript
javascript_flavors <- raw[,2:7]

javascript_flavors_table <- data.frame()

for (i in 1:ncol(javascript_flavors)){
  data_ <- javascript_flavors[,i]
  data_ <- table(data_)
  assign(paste(names(javascript_flavors[i])), data_)
  if (nrow(javascript_flavors_table > 0)){
    javascript_flavors_table <- cbind(javascript_flavors_table, get(paste(names(javascript_flavors[i]))))
  } else {
    javascript_flavors_table <- get(paste(names(javascript_flavors[i])))
  }
}

# Convert to data frame
javascript_flavors_table <- as.data.frame(javascript_flavors_table)
names(javascript_flavors_table) <- names(javascript_flavors)

##################################################################
##                     Front End Frameworks                     ##
##################################################################

# Extract flavors of JavaScript
javascript_front_end <- raw[,9:14]

javascript_front_end_table <- data.frame()

for (i in 1:ncol(javascript_front_end)){
  data_ <- javascript_front_end[,i]
  data_ <- table(data_)
  assign(paste(names(javascript_front_end[i])), data_)
  if (nrow(javascript_front_end_table > 0)){
    javascript_front_end_table <- cbind(javascript_front_end_table, get(paste(names(javascript_front_end[i]))))
  } else {
    javascript_front_end_table <- get(paste(names(javascript_front_end[i])))
  }
}

# Convert to data frame
javascript_front_end_table <- as.data.frame(javascript_front_end_table)
names(javascript_front_end_table) <- names(javascript_front_end)

##################################################################
##                          Data Layer                          ##
##################################################################

# Extract flavors of JavaScript
data_layer <- raw[,16:20]

data_layer_table <- data.frame()

for (i in 1:ncol(data_layer)){
  data_ <- data_layer[,i]
  data_ <- table(data_)
  assign(paste(names(data_layer[i])), data_)
  if (nrow(data_layer_table > 0)){
    data_layer_table <- cbind(data_layer_table, get(paste(names(data_layer[i]))))
  } else {
    data_layer_table <- get(paste(names(data_layer[i])))
  }
}

# Convert to data frame
data_layer_table <- as.data.frame(data_layer_table)
names(data_layer_table) <- names(data_layer)

##################################################################
##                      Backend Frameworks                      ##
##################################################################

# Extract flavors of JavaScript
javascript_back_end <- raw[,22:27]

javascript_back_end_table <- data.frame()

for (i in 1:ncol(javascript_back_end)){
  data_ <- javascript_back_end[,i]
  data_ <- table(data_)
  assign(paste(names(javascript_back_end[i])), data_)
  if (nrow(javascript_back_end_table > 0)){
    javascript_back_end_table <- cbind(javascript_back_end_table, get(paste(names(javascript_back_end[i]))))
  } else {
    javascript_back_end_table <- get(paste(names(javascript_back_end[i])))
  }
}

# Convert to data frame
javascript_back_end_table <- as.data.frame(javascript_back_end_table)
names(javascript_back_end_table) <- names(javascript_back_end)

##################################################################
##                      Testing Frameworks                      ##
##################################################################

# Extract flavors of JavaScript
testing <- raw[,29:35]

testing_table <- data.frame()

for (i in 1:ncol(testing)){
  data_ <- testing[,i]
  data_ <- table(data_)
  assign(paste(names(testing[i])), data_)
  if (nrow(testing_table > 0)){
    testing_table <- cbind(testing_table, get(paste(names(testing[i]))))
  } else {
    testing_table <- get(paste(names(testing[i])))
  }
}

# Convert to data frame
testing_table <- as.data.frame(testing_table)
names(testing_table) <- names(testing)