//c variables and data types
//pre-processor directive
#include <stdio.h> scanf(), printf()
int main(){
	//declaration and intialization 
	char a;
	char name[]={};
	int age;
	float area;
	double salary;
	
		printf("enter  character: ");
	scanf("%s",&a);
printf("the character is %c \n",a);
	
	printf("enter  name: ");
	scanf("%s",&name);
	printf("the string is %s \n",name);	
	
	printf("enter age: ");
	scanf("%d",&age);
printf("the integer is %d years \n",age);
	

printf("enter area: ");
	scanf("%f",&area);	
printf("the float is %.3f meters squared \n",area);	
	
	
	printf("enter salary: ");
	scanf("%lf",&salary);
	printf("the double is  Ksh,%.2lf \n",salary);
	
	
	printf("<complete...>");
	
	return 0;
}
