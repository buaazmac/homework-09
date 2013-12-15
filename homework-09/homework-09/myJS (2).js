var TableArr;
var isSelect=new Array();
var history;
var ans=0;
var lh;
var isRandom=0;
var userStr;
for (i=0;i<=100;i++) {
	isSelect[i] = new Array();
	for (j=0;j<=100;j++) {
		isSelect[i][j]=3;
	}
}



function RandomTableValue(rows,col){
	
	var x=100;
	var y=-100;
	
	var arr = new Array(); 
	for (i=0;i<100;i++){
		arr[i] = new Array();
	}
	
	var str="";
	str=str+"<table id='MyTab' width='500' border='4'>";
	   
	for (i=0;i<=rows;++i){
		for (j=0;j<=col;++j){
			
			var ai=Math.floor(Math.random()*(x-y+1))+y;
			if (i==0) {
				ai="COL#"+j;
			}
			if (j==0){
				if (i==0)	ai="";else ai="ROW#";
				ai=ai+i;
				str=str+"<tr><th scope='col' class='head'>&nbsp;"+(ai)+"</th>";
			}
			
			else{
				if (i==0)
				{
					str=str+"<td scope='col' class='head'>&nbsp;"+(ai)+"</td>";
				}else if (j==col){
					str=str+"<td scope='col' class='nos'>&nbsp;"+(ai)+"</td>";
				}
				else{
					str=str+"<td scope='col' class='nos'>&nbsp;"+(ai)+"</td>";
				}			  
			}
			arr[i][j]=ai;
		}
	}
	//alert("TimeId");
	str=str+"</tr>"+"</table>";
	$("#table").empty();
	$("#table").append(str);
	//table.innerHTML=str;
	return arr;
}

function Refresh() {
	
	var trs=MyTab.getElementsByTagName("tr");
	var flag=0;		
	var tds;
	for (var i=1;i<trs.length;i++) {
		flag=1;
		tds=trs[i].getElementsByTagName("td");

		for (var j=0;j<tds.length;j++) {
			var row;
			var col;
			row=i;
			col=j+1;
			if (isSelect[row][col]==1) {
				tds[j].className="iss";
			}else if(isSelect[row][col]==0){
				tds[j].className="nos";
			}else if (isSelect[row][col]==2){
				tds[j].className="ans";
			}else {
				tds[j].className="selans";
			}
		}
	}
	return flag;
}

function clear() {
	flag=0;
	var col=$("#Text1").val();
	var row=$("#Text2").val();
	for (var i=1;i<=row;i++)
		for (var j=1;j<=col;j++){
			isSelect[i][j]=0;
			flag=1;
		}
	return flag;
}

function updateS1(row1,row2,col1,col2,val,isSelect) {
	var col=1;
	var row=1;
	for (var i=1;i<=row;i++) {
		for (var j=1;j<=col;j++) {
			if (i>=row1 && i<=row2 
			&& j>=col1 && j<=col2) {

				switch (isSelect[i][j]){
				case 0:
					isSelect[i][j]=val;
					break;
				case 1:
					isSelect[i][j]=val;
					break;
				case 2:
					if (val==1)
						isSelect[i][j]=3;
					break;
				default:
					isSelect[i][j]=3;
					break;
				}	
			}else {
				switch (isSelect[i][j]){
				case 1:
					isSelect[i][j]=0;
					break;
				case 2:
					if (val==2)
						isSelect[i][j]=0;
					break;
				case 3:
					if (val==1)
						isSelect[i][j]=2;
					else 
						isSelect[i][j]=0;
					break;
				default:
					break;
				}
			}
		}
	}
	return 1;
}

function WorkMode1(row,col,history,isSelect,TableArr) {
	history=new Array();
	lh=0;
	var sum=new Array();
	ans=0;
	for (var i=0;i<=col;i++)
		sum[i]=new Array();
	for (var i=0;i<=row;i++) {
		for (var j=1;j<=col;j++) {
			if (i==0) {
				sum[j][i]=0;
			}else {
				sum[j][i]=sum[j][i-1]+TableArr[i][j];
			}
		}
	}
	for (var i=1;i<=row;i++) {
		for (var k=1;k<=i;k++) {
			var temps=0;
			var start=1;
			for (var j=1;j<=col;j++) {
				a=sum[j][i]-sum[j][k-1];
				if (temps<0){	
					temps=0;
					start=j;
				}
				temps+=a;
				if (temps>ans) {
					ans=temps;
					updateS1(k,i,start,j,2,isSelect);
				}else {
					updateS1(k,i,start,j,1,isSelect);
				}
				history[lh]=new Array();
				for (var ii=0;ii<=row;ii++){
					history[lh][ii]=new Array();
					for (var jj=0;jj<=col;jj++){
						history[lh][ii][jj]=isSelect[ii][jj];
					}
				}
				history[lh][0][0]=ans;
				lh++;
			}
		}
	}
	//alert("ha");
	return row * col;
}
var TimeId;
var hi=0;

function wait(hi,isSelect,history)  
{
    hi = 0;
	var col=1;
	var row=1;
	for (var ii=0;ii<=row;ii++)
		for (var jj=0;jj<=col;jj++)
			isSelect[ii][jj]=history[hi][ii][jj];
		//alert(i);
	Refresh();
	maxnum.innerHTML=isSelect[0][0];
	hi++;
	if (hi==lh)
	    clearInterval(TimeId);
	return hi;
}  



function Work(row,col,mode) {
	clear();
	Refresh();
	switch (mode) {
	case "mode1":
		WorkMode1(row,col);
		
		break;
	case "mode2":
		break;
	default:
		break;
	}
	
}


function makeTable(userStr){
	var s=new String(userStr);
	var a=s.split("#");
	var col=a[0];
	var rows=a[1];
	var temp=2;
	var arr = new Array(); 
	for (var i=0;i<100;i++){
		arr[i] = new Array();
	}
	
	var str="";
	str=str+"<table id='MyTab' width='500' border='4'>";
	   
	for (var i=0;i<=rows;++i){
		for (var j=0;j<=col;++j){
			
			if (i==0) {
				ai="COL#"+j;
			}
			if (j==0){
				if (i==0)	ai="";else ai="ROW#";
				ai=ai+i;
				str=str+"<tr><th scope='col' class='head'>&nbsp;"+(ai)+"</th>";
				ai=0;
			}else{
				if (i==0)
				{
					str=str+"<td scope='col' class='head'>&nbsp;"+(ai)+"</td>";
					ai=0;
				}else if (j==col){
					ai=parseInt(a[temp]);
					temp++;
					str=str+"<td scope='col' class='nos'>&nbsp;"+(ai)+"</td>";
				}
				else{
					ai=parseInt(a[temp]);
					temp++;
					str=str+"<td scope='col' class='nos'>&nbsp;"+(ai)+"</td>";
				}			  
			}
			arr[i][j]=ai;
		}
	}
	//alert("TimeId");
	str=str+"</tr>"+"</table>";
	$("#table").empty();
	$("#table").append(str);
	//table.innerHTML=str;
	return arr;
}