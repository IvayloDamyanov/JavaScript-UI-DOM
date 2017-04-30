/* globals $ */

/* 

Create a function that takes an id or DOM element and an array of contents

* if an id is provided, select the element
* Add divs to the element
  * Each div's content must be one of the items from the contents array
* The function must remove all previous content from the DOM element provided
* Throws if:
  * The provided first parameter is neither string or existing DOM element
  * The provided id does not select anything (there is no element that has such an id)
  * Any of the function params is missing
  * Any of the function params is not as described
  * Any of the contents is neight `string` or `number`
    * In that case, the content of the element **must not be** changed   
*/

module.exports = function () {

  return function (element, contents) {
    var target;
    var contentsLength = contents.length;
    if (typeof element === 'undefined' || element.length === 0 ||
        typeof contents === 'undefined'){
          throw Error('missing function parameter');
        }

    if(typeof element === 'string'){
      target = document.getElementById(element);
    } else if (element instanceof(HTMLElement)){
      target = element;
    } else {
      throw Error('invalid element');
    }

    for (var i = 0; i < contents.length; i += 1){
      if (typeof contents[i] !== 'string' && typeof contents[i] !== 'number'){
        throw Error('invalid contents');
      }
    }
    
    target.innerHTML = '';
    for (var i = 0; i < contentsLength; i += 1){
      var newElement = document.createElement("div");
      newElement.innerHTML = contents[i];
      target.appendChild(newElement);
    }
  };
};