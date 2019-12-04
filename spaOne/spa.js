const app = {
	pages: [],
	show: new Event('show'),
	init: function(){
		app.pages = document.querySelectorAll('.page')
		app.pages.forEach((pg)=>{
			pg.addEventListener('show', app.pageShow)
		})

		document.querySelectorAll('.nav-link').forEach((link)=>{
			link.addEventListener('click', app.nav)
		})

		// replace current url at start
		history.replaceState({}, 'Home', '#home')
		// triggers when page changes
		window.addEventListener('popstate', app.poppin)
	},
	nav: function(ev){
		ev.preventDefault()
		let currentPage = ev.target.getAttribute('data-target')
		document.querySelector('.active').classList.remove('active')
		document.getElementById(currentPage).classList.add('active')
		document.getElementById(currentPage).dispatchEvent(app.show)
		history.pushState({}, currentPage, `#${currentPage}`)
	},
	pageShow: function(ev){
		let h1 = ev.target.querySelector('h1')
		h1.classList.add('big')
		setTimeout((ev)=>{
			ev.classList.remove('big')
		}, 1200, h1)

		console.log('Page', ev.target.id, 'just shown')
	},
	poppin: function(ev){
		let hash = location.hash.replace('#','')
		console.log(`hash is ${hash}`)
		document.querySelector('.active').classList.remove('active')
		document.getElementById(hash).classList.add('active')
		document.getElementById(hash).dispatchEvent(app.show)
		
		console.log(location.has, 'popstate event')
	},
}

document.addEventListener('DOMContentLoaded', app.init)