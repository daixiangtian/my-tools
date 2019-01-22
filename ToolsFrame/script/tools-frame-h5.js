
// H5工具框架 == 》 html5 tool frame
// author : 戴向天

function  HTF( p = {} ){
	
	// HTF 对象
	const _this = this;
	
	if(!p.el)return console.log("default parameters el,el is dome element");
	
	this.el = document.querySelector(p.el),
	this.components = {};
	
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
		if(!p.src && p.href)return false;
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
	HTF.prototype.createStyle = (c)=>{
		
		console.log(c)
		
		let cds = c,
			_s = "{\n";
		let arr = [];
		
		function labelS(obj){
			let countS = "";
			for(let o in obj){
				let singleS = o+"{\n";
				
				for(let os in obj[o]){
					if(_this.judgeType(obj[o][os]) != 'json'){
						singleS += "\t"+os+" : "+obj[o][os]+";\n";
						delete obj[o][os];
					}
				}
				singleS+="}\n";
				countS += singleS;
			}
			console.log(obj);
			
			
			
		}
		
		function sc(c){
			for(let ci in c){
				if(_this.judgeType(c[ci]) != 'json'){
					_s += ("\t"+ci+" : "+c[ci]+";\n");
					delete c[ci]
				}
			}
			_s += "}\n";
			console.log(_s);
			labelS(c);
			return _s;
		}
		sc(cds);	
		
	}
	
	// 驼峰字符串转横线连接
	HTF.prototype.toLowerLine =(s,l)=>{
	let t = s.replace(/[A-Z]/g, (m)=>(l||"_") + m.toLowerCase());
		//如果首字母是大写，执行replace时会多一个_，这里需要去掉
		if(t.slice(0,1) === '_')t = t.slice(1);
		return t;
	}
	
	function registerMethod(methods){
		if(methods && _this.judgeType(methods) == 'json')for(let m in methods)_this.judgeType(methods[m]) == 'function'?_this[m] = methods[m]:console.log(m+' not a function');
	}
	
	function registerCmp(cp){
		if(!cp)return false;
		
		function begin(s){
			if( _this.judgeType(s) == 'json'){
				const cmp = s;
				let cmpTemporaryParent = document.createElement('div'),  //创建一个临时的组件副级元素
					cmpObj = null;			//当前组件
		
				for(let c in cmp){
					cmpTemporaryParent.innerHTML = cmp[c].content;
					cmpObj = cmpTemporaryParent.firstElementChild;
					
					//开始样式赋值
					if(cmp[c].style)_this.css(cmpObj,cmp[c].style);
					
					if(cmp[c].css){
						
						
						//const at = _this.extract(c,'letter') + _this.getRandomNum(8);
						const at = "asdasdasda";
						cmpObj.setAttribute(at,'');
						let _st = '{\n',
							_s = document.createElement('style');
						const _c = cmp[c].css,
						cs = _this.getAllEl(cmpObj);
						cs.forEach(v=>{v.setAttribute(at,'')})
						
						_this.createStyle(_c);
						_st += '}';
						console.log(_st);
					}
					
					_this.components[c] = cmpObj;
				}
			}else{
				console.log("component's Incorrect format")
			}
		}
		
		if(_this.judgeType(cp) == 'array')for(let i=0;i<cp.length;i++)begin(cp[i]);
		//开始替换组件
		replaceCmp(_this.getAllEl(_this.el));
	}
	
	function replaceCmp(){
		const arrEl = _this.getAllEl(_this.el);
			len = arrEl.length;
		arrEl.map(v=>{
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
									_this[a.value.split('(')[0]]()
								},false)
							}
						}
					})
				}
			}
		})
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
				}
				//js文件全部加载完毕
				if(isLoad == jsLen){
					registerMethod(p.methods);
					registerCmp(p.components);
				}
			});
		}):_this.judgeType(fs) == 'json'?_this.loadFile(v,function(){
			
		}):null
	}
	
	registerFiel(p.files);
	
}