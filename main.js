const imgsSrc = [
	'https://picsum.photos/id/22/200/300',
	'https://picsum.photos/id/31/200/300',
	'https://picsum.photos/id/43/200/300',
	'https://picsum.photos/id/10/200/300',
	'https://picsum.photos/id/44/200/300',
	'https://picsum.photos/id/82/200/300',
]

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

// function createMainImg(src, conteiner){
// 	const img = createImgElement(src)
// 	conteiner.appendChild(img)
// 	return img
// }

function handSlideChange(nextSlidePosition){
	const allImgs = Array.from(document.getElementsByTagName('img'))
	allImgs.forEach(img=>img.style.display = 'none')
	allImgs[nextSlidePosition].style.display = 'block'
}

function createAndRenderImages (imgsSrc, conteiner){
	const listOfImageElements = imgsSrc.map(createImgElement)
	listOfImageElements.forEach((imgElement) => conteiner.appendChild(imgElement))
	handSlideChange(0)
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

	body.appendChild(leftButton)
	body.appendChild(righrButton)
}


const main = createMainConteiner();
createAndRenderImages(imgsSrc, main)
const getNextSlide = getNextPositionCreator(imgsSrc.length)

//createMainImg(imgsSrc[0], main);
createCarouselButtons(getNextSlide);


