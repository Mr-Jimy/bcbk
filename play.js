		var main = document.getElementById('main');
		var main1 = document.getElementById('main1');
		var music = document.getElementById("music");
		var clock = null;
		var state = true;
		var speed = 2;

		function getStyle(el,attr) {
			return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el,null)[attr];
		}

		
		function cDiv(className) {
			var div = document.createElement('div');
			if(className) {
				div.className = className
			}
			return div;
		}

		function cRow() {
			var ind = Math.floor(Math.random()*4);

			var row = cDiv('row')

			for(var i = 0; i<4; i++) {
				if(i == ind) {
					row.appendChild(cDiv('black'));
				}else{
					row.appendChild(cDiv());
				}
			}

			if(main1.firstChild) {
				main1.insertBefore(row , main1.firstChild)
			}else{
				main1.appendChild(row);
			}	
		}
		

		function move() {
			var top = getStyle(main1 , 'top');
			top = parseInt(top) + speed ;

			main1.style.top = top + 'px'
			if(top > 0) {
				cRow();
				main1.style.top = '-25%';

				if(main1.children.length > 4 ) {
				main1.removeChild(main1.lastChild);
			}

				if(main1.lastChild.pass == undefined){
					fail();
				}
			}
		}

		function init() {
			for(var i = 0; i<4 ;i++){
				cRow();
			}

			main1.onclick = function(ev) {
				ev.target = ev.target || ev.srcElement;
				if(state == false){
					fail();
				}else if(ev.target.className == '') {
					fail();
				} else {
					ev.target.className = '';
					ev.target.parentNode.pass = true;
					var score = document.getElementById('sc');
					var score1 = document.getElementById('sc1');
					var sc = parseInt(score.innerHTML) + 1;
					score.innerHTML = score1.innerHTML = sc;
					music.play();

					if(sc%10 == 0){
						speed += 0.5;
					}
		// console.log(ev.target.parentNode.pass)
				}
			}

			clock = window.setInterval('move();',10);
		}

		function fail() {
			state = false;
			clearInterval(clock);
			main.style.display = 'block';
			music.pause();

			// var r = confirm("游戏结束，是否重新开始，点击取消返回首页");
			// if(r == true){
			// 	// window.history.go(0);
			// 	window.location.reload();
			// }else{
			// 	window.location.href = "a.html"
			// }
		}

		var res = document.getElementById('restart')
		res.onclick = function() {
			window.location.reload();
		}
		init();