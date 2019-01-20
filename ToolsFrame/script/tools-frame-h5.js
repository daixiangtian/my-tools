
// H5工具框架 == 》 html5 tool frame



function  HTF( p = {} ){
	
	// HTF 对象
	const _this = this;
	
	if(!p.el)return console.log("default parameters el,el is dome element");
	
	this.el = document.querySelector(p.el),
	this.components = {};
	
	// 判断数据类型
	HTF.prototype.judgeType = function(obj){
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
	
	HTF.prototype.css = function(o,s){
		if(!o)return false;
		if(this.judgeType(s) == 'json'){
			for( let j in s )o.style[j] = s[j];
		}else if(this.judgeType(s) == 'string'){
			let sa = s.split(";");
			for(let i=0;i<sa.length;i++)o.style[sa[i].split(":")[0]] = sa[i].split(":")[1];
		}
		return this;
	}
	
	HTF.prototype.replaceDom = function( o ,n ){
		if(!o)return this;
		let p = o.parentNode;
			p&&p.insertBefore(n,o);
			p&&p.removeChild(o);
		return this;
	}
	
	// 去掉字符串前后的空格
	HTF.prototype.trimSpaces = function(s){
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
	HTF.prototype.getAllAttr = function(el){
		let outerHTML = el.outerHTML;
		const name = el.nodeName.toLocaleLowerCase();
		outerHTML = outerHTML.split('</'+name+'>')[0].split('<'+name)[1];
		outerHTML = outerHTML.substring(0, outerHTML.length - 1);
		const reg= /.[a-zA-Z]*=/g,
				ms = outerHTML.match(reg),
				len = (ms&&ms.length) || 0;
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
	
	// 
	HTF.prototype.getAllEl = function(el){
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
	
	function registerMethod(methods){
		
		if(methods && _this.judgeType(methods) == 'json'){
			for(let m in methods){
				if(_this.judgeType(methods[m]) == 'function'){
					_this[m] = methods[m]
				}else{
					console.log(m+' not a function')
				}
			}
		}
	}
	
	function registerCmp(components){
		if(components && _this.judgeType(components) == 'json'){
			const cmp = components;
			let cmpTemporaryParent = document.createElement('div'),  //创建一个临时的组件副级元素
				cmpObj = null;			//当前组件
			for(let c in cmp){
				cmpTemporaryParent.innerHTML = cmp[c].content;
				cmpObj = cmpTemporaryParent.firstElementChild;
				cmp[c].style&&_this.css(cmpObj,cmp[c].style);
				_this.components[c] = cmpObj;
			}
		}
		
		//开始替换组件
		replaceCmp(_this.getAllEl(_this.el));
	}
	
	function replaceCmp(){
		const arrEl = _this.getAllEl(_this.el);
			len = arrEl.length;
		arrEl.map(v=>{
			const nodeName = v.nodeName.toLocaleLowerCase();
			if(_this.components[nodeName]){
				const cmp = _this.components[nodeName]
				_this.replaceDom(v,cmp);
				const arrAttr = _this.getAllAttr(v);
				if(arrAttr.length){
					const arry = ['@']
					arrAttr.map(a=>{
						if(arry.indexOf(a.key.toString().charAt(0)) > -1){
							const methodName = a.key.replace(a.key.toString().charAt(0),'').trim();
							if(_this[a.value.split('(')[0]],a.value.split('(')[0]){
								cmp.addEventListener(methodName,_this[a.value.split('(')[0]],false)
							}
						}
					})
				}
			}
		})
	}
	
	
	
	registerMethod(p.methods);
	registerCmp(p.components);
}