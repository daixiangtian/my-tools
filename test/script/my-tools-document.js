
let myToolsDoc = [
	{
		name : '获取浏览器的环境（browser）',
		desc:'该方法，判断了四种浏览器的环境，分别：IE、moz、opera、safari。均以布尔值进行返回',
		code : `
		let myTools = new MyTools();
		
		let browser = myTools.browser();
			
		`,
		param:`
		无参数
		`,
		result : `
		{	
			"ie":boolean,				
			"moz":boolean,				
			"opera":boolean,
			"safari":boolean
		}
		`
	},{
		name : '引入js/css文件（introduceFile）',
		desc:'该方法可以进行动态的添加外面文件，js/css。',
		param:`
		url: 文件地址
		type: 文件的类型
		callBack: 加载成功的返回值  boolean
		`,
		code : `
		let myTools = new MyTools();
		
		myTools.introduceFile({
			url:"./test/css/index.css",
			type:"css",
			callBack : function(result){
				if(resutl){
					myTools.alert('文件加载完毕')
				}else{
					myTools.alert('文件加载失败，请确认文件地址或文件类型是否有错误')
				}
			}
		})
			
		`,
		result : `
		MyTools对象
		`
	},{
		name : '获取数据类型（judgeType）',
		desc:'该方法可以获取对象的类型',
		param:`
		object: 需要判断的对象
		`,
		code:`
		let myTools = new MyTools();
		
		console.log(myTools.judgeType("my-tools"));			//string
		
		console.log(myTools.judgeType(123456789));			//number
		
		console.log(myTools.judgeType(ture));				//boolean
		`,
		result:`
		array:数组
		boolean:布尔
		number：数字
		dom：dom元素
		map
		json
		...	其它
		`
	},{
		name:'更新样式（updateStyle）',
		desc:'该方法可以动态更改dom元素的样式，使用方式与JQuery很像，不过第一个该方法的第一个参数值是dom元素，调用该方法后，dom元素将会给予行内样式&lt;/br>&lt;/br>（tips:行内样式的优先级是最高的）',
		param:`
			dom : dom元素
			json: 样式json,
			obj: 需要MyTools返回的对象，默认返回MyTools对象
		`,
		code:`
		let myTools = new MyTools(),
			body = document.querySelector('body');
			obj = myTools.updateStyle(body,{
				width: "500px",
				height:"800px",
				background:"red"
				...
			},body)
		
		console.log(obj === body);		//ture
		`,
		result:`
		返回值是更具第三个参数来进行定义的
		
		第三个参数需要MyTools返回的对象，默认返回MyTools对象
		`
	},{
		name : '获取页面中最高层级的数字（getMaxZIndex）',
		desc:'该方法可以获取页面中最高的层级数，并在该层级数上 +1',
		param:`
		无参数
		`,
		code:`
		let myTools = new MyTools();
		
		let zIndex = myTools.getMaxZIndex();
		`,
		result:`
		number：数字
		`
	},{
		name:'弹入的效果（fadeIn）',
		desc:'该方法的能赋予指定的dom元素一个弹入的感觉，类似JQuery的fedaIn。该方法的弹入时间是固定死的500毫秒&lt;/br>&lt;/br>（tips:展示效果需要配合my-tools.css。my-tools.css在myTools.js加载的时候自动就进行动态添加）',
		param:`
		dom:元素,
		event : 回调函数
		`,
		code:`
		let myTools = new MyTools(),
			div = document.createElement('div');
			div.style.display = "none";
			div.style.width = "500px";
			div.style.height = "500px";
			div.style.background = "red";
			
			myTools.fadeIn(div);
		`,
		result:`
		MyTools对象
		`
	},{
		name:'弹出效果（fadeOut）',
		desc:'该方法的能赋予指定的dom元素一个弹入的感觉，类似JQuery的fedaOut。该方法的弹入时间是固定死的500毫秒&lt;/br>&lt;/br>（tips:展示效果需要配合my-tools.css。my-tools.css在myTools.js加载的时候自动就进行动态添加）',
		param:`
		dom:元素,
		event : 回调函数
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		myTools.fadeOut(div,function(){
			//消失后就会触发
			alert('div消失了')
		})
		`,
		result:`
		MyTools对象
		`
	},{
		name: '添加class名（addClass）',
		desc:'该方法可以给dom元素批量添加class名',
		param:`
		第一个参数：dom元素
		第二个参数：array | string
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		
		myTools.addClass(div,"class1",'class2'...);
		
		myTools.addClass(div,[
			'class1',
			'class2'
		])
		`,
		result:`
		MyTools对象
		`
	},{
		name:'删除class名（removeClass）',
		desc:'该方法可以给dom元素删除class名',
		param:`
		第一个参数：dom元素
		第二个参数：array | string
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		myTools.removeClass(div,"class1");
		`,
		result:`
		MyTools对象
		`
	},{
		name:'添加dom元素(append)',
		desc:'该方法可以给指定的dom元素，添加子元素',
		param:`
		第一个参数：需要被添加的dom元素
		第二个参数：被添加dom元素
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		myTools.append(document.body,div);
		`,
		result:`
		MyTools对象
		`
	},{
		name:'删除dom元素（remove）',
		desc:'该方法删除指定的dom元素',
		param:`
		第一个参数:需要被删除的dom元素
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector(div);
		
		myTools.remove(div);
		`,
		result:`
		MyTools对象
		`
	},{
		name :'显示html源码显示（showCode）',
		desc:'显示html标签的源码',
		param:`
		第一个参数:字符串
		`,
		code:`
		let myTools = new MyTools(),
		
		string = '&lt;div>my-tools.js&lt;/div>';
		
		myTools.showCode(string);
		`,
		result:`
		string
		`
	},{
		name:'修改Text(html)',
		desc:'更换html内容',
		param:`
		第一个参数:dom元素
		第二个参数：字符串
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div'),
		
		string = '新的内容';
		
		myTools.html(div,string)
		`
	},{
		name:'修改TEXT(text)',
		desc:'更换html内容',
		param:`
		第一个参数:dom元素
		第二个参数：字符串
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div'),
		
		string = '新的内容';
		
		myTools.text(div,string)
		`
	},{
		name:'创建dom元素(create)',
		desc:'创建dom元素',
		param:`
		第一个参数：需要创建的标签名
		`,
		code:`
		let myTools = new MyTools(),
		
		div = myTools.create('div');
		
		document.body.appendChild(div);
		`,
		result:`
		dom元素
		`
	},{
		name :'阻止事件冒泡（stop）',
		desc:'该方法可以给指定的dom元素，在事件上面进行阻止冒泡',
		param:`
		第一个参数：dom元素
		第二个参数：事件名
		第三个参数：需要MyTools返回的对象，默认返回MyTools对象
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		myTools.stop(div,'click',div);
		`,
		result:`
		返回值是更具第三个参数来进行定义的
		
		第三个参数需要MyTools返回的对象，默认返回MyTools对象
		`
	},{
		name:'查找元素（queryDom）',
		desc:'该方法可以通过指定的条件，查询出在document里面的元素',
		param:`
		参数：class/id/attributes/label
		`,
		code:`
		let myTools = new MyTools();
		
		myTools.queryDom('.className');
		`,
		result:`
		dom元素
		`
	},{
		name:'设置dom属性(attr)',
		desc:'该方法可以设置被选元素的属性和值。',
		param:`
		第一个参数：dom元素
		第二个参数：json
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		myTools.attr(div,{
			id:'attrId',
			index : 1
		})
		`,
		result:`
		dom元素
		`
	},{
		name:'设置dom的data值（setData）',
		desc:"该方法可以设置dom元素的data属性值",
		param:`
		第一个参数：dom元素
		第二个参数：json
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		myTools.setData(div,{
			name:'my-tools'
		})
		`,
		result:`
		MyTools对象
		`
	},{
		name:'dom函数赋值（setMethods）',
		desc:'该方法可以给dom元素进行添加监听事件，可进行多个函数方法',
		param:`
		第一个参数：dom元素
		第二个参数：json
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div');
		
		myTools.setMethods(div,{
			click:function(){
				alert('你好！');
			},
			click:function(){
				alert("我很好！");
			},
			mousedown:function(){
				alert("鼠标被按下了！")
			}
		})
		`,
		result:`
		MyTools对象
		`
	},{
		name:'弹出框（alert）',
		desc:'自定义弹出',
		param:`
		string
		`,
		code:`
		let myTools = new MyTools();
		
		myTools.alert('你好啊！');
		`,
		result:`
		MyTools对象
		`
	},{
		name:'选择性弹窗（confrim）',
		desc:'用户选择性弹窗',
		param:`
		string,
		Event:回调函数
		`,
		code:`
		let myTools = new MyTools();
		
		myTools.confirm("你好啊！",function(result){
			if(result){
				alert('您点击了确定')
			}else{
				alert('您点击了取消，或者是关闭')
			}
		})
		`,
		result:`
		MyTools对象
		`
	},{
		name:'输入型弹窗（prompt）',
		desc:'调用该方法，这就会弹出输入型的框子',
		param:`
		string,
		Event:回调函数
		`,
		code:`
		let myTools = new MyTools();
		
		myTools.prompt("你好啊！",function(result){
			alert(result);
		})
		`,
		result:`
		MyTools对象
		`
	},{
		name :'图片自适应布局（pictrueLayer）',
		desc:'该方法可以是图片进行自适应的布局，选择中间部分',
		param:`
		第一个参数：dom元素
		Event：回调函数
		`,
		code:`
		let myTools = new MyTools();
		
		&lt;div style="width:50px;height:50px">
			&lt;img src="/img/pictrue.jpg" onload="myTools.pictrueLayer(this)" />
		&lt;/div>
		
		`,
		result:`
		MyTools对象
		`
	},{
		name:'loading样式（loading）',
		desc:'该方法会创建一个loading dom元素，并返回',
		param:`
		第一个参数：dom元素（需要添加loading的元素）
		`,
		code:`
		let myTools = new MyTools();
		
		div = document.querySelector('div');
		
		myTools.loading(div);
		`,
		resutl:`
		loading dom元素
		`
	},{
		name:'替换dom元素（replaceDom）',
		desc:'该方法可以直接进行替换dom元素',
		param:`
		第一个参数：dom元素 （需要被替换的dom元素）
		第二个参数：dom元素	（新的dom元素）
		`,
		code:`
		let myTools = new MyTools(),
		
		div = document.querySelector('div'),
		
		span = document.createElement('span');
		
		span.innerHTML = "这个是span标签";
		
		myTools.replaceDom(div,span);
		`,
		result:`
		MyTools对象
		`
	},{
		name:'获取window的宽和高（winSize）',
		desc:'该方法可以获取window的宽度和高度，并返回',
		param:`
		无
		`,
		code:`
		let myTools = new MyTools();
		
		alert(JSON.stringify(myTools.winSize()));
		`,
		result:`
		{
			width:number,
			height:number
		}
		`
	},{
		name:'图片懒加载（lazy）',
		desc:'该方法会自动去查找loading标签，然后通过lazy的方法进行替换成img data-src 则就是图片的路径',
		param:`
		无参数
		`,
		code:`
		
		.load-img-box{
			width:50px;
			height:50px;
			overflow:hidden;
		}
		
		&lt;div class="load-img-box">
			&lt;loading data-src="http://pic1.win4000.com/mobile/5/5289af8a54c69_130_170.jpg" data-pictrue-layer=true>&lt;/loading>
		&lt;/div>
		&lt;div class="load-img-box">
			&lt;loading data-src="http://www.ilife.cn/images/upload/info/beauty/other_images/8_20141021105616_1.jpg" data-pictrue-layer=true>&lt;/loading>
		&lt;/div>
		&lt;div class="load-img-box">
			&lt;loading data-src="http://image.fsyule.net/2017-01-10/b43b3ef9a00912407bfd331913399d7e.jpg" data-pictrue-layer=true>&lt;/loading>
		&lt;/div>
		&lt;div class="load-img-box">
			&lt;loading data-src="http://img1.voc.com.cn/UpLoadFile/2014/07/17/201407171139598760.png" data-pictrue-layer=true>&lt;/loading>
		&lt;/div>
		&lt;div class="load-img-box">
			&lt;loading data-src="http://img.ixinwei.com/iww201805/123992.jpg" data-pictrue-layer=true>&lt;/loading>
		&lt;/div>
		&lt;div class="load-img-box">
			&lt;loading data-src="http://p0.ifengimg.com/pmop/2018/0119/09C1786DD14A70BF576D4F04005F6F16473D7540_size48_w532_h800.jpeg" data-pictrue-layer=true>&lt;/loading>
		&lt;/div>
		
		let myTools = new MyTools();
		
		myTools.lazy();
		`,
		result:`
		MyTools对象
		`
	},{
		name:'快速创建实体（createEntity）',
	}
]