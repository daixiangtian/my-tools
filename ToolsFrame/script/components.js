

const components = {
	'htf-header':{
		template : `
			<div class="htf-header">
				<div class="min-box-50 back">
					<i class="iconfont icon-back"></i>
					<span>@{back}</span>
				</div>
				<div class="htf-header_title">
					<span>@{  title   }</span>
				</div>
				<div class="min-box-50 auxiliary">
					<font><i class="iconfont icon-more auxiliary-icon"></i></font>
				</div>
			</div>
		`,
		css:{
			'display':'flex',
			'height':'0.49rem',
			'border-bottom':'0.01rem solid var(--borderColor)',
			'background':  '$mainColor',
			'justify-content': 'space-between',
			'overflow':'hidden',
			'position':'fixed',
			'width':'100%',
			'top':'0',
			'left':'0',
			'div':{
				'display': 'flex',
				'align-items': 'center'
			},
			'.htf-header_title':{
				'font-size':'var(--fontSizeX)',
				'span':{
					'height':'0.24rem',
					'overflow':'hidden',
					'width':'2rem',
					'text-align':'center',
					'lineHeight':'0.24rem',
					'color':'#fff'
				},
				
			},
			'.min-box-50':{
				'min-width':"0.5rem",
				'min-height':"0.5rem",
				'display':'flex',
				'align-items':'center',
				'justify-content':'center'
			},
			'.back':{
				'font-size':'12px',
				'i':{
					'color':'#fff',
					'font-size':'14px',
					'margin-top':'0.03rem'
				},
				'span':{
					'color':'#fff'
				}
			},
			'.auxiliary':{
				'.auxiliary-icon':{
					'font-size':'24px'
				}
			}
		},
		data:{
			title:'这个是标题',
			back:'返回'
		},
		methods:{
			test(){
				console.log(this);
			}
		}
		
	},
	'htf-container':{
		template:`
			<div class="htf-container"></div>
		`,
		data:{
			
		},
		css:{
			'padding-top':'0.5rem',
			'padding-bottom':'0.5rem',
			'background':'#f4f4f4',
			'min-height':'calc(100% - 1rem)',
			'p':{
				background:'pink',
				height:'0.4rem',
				fontSize:'14px',
				marginBottom:'13px',
				textAlign:'center',
				lineHeight:'0.4rem'
			}
		},
		
	},
	'htf-footer':{
		template:`
			<div class="htf-footer">
				<ul class="htf-footer_list">
					<li>
						<i class="iconfont icon-fangzi"></i>
						<p>首页</p>
					</li>
					<li>
						<i class="iconfont icon-fabu"></i>
						<p>发布</p>
					</li>
					<li>
						<i class="iconfont icon-ren111"></i>
						<p>我的</p>
					</li>
				</ul>
			</div>
		`,
		css:{
			display:'flex',
			height:"0.5rem",
			'position':'fixed',
			width:'100%',
			bottom:'0',
			background:'#fff',
			'box-shadow':'0 0.01rem 0.05rem rgba(0, 0, 0, 0.1)',
			'.htf-footer_list':{
				'display':'flex',
				'width':'100%',
			},
			li:{
				'flex':1,
				'text-align':'center',
				'i':{
					'font-size':'0.26rem',
					'padding-top':'0.05rem',
					'display':'block',
				},
				p:{
					width:"100%",
					height:"100%",
					'font-size':'0.12rem',
					'margin-top':'-0.08rem'
				}
			},
		}
	},
	'index':{
		template:`
			<div id="index">
				<span>这个是Index页面</span>
			</div>
		`,
		css:{
			'display':'flex',
			'align-items':'center',
			'justify-content':'center',
			'width':'100%',
			'height':'100%',
			span:{
				'font-size':'24px',
			}
		},
		props:['text'],
	},
	'htf-test':{
		template:`
			<div></div>
		`,
		style:{
			background:'red',
			height:'50px'
		}
	}
}

