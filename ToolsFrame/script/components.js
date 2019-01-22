

const components = {
	'htf-header':{
		content : `
			<div class="htf-header">
				这个是页眉
			</div>
		`,
		style:{
			height:"50px",
			background:'red'
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
				'span':{
					width:"100%",
					height:"100%",
					background:'yellow'
				}
			}
		}
	}
}