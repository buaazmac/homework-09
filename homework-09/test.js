
		test("maketable", function(){
		    var arr = new Array();
		    for (var i = 0; i < 100; i++)
		        arr[i] = new Array();
		    arr[0][0] = 0;
		    arr[0][1] = 0;
		    arr[1][0] = 0;
		    arr[1][1] = 2;
		    var arr1 = makeTable("1#1#2");
			equal(arr1[1][1],arr[1][1],"yes!");
		});
		test("refresh", function(){
			equal(Refresh(),1,"yes!");
		});
		test("clear", function(){
			equal(clear(),1,"yes!");
		});
		test("wait", function () {
		    var isSelect = new Array();
		    isSelect[0] = new Array(0, 0, 0);
		    isSelect[1] = new Array(1, 1, 1);
		    var history = new Array();
		    history[0]=new Array(1,1,1,1,1);
		    equal(wait(0,isSelect,history), 1, "yes!");
		});
		test("work", function () {
		    var arr = new Array();
		    for (var i = 0; i < 100; i++)
		        arr[i] = new Array();
		    arr[0][0] = 0;
		    arr[0][1] = 0;
		    arr[1][0] = 0;
		    arr[1][1] = 2;
		    var isSelect = new Array();
		    isSelect[0] = new Array(0, 0, 0);
		    isSelect[1] = new Array(1, 1, 1);
		    var history = new Array();
		    equal(WorkMode1(1, 1,history,isSelect,arr), 1, "yes!");
		});
		test("update", function () {
		    var isSelect = new Array();
		    isSelect[0] = new Array(0, 0, 0);
		    isSelect[1] = new Array(1, 1, 1);
		    var history = new Array();
		    equal(updateS1(1, 1, 1, 1, 1, isSelect), 1, "yes!");
		});
		
		
