
/**
	author : Clover
*/

function MyTools(){
	
	const doc = document,body = doc.body,_this = this;
	
	MyTools.mainBack = "#eee";
	
	//判断浏览器
	MyTools.prototype.browser = function(){
		return {
			ie:/msie/.test(window.navigator.userAgent.toLowerCase()),   
			moz:/gecko/.test(window.navigator.userAgent.toLowerCase()),   
			opera:/opera/.test(window.navigator.userAgent.toLowerCase()),   
			safari:/safari/.test(window.navigator.userAgent.toLowerCase())   
		}
	}
	//引入js/css文件
	MyTools.prototype.introduceFile = function( param ){
		param = param || {};
		if(param.url){
			if(param.type == "script" ||param.type === "js"){
				let _script = document.createElement('script');
				_script.setAttribute('src',param.url);
				_script.setAttribute('type','text/javascript');
				document.querySelector('head').appendChild(_script);
				
				let Browser = this.browser();
				if(Browser.ie){
					_script.onreadystatechange=function(){  
						(this.readyState=='loaded'||this.readyStaate=='complete') && param.callBack && param.callBack(true) || param.callBack && param.callBack(false);
					};   
				}else if(Browser.moz){   
					_script.onload=function(){ 
						param.callBack && param.callBack(true);
					};
					_script.onerror = function(){
						param.callBack && param.callBack(false);
					}
				 }else{   
					param.callBack && param.callBack();
				}
			}else if(param.type == "style" ||param.type === "css"){
				let _style = document.createElement('link');
					_style.setAttribute("rel", "stylesheet"); 
					_style.setAttribute("type", "text/css"); 
					_style.setAttribute("href", param.url); 
					document.querySelector('head').appendChild(_style);
					_style.onload = function(){
						param.callBack && param.callBack(true)
					}
					_style.onerror = function(){
						param.callBack && param.callBack(false)
					}
			}
		}else{
			console.log('请输入引入文件的地址')
		}
		return this;
	}
	// 判断数据类型
	MyTools.prototype.judgeType = function(obj){
		if(Object.prototype.toString.call(obj) === '[object Array]'){
			return 'array';
		}else if(obj === true || obj === false){
			return 'boolean';
		}else if(!isNaN(obj)){
			return 'number'
		}else if(obj instanceof HTMLElement){
			return "dom";
		}else if(obj instanceof Map){
			return "map";
		}else if(typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length){
			return "json"
		}else{
			return typeof(obj)
		}
	}
	// 更新样式
	MyTools.prototype.updateStyle = function(o,s){
		if(!o)return false;
		if(this.judgeType(s) == 'json'){
			for( let j in s )o.style[j] = s[j];
		}else if(this.judgeType(s) == 'string'){
			let sa = s.split(";");
			for(let i=0;i<sa.length;i++)o.style[sa[i].split(":")[0]] = sa[i].split(":")[1];
		}
		return this;
	}
	// 获取页面里面最大的z-index值
	MyTools.prototype.getMaxZIndex = function(){
		var arr = [...document.all].map(e => +window.getComputedStyle(e).zIndex || 0);
		return arr.length ? Math.max(...arr) + 1 : 0
	}
	// 弹入的效果
	MyTools.prototype.fadeIn = function( d ,f ){
		this.addClass(d,'tools-fadeIn');
		setTimeout(()=>f&&f());
		return this;
	}
	// 弹出效果
	MyTools.prototype.fadeOut = function( d,f ){
		this.addClass(d,'tools-fadeOut');
		setTimeout(()=>{f&&f()},450);
		return this;
	}
	// 添加class名
	MyTools.prototype.addClass = function(o,...p){
		if(this.judgeType(o) != "dom")return;
		if(this.judgeType(p) == 'array'){
			for(let c=0;c<p.length;c++)o.classList.add(p[c]);
		}else if(this.judgeType(p) == "string"){
			c.classList.add(p)
		}
		return this;
	}
	// 添加dom元素
	MyTools.prototype.append = function(p,o,c){
		p.appendChild(o);
		if(c){
			return c
		}else{
			return this;
		}
	}
	// 删除dom元素
	MyTools.prototype.remove = function(d,c){
		d.parentNode.removeChild(d)
		if(c){
			return c
		}else{
			return this;
		}
	}
	// 显示html源码显示
	MyTools.prototype.showCode = function( v ){
		var p = [
			{o:'<',n:'&lt;'},
			{o:'>',n:'&gt;'},
			{o:'\'',n:'&quot;'}
		]
		for(var i=0;i<p.length;i++)v = v.split(p[i].o).join(p[i].n);
		return v;
	}
	// 修改HTML
	MyTools.prototype.html = function(o,h,c){
		o.innerHTML = h;
		if(c){
			return c
		}else{
			return this;
		}
	}
	// 修改TEXT
	MyTools.prototype.text = function(o,t,c){
		o.innerText = t;
		if(c){
			return c
		}else{
			return this;
		}
	}
	// 创建dom元素
	MyTools.prototype.create = function( s ){
		let d = doc.createElement(s);
		return d;
	}
	// 阻止事件冒泡
	MyTools.prototype.stop = function(o, n,c){
		o.addEventListener(n,((e)=>e.stopPropagation()),false);
		if(c){
			return c
		}else{
			return this;
		}
	}
	// 设置dom属性
	/*
	MyTools.prototype.attr = function(o,...a,c){
		if(this.judgeType(a) == 'json'){
			for( let ai in a )o.setAttribute(ai = s[ai]);
		}else if(this.judgeType(a) == 'string'){
			
		}
	}
	*/
	
	// 弹出框
	MyTools.prototype.alert = function(txt){
		let p = this.create('div'),		//背景层
			b = this.create('div'),		//内容层
			t = this.create('div'),		//标题
			c = this.create('span'),	//关闭按钮
			v = this.create('div'),		//显示值
			y = this.create('div'),		//按钮框
			yb = this.create('span');	//确认按钮
			
			this.append(body,p).addClass(p,'my-tools_back')
			.append(p,b).addClass(b,'my-tools_alert','tools-fadeIn')
			.append(b,t).addClass(t,'my-tools_alert_title')
			.append(b,c).addClass(c,'my-tools_alert_close')
			.append(b,v).addClass(v,'my-tools_alert_val')
			.append(b,y).addClass(y,'my-tools_alert_btn_box')
			.append(y,yb).addClass(yb,'my-tools_alert_btn','my-tools_btn','my-tools_btn_y')
			.html(c,'x').html(t,'标题').html(v,this.showCode(txt)).html(yb,'确认')
			.updateStyle(p,"zIndex:"+this.getMaxZIndex()).fadeIn(p).stop(p,'click');
			yb.onclick = c.onclick = (() =>{
				this.onclick = null;
				_this.fadeOut(b,() =>{_this.remove(p);})
			})
		return void 0;
	}
	// 选择性弹窗
	MyTools.prototype.comfrim = function(txt,f){
		let p = this.create('div'),		//背景层
			b = this.create('div'),		//内容层
			t = this.create('div'),		//标题
			c = this.create('span'),	//关闭按钮
			v = this.create('div'),		//显示值
			y = this.create('div'),		//确认按钮框
			yb = this.create('span'),	//确认按钮
			nb = this.create('span');	//取消按钮
			
			this.append(body,p).addClass(p,'my-tools_back')
			.append(p,b).addClass(b,'my-tools_comfrim','tools-fadeIn')
			.append(b,t).addClass(t,'my-tools_comfrim_title')
			.append(b,c).addClass(c,'my-tools_comfrim_close')
			.append(b,v).addClass(v,'my-tools_comfrim_val')
			.append(b,y).addClass(y,'my-tools_comfrim_btn_box')
			.append(y,nb).addClass(nb,'my-tools_comfrim_btn','my-tools_btn','my-tools_btn_n')
			.append(y,yb).addClass(yb,'my-tools_alert_btn','my-tools_btn','my-tools_btn_y')
			.html(c,'x').html(t,'标题').html(v,this.showCode(txt)).html(yb,'确认').html(nb,'取消')
			.updateStyle(p,"zIndex:"+this.getMaxZIndex()).fadeIn(p).stop(p,'click');
			yb.bool = true;nb.bool = false;c.bool = false;
			nb.onclick = c.onclick = (()=> {
				this.onclick = null;
				_this.fadeOut(b,() =>{_this.remove(p);f&&f(this.bool);})
			})
			yb.onclick = (()=>{_this.remove(p);f&&f(this.bool);})
	}
}