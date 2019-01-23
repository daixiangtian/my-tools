

const components = {
	'htf-header':{
		content : `
			<div class="htf-header">
				<div class="min-box-50 center">
					<i class="iconfont icon-back"></i>
					<span>返回</span>
				</div>
				<div class="htf-header__title">
					<p class="font-size-x">{{title}}</p>
				</div>
				<div class="min-box-50 center">
					<font><i class="iconfont icon-more"></i></font>
				</div>
			</div>
		`,
		css:{
			'display':'flex',
			'height':'49px',
			'border-bottom':'1px solid var(--borderColor)',
			'background':  'var(--mainColor)',
			'justify-content': 'space-between',
			'overflow':'hidden',
			'div':{
				'display': 'flex',
				'align-items': 'center'
			},
			'.htf-header__title':{
				'font-size':'var(--fontSizeX)'
			},
			'.htf-header__title>p':{
				'height':'24px',
				'overflow':'hidden',
				'padding':'0 10px'
			}
		}
	},
	'htf-banner':{
		content:`
			<div>
				<span>这个是banner</span>
			</div>
		`,
		style:{
			height:"150px",
			display:'flex',
			alignItems:'center',
			background:'pink'
		}
	},
	'htf-buttons':{
		content:`
			<ul class="btns" id="btns">
				<li>
					<span></span>
				</li>
				<li>
					<span></span>
				</li>
				<li>
					<span></span>
				</li>
				<li>
					<span></span>
				</li>
				<div></div>
				<span></span>
			</ul>
			
		`,
		css:{
			display:'flex',
			height:"50px",
			background:'blue',
			borderColor:'red',
			li:{
				flex:'1',
				display:'flex',
				margin:"0 10px",
				height:"30px",
				span:{
					width:"100%",
					height:"100%",
					background:'yellow'
				}
			},
			div:{
				background:"red",
				height:"50px",
				width:"100%"
			}
		}
	}
}

let methods = {
	a(){
		console.log("this is a function")
	}
}

