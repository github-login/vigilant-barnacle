//appending a sentence in a file
#include <stdio.h>
#include <stdlib.h>

void appendToFile() {
    FILE *fptr;
    char sentence[100];

    // Open the file in append mode
    fptr = fopen("C:\\Users\\clemoh\\OneDrive\\Desktop\\cfiles\\data.txt", "a");
    if (fptr == NULL) {
        printf("Error opening file for appending.\n");
        exit(1);
    }

    // Get a second sentence from the user
    printf("Enter another sentence to append (up to 100 characters): ");
    fgets(sentence, sizeof(sentence), stdin);

    // Append the sentence to the file
    fprintf(fptr, "%s", sentence);
    fclose(fptr);
    printf("Sentence appended to file successfully.\n");
}

int main() {
    appendToFile();
    return 0;
}
