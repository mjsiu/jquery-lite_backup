(function() {
  'use strict';
  var DOMNodeCollection = function(array){
    this.HTMLels = array;
  };

  if (typeof $l === "undefined") {
    window.$l = function (arg){
      if (typeof arg === 'string'){
        var nodeList = document.querySelectorAll(arg);
        var nodeListArray = [].slice.call(nodeList);
        return new DOMNodeCollection(nodeListArray);
      } else if (arg instanceof HTMLElement ){
        var HTMLArray = [].slice.call(arg);
        return new DOMNodeCollection(HTMLArray);
      }
    };
  }
    /* DRYs out the code
      arg = document.querySelectorAll(arg);
    var newArray = [].slice.call(arg);
    return new DOMNodeCollection(newArray);
    */

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "undefined") {
      return this.HTMLels[0].innerHTML;
    }

    this.HTMLels.forEach(function(el) {
      el.innerHTML = string;
    });
  };

  DOMNodeCollection.prototype.empty = function () {
    this.HTMLels.forEach(function(el) {
      el.innerHTML = null;
    });
  };

  DOMNodeCollection.prototype.append = function (arg) {
    if(typeof arg === 'string'){
      this.HTMLels.forEach(function(el) {
        el.innerHTML += arg;
      });
    } else if(arg instanceof HTMLElement){
      this.HTMLels.forEach(function(el) {
        el.appendChild(arg);
      });
    } else if(arg instanceof DOMNodeCollection){
      this.HTMLels.forEach(function(myEl) {
        arg.HTMLels.forEach(function(el) {
          myEl.appendChild(el);
        });
      });
    }
  };

  DOMNodeCollection.prototype.attr = function (string) {

    for (var i = 0; i < this.HTMLels.length; i++) {
      for (var j = 0; i < this.HTMLels[i].attributes.length; j++) {
        if (this.HTMLels[i].attributes[j].name === string){
          return this.HTMLels[i].attributes[j].value;
        }
      }
    }
  };

  DOMNodeCollection.prototype.addClass = function (newClass) {
    this.HTMLels.forEach( function(el){
      if (el.hasAttribute("class")) {
        var oldClass = el.getAttribute("class");
        el.setAttribute("class", oldClass + " " + newClass);
      } else {
        el.setAttribute("class", newClass);
      }
    });
  };

  DOMNodeCollection.prototype.removeClass = function (oldClass) {
    this.HTMLels.forEach( function(el){
      if (el.hasAttribute("class")) {
        var classArray = el.getAttribute("class").split('');
      }

      for (var i = 0; i < classArray.length; i++) {
        if (classArray[i] === oldClass) {
          classArray.splice(i, 1);
          el.setAttribute("class", classArray.join(' '));
          return;
        }
      }
    });
  };

}());
