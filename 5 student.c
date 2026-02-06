//A C program that reads the names and marks of 5 students
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fptr;
    char name[50];
    int marks, i;

    // Open the file in write mode
    fptr = fopen("C:\\Users\\clemoh\\OneDrive\\Desktop\\cfiles\\students.txt", "w");
    if (fptr == NULL) {
        printf("Error opening the file.\n");
        exit(1);
    }

    // Loop to read name and marks of 5 students and store them in the file
    for (i = 1; i <= 5; i++) {
        printf("Enter name of student %d: ", i);
        scanf("%s", name);
        printf("Enter marks of student %d: ", i);
        scanf("%d", &marks);

        // Write the name and marks to the file
        fprintf(fptr, "Student %d: Name = %s, Marks = %d\n", i, name, marks);
    }

    fclose(fptr);
    printf("Data written successfully to students.txt.\n");
    return 0;
}
}
