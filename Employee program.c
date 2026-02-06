//C structure program
#include<stdio.h>

struct Employee{
    char name[25];
    char email[50];
    char department[20];
    float salary;
    int ID;
}employee;
int main(){
    struct Employee employee={
        "john Doe",
        "john.doe@company.com",
        "Human Resources",
        55000.50,
        12345,
    
};
    
    printf("name:%s\n",&employee.name);
    printf("email:%s\n",&employee.email);
    printf("department:%s\n",&employee.department);
    printf("salary:%f\n",&employee.salary);
    printf("ID:%d\n",&employee.ID);
    
    return 0;
