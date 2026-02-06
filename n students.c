//A C program that reads the names and marks of an n number of students
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fptr;
    char name[50];
    int marks, i, n;

    // Open the file in append mode
    fptr = fopen("C:\\Users\\clemoh\\OneDrive\\Desktop\\cfiles\\students.txt", "a");
    if (fptr == NULL) {
        printf("Error opening the file.\n");
        exit(1);
    }

    // Prompt user for number of students
    printf("Enter the number of students: ");
    scanf("%d", &n);

    // Loop to read name and marks of n students and append them to the file
    for (i = 1; i <= n; i++) {
        printf("Enter name of student %d: ", i);
        scanf("%s", name);
        printf("Enter marks of student %d: ", i);
        scanf("%d", &marks);

        // Append the name and marks to the file
        fprintf(fptr, "Student %d: Name = %s, Marks = %d\n", i, name, marks);
    }

    fclose(fptr);
    printf("Data written successfully to students.txt.\n");
    return 0;
}
