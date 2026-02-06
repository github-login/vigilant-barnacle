 #include<stdio.h>
int main(){
int bookid;
double duedate,returndate;
double finerate,fineamount,daysoverdue;
printf("enter the bookid:");
scanf("%d",&bookid);
printf("enter the duedate:");
scanf("%lf",&duedate);
printf("enter the returndate:");
scanf("%lf",&returndate);
daysoverdue=returndate-duedate;
if(daysoverdue<=7){
finerate=20;
}
else if(daysoverdue<=14){
finerate=50;
}
else {
finerate=100;
}
fineamount=finerate*daysoverdue;
printf("bookid:%d\n",bookid);
printf("duedate:%lf\n",duedate);
printf("returndate:%lf\n",returndate);
printf("daysoverdue:%lf\n",daysoverdue);
printf("finerate:%lf\n",finerate);
printf("fineamount:%lf\n",fineamount);
return 0;
}
