//For loop program
#include <stdio.h>

int main() {
    int i, n;

    // Prompt user for input
    printf("Enter the number of terms: ");
    scanf("%d", &n);

    // For loop to calculate and print the cube of each number
    for (i = 1; i <= n; i++) {
        printf("Number is : %d and cube of %d is : %d\n", i, i, i * i * i);
    }

    return 0;
}
