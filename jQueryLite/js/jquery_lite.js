(function() {
  'use strict';
  var DOMNodeCollection = function(array){
    this.HTMLels = array;
  };

  if (typeof $l === "undefined") {
    var que = [];
    window.$l = function (arg){
      if (arg instanceof Function) {
        que.push(arg);
      }

      if (typeof arg === 'string'){
        var nodeList = document.querySelectorAll(arg);
        var nodeListArray = [].slice.call(nodeList);
        return new DOMNodeCollection(nodeListArray);
      } else if (arg instanceof HTMLElement ){
        var HTMLArray = [].slice.call(arg);
        return new DOMNodeCollection(HTMLArray);
      }
    };
    if (document.readyState === "complete") {
      que.forEach(function(fn) {
        fn();
      });
    } else {
      document.addEventListener("DOMContentLoaded", function() {
        que.forEach(function(fn) {
        fn();
      });
    });
  }
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
        var classArray = el.getAttribute("class").split(' ');
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

  DOMNodeCollection.prototype.children = function () {
    var allMyChildren = [];
    this.HTMLels.forEach( function(el){
      if(el.children.length >0){
        allMyChildren = allMyChildren.concat(el.children);
      }
    });
    return new DOMNodeCollection(allMyChildren);
  };

  DOMNodeCollection.prototype.parent = function () {
    var myThreeDads = [];

    this.HTMLels.forEach( function(el){
        myThreeDads = myThreeDads.concat(el.parentNode);
    });
    return new DOMNodeCollection(myThreeDads);
  };

DOMNodeCollection.prototype.find = function (arg) {
  var matches = [];
  var nodeList = document.querySelectorAll(arg);
  var nodeListArray = [].slice.call(nodeList);
  this.HTMLels.forEach( function(el){
    nodeListArray.forEach(function(node){
      if (el.contains(node)){
        matches.push(node);
      }
    });
  });
  return new DOMNodeCollection(matches);
};

DOMNodeCollection.prototype.remove = function (arg) {
  var matched = null;

  if (typeof arg !== "undefined") {
    matched = this.find(arg).HTMLels;
  } else {
    matched = this.HTMLels;
  }

  matched.forEach(function(el) {
    el.parentNode.removeChild(el);
  });
};

DOMNodeCollection.prototype.on = function (type, fn) {
  this.HTMLels.forEach( function(el){
    el.addEventListener( type, fn);
  });
};

DOMNodeCollection.prototype.off = function (type, fn) {
  this.HTMLels.forEach( function(el){
    el.removeEventListener( type, fn);
  });
};
}());
