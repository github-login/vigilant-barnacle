//write a sentence into a file
#include <stdio.h>
#include <stdlib.h>

void writeToFile() {
    FILE *fptr;
    char sentence[100];

    // Open the file in write mode
    fptr = fopen("C:\\Users\\clemoh\\OneDrive\\Desktop\\cfiles\\data.txt", "w");
    if (fptr == NULL) {
        printf("Error opening file for writing.\n");
        exit(1);
    }

    // Get a sentence from the user
    printf("Enter a sentence (up to 100 characters): ");
    fgets(sentence, sizeof(sentence), stdin);

    // Write the sentence to the file
    fprintf(fptr, "%s", sentence);
    fclose(fptr);
    printf("Sentence written to file successfully.\n");
}

int main() {
    writeToFile();
    return 0;
