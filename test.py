#Call the file as 
#python test.py "<string to classify>"
import sys;						#For getting data as a argument while calling the python intepreter
from event import EventUpdater; #To import the class for storing the date, time etc.
str=sys.argv[1]; 				#Getting the command line argument(Give it in double quotes)
ev = EventUpdater(str); 		#New Class object
ret_value=ev.classify();		#Classifying the string
print(ret_value[1]);