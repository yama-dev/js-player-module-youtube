/*
 * isDom
 * isStr
 * selectDom
 * hasClass
 * addClass
 * removeClass
 * toggleClass
 */

let isDom = (obj)=>{
  try {
    return obj instanceof HTMLElement;
  }
  catch(e){
    return false
  }
}

let isStr = (str)=>{
  try {
    return typeof str == 'string';
  }
  catch(e){
    return false
  }
}

let selectDom = (elem)=>{
  let _dom;
  if(( Array.isArray(elem) || elem.length ) && !isStr(elem)){
    if(isDom(elem[0])){
      _dom = Array.prototype.slice.call( elem );
    } else {
      return false;
    }
  } else {
    if(isDom(elem)){
      _dom = Array(elem);
    } else {
      _dom = Array.prototype.slice.call( document.querySelectorAll(elem) );
    }
  }
  return _dom;
}

let hasClass = (elem, className)=>{
  if(isDom(elem)){
    return elem.classList.contains(className);
  } else {
    return document.querySelector(elem).classList.contains(className);
  }
};

let addClass = (elem, className)=>{
  let _dom = selectDom(elem);
  _dom.map((item,index)=>{
    item.classList.add(className);
  });
};

let removeClass = (elem, className)=>{
  let _dom = selectDom(elem);
  _dom.map((item,index)=>{
    item.classList.remove(className);
  });
};

let toggleClass = (elem, className)=>{
  let _dom = selectDom(elem);
  _dom.map((item,index)=>{
    item.classList.toggle(className);
  });
};

let setHtml = (elem, html)=>{
  let _dom = selectDom(elem);
  _dom.map((item,index)=>{
    item.innerHTML = html;
  });
};

let appendHtml = (elem, html)=>{
  let _dom = selectDom(elem);
  _dom.map((item,index)=>{
    item.innerHTML += html;
  });
};

let addEvent = (elem, event, func)=>{
  if(elem === window){
    window.addEventListener(event, func);
  } else {
    let _dom = selectDom(elem);
    _dom.map((item,index)=>{
      item.addEventListener(event, func);
    });
  }
};

export { isDom, isStr, selectDom, hasClass, addClass, removeClass, toggleClass, setHtml, appendHtml, addEvent }
