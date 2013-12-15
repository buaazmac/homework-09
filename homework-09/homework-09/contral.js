var isRandom=1;

$(document).ready(function(){//各种按钮实践
	Start.disabled = true;
	Pause.disabled = true;
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
		Pause.disabled=false;
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
	$("#Reset").click(function(){//用户提交文本按钮
		$("#Text1").val("");
		$("#Text2").val("");
		$("#table").empty();
		clearInterval(TimeId);
		Start.disabled = true;
		Pause.disabled = true;
		hi = 0;
		$("#Pause").val("Pause");
	});
});