/* globals $ */

/* 

Create a function that takes an id or DOM element and:

  ##  Task 1
Create a function that takes an id or DOM element and:
* If an id is provided, select the element
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
  * The provided DOM element is non-existant
  * The id is neither a string nor a DOM element

*/

function solve(){
 return function (selector) {
    var target;
    var buttons;
    var contents;
    var elements;
    var elementsSize;

    if (typeof selector === 'string'){
      target = document.getElementById(selector);
    } else if (typeof target === HTMLElement) {
      target = selector;
    } else {
      throw Error('invalid selector');
    }

    if (target === null){
      throw Error('selector matches nothing');
    }

    buttons = target.getElementsByClassName('button');
    contents = target.getElementsByClassName('content');
    elements = target.querySelectorAll('.button, .content');
    elementsSize = elements.length;

    function OnButtonClick(){
      for (var i = this.index; i < elementsSize; i += 1){
          if(elements[i].className === 'content' && elements[i+1].className === 'button'){
            if (elements[i].style.display !== 'none'){
              elements[i].style.display = 'none';
              elements[this.index].innerHTML = 'show';
              break;
            } else {
              elements[i].style.display = '';
              elements[this.index].innerHTML = 'hide';
              break;
            }
          }
        }
      }
    
    for (var i = 0; i < elements.length; i += 1){
      if (elements[i].className === 'button'){
        elements[i].innerHTML = 'hide';
        elements[i].index = i;
        elements[i].addEventListener('click', OnButtonClick);
      }
    }
 };
};

module.exports = solve;