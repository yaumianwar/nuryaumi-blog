---
title: 'Students Exam Scores (Kaggle Dataset) Data Analysis'
date: '2023-07-17'
intro: "Recently, i learn statictics (again) from scratch at Datacamp Statictics Course and Academy Statistics Playlist at Youtube. I already completed my course at datacamp, but haven't finished studying at Khan Academy. Last week, i decided to did data analysis for Students Exam Scores Dataset from Kaggle."
---

Recently, i learn statictics (again) from scratch at **[Datacamp Statictics Course](https://app.datacamp.com/learn/courses/introduction-to-statistics)** and **[Khan Academy Statistics Playlist at Youtube](https://www.youtube.com/playlist?list=PL1328115D3D8A2566)**. I already completed my course at datacamp, but haven't finished studying at Khan Academy. Last week, i decided to did data analysis for  **[Students Exam Scores Dataset](https://www.kaggle.com/datasets/desalegngeb/students-exam-scores?resource=download)** from Kaggle.
I doing my analysis using python, i use pandas to load, clean and doing descriptice analysis, I also using seaborn to create data vizualization.

Here's the steps of my analysis journey:
1. Load dataset using pandas
2. Check if the dataset has null value or not, then assign value to the null data
3. Doing exploratory data analysis

## Load Dataset
```
# import library
import pandas as pd
import numpy as np

# read data from csv
original_data = pd.read_csv('data/Original_data_with_more_rows.csv')
expanded_data = pd.read_csv('data/Expanded_data_with_more_features.csv')

# drop index columns
original_data = original_data.drop("Unnamed: 0",axis=1)
expanded_data = expanded_data.drop("Unnamed: 0",axis=1)
```
There're two dataset for student exam score, original and expanded data with more column. I read them all to compare the value before decide which dataset i will use.
```
# compare length of original and expanded data summary
print(len(original_data.index), len(expanded_data.index))
# output: 30641 30641
```

expanded_data data length and original_data data length is equal, that's mean that the identity of each row is same. So i choose to use expanded data since the data has more information.
```
expanded_data.head()
```
![](/student-exam-scores/data-header.png)

## Data Cleaning
### Check the null value of each column
```
# check missing value percentage for each column using isnull func
print(pd.DataFrame({"total of NULL data in each columns:": expanded_data.isnull().sum(), 
                    '%NaN': round(expanded_data.isnull().sum()/len(expanded_data.index) * 100, 2)}))
```
![small](/student-exam-scores/data-cleaning-checknull-1.png)

- There are 9 columns that have null value
- The higher null value percentage comes from TransportMeans column
- Other nullable columns have percentage of null value under 10%

### Assign value to the null data
```
# fill EthnicGroup with 'unknown' value
expanded_data["EthnicGroup"].fillna('unknown', inplace=True)

# fill ParentEduc with 'unknown' value
expanded_data["ParentEduc"].fillna('unknown', inplace=True)

# fill TestPrep with 'none' value
expanded_data["TestPrep"].fillna('none', inplace=True)

# fill ParentMaritalStatus with 'unknown' value
expanded_data["ParentMaritalStatus"].fillna('unknown', inplace=True)

# fill PracticeSport with 'never' value
expanded_data["PracticeSport"].fillna('never', inplace=True)

# fill IsFirstChild with 'no' value
expanded_data["IsFirstChild"].fillna('no', inplace=True)

# fill NrSiblings with 0.0 value
expanded_data["NrSiblings"].fillna(0.0, inplace=True)

# fill TransportMeans with 'unknown' value
expanded_data["TransportMeans"].fillna('unknown', inplace=True)

# fill WklyStudyHours with 'unknown' value
expanded_data["WklyStudyHours"].fillna('unknown', inplace=True)
```

- `EthnicGroup`: assign the missing values with a new category called "unknown", since we do not have enough information to infer the missing values.
- `ParentEduc`: assign the missing values with a new category called "unknown", since we do not have enough information to infer the missing values.
- `TestPrep`: assign the missing values with 'no' since the missing values likely indicate that the student did not have test preparation.
- `ParentMaritalStatus`: assign the missing values with a new category called "unknown", since we do not have enough information to infer the missing values.
- `PracticeSport`: assign the missing values with 'never' since the missing values likely indicate that the student did not practice sport.
- `IsFirstChild`: assign the missing values with 'no' since the missing values likely indicate that the student is not first child.
- `NrSiblings`: assign the missing values with '0' since the missing values likely indicate that the student doesn't have any sibling.
- `TransportMeans`: assign the missing values with a new category called "unknown", since we do not have enough information to infer the missing values.
- `WklyStudyHours`: assign the missing values with a new category called "unknown", since we do not have enough information to infer the missing values.

### Re-check the null value of each column
```
# re-check missing value percentage for each column using isnull func
print(pd.DataFrame({"total of NULL data in each columns:": expanded_data.isnull().sum(), 
                    '%NaN': round(expanded_data.isnull().sum()/len(expanded_data.index) * 100, 2)}))
```
![small](/student-exam-scores/data-cleaning-checknull-2.png)

there's no more column with missing/null value

## Exploratory Data Analysis
```
# doing analysis descriptive by using describe func and transform the result to make it more readable
expanded_data.describe().T
```

![small](/student-exam-scores/analysis-descriptive.png)
- None of numeric column has negative value
- It seems there are outliers in these columns: MathScore, ReadingScore, WritingScore based on how far min value from 25% quantile value. 
- I consider to keep the outlier value since the value is physically possible, the lowest value is 0.0 in mathScore and this value is possible in exam. Also for score 4.0 in writingScore and 10.0 in readingScore.

### Question
- How's overall student exam performance?
- Does gender has correlation with their exam score?
- Does student background like ethnic group, parent education, and parent marital status has correlation with their exam score?
- Does student who has take test preparation course before exam and has high weekly study hour has a good performance in their exam?

### Math, Reading and Writing Score
```
# Load data visualization package
import matplotlib.pyplot as plt
import seaborn as sns

# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore Distribution
sns.histplot(expanded_data, x='MathScore', bins=30, ax=axes[0])
axes[0].set_title('MathScore Distribution')

# Plot 2: ReadingScore Distribution
sns.histplot(expanded_data, x='ReadingScore', bins=30, ax=axes[1])
axes[1].set_title('ReadingScore Distribution')

# Plot 2: WritingScore Distribution
sns.histplot(expanded_data, x='WritingScore', bins=30, ax=axes[2])
axes[2].set_title('WritingScore Distribution')

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```

![](/student-exam-scores/score-distribution.png)
All of the score data distribution is left-skewed and we can say that average student has good performance in each exam. But we can see that the number of students who get perfect scores in reading and writing exam is more than in math exam.

### Relationship between each eaxm score
```
# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore vs ReadingScore Scatter Plot
sns.scatterplot(data=expanded_data, x='MathScore', y='ReadingScore', ax=axes[0])
axes[0].set_title('MathScore vs ReadingScore')

# Plot 2: MathScore vs WritingScore Scatter Plot
sns.scatterplot(data=expanded_data, x='MathScore', y='WritingScore', ax=axes[1])
axes[1].set_title('MathScore vs WritingScore')

# Plot 2: ReadingScore vs WritingScore Scatter Plot
sns.scatterplot(data=expanded_data, x='ReadingScore', y='WritingScore', ax=axes[2])
axes[2].set_title('ReadingScore vs WritingScore')

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/scatter-plot-each-exam.png)
Based on scatter plot above, we can see that each exam score have positive linear correlation, that's mean student who gets high score in math is likely to get high score in reading and writing score, vice versa.

### The number of student based on gender and family background
```
# Create a figure with 4 subplots
fig, axes = plt.subplots(2, 2, figsize=(20, 10))

# Plot 1: bar plot of EthnicGroup type
sns.histplot(data=expanded_data, x="EthnicGroup", ax=axes[0][0])
axes[0][0].set_title('Student based on ethnic group')
axes[0][0].tick_params(axis='x', rotation=90)

# Plot 2: bar plot of ParentEduc type
sns.histplot(data=expanded_data, x="ParentEduc", ax=axes[0][1])
axes[0][1].set_title('Student based on parent education')
axes[0][1].tick_params(axis='x', rotation=90)

# Plot 3: bar plot of ParentMaritalStatus type
sns.histplot(data=expanded_data, x="ParentMaritalStatus", ax=axes[1][0])
axes[1][0].set_title('Student based on parent marital status')
axes[1][0].tick_params(axis='x', rotation=90)

# Plot 4: bar plot of Gender type
sns.histplot(data=expanded_data, x="Gender", ax=axes[1][1])
axes[1][1].set_title('Student based on gender type')
axes[1][1].tick_params(axis='x', rotation=90)

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/student-background-barplot.png)

