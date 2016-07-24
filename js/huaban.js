function palettle(cobj,canvas,copy){
	this.o=cobj;
	this.canvas=canvas;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style="stroke";
	this.type="pencil";
	this.lineWidth=1;
	this.strokeStyle="#e45000";
	this.fillStyle="#e45000";
	this.status=[];
	this.bnum=5;
	this.jnum=5;
	this.copy=copy;
}

palettle.prototype.draw=function(){
	var that = this;
	this.copy.onmousedown=function(e){
		that.color();
		var dx = e.offsetX;
		var dy = e.offsetY;
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.status.length>0){
				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height)
			}
			var mx = e.offsetX;
			var my = e.offsetY;
			that[that.type](dx,dy,mx,my);
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height))
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
//橡皮功能
palettle.prototype.earser=function(){
	var that=this;
	var w = 30;
	this.copy.onmousedown=function(e){
		var dx = e.offsetX;
		var dy = e.offsetY;
		var a = document.createElement("div");
		a.style.cssText="width:"+w+"px;height:"+w+"px;border:2px solid #666;position:absolute"
		that.copy.parentNode.appendChild(a);
		document.onmousemove=function(e){
			var mx = e.offsetX;
			var my = e.offsetY;
			that.o.clearRect(mx-w/2,my-w/2,w,w);
			a.style.left=mx-w/2+"px";
			a.style.top=my-w/2+"px";
			that.copy.parentNode.removeChild(a);
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
//铅笔功能
palettle.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		that.color();
		that.o.beginPath();
		document.onmousemove=function(e){
			var mx = e.offsetX;
			var my = e.offsetY;
			that.o.lineTo(mx,my);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.o.closePath();
			that.status.push(that.o.getImageData(0,0,that.width,that.height))
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
//直线
palettle.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}
//矩形
palettle.prototype.rect=function(x1,y1,x2,y2){
	var w = x2-x1;
	var h = y2-y1;
	this.o.beginPath();
	this.o.rect(x1-.5,y1-.5,w,h);
	this.o.closePath();
	this.o[this.style]();
}
//圆
palettle.prototype.circle=function(x1,y1,x2,y2){
	this.o.beginPath();
	var r = this._r(x1,y1,x2,y2);
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o.closePath();
	this.o[this.style]();
}
//多边形
palettle.prototype.poly=function(x1,y1,x2,y2){
	this.o.beginPath();
	var r = this._r(x1,y1,x2,y2);
	var n = this.bnum;
	var ang = 360/n;
	// console.log(n)
	for(var i = 0;i<n;i++){
		// alert(1)
		this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r,y1+Math.sin(Math.PI/180*ang*i)*r)
	}
	this.o.closePath();
	this.o[this.style]();
}
//五角星
palettle.prototype.polystar=function(x1,y1,x2,y2){
	this.o.beginPath();
	var R=this._r(x1,y1,x2,y2);
	var r=R*0.33333;
	var ang=360/this.jnum/2;
	for (var i = 0; i < this.jnum*2; i++) {
		if (i%2==0) {
			this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*R,y1+Math.sin(Math.PI/180*ang*i)*R)
		}else{
			this.o.lineTo(x1+Math.cos(Math.PI/180*ang*i)*r,y1+Math.sin(Math.PI/180*ang*i)*r)
		}
		
	};
	this.o.closePath();
	this.o[this.style]();
}
//三角形
palettle.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1,y2);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.style]();
}
//
palettle.prototype._r=function(x1,y1,x2,y2){
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
//
palettle.prototype.color=function(){
	this.o.lineWidth=this.lineWidth;
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
}

