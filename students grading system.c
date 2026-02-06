// grading system of students 
#include <stdio.h>

int main() {
    int marks1, marks2, marks3, average;

    printf("Enter marks for subject 1: ");
    scanf("%d", &marks1);
    
    printf("Enter marks for subject 2: ");
    scanf("%d", &marks2);
    
    printf("Enter marks for subject 3: ");
    scanf("%d", &marks3);

    average = (marks1 + marks2 + marks3) / 3;
    printf("Average Marks = %.d\n", average);

    if (average >= 70) {
        printf("Grade: A\n");
    } else if (average >= 60) {
        printf("Grade: B\n");
    } else if (average >= 50) {
        printf("Grade: C\n");
    } else if (average >= 40) {
        printf("Grade: D\n");
    } else {
        printf("Grade: E (Fail)\n");
    }

    return 0;
    }
