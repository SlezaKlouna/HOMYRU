'use strict';

function sliderCreate(element, params) {
    let sliderCont = element.querySelector('.slides');
    let sliderItem = element.querySelectorAll('.slider-item');
    let indent = sliderItem.length;
    sliderCont.style.width = (indent * 100) + "%";

    let index = 0;
    let nextSlide;
    let prevSlide;
    let interval;

    let scrollSliderFunc = function(n){
        index += n;
        if (index <= -(indent) * 100){
            index = 0;
        } else if(index > 0){
            index = -(indent - 1) * 100;
        }
        sliderCont.style.left = `${index}%`;
        if (params.dots) {
            showActivDots(-index / 100);
        }
        function showActivDots(currIndexSlide) {
            let dotsItem = element.getElementsByClassName('slider-dots_item');
            for (let i = 0; i < dotsItem.length; i++) {
                dotsItem[i].className = dotsItem[i].className.replace(" active", "");
            }
            dotsItem[currIndexSlide].className += " active";
        }
    }

    if (params.arrows){
        let next = document.createElement('a');
        next.innerHTML = '>';
        next.className = 'arrow right';

        let prev = document.createElement('a');
        prev.innerHTML = '<';
        prev.className = 'arrow left';
        element.appendChild(prev);

        element.appendChild(next);

        prev.addEventListener('click', function() {
            scrollSliderFunc(100);
        });
        next.addEventListener('click', function(){
            scrollSliderFunc(-100);
        });
    }

    if(params.autoPlay){
        let interval = setInterval(function() {scrollSliderFunc(-100)}, 3000);
        let sliderButton = document.querySelectorAll('.arrow');

        element.addEventListener('mouseover', function() {
            for (let i = 0; i < sliderButton.length; i++) {
                sliderButton[i].style.display = 'flex';
            }
            clearInterval(interval);
        });
        element.addEventListener('mouseout', function() {
            interval = setInterval(function() {scrollSliderFunc(-100)}, 3000);
        });
    }

    if (params.dots){

        let dots = document.createElement('div');
        dots.className = 'slider-dots';
        element.appendChild(dots);

        for (let i = 0; i < sliderItem.length; i++){
            let createDot = document.createElement('span');
            dots.appendChild(createDot);
            createDot.className = 'slider-dots_item';
        }

        let dotsItem = element.getElementsByClassName('slider-dots_item');

        dotsItem[0].classList.add('active');

        for (let dot of dotsItem) {
            dot.classList.remove('active');
        }

        dotsItem[-index / 100].classList.add('active');

        let dotScrollFunc = function(n){
            scrollSliderFunc(index = -(n * 100 / 2));
        }

        dots.addEventListener('click', function(e) {
            for (let i = 0; i < dotsItem.length; i++) {
                if (e.target.classList.contains('slider-dots_item') && e.target == dotsItem[i]){
                    dotScrollFunc(i);
                }
            }
        });
    }

}

sliderCreate(document.querySelector('.slider'), {
    arrows : true,
    dots : true,
    autoPlay : false,
});
