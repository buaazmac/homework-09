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


//随机生成表格
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
			
			var ai=Math.floor(Math.random()*(x-y+1))+y;//随机生成
			if (i==0) {
				ai="COL#"+j;
			}
			if (j==0){//列表头
				if (i==0)	ai="";else ai="ROW#";
				ai=ai+i;
				str=str+"<tr><th scope='col' class='head'>&nbsp;"+(ai)+"</th>";
			}
			
			else{
				if (i==0)//行表头
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
	$("#table").append(str);//通过将目标区域的html内容更改加入表格
	//table.innerHTML=str;
	return arr;
}

function Refresh() {//根据isSelect数组将表格每块分类，每种类对应一种状态以及相应的css
	
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

function clear() {//清除表格所有状态
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

function updateS1(row1,row2,col1,col2,val) {//根据当前所选区域或者答案更新isSelect数组
	var col=$("#Text1").val();
	var row=$("#Text2").val();
	for (var i=1;i<=row;i++) {
		for (var j=1;j<=col;j++) {
			if (i>=row1 && i<=row2 
			&& j>=col1 && j<=col2) {
			//各种改变状态
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
}
//第一种模式
function WorkMode1(row,col) {
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
					updateS1(k,i,start,j,2);
				}else {
					updateS1(k,i,start,j,1);
				}
				history[lh]=new Array();
				for (var ii=0;ii<=row;ii++){
					history[lh][ii]=new Array();
					for (var jj=0;jj<=col;jj++){
						history[lh][ii][jj]=isSelect[ii][jj];
					}
				}
				history[lh][0][0]=ans;
				history[lh][0][1]=temps;
				lh++;
			}
		}
	}
	//alert("ha");
	
}
//第二种模式
function WorkMode2(row,col) {
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
					updateS1(k,i,start,j,2);
				}else {
					updateS1(k,i,start,j,1);
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
}
//第三种模式
function WorkMode3(row,col) {
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
					updateS1(k,i,start,j,2);
				}else {
					updateS1(k,i,start,j,1);
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
}
//第四种模式
function WorkMode4(row,col) {
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
					updateS1(k,i,start,j,2);
				}else {
					updateS1(k,i,start,j,1);
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
	
}
var TimeId;
var hi=0;

function wait()  //演示函数，用来演示保存在history数组中的状态记录
{  
	var col=$("#Text1").val();
	var row=$("#Text2").val();
	for (var ii=0;ii<=row;ii++)
		for (var jj=0;jj<=col;jj++)
			isSelect[ii][jj]=history[hi][ii][jj];
		//alert(i);
	Refresh();
	maxnum.innerHTML=isSelect[0][0];
	curnum.innerHTML=isSelect[0][1];
	hi++;
	if (hi==lh)
		clearInterval(TimeId);
}  

function Work(row,col,mode) {//根据不同模式操作
	clear();
	Refresh();
	switch (mode) {
	case "mode1":
		WorkMode1(row,col);
		
		break;
	case "mode2":
		WorkMode2(row,col);
		break;
	case "mode3":
		WorkMode1(row,col);
		break;
	case "mode4":
		WorkMode1(row,col);
		break;
	default:
		break;
	}
	
}
$(document).ready(function(){//各种按钮实践

	$("#Button1").click(function(){
		var col=$("#Text1").val();
		var row=$("#Text2").val();
		var mode=$("#Select1").val();
		//alert(col); alert(row); alert(mode);
		if (isRandom==1){//是否随机生成表格判断
			if ((col=="")||(row=="")||(mode=="")){
				alert("wa");
			}else{
				TableArr=RandomTableValue(row,col);
			}
		}
		hi=0;
		Work(row,col,mode);
		Start.disabled=false;
	});

	$("#Button2").click(function(){//随机生成行数和列数
		var x=20;
		var y=1;
		var col=parseInt(Math.random() * (x - y + 1) + y);
		var row=parseInt(Math.random() * (x - y + 1) + y);;
		var mode=$("#Select1").val();
		//alert(col); alert(row); alert(mode);
		$("#Text1").val(col);
		$("#Text2").val(row);
		isRandom=1;
	});
	
	$("#Start").click(function(){//自动演示开始按钮
		var col=$("#Text1").val();
		var row=$("#Text2").val();
		var mode=$("#Select1").val();
		Start.disabled=true;
		TimeId=setInterval(wait,1000);
		//Refresh();
	});
	$("#Pause").click(function(){//自动演示暂停以及继续的按钮
		if ($("#Pause").val()=="Pause"){//点击更改状态
			clearInterval(TimeId);
			$("#Pause").val("Resume");
		}else {
			TimeId=setInterval(wait,1000);
			$("#Pause").val("Pause");
		}
	});
	$("#next").click(function(){//手动演示前进键
		if (hi<lh-1)
			hi++;
		wait();
		//Refresh();
	});
	$("#prev").click(function(){//手动演示后退键
		if (hi>1)
			hi-=2;
		wait();
		//Refresh();
	});
	$("#Submit").click(function(){//用户提交文本按钮
		userStr=$("#UserText").val();
		TableArr=makeTable();
		isRandom=0;
		//Refresh();
	});
});

function makeTable(){//根据用户提交文本生成表格
	var s=new String(userStr);
	var a=s.split("#");
	var col=a[0];
	var rows=a[1];
	var temp=2;
	var x=100;
	var y=-100;
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
					if (temp<a.length){
						ai=parseInt(a[temp]);
						temp++;
					}else {
						ai=Math.floor(Math.random()*(x-y+1))+y;
					}
					str=str+"<td scope='col' class='nos'>&nbsp;"+(ai)+"</td>";
				}
				else{
					if (temp<a.length) {
						ai=parseInt(a[temp]);
						temp++;
					}else {
						ai=Math.floor(Math.random()*(x-y+1))+y;
					}
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