/***********************************************************************************************************/
/*Email data parser 1.1											   */
/*Code created by : Om Shri										   */
/*Important detail : For the parser to function properly, the important functions must lie inside ~<>~ tags*/
/*Date modified : 30/12/2017										   */
/***********************************************************************************************************/


var evnttitle=["Title",null];
var evntdatetime=["DateTime",null];
var evntvenue=["Venue",null];
var evntcontact=["Contact",null];
var evntstuadd=["StudentsAddr",null];
var evntorg=["Organizer",null];
var evntdetl=["Details",null];
var evnttags=["Tags",null];
var evntint=["Interested",null];

var datestr=[12,12,12,12,00];
var Jsonobj={};

//var str="~<Title : Anime Quiz>~ ~<Detail:Anime quiz for freshies>~Hey all,Do the names 'Naruto', 'Luffy' and 'Goku' ring a bell?Does the intense action in One Punch Man and Attack on Titan excite you?Does the quote I'll take a potato chip... and EAT IT bring back memories of Death Note? If so, then now's your chance to show off your anime knowledge and put all those hours of binge-watching to good use. IIT Madras Quiz Club presents Anime Quiz 2.0 ~<Venue: Hsb 354>~ ~<Date: 28/8/17>~ ~<Time: 7:00 PM>~ Teams of 3 or less and prizes for the top 3 winners along with a number of audience prizes during the finalsIf you can't find a team mate before coming to the quiz, you can join in with the participants who are alone and form a team at the quiz. And come with a pen!For FAQs about the event, check out the event page on Facebook . ~<Contact: Sukruth (9790469683)>~ Cheers,IIT Madras Quiz Club.";
//console.log(parser(str));

module.exports={
	parser: function (str){
		var reexp=/(\~\<).+?(\>\~)/g;
		var strs=str.match(reexp);
		var ctctexpr=/\+?\d[\d -]{8,12}\d/g;
		var dateexpr1=/\d{1,2}(\/|\-|\.)\d{1,2}(\/|\-|\.)\d{2,4}/g;
		var dateexpr2=/\d{1,2}(\s|)[A-Za-z]{3,4}(\s|)\d{2,4}/g;
		var timeexpr=/([0-9]|)[0-9](\s|)(:|)([0-9][0-9]|)(\s|)(AM|Pm)/gi;
		var venueexp=/(venue|where)/ig;
		var titleexpr=/title/gi;
		var tagsexpr=/tags/gi;
		var orgexpr=/organizer/gi;
		var detailexpr=/detail(s|)/gi;
		if(strs!=null){
			for(var i=0;i<strs.length;i++)
			{	strs[i]=strs[i].replace(/(~|<|>)/g,"");
				if(ctctexpr.test(strs[i])==true) evntcontact[1]=extractCtct(strs[i]);
				else if(dateexpr1.test(strs[i])==true||dateexpr2.test(strs[i])==true) extractDate(strs[i]);
				else if(timeexpr.test(strs[i])==true) extractTime(strs[i]);
				else if(venueexp.test(strs[i])==true) evntvenue[1]=extractVenue(strs[i]);
				else if(titleexpr.test(strs[i])==true) evnttitle[1]=extractTitle(strs[i]);
				else if(tagsexpr.test(strs[i])==true) evnttags[1]=extractTags(strs[i]);
				else if(orgexpr.test(strs[i])==true) evntorg[1]=extractOragnize(strs[i]);
				else if(detailexpr.test(strs[i])==true) evntdetl[1]=extractDetails(strs[i]);
			}
			var ev_date=new Date(datestr[2],datestr[1],datestr[0],datestr[3],datestr[4]);
			evntdatetime[1]=ev_date;
		}
	
		Jsonextract();
		var jsonstr=JSON.stringify(Jsonobj);
		return(jsonstr);
	}
}
function extractCtct(str){
	var def_val=[/(\s+|)contact(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');
	return(str);
}
function Jsonextract(){
	Jsonconv(evnttitle);
	Jsonconv(evntdatetime);
	Jsonconv(evntvenue);
	Jsonconv(evntorg);
	Jsonconv(evntdetl);
	Jsonconv(evnttags);
	Jsonconv(evntcontact);
	Jsonconv(evntint);
	Jsonconv(evnttags);
	Jsonconv(evntstuadd);
}
function extractDate(str){
	var def_val=[/(\s+|)date(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');
	if(str.match(/[a-z]/i)){
		mon=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
		var ldate=["","",""];
		var j=0;	
		for (var i=0;i<str.length;i++){
			if(str[i].match(/[0-9]/)) ldate[j]+=str[i];
			 else if(str[i].match(/[a-z]/gi)){
				ldate[1]+=str[i];
				if(!(str[i+1].match(/[a-z]/gi))) j=2;
			 }
		}
		for(i=0;i<mon.length;i++){
			var expr = new RegExp(mon[i],'i');
			if(ldate[1].match(expr)){
				ldate[1]=i;
				i=13;
			}
		}
		if(ldate[2].length<3) ldate[2]="20"+ldate[2];
		datestr[2]=parseInt(ldate[2]);
		datestr[1]=ldate[1]
		datestr[0]=parseInt(ldate[0]);
	}
	else{
		var ldate=["","",""];
		var j=0;
		for (var i=0;i<str.length;i++){
			if(str[i].match(/(-|\.|\/)/)) j++;
			 else ldate[j]+=str[i];
		}	
		if(ldate[2].length<3) ldate[2]="20"+ldate[2];
		datestr[2]=parseInt(ldate[2]);
		datestr[1]=(parseInt(ldate[1])-1)
		datestr[0]=parseInt(ldate[0]);
	}
}

function extractTime(str){
	var def_val=[/(\s+|)time(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');	
	var ltime =["","",""];
	var j=0;
	for(var i=0;i<str.length;i++){
		if(str[i]!=':' && !(str[i+1].match(/[a-z]/gi)) ) ltime[j]+=str[i];
		else if(str[i]=='A'){
			ltime[2]='AM';
			break;
		}
		else if(str[i]=='P'){
			ltime[2]='PM';
			break;
		}
		else j+=1;
	}
	if(ltime[1]=='') ltime[1]='0';
 	if(ltime[2]=='PM') ltime[0]=parseInt(ltime[0])+12;
	ltime[0]=ltime[0]%24
	datestr[3]=ltime[0];
	datestr[4]=parseInt(ltime[1]);
}

function extractVenue(str){
	var def_val=[/(\s+|)(venue|when)(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');
	return(str);
}

function extractTitle(str){
	var def_val=[/(\s+|)title(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');
	return(str);
}

function extractOragnize(str){
	var def_val=[/(\s+|)organizer(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');
	return(str);
}

function extractDetails(str){
	var def_val=[/(\s+|)detail(s|)(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');
	return(str);
}

function extractTags(str){
	var def_val=[/(\s+|)tags(\s+|)(:|-)(\s+|)/ig];
	str=str.replace(def_val[0],'');
	return(str);
}

function Jsonconv(obj)
{
	Jsonobj[obj[0]]=obj[1];
}
