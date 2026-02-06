//program to find the area of a rectangle 
#include <stdio.h>
int main() {
int length, width, area;
printf("length: ");
scanf("%d", &length);
printf("width: ");
scanf("%d", &width);
area = length * width;
printf("area %.d\n", area);
return 0;
}
