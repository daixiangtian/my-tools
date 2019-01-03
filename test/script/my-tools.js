
/**
	author : Clover
*/

function MyTools(){
	let doc,body,_this = this;
	
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
		let arr = [...document.all].map(e => +window.getComputedStyle(e).zIndex || 0);
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
	// 删除class名
	MyTools.prototype.removeClass = function(o,...p){
		
		if(_this.judgeType(o) == 'object' && o.length){
			for(let i=0;i<o.length;i++){
				o[i].classList.remove(p)
			}
		}else if(_this.judgeType(o) == 'dom'){
			o.classList.remove(p)
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
		let p = [
			{o:'<',n:'&lt;'},
			{o:'>',n:'&gt;'},
			{o:'\'',n:'&quot;'}
		]
		for(let i=0;i<p.length;i++)v = v.split(p[i].o).join(p[i].n);
		return v;
	}
	// 修改HTML
	MyTools.prototype.html = function(o,h,c){
		if(_this.judgeType(h) == 'function')h = h();
		if(_this.judgeType(h) == 'dom')h = h.outerHTML;
		if(_this.judgeType(o) == 'object' && o.length > 0)for(let i=0;i < o.length;i++){o[i].innerHTML = h;}
		
		if(_this.judgeType(o) == 'dom')o.innerHTML = h;
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
		if(_this.judgeType(doc) != "dom"){
			doc = document;
			body = doc.body;
		}
		let d = doc.createElement(s);
		doc.createElement(s);
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
	// 查找元素
	MyTools.prototype.queryDom = function( s ){
		if(!doc){
			doc = document;
			body = doc.body
		}
		if(s.indexOf('#') ===0 ){
			return doc.querySelector(s);
		}else{
			return doc.querySelectorAll(s)
		}
	}
	// 设置dom属性
	MyTools.prototype.attr = function(o,a,c){
		
		for(ai in a){
			o.setAttribute(ai,a[ai]);
		}
		return this;
	}
	// 设置dom的data值
	MyTools.prototype.setData = function(o,d){
		for(di in d){
			o.dataset[di] = d[di]
		}
		return this;
	}
	// dom函数赋值
	MyTools.prototype.setMethods = function(o,m){
		for(mi in m)o.addEventListener(mi,m[mi],false);
		return this;
	}
	// 弹出框
	MyTools.prototype.alert = function(txt){
		let p = this.create('div'),		//背景层
			b = this.create('div'),		//内容框
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
		return this;
	}
	// 选择性弹窗
	MyTools.prototype.confrim = function(txt,f){
		let p = this.create('div'),		//背景层
			b = this.create('div'),		//内容框
			t = this.create('div'),		//标题
			c = this.create('span'),	//关闭按钮
			v = this.create('div'),		//显示值
			y = this.create('div'),		//确认按钮框
			yb = this.create('span'),	//确认按钮
			nb = this.create('span');	//取消按钮
			
			this.append(body,p).addClass(p,'my-tools_back')
			.append(p,b).addClass(b,'my-tools_confrim','tools-fadeIn')
			.append(b,t).addClass(t,'my-tools_confrim_title')
			.append(b,c).addClass(c,'my-tools_confrim_close')
			.append(b,v).addClass(v,'my-tools_confrim_val')
			.append(b,y).addClass(y,'my-tools_confrim_btn_box')
			.append(y,nb).addClass(nb,'my-tools_confrim_btn','my-tools_btn','my-tools_btn_n')
			.append(y,yb).addClass(yb,'my-tools_alert_btn','my-tools_btn','my-tools_btn_y')
			.html(c,'x').html(t,'标题').html(v,this.showCode(txt)).html(yb,'确认').html(nb,'取消')
			.updateStyle(p,"zIndex:"+this.getMaxZIndex()).fadeIn(p).stop(p,'click');
			yb.bool = true;nb.bool = false;c.bool = false;
			nb.onclick = c.onclick = (()=> {
				this.onclick = null;
				_this.fadeOut(b,() =>{_this.remove(p);f&&f(this.bool);})
			})
			yb.onclick = (()=>{
				this.onclick = null;
				_this.fadeOut(b,() =>{_this.remove(p);f&&f(this.bool);})
			})
		return this;
	}
	// 输入型弹窗
	MyTools.prototype.prompt = function( txt ,f){
		let p = this.create('div'),			//背景层
			b = this.create('div'),			//内容框
			t = this.create('div'),			//标题
			c = this.create('span'),		//关闭按钮
			co = this.create('div'),		//内容层
			ov = this.create('p'),			//原来的数据
			inp = this.create('input'),		//输入框
			y = this.create('div'),			// 装载按钮的框
			yb = this.create('span'),		//确认按钮
			nb = this.create('span');		//取消按钮
			
		this.append(body,p).addClass(p,'my-tools_back')
		.append(p,b).addClass(b,'my-tools_prompt','tools-fadeIn')
		.append(b,t).addClass(t,'my-tools_prompt_title')
		.append(b,c).addClass(c,'my-tools_prompt_close')
		.append(b,co).addClass(co,'my-tools_prompt_content')
		.append(co,ov).addClass(ov,'my-tools_prompt_old_value')
		.append(co,inp).addClass(inp,'my-tools_prompt_input')
		.append(b,y).addClass(y,'my-tools_prompt_btn_box')
		.append(y,nb).addClass(nb,'my-tools_prompt_btn','my-tools_btn','my-tools_btn_n')
		.append(y,yb).addClass(yb,'my-tools_prompt_btn','my-tools_btn','my-tools_btn_y')
		.html(c,'x').html(t,'标题').html(ov,this.showCode(txt)).html(yb,'确认').html(nb,'取消')
		.updateStyle(p,"zIndex:"+this.getMaxZIndex()).fadeIn(p).stop(p,'click');
		yb.bool = true;nb.bool = false;c.bool = false;
		nb.onclick = c.onclick = (()=> {
			this.onclick = null;
			_this.fadeOut(b,() =>{_this.remove(p);})
		})
		yb.onclick = (()=>{
			this.onclick = null;
			_this.fadeOut(b,() =>{_this.remove(p);f&&f(inp.value);})
		})
		return this;
	}
	//图片自适应布局
	MyTools.prototype.pictrueLayer = function(c,f){
			let p = c.parentNode,
			pw = p.clientWidth,
				ph = p.clientHeight,
				iw = c.width,
				ih = c.height;
			if(iw > ih){
				_this.updateStyle(c,{
					height : ph + "px",
					width : ph / ih * iw + "px",
					marginLeft : -((ph / ih * iw - pw) / 2) + "px"
				})
			}else if(iw < ih){
				_this.updateStyle(c,{
					width : pw + "px",
					height : pw/iw*ih + "px",
					marginTop : -((pw/iw*ih - ph) / 2 )+"px"
				})
			}else{
				_this.updateStyle(c,{
					width : pw + "px",
					height : ph + "px",
				})
			}
			_this.addClass(c,'my-tools_scale')
			f&&fn(c);
		return this;
	}
	// loading样式
	MyTools.prototype.loading = function(o){
		let b = _this.create('div');
			_this.addClass(b,'spinner')
			for(let i=1;i<=5;i++){
				r = _this.create('div');
				_this.append(b,r).addClass(r,'rect'+i);
			}
		if(o)_this.append(o,b);
		return b;
	}
	//替换dom元素
	MyTools.prototype.replaceDom = function( o ,n ){
		if(!o)return this;
		let p = o.parentNode;
			p&&p.insertBefore(n,o);
			p&&p.removeChild(o);
		return this;
	}
	// 获取window的宽和高
	MyTools.prototype.winSize = function(){
		let e = window,a = 'inner';
		if (!('innerWidth' in window )){ 
			a = 'client'; 
			e = document.documentElement || document.body; 
		};
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }; 
	}
	//图片懒加载
	MyTools.prototype.lazy = function(){
		function imgShow(){
			let ls = _this.queryDom('loading');
			_this.html(ls,_this.loading);
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			for ( let i=ls.length-1;i>=0;i-- ){
				let top = ls[i].offsetTop;
				if(top < scrollTop + _this.winSize().height&& !ls[i].isLoad){
					ls[i].isLoad = true;
					setTimeout(()=>{
						let img = new Image();
							img.src = ls[i].dataset.src;
						_this.replaceDom(ls[i],img);
						if(ls[i].dataset.pictrueLayer){
							img.addEventListener('load',() =>{
								_this.pictrueLayer(img);
							},false)
						}
					},200)
				}
			}
		};
		imgShow();
		window.onscroll = imgShow;
		return this;
	}
	
	MyTools.prototype.slice = function(o,i,n){
		let arr = [];
		if(_this.judgeType(o) == 'object' && o.length > 0)for(let i=0;i<o.length;i++)arr.push(o[i]);
		arr.slice(i,n);
		
		return arr;
		
	}
	
	// 上拉加载，下拉刷新 适用于移动端
	MyTools.prototype.scroll = function( p ){
		let o = p.el,
			r = p.onRefresh,		//刷新的时候执行函数
			l = p.onLoad,			//上拉的时候执行函数
			m = p.onMove,			//再滚动的时候执行函数
			dropDownMax = 100,		//下拉的最大值			默认100
			scrollTop = 0,			//当前元素的scrollTop值 默认0
			sx =0,					//手指进入时的坐标
			ex =0,					//手指离开时的坐标
			dx = 0,					//滚动的高度
			dDom = _this.create('div'),
			
			hasPanel = false,		//是否有添加面板
			touch = {
				start : (e)=>{
					let touch = e.touches[0];
					sx = +touch.pageX; //页面触点X坐标
					sy = +touch.pageY; //页面触点Y坐标
					dx = +o.scrollTop;
					if(dx >= o.scrollHeight - o.clientHeight){
						let panel = _this.create('div');	//面板
							_this.updateStyle(panel,{
								position:"absolute",
								top : 0,
								left : 0,
								width:"100%",
								height:"100%",
								background:"red"
							})
						_this.updateStyle(o,{
							position:"fixed",
							top:-dx+"px"
						})
						
					}
				},
				move : (e)=>{
					let touch = e.touches[0];
					ex = +touch.pageX; //页面触点X坐标
					if(dx >= o.scrollHeight - o.clientHeight){
						dDom.style.height = Math.abs(sx-ex) + "px";
					}
				},
				end : (e) =>{
					
				},
			}
			o.style.overflow = "auto";
			o.style.position = "relative";
			dDom.innerHTML = "加载更多";
			dDom.style.background = "#eee";
			o.appendChild(dDom);
			o.addEventListener('touchstart',touch.start)
			o.addEventListener('touchmove',touch.move)
			o.addEventListener('touchend',touch.end)
			
	}
	
	/* 快速创建 */
	MyTools.prototype.createEntity = function( p,f ){
		
		let cs = p.childrens;
		
		let el = _this.create(p.el);
		if(p.className)_this.addClass(p.className);
		if(p.style)_this.updateStyle(el,p.style);
		if(p.attr)_this.attr(el,p.attr);
		if(p.data)_this.setData(el,p.data);
		if(p.methods)_this.setMethods(el,p.methods);
		if(p.id)el.setAttribute('id',p.id);
		function createChild( p , j ){
			j.forEach(v=>{
				let vs = v.childrens;
				let el = _this.create(v.el);
				if(v.className)_this.addClass(el,v.className);
				if(v.style)_this.updateStyle(el,v.style);
				if(v.attr)_this.attr(el,v.attr);
				if(v.data)_this.setData(el,v.data);
				if(v.methods)_this.setMethods(el,v.methods);
				if(v.id)el.setAttribute('id',v.id);
				_this.append(p,el);
				
				if(v.html || v.html == ''){
					_this.html(el,v.html)
				}else if(vs){
					if(_this.judgeType(vs) == 'function'){
						vs = vs();
					}
					createChild(el,vs);
				}
			})
		}
		if(p.html || p.html == ''){
			_this.html(el,p.html)
		}else if(cs){
			if(_this.judgeType(cs) == 'function'){
				cs = cs();
			}
			createChild(el,cs);
		}
		
		if(p.parent)_this.append(p.parent,el);
		
		f&&f(el);
		return el;
	}
	return this;
}