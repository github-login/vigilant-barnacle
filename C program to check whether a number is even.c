//C program to check whether a number is even 
#include<stdio.h>
int main() {
    int number;
    printf("Enter the number");
    scanf("%d", &number);
    if(number % 2 == 0){
        printf("The number is even\n");
    }else {
        printf("The number is odd\n");
    }
    return 0;
}
