//bank loan
#include<stdio.h>
int main(){
int age,income;
printf("enter your age:");
scanf ("%d",&age);
printf ("enter income:");
scanf("%d",&income);
if(age>=21&& income>21000){
printf("congratulations you qualify for the loan\n");
}
else{
printf("you don't qualify for the loan\n");
}
return 0;
}
