import sys;	
from datetime import date
from datetime import time
from datetime import timedelta
class EventUpdater:
	def __init__(self,str):
		self.evntdate=["Date","N/A"];
		self.evnttime=["Time","N/A"];
		self.evntvenue=["Venue","N/A"];
		self.evntcontact=["Contact","N/A"];
		self.teststr=str;
	def print_data(self):
		print("Date : ",self.evntdate);
		print("Time : ",self.evnttime);
		print("Venue : ",self.evntvenue);
		print("Contact : ",self.evntcontact);
	def classify(self):
		if('date' in self.teststr.lower()):
			self.evntdate[1]=self.extract_date();
			return(self.evntdate);
		elif('time' in self.teststr.lower()):
			self.evnttime[1]=self.extract_time();
			return(self.evnttime);
		elif('venue' in self.teststr.lower()):
			self.evntvenue[1]=self.extract_data();
			return(self.evntvenue);
		elif('contact' in self.teststr.lower()):
			self.evntcontact[1]=self.extract_data();
			return(self.evntcontact);
		elif('where' in self.teststr.lower()):
			self.evntvenue[1]=self.extract_data();
			return(self.evntvenue);
		else:
			return self.otheropt();
	def extract_data(self):
		try:
			str=self.teststr.upper();
			string_check=["VENUE","CONTACT","WHERE"];
			for i in range(len(string_check)):
				str=str.replace(string_check[i],'');
			str=str.lstrip(" ");
			str=str.lstrip(':');
			str=str.lstrip('-');
			str=str.lstrip();
			return str;
		except:
			return "N/A";
	def extract_date(self):
		try:
			str=self.teststr.upper();
			if( "TODAY" in str):
				return date.today();	
			if( "TOMORROW" in str):	
				return date.today()+timedelta(days=1);
			string_check=["DATE","TIME","WHEN"," "];	
			for i in range(len(string_check)):
				str=str.replace(string_check[i],'');
			str=str.lstrip(" ");
			str=str.lstrip(':');
			str=str.lstrip('-');
			str=str.lstrip();
			if(any(c.isalpha() for c in str)):
				mon=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
				j=0;
				ldate =["","",""];
				for i in range(len(str)):
					if(str[i].isnumeric()):
						ldate[j]+=str[i];
					elif(str[i].isalpha()):
						ldate[1]+=str[i];
						if(not(str[i+1].isalpha())):
							j=2;
				ldate[0]=int(ldate[0]);
				ldate[2]=int(ldate[2]);
				for i in range(len(mon)):
					if(mon[i] in ldate[1]):
						ldate[1]=i+1;
						break;
				ev_date=date(int(ldate[2]),ldate[1],int(ldate[0]));
				return ev_date;
			else :
				ldate =["","",""];
				j=0;
				for i in range(len(str)):
					if(str[i]!='/' and str[i]!='-' and str[i]!='.'):
						ldate[j]+=str[i];
					else:
						j+=1;
				ev_date=date(int(ldate[2]),int(ldate[1]),int(ldate[0]));
				return ev_date;
		except:
			return date(1970,1,1);
	def extract_time(self):
		try:
			str=self.teststr.upper();
			string_check=["DATE","TIME","WHEN"," "];
			for i in range(len(string_check)):
				str=str.replace(string_check[i],'');
			str=str.lstrip(" ");
			str=str.lstrip(':');
			str=str.lstrip('-');
			str=str.strip();
			ltime =["","",""];
			j=0;
			for i in range(len(str)):
				if(str[i]!=':' and not(str[i].isalpha()) ):
					ltime[j]+=str[i];
				elif(str[i]=='A'):
					ltime[2]='AM';
					break;
				elif(str[i]=='P'):
					ltime[2]='PM';
					break;
				else:
					j+=1;

			if(ltime[1]==''):
				ltime[1]='0';
			if(ltime[2]=='PM'):
				ltime[0]=int(ltime[0])+12;
			ltime[0]=ltime[0]%24
			ev_time=time(int(ltime[0]),int(ltime[1]),0,0);
			return ev_time;
		except:
			return time(12,0,0,0);
	def otheropt(self):
		#if (sum(c.isdigit() for c in self.teststr)>9):
		num=sum(c.isdigit() for c in self.teststr);
		print(num);
		return(self.evntcontact);
				