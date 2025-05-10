const imgsSrc = [
	'https://picsum.photos/id/22/200/300',
	'https://picsum.photos/id/31/200/300',
	'https://picsum.photos/id/43/200/300',
	'https://picsum.photos/id/10/200/300',
	'https://picsum.photos/id/44/200/300',
	'https://picsum.photos/id/82/200/300',
]

const singlImgSize = 200
const body =  document.getElementsByTagName('body')[0]

function createMainConteiner (){
	const main = document.createElement('div')
	main.classList.toggle('main-conteiner')
	body.appendChild(main)
	return main
}

function createImgElement (src){
	const imgElement = document.createElement('img')
	imgElement.src = src
	return imgElement
}

function getNextPositionCreator(numberOfSlide){
	let currentSlide = 0
	return function (directionForvard = true){
		if(directionForvard){
			++currentSlide
			if(currentSlide === numberOfSlide){
				currentSlide = 0
			}
		}else{
			--currentSlide
		if(currentSlide<0){
			currentSlide = currentSlide -1
			}
		}
		return currentSlide
	}
}

function handSlideChange(nextSlidePosition){
	const firstImg = document.querySelector("img[src='https://picsum.photos/id/22/200/300']");
	firstImg.style['margin-left'] = `${nextSlidePosition * - singlImgSize}px`
	const currentIndicator =  document.getElementsByClassName('slide-indicator-active')[0]
	currentIndicator.classList.toggle('slide-indicator-active')

	const indicators =  document.getElementsByClassName('slide-indicator')
	indicators[nextSlidePosition].classList.toggle('slide-indicator-active')
	
}

function createAndRenderImages (imgsSrc, conteiner){
	const listOfImageElements = imgsSrc.map(createImgElement)
	listOfImageElements.forEach((imgElement) => conteiner.appendChild(imgElement))
}

function createCarouselButtons(getNextSlide, mainImgElement){
	const leftButton = document.createElement('button')
	const righrButton = document.createElement('button')
	leftButton.innerText = 'Prew'
	righrButton.innerText = 'Next'

	righrButton.addEventListener('click', ()=>{
		const slide = getNextSlide()
		handSlideChange(slide)
	})

	leftButton.addEventListener('click', ()=>{
		const slide = getNextSlide(false)
		handSlideChange(slide)
	})
	const buttonConteiner = document.createElement('div')
	buttonConteiner.classList.toggle('buttons-conteiner')
	body.appendChild(buttonConteiner)

	buttonConteiner.appendChild(leftButton)
	buttonConteiner.appendChild(righrButton)
}


function addPlayPauseButton(){
	const button = document.createElement('button')
	button.innerText = 'Pause'
	body.appendChild(button)
	let autoplayState = true
	button.addEventListener('click', ()=>{
		button.innerText = autoplayState ? 'Play' : 'Pause'
		autoplayState = !autoplayState
})
	return button
}

function createSlidesIndicators(length){
	const conteiner = document.createElement('div')
	conteiner.classList.toggle('slide-indicator-conteiner')
	for(let i = 0; i<length; i++){
		let indicator = document.createElement('div')
		indicator.classList.toggle('slide-indicator')
		if(i === 0)(indicator.classList.toggle('slide-indicator-active'))
		conteiner.appendChild(indicator)
	}
	body.appendChild(conteiner)
}

function addSwipes(element){
	let touchstartX = 0
	let touchendX = 0

	function checkDirection(){
		if(touchendX > touchstartX) handSlideChange(getNextSlide(false))
		if(touchendX < touchstartX) handSlideChange(getNextSlide())
	}

	element.addEventListener('touchstart', e =>{
		touchstartX = e.changedTouches[0].screenX
	})

	element.addEventListener('touchend', e =>{
		touchendX = e.changedTouches[0].screenX
		checkDirection()
	})
}

function addSwipesMouse(element){
	let touchstartX = 0
	let touchendX = 0

	function checkDirection(){
		if(touchendX > touchstartX) handSlideChange(getNextSlide(false))
		if(touchendX < touchstartX) handSlideChange(getNextSlide())
	}

	element.addEventListener('mousedown', e =>{
		touchstartX = e.x
	})

	element.addEventListener('mouseup', e =>{
		touchendX = e.x
		checkDirection()
	})
}

const main = createMainConteiner();
createAndRenderImages(imgsSrc, main);

const getNextSlide = getNextPositionCreator(imgsSrc.length);
createCarouselButtons(getNextSlide);

const playPauseButton = addPlayPauseButton()

createSlidesIndicators(imgsSrc.length)

setInterval(() =>{
	if(playPauseButton.innerText === 'Pause'){
		const slide = getNextSlide()
		handSlideChange(slide)
	}
}, 1500)

document.addEventListener('keydown', (event)=>{
	if(event.key === 'ArrowLeft') handSlideChange(getNextSlide(false))
	if(event.key === 'ArrowRight') handSlideChange(getNextSlide())
})

addSwipes(document)
addSwipesMouse(document)

