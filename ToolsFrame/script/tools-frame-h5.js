// H5工具框架 == 》 html5 tool frame
// author : 戴向天
// Tips: 在写样式的是建议使用rem为单位，
function  HTF( p = {} ){
	{
		// 页面尺寸初始化 - 淘宝
		! function(e, t) {
			var n = t.documentElement,
				d = e.devicePixelRatio || 1;
			function i() {
				var e = n.clientWidth / 3.75;
				n.style.fontSize = e + "px"
			}
			if (function e() { t.body ? t.body.style.fontSize = "16px" : t.addEventListener("DOMContentLoaded", e) }(), i(), e.addEventListener("resize", i), e.addEventListener("pageshow", function(e) { e.persisted && i() }), d >= 2) {
				var o = t.createElement("body"),
					a = t.createElement("div");
				a.style.border = ".5px solid transparent", o.appendChild(a), n.appendChild(o), 1 === a.offsetHeight && n.classList.add("hairlines"), n.removeChild(o)
			}
		}(window, document)
	}

	// HTF 对象
	const _this = this;
	
	if(!p.el)return console.log("default parameters el,el is dome element");
	
	// HTF 变量代码块
	{
		this.el = document.querySelector(p.el);
		// HTF的组件集
		this.components = new Object(null);
		// HTF的变量集
		this.variables= new Object(null);
		// HTF的常量集
		this.state = new Object(null);
		// HTF的数据集
		this.data = new Object(null)
	}
	
	
	// 判断数据类型
	HTF.prototype.judgeType = (obj)=>{
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
	
	// 该函数运行的是行内样式
	HTF.prototype.css = (o,s)=>{
		if(!o)return false;
		if(this.judgeType(s) == 'json'){
			for( let j in s )o.style[j] = s[j];
		}else if(this.judgeType(s) == 'string'){
			let sa = s.split(";");
			for(let i=0;i<sa.length;i++)o.style[sa[i].split(":")[0]] = sa[i].split(":")[1];
		}
		return this;
	}
	
	// 替换dome元素
	HTF.prototype.replaceDom = ( o ,n )=>{
		if(!o)return this;
		let p = o.parentNode;
			p&&p.insertBefore(n,o);
			p&&p.removeChild(o);
		return this;
	}
	
	// 去掉所有的空格
	HTF.prototype.trim = (str)=>{
		return str.replace(/\s/g,"")
	}
	
	// 设置dom属性
	HTF.prototype.attr = (o,a)=>{
		for(ai in a)o.setAttribute(ai,a[ai]);
		return this;
	}
	
	// 去掉字符串前后的空格
	HTF.prototype.trimSpaces = (s)=>{
		if(s == null) return "";  
		const whitespace = new String(" \t\n\r"); 
		let str = s.toString();
		
		if (whitespace.indexOf(str.charAt(str.length-1)) != -1){
			let i = str.length - 1;
			while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1)i--; 
			str = str.substring(0, i+1);  
		}
		if (whitespace.indexOf(str.charAt(0)) != -1) {  
			let j=0, i = str.length;
			while (j < i && whitespace.indexOf(str.charAt(j)) != -1)j++;
			str = str.substring(j, i);  
		}
		return str;
	}
	
	// 获取元素的所有属性值
	HTF.prototype.getAllAttr = (el)=>{
		let outerHTML = el.outerHTML;
		const name = el.nodeName.toLocaleLowerCase();
		outerHTML = outerHTML.split('</'+name+'>')[0].split('<'+name)[1];
		outerHTML = outerHTML.substring(0, outerHTML.length - 1);
		const reg= /.[a-zA-Z]*=/g,ms = outerHTML.match(reg),len = (ms&&ms.length) || 0;
		let attrs = [];
		if(_this.judgeType(ms) == "array"){
			ms.map(v=>{
				if(v.trim()){
					attrs.push({
						key:v.replace('=','').trim(),
						value:_this.trimSpaces(el.getAttribute(v.replace('=','').trim()))
					})
				};
			})
		}
		return attrs;
	}
	
	//动态加载JS/CSS文件
	HTF.prototype.loadFile = (p={},fn)=>{
		if(!p.src && !p.href)return false;
		const as = (p.src || p.href).split('.');
			let obj = null;
		as[as.length-1] == 'js'?obj = document.createElement('script'):obj = document.createElement('link');
		if(obj)_this.attr(obj,p);
		document.querySelector('head').appendChild(obj);
		obj.onload = ()=>fn&&fn();
		return this;
	}
	
	//获取所有的dome元素
	HTF.prototype.getAllEl = (el)=>{
		let arrEl = [];
		function hasChildren(ch){
			const len = ch.children.length,
			c = ch.children;
			for(let i=0;i<len;i++){
				arrEl.push(c[i]);
				c[i].children.length > 0&&hasChildren(c[i])
			}
		}
		hasChildren(el);
		return arrEl;
	}
	
	// 获取指定长度的随机数，默认一位
	HTF.prototype.getRandomNum = (len = 1) => {
		let r = "";
		for(let i=0;i < len;i++)r += ~~(Math.random()*10);
		return +r;
	}
	
	// 获取指定长度的字符串,默认一位
	HTF.prototype.getRandomLetter = (len = 1) => {
		const a = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678'
		let r = "";
		for(let i=0;i<len;i++)r += a.charAt(Math.floor(Math.random() * a.length));
		return r;
	}
	
	// 提取字符串里面的指定类型 - letter =>字母、number=>数字、char=>汉字
	HTF.prototype.extract = (s,t) =>{
		s = s.toString();
		return t=='char'?s.replace(/[^\u4E00-\u9FA5]/g,''):t=='number'?s.replace(/[^\d]/g,''):t=='letter'?s.replace(/[^a-zA-Z]/g,''):s;
	}
	
	//创建一个有作用域的style标签
	HTF.prototype.createStyle = (p)=>{
		if(!p.css)return false;
		if(!p.obj)return false;
		let allStyle = "",
			name = p.obj.nodeName+(p.obj.className&&"."+p.obj.className)+(p.obj.id&&"#"+p.obj.className),
			at = p.randomCode?"["+p.randomCode+"]":'';
		function createText(css,n,p=''){
			if(_this.judgeType(css) == 'json'){
				n = p?p+" "+n:n;
				let cssText = n+at+"{\n",
					cssArray = [],
					cssArrayName=[];
				for(let c in css){
					if(_this.judgeType(css[c]) == 'json'){
						cssArray.push(css[c]);
						cssArrayName.push(c);
					}else{
						cssText +=  "\t"+_this.toLowerLine(c,'-')+" : "+css[c]+";\n";
					}
				}
				cssText += "}\n";
				allStyle += cssText
				if(cssArray.length)for(let i=0;i<cssArray.length;i++)createText(cssArray[i],cssArrayName[i],n);
			}
		}
		createText(p.css,name)
		return allStyle;
	}
	
	// 驼峰字符串转横线连接
	HTF.prototype.toLowerLine =(s,l)=>{
	let t = s.replace(/[A-Z]/g, (m)=>(l||"_") + m.toLowerCase());
		//如果首字母是大写，执行replace时会多一个_，这里需要去掉
		if(t.slice(0,1) === '_')t = t.slice(1);
		return t;
	}
	
	// 横线连接的字符串转小驼峰
	HTF.prototype.toHump = (s,l = "_")=>{
		let t = '';
		 s.split(l || "-").map((item,index)=>{
			index >0?t += item.slice(0, 1).toUpperCase() + item.slice(1):t+=item;
		}).join('');
		return t;
	}
	
	//匹配HTF变量的正则
	var cmpValRE = /(@{.*?})+/;
	
	//判断是否有HTF变量
	function hasHTFValue(str){
		let resCopy = res = cmpValRE.exec(str);
			if(res){
				res = _this.trim(res[0]);
				len = res.length;
				res = res.substr(2,len - 3);
			}
		return  (res&&{
			field:res,
			original : resCopy[0]
		}) || false;
	}
	
	//替换变量值 @{value}
	// 参数说明： 模版的名称，需要替换的索引值，数据
	function updateHTFValue(cmpName,str){
		let data = _this.data[cmpName]
		if(data)while(res = hasHTFValue(str))str = str.replace(res.original,data[res.field]);
		return str;
	}

	// 注册函数
	function registerMethod(methods){
		if(methods && _this.judgeType(methods) == 'json')for(let m in methods)_this.judgeType(methods[m]) == 'function'?_this[m] = methods[m]:console.log(m+' not a function');
	}
	
	//注册组件
	function registerCmp(cp){
		if(!cp)return false;
		function begin(s){
			if( _this.judgeType(s) == 'json'){
				const cmp = s;
				let cmpTemporaryParent = document.createElement('div'),  //创建一个临时的组件父级元素
					cmpObj = null;			//当前组件
				for(let c in cmp){
					// 如果该组件的名称已在模版里面有了，这就不能再进行添加
					if(_this.components[c]) continue;
					//如果该组件有data数据变量的时候，就将该组件数据变量进行赋值进HTF里面去
					cmp[c].data&&(_this.data[c] = cmp[c].data);
					// 重新赋值给一个变量，因为原型模版内容是不能进行变化,否则就变成了一次性模版了
					let con = cmp[c].content;
					//如果有HTF变量，就进行替换
					hasHTFValue(cmp[c].content)&&( con = updateHTFValue(c,cmp[c].content));
					//将已渲染好的组件内容进行添加进临时的父级元素
					cmpTemporaryParent.innerHTML = con;
					//实例化出一个dom对象
					cmpObj = cmpTemporaryParent.firstElementChild;
					//开始样式赋值
					if(cmp[c].style)_this.css(cmpObj,cmp[c].style);
					if(cmp[c].css){
						const at = _this.extract(c,'letter') + _this.getRandomNum(8);
						cmpObj.setAttribute(at,'');
						_this.getAllEl(cmpObj).forEach(v=>{v.setAttribute(at,'')})
						const styleObj = document.createElement('style');
							styleObj.setAttribute('htf-css','');
						document.querySelector('head').appendChild(styleObj);
						styleObj.innerHTML = _this.createStyle({
							css : cmp[c].css,
							obj:cmpObj,
							randomCode : at
						});
					}
					_this.components[c] = cmpObj;
				}
			}else{
				console.log("component's Incorrect format")
			}
		}
		if(_this.judgeType(cp) == 'array')for(let i=0;i<cp.length;i++)begin(cp[i]);
		
		//将用户在组件里面有使用主题样式就进行替换
		replaceCssText();
		//开始替换组件
		replaceCmp(_this.getAllEl(_this.el));
	}
	
	//将组件还原
	function replaceCmp(){
		const arrEl = _this.getAllEl(_this.el);
			len = arrEl.length;
		arrEl.map(v=>{
			const solt =v.querySelector('slot');
			if(!solt){
				const nodeName = v.nodeName.toLocaleLowerCase();
				if(_this.components[nodeName]){
					const cmp = _this.components[nodeName];
					_this.replaceDom(v,cmp);
					const arrAttr = _this.getAllAttr(v);
					if(arrAttr.length){
						// 开始事件赋值
						const arry = ['@']
						arrAttr.map(a=>{
							if(arry.indexOf(a.key.toString().charAt(0)) > -1){
								const methodName = a.key.replace(a.key.toString().charAt(0),'').trim();
								if(_this[a.value.split('(')[0]],a.value.split('(')[0]){
									cmp.addEventListener(methodName,function(){
										a.value.indexOf("(")>=0?_this[a.value.split('(')[0]]():_this[a.value]();
									},false)
								}
							}
						})
					}
				}
			}else{
				console.log('含有子组件');
			}
		})
	}
	
	// 返回一个函数
	function antetype(t){
		return function(){
			return t;
		};
	}
	
	// 注册文件
	function registerFiel(fs){
		if(!fs){
			registerMethod(p.methods);
			registerCmp(p.components);
			return false;
		}
		let jsLen = 0,
			isLoad = 0;
		_this.judgeType(fs) == 'array'?fs.map((v,i)=>{
			if(v.src)jsLen++;
			_this.loadFile(v,function(){
				if(v.src){
					isLoad++;
					if(v.component)p.components = p.components.concat(eval(v.component));
					v.methods&&eval(v.methods)&&registerMethod(eval(v.methods));
					//js文件全部加载完毕
					if(isLoad == jsLen){
						registerMethod(p.methods);
						registerCmp(p.components);
					}
				}
			});
		}):_this.judgeType(fs) == 'json'?_this.loadFile(v,function(){
			
		}):null
	}
	
	// 组件的data数据进行绑定
	function bindData( cmp ,data ){
		
	}
	
	//替换style标签里面的内容
	function replaceCssText(){
		const mainCss = _this.mainCss;
		let html = '';
		document.querySelectorAll('style[htf-css]').forEach(v=>{
			html = v.innerHTML;
			for(let mc in mainCss)html.indexOf(mc)>=0 && (html = html.split('$'+mc).join('var(--'+mc+')'));
			v.innerHTML = html;
			v.removeAttribute('htf-css');
		})
	}
	
	// 将得到的数据都进行赋值到css :root属性里面
	function registerCss(css){
		_this.mainCss = new Object(null);
		if(!_this.judgeType(css,'json'))return;
		for(let c in css){
			// 赋值样式
			document.documentElement.style.setProperty('--'+c,css[c]);
			_this.mainCss[c] = css[c];
		}
		// 替换样式
		replaceCssText();
	}
	
	
	//变量重新赋值 变量赋值则是与组件进行绑定的
	function assignmentVariable(){
		
	}
	
	//注册配置
	function registerConfig(config){
		if(!_this.judgeType(config,'json'))return false;
		for(let c in config){
			switch(c){
				case 'mainCss':
				registerCss(config[c])
				break;
			}
			_this[c]?console.log(c+" is exist in HTF "): _this[c] = antetype(config[c])
		}
	}
	(function(){
		registerConfig(p.config);
		registerFiel(p.files);
	})()
	
}