- Most of student come from ethnic group C and D
- Ethnic group A and E have the least number of student
- Most of student have married parents
- Student parents education seems to vary, only master's degree, bachelor's degree and unknown have the least number
- the proportion of male and female students is balanced

### Analyze exam score based on gender
```
# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore Distribution
sns.boxplot(data=expanded_data, x='Gender', y='MathScore', ax=axes[0])
axes[0].set_title('MathScore')

# Plot 2: ReadingScore Distribution
sns.boxplot(data=expanded_data, x='Gender', y='WritingScore', ax=axes[1])
axes[1].set_title('WritingScore')

# Plot 2: WritingScore Distribution
sns.boxplot(data=expanded_data, x='Gender', y='ReadingScore', ax=axes[2])
axes[2].set_title('ReadingScore')

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/score-variability-gender.png)
- Female student seems has a good performance in writing and and reading, while male student has a good performance in math
- There's no male student gets score 0 in all exam, while there are female students get score in math

### Analyze exam score based on ethnic group
```
# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore Distribution
sns.boxplot(data=expanded_data, x='EthnicGroup', y='MathScore', ax=axes[0])
axes[0].set_title('MathScore distribution based on EthnicGroup')
axes[0].tick_params(axis='x', rotation=90)

# Plot 2: ReadingScore Distribution
sns.boxplot(data=expanded_data, x='EthnicGroup', y='WritingScore', ax=axes[1])
axes[1].set_title('WritingScore distribution based on EthnicGroup')
axes[1].tick_params(axis='x', rotation=90)

# Plot 2: WritingScore Distribution
sns.boxplot(data=expanded_data, x='EthnicGroup', y='ReadingScore', ax=axes[2])
axes[2].set_title('ReadingScore distribution based on EthnicGroup')
axes[2].tick_params(axis='x', rotation=90)

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/score-variability-ethnicgroup.png)
- Students from ethnic group E seems like to have a good performance in all of exams compared to others, especially in math.
- In writing, the performance of Student from ethnic group D seems like to be able to compete with ethnic group E.
- Overall performance of student from ethnic group A is very low compared with others group.
- Student who get 0 in math exam is come from ethnic group C
- There are always students from ethnic group D who occupy thelowest grades

### Analyze exam score based on parent education
```
# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore Distribution
sns.boxplot(data=expanded_data, x='ParentEduc', y='MathScore', ax=axes[0])
axes[0].set_title('MathScore distribution based on ParentEduc')
axes[0].tick_params(axis='x', rotation=90)

# Plot 2: ReadingScore Distribution
sns.boxplot(data=expanded_data, x='ParentEduc', y='WritingScore', ax=axes[1])
axes[1].set_title('WritingScore distribution based on ParentEduc')
axes[1].tick_params(axis='x', rotation=90)

# Plot 2: WritingScore Distribution
sns.boxplot(data=expanded_data, x='ParentEduc', y='ReadingScore', ax=axes[2])
axes[2].set_title('ReadingScore distribution based on ParentEduc')
axes[2].tick_params(axis='x', rotation=90)

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/score-variability-parenteduc.png)

- Parent education seems like to have correlation with student performance in all exam
- Student whose their parent has master's degree and bachelor's degree likely to has a good performace in all exam
- The lowest performance is come from student whose their parents only has high school level of education
- Student whose parent education level higher than high school always has good performance in all exam

### Analyze exam score based on parent marital status
```
# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore Distribution
sns.boxplot(data=expanded_data, x='ParentMaritalStatus', y='MathScore', ax=axes[0])
axes[0].set_title('MathScore based on ParentMaritalStatus')
axes[0].tick_params(axis='x', rotation=90)

# Plot 2: ReadingScore Distribution
sns.boxplot(data=expanded_data, x='ParentMaritalStatus', y='WritingScore', ax=axes[1])
axes[1].set_title('WritingScore based on ParentMaritalStatus')
axes[1].tick_params(axis='x', rotation=90)

