/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"       
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string` 

*/
function solve() {
  return function (selector) {
    var targetElement;
    var id;

    if (typeof selector !== 'string' && !(selector instanceof jQuery)){
      throw Error('invalid selector');
    }

    id = selector.slice(1, selector.length);
    targetElement = document.getElementById(id);
    if (targetElement === null){
      throw Error('no element selected');
    }

    var elementsArray = targetElement.querySelectorAll('.button, .content');
    var buttonsCount = targetElement.getElementsByClassName('button').length - 1;
    for (var i = 0; i < elementsArray.length; i += 1){
      elementsArray[i].index = i;
      if(elementsArray[i].className === 'button'){
        elementsArray[i].innerHTML = 'hide';
        if (buttonsCount > 0){
          elementsArray[i].addEventListener('click', onButtonClick);
          buttonsCount -= 1;
        }
      }
    }
    
    function onButtonClick(){
      for (var i = this.index; i < elementsArray.length; i += 1){
        if(elementsArray[i].className === 'content'){
          if (elementsArray[i].style.display !== 'none'){
            elementsArray[i].style.display = 'none';
            elementsArray[this.index].innerHTML = 'show';
            break;
          } else {
            elementsArray[i].style.display = '';
            elementsArray[this.index].innerHTML = 'hide';
            break;
          }
        }
      }
    }
  };
};

module.exports = solve;