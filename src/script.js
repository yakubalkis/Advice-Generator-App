import imgDesktop from './img/pattern-divider-desktop.svg';
import imgMobile from './img/pattern-divider-mobile.svg';

const textDiv = document.querySelector('.advice-text');
const headerID = document.querySelector('.header-advice');
const image = document.querySelector('.img');
const button = document.querySelector('.button');

// CHANGE the img url when size get small(width:375px)

const changeImage= function(){
    const width  = window.innerWidth || document.documentElement.clientWidth || 
    document.body.clientWidth;
    
    image.src = width <= 375 ? imgMobile : imgDesktop;
}
window.addEventListener('resize', changeImage);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Process that gets new advice text from API and  puts it in text div

const getRandNumber = function(){// get random number from 1 to 224 (because there are only 224 text in the site  )
    return Math.floor(Math.random() * (223 - 1 + 1)) + 1;
}


const getNewText = async function(){
    try{
        rand = getRandNumber(); // take random number 
        
        const response = await fetch(`https://api.adviceslip.com/advice/${rand}`); // get data from API
        if(!response.ok) throw new Error('Problem about process of fetching API');
        const data = await response.json();
        
        const id = data.slip.id;
        const adviceText = data.slip.advice;

        headerID.textContent = `ADVICE  #`+id;
        textDiv.textContent = adviceText;
    }
    catch(err){
        console.error(err);
        textDiv.textContent = 'Problem about API or your Internet Connection'
        throw err;
    }
}
window.onload = getNewText;
button.addEventListener('click', getNewText);


