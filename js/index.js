$(function(){
	var add = $(".add");
	var canvas = null;
	var copy = null;
	var patbox = $(".box");
	var divs = $(".left>div");
	var ear = $(".earser");
	var del = $(".rep");
	console.log(del);

	add.click(function(){
		var w = 949;
		var h = 640;
		canvas=$("<canvas>").attr({width:w,height:h});
		copy=$("<div>").css({
			width:w,
			height:h,
			position:"absolute",
			left:0,
			top:0,
			zindex:9999,
		})
		patbox.append(canvas).append(copy);
		create();
	})

	function create(){
			cobj=canvas[0].getContext("2d");
			var pat = new palettle(cobj,canvas[0],copy[0]);
			// console.log(pat)
			// pat.draw();
			divs.click(function(){
				var attr = $(this).attr("role");
					if(attr!==undefined){
						if(attr=="pencil"){
							pat.pencil();
						}else if(attr=="line"){
							pat.type=attr;
							pat.draw();
						}else if(attr=="triangle"){
							pat.type=attr;
							pat.draw();
						}else if(attr=="rect"){
							pat.type=attr;
							pat.draw();
						}else if(attr=="circle"){
							pat.type=attr;
							pat.draw();
						}else if(attr=="poly"){
							pat.type=attr;
							pat.bunm=prompt("请输入边数",5||5)
							pat.draw();
						}else if(attr=="polystar"){
							pat.type=attr;
							pat.bunm=prompt("请输入边数",5||5)
							pat.draw();
						}else if(attr=="fillStyle"){
							var inputa=$(".fillStyle input")
							inputa.change(function(){
								pat.fillStyle=this.value;
							})
						}else if(attr=="strokeStyle"){
							var inputb=$(".strokeStyle input")
								inputb.change(function(){
								pat.strokeStyle=this.value;
							})
						}else if(attr=="fill"){
							pat.style=attr;
							pat.draw();	
						}else if(attr=="stroke"){
							pat.style=attr;
							pat.draw();	
						}else{
							pat.type = attr
							pat.draw()
						}
					}
			})
			ear.click(function(){
				pat.earser();
			})
			del.click(function(){
				if(pat.status.length>1){
					pat.status.pop();
					pat.o.putImageData(pat.status[pat.status.length-1],0,0,0,0,pat.width,pat.height);
				}else if(pat.status.length==1){
					pat.status.pop();
					cobj.clearRect(0,0,pat.width,pat.height);
				}else{
					alert("无法继续撤销");
				}
			})
		}
})