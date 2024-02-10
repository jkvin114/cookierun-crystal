/**
 * same with document.querySelectorAll
 * @param {*} q 
 * @returns 
 */
const $ = (q) => document.querySelectorAll(q)
/**
 * same with document.querySelector
 * @param {*} q 
 * @returns 
 */
const $one = (q) => document.querySelector(q)
/**
 * get or set data of the element
 * @param {*} elem 
 * @param {*} key 
 * @param {*} val optional
 * @returns 
 */
const $data = function(elem,key,val){
    if(val===undefined) return elem.dataset[key]
    else elem.dataset[key]=val
    return val
}
/**
 * add class to all elements from query selector
 * @param {*} q query selector
 * @param {*} cls class
 */
const $addClass =function (q,cls){
    let elem = $(q)
    elem.forEach(e=>e.classList.add(cls))
}
/**
 * remove class to all elements from query selector
 * @param {*} q query selector
 * @param {*} cls class
 */
const $removeClass =function (q,cls){
    let elem = $(q)
    elem.forEach(e=>e.classList.remove(cls))
}
/**
 * check if element has class
 * @param {*} elem 
 * @param {*} cls class
 */
const $hasClass = function (elem,cls){
    return elem.classList.contains(cls)
}
const $append = function(elem,htmlStr){
    elem.innerHTML += htmlStr
}
const $html = function(q,htmlStr){
    $one(q).innerHTML = htmlStr
}


const $prepend = function(elem,htmlStr){
    elem.innerHTML  = htmlStr + elem.innerHTML
}
/**
 * create node object from html
 * @param {*} htmlStr 
 * @returns 
 */
const $node = function(htmlStr){
    let doc = new DOMParser().parseFromString(htmlStr, 'text/html').body.childNodes[0]
    return doc
}
/**
 * add click event listener to all elements
 * @param {*} q 
 * @param {*} func 
 */
const $onclick = function(q,func){
    let elem = $(q)
    elem.forEach(e=>e.addEventListener("click",func))
}

function getChildren(n, skipMe){
    var r = [];
    for ( ; n; n = n.nextSibling ) 
       if ( n.nodeType == 1 && n != skipMe)
          r.push( n );
    return r;
};

function $siblings(elem) {
    return getChildren(elem.parentNode.firstChild, elem);
}

function $nextSibling(elem){
    if(!elem) return null
    let siblings = $siblings(elem)
    console.log(siblings)
    for(let i=0;i<siblings.length;++i){
        if(elem === siblings[i]) {
            if(i>=siblings.length) return null
            else return siblings[i+1]
        }
    }
    return null
}