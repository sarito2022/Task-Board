
function validation(e){
    e.preventDefault();

    const task=document.getElementById("task");
    val_task=task.value;
    const teskEror=document.getElementById("teskEror");

    const date=document.getElementById("date");
    val_date=date.value;
    const dateEror=document.getElementById("dateEror");

    const hour=document.getElementById("hour");
    val_hour=hour.value;
    const hourEror=document.getElementById("hourEror");

    if(val_task===""){
        task.style.backgroundColor="red";
        teskEror.style.display="block";
    }else{
        task.style.backgroundColor="revert";
        teskEror.style.display="none";
    }
    if(val_date===""){
        date.style.backgroundColor="red";
        dateEror.style.display="block";
    }else{
        date.style.backgroundColor="revert";
        dateEror.style.display="none";
    }
    if(val_hour===""){
        hour.style.backgroundColor="red";
        hourEror.style.display="block";
    }else{
        hour.style.backgroundColor="revert";
        hourEror.style.display="none";
    }
    if(val_task!=="" && val_date!=="" && val_hour!==""){
        createNote(e);
    }
}

let ptakim=[];

function onload(){
    ptakim= window.localStorage.getItem('notes');
    ptakim=JSON.parse(ptakim);
    if(ptakim==null){
        ptakim=[];
    }else{
        showPtakim();
    }
}

function myText(text){
    return '<div id="showText" class="text" fade-in-image">'+text+'</div>';
}
function myHour(hour){
    return '<div id="showHour" class="hour">'+hour+'</div>';
}
function myDate(date){
    return '<div id="showDate" class="date">'+date+'</div>';
}
function myX(id){
    return '<button type="button" onclick="clearNote('+id+')" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
}
function fullNoteDesign(petek){
    return myText(petek.text_petek)+myHour(petek.time_petek)+myDate(petek.date_petek)+myX(petek.id_petek);
}

function showPtakim(){
    let count=0;
    for(i in ptakim){
        ptakim[i].id_petek=i;
        let petek='<div class="myPetek fade-in-image">'+ fullNoteDesign(ptakim[i])+'</div>';
        if(count==0){
			document.getElementById("container").innerHTML=petek;
		} else {
		    document.getElementById("container").innerHTML+=petek;
		}
        console.log(ptakim[i].text_petek+"<br>"+ ptakim[i].date_petek+"<br>"+ptakim[i].time_petek+"<br>");
        count++;
    }
    if(count==0){
        petek='';
        document.getElementById("container").innerHTML=petek;
    }
    console.log(ptakim);
    window.localStorage.setItem('notes',JSON.stringify(ptakim));
}

function createNote(e){
    const task=document.getElementById("task");
    const date=document.getElementById("date");
    const hour=document.getElementById("hour");

    let dateBeforeTidy= date.value;
    let sub1=dateBeforeTidy.slice(0,4);
    let sub2=dateBeforeTidy.slice(5,7);
    let sub3=dateBeforeTidy.slice(8,10);
    let sub4='/';
    let tidyDate=sub3+sub4+sub2+sub4+sub1;

    let petek_data={
        text_petek:task.value,
        date_petek:tidyDate,
        time_petek:hour.value,
        id_petek:0
    }
    ptakim.push(petek_data);
    showPtakim();
    
    task.value="";
    date.value="" ;
    hour.value="";
}

function clearNote(id){
    for(i in ptakim){
            if(ptakim[i].id_petek==id){
                ptakim.splice(i,1);
            }
    }
    showPtakim();
}