# Plot 2: WritingScore Distribution
sns.boxplot(data=expanded_data, x='ParentMaritalStatus', y='ReadingScore', ax=axes[2])
axes[2].set_title('ReadingScore based on ParentMaritalStatus')
axes[2].tick_params(axis='x', rotation=90)

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/score-variability-parentmaritalstatus.png)
Parent marital status seems not has correlation with student performance in all of exams
### Analyze exam score based on test preparatio course
```
# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore Distribution
sns.boxplot(data=expanded_data, x='TestPrep', y='MathScore', ax=axes[0])
axes[0].set_title('MathScore based on TestPrep')

# Plot 2: ReadingScore Distribution
sns.boxplot(data=expanded_data, x='TestPrep', y='WritingScore', ax=axes[1])
axes[1].set_title('WritingScore based on TestPrep')

# Plot 2: WritingScore Distribution
sns.boxplot(data=expanded_data, x='TestPrep', y='ReadingScore', ax=axes[2])
axes[2].set_title('ReadingScore based on TestPrep')

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/score-variability-testpreparation.png)
- Student whom completed test preparation course seems like to has better perfomance in all of exam compared to those who don't
- Significant difference in performance occurred in the writing and reading
### Analyze exam score based on weekly study hours
```
# Create a figure with 3 subplots
fig, axes = plt.subplots(1, 3, figsize=(12, 5))

# Plot 1: MathScore Distribution
sns.boxplot(data=expanded_data, x='WklyStudyHours', y='MathScore', ax=axes[0])
axes[0].set_title('MathScore based on WklyStudyHours')


# Plot 2: ReadingScore Distribution
sns.boxplot(data=expanded_data, x='WklyStudyHours', y='WritingScore', ax=axes[1])
axes[1].set_title('WritingScore based on WklyStudyHours')


# Plot 2: WritingScore Distribution
sns.boxplot(data=expanded_data, x='WklyStudyHours', y='ReadingScore', ax=axes[2])
axes[2].set_title('ReadingScore based on WklyStudyHours')


# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/score-variability-wklystudyhours.png)
Student whom spend more than 10 hours weekly to study seems like to has a good performance in math exam, but in writing and reading there's no significant difference

### Follow Up Question
- Does most of students whose parent has master's degree come from ethnic group D and E?
- Does most of students whom complated test praparation course also has weekly study hours more than 10 hours?

```
fig, axes = plt.subplots(figsize=(12, 5))

# Bar Plot ethnic group distirbution based on parent education
sns.histplot(x='ParentEduc', hue='EthnicGroup', multiple='stack', data=expanded_data)
fig.suptitle('Ethnic Group based on Parent Education')
axes.tick_params(axis='x', rotation=90)

# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/bar-plot-ethnicgroup-based-on-parenteduc.png)
- Most of student's parents whom completed master degree come from Ethnic Group C, B, and E. Likewise with other levels of education.
- Group C, B, and E has the larger number in each parent education, since the groups has a lot of students number compared to others group.
- It seems no correlation between parent whom completed master's degree with any type of ethnic group.
- Student whom come from ethnic group E seems likely to have a good performance in all exam regardless to their parent education level and even thought their group is minority.

```
fig, axes = plt.subplots(figsize=(12, 5))

# Bar Plot weekly study hoours distirbution based on test preparation
sns.histplot(x='TestPrep', hue='WklyStudyHours', multiple='stack', data=expanded_data)
fig.suptitle('Weekly Study Hours based on Test Preparation')
axes.tick_params(axis='x', rotation=90)
# Adjust the spacing between subplots
plt.tight_layout()

# Display the plots
plt.show()
```
![](/student-exam-scores/bar-plot-wklystudyhours-based-on-testpreparation.png)
- Most of students don't take test preparation course
- Most of students only study < 10 hours in a week

## Conclusion
- Overall student performance in each exam is good, especially in reading and writing test.
- Student who gets high score in math is likely to get high score in reading and writing score, vice versa.
- Gender and ethnic group affect student performance in each exam.
- Female student seems has a good performance in writing and and reading, while male student has a good performance in math.
- Parent education level also affect student performance, the higher the level of education, the higher is the exam score.
- Student whom come from ethnic group E seems likely to have a good performance in all exam regardless to their parent education level and even thought their group is minority.
- student whom completed test preparation course seems like to has better perfomance in all of exam compared to those who don't.
- Student whom spend more than 10 hours weekly to study seems like to has a good performance in math exam