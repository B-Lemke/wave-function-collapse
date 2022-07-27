(function(t){function e(e){for(var s,n,r=e[0],l=e[1],c=e[2],h=0,g=[];h<r.length;h++)n=r[h],Object.prototype.hasOwnProperty.call(A,n)&&A[n]&&g.push(A[n][0]),A[n]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);a&&a(e);while(g.length)g.shift()();return o.push.apply(o,c||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],s=!0,r=1;r<i.length;r++){var l=i[r];0!==A[l]&&(s=!1)}s&&(o.splice(e--,1),t=n(n.s=i[0]))}return t}var s={},A={app:0},o=[];function n(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=s,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var a=l;o.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"03c9":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAACtJREFUSIntzTEBAAAIA6Bp/85awc8HClBJJg/6IxWLxWKxWCwWi8Vi8c0C1EkBO5twVFkAAAAASUVORK5CYII="},1771:function(t,e,i){var s={"./tile0.png":"03c9","./tile1.png":"7ded","./tile2.png":"82a0","./tileA.png":"ea8c","./tileB.png":"e19e","./tileC.png":"e077","./tileD.png":"6be7","./tileE.png":"a8c7"};function A(t){var e=o(t);return i(e)}function o(t){if(!i.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}A.keys=function(){return Object.keys(s)},A.resolve=o,t.exports=A,A.id="1771"},"56d7":function(t,e,i){"use strict";i.r(e);var s=i("7a23");const A=Object(s["f"])(" Grid: "),o=["src"];function n(t,e,i,n,r,l){return Object(s["i"])(),Object(s["d"])("div",null,[A,Object(s["e"])("div",{id:"grid",class:Object(s["g"])({rotate:r.rotate})},[(Object(s["i"])(!0),Object(s["d"])(s["a"],null,Object(s["j"])(r.grid.contents,(t,e)=>(Object(s["i"])(),Object(s["d"])("div",{class:"row",key:e},[(Object(s["i"])(!0),Object(s["d"])(s["a"],null,Object(s["j"])(t,(t,e)=>(Object(s["i"])(),Object(s["d"])("div",{class:"cell",key:e},[t.tile&&void 0!=t.tile.image?(Object(s["i"])(),Object(s["d"])("img",{key:0,class:"tile",src:l.getImageUrl(t.tile.image),alt:"",style:Object(s["h"])("transform: rotate("+t.tile.rotation+")")},null,12,o)):Object(s["c"])("",!0)]))),128))]))),128))],2),Object(s["e"])("button",{onClick:e[0]||(e[0]=(...t)=>l.fillGrid&&l.fillGrid(...t))},"Click me"),Object(s["e"])("button",{onClick:e[1]||(e[1]=(...t)=>l.resetGrid&&l.resetGrid(...t))},"Reset"),Object(s["e"])("button",{onClick:e[2]||(e[2]=(...t)=>l.toggleRotate&&l.toggleRotate(...t))},"Rotate")])}class r{constructor(t,e={}){this.collapsed=!1,this.tile=e,this.possibleTiles=[...t]}get entropy(){return this.possibleTiles.length}checkUpCell(t){if(void 0==t||0==t.collapsed||void 0==t.sockets)return;let e=this.reverseString(t.sockets.down);this.possibleTiles=this.possibleTiles.filter(t=>t.sockets.up==e)}checkLeftCell(t){if(void 0==t||0==t.collapsed||void 0==t.sockets)return;let e=this.reverseString(t.sockets.right);this.possibleTiles=this.possibleTiles.filter(t=>t.sockets.left==e)}checkDownCell(t){if(void 0==t||0==t.collapsed||void 0==t.sockets)return;let e=this.reverseString(t.sockets.up);this.possibleTiles=this.possibleTiles.filter(t=>t.sockets.down==e)}checkRightCell(t){if(void 0==t||0==t.collapsed||void 0==t.sockets)return;let e=this.reverseString(t.sockets.left);this.possibleTiles=this.possibleTiles.filter(t=>t.sockets.right==e)}reverseString(t){var e=t.split(""),i=e.reverse(),s=i.join("");return s}assignTile(){this.tile=this.possibleTiles[Math.floor(Math.random()*this.possibleTiles.length)],this.collapsed=!0,this.possibleTiles=[]}}class l{constructor(t,e,i=0){this.image=void 0==t?void 0:t+".png";for(let s=0;s<i;s++)e.rotate();this.sockets=e,this.rotation=90*i+"deg"}}class c{constructor(t,e,i){this.cols=t,this.rows=e,this.tiles=i,this.contents=[],this.setup()}setup(){this.contents=[];for(let t=0;t<this.rows;t++){let t=[];for(let e=0;e<this.cols;e++){const e=new r(this.tiles,new l(void 0,void 0,0));t.push(e)}this.contents.push(t)}}complete(){return-1==this.getLowestEntropy()}fillCell(){let t=this.getLowestEntropy();if(-1!==t){t.assignTile();for(let t=0;t<this.rows;t++)for(let e=0;e<this.cols;e++)0!=t&&this.contents[t][e].checkUpCell(this.contents[t-1][e].tile),t!=this.rows-1&&this.contents[t][e].checkDownCell(this.contents[t+1][e].tile),0!=e&&this.contents[t][e].checkLeftCell(this.contents[t][e-1].tile),e!=this.cols-1&&this.contents[t][e].checkRightCell(this.contents[t][e+1].tile)}}flatContents(){return[].concat.apply([],this.contents)}getLowestEntropy(){let t=this.flatContents().filter(t=>!t.collapsed);if(t.sort((t,e)=>t.entropy-e.entropy),0==t.length)return-1;let e=t.filter(e=>e.entropy==t[0].entropy);return e[Math.floor(Math.random()*e.length)]}}class a{constructor(t,e,i,s){this.up=t,this.right=e,this.down=i,this.left=s}rotate(){let t=this.up;this.up=this.left,this.left=this.down,this.down=this.right,this.right=t}}var h={name:"App",components:{},data(){return{width:20,height:20,grid:{contents:[]},tiles:[],landTiles:[],timeoutID:void 0,rotate:!1}},mounted(){const t=[new l("tile2",new a("BBB","BBB","BBB","BBB")),new l("tile1",new a("BBB","BAB","BAB","BAB"),0),new l("tile1",new a("BBB","BAB","BAB","BAB"),1),new l("tile1",new a("BBB","BAB","BAB","BAB"),2),new l("tile1",new a("BBB","BAB","BAB","BAB"),3)];this.tiles=t,this.grid=new c(this.width,this.height,this.tiles)},methods:{getImageUrl:function(t){return i("1771")("./"+t)},fillGrid:function(){this.grid.complete()?setTimeout(()=>{this.resetGrid(),this.fillGrid()},1e3):(this.grid.fillCell(),this.timeoutID=setTimeout(this.fillGrid,10))},resetGrid:function(){clearTimeout(this.timeoutID),this.timeoutID=void 0,this.grid.setup()},toggleRotate:function(){this.rotate=!this.rotate}}},g=(i("84a9"),i("6b0d")),p=i.n(g);const u=p()(h,[["render",n]]);var d=u;Object(s["b"])(d).mount("#app")},"6be7":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAEVJREFUSIljjM57+J+BCPDhtx8xyogGTFQ1bdTiUYtHLR61eNTiUYtHLR61eFBbzEKsQgHWTVS1eOQF9ajFoxaPWkw1AAAouAXnaOiPxQAAAABJRU5ErkJggg=="},"7ded":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAEhJREFUSIlj9M7U/88wAIBpICwdtXjU4lGLh4fFLAKsmwbE4pEX1KMWj1o8ajHVAMuH335EKSS2hCPWvJEX1KMWj1o8ajHVAACwBwgizQ2hrQAAAABJRU5ErkJggg=="},"82a0":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAADBJREFUSIntzTEBACAIADCkEEFIYv8AUsGPZyuw07deLMiNVCwWi8VisVgsFovFfwZmLAIeEVes4gAAAABJRU5ErkJggg=="},"84a9":function(t,e,i){"use strict";i("cf12")},a8c7:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAEBJREFUSIlj9M7U/88wAIBpICwdtXjU4lGLRy0etXjU4lGLRy0eGMAiwLqJKIUffvtR1eKRF9SjFo9aPGox1QAAP4oFICjvV5EAAAAASUVORK5CYII="},cf12:function(t,e,i){},e077:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAADBJREFUSIntzTEBACAIADCkEEFIYv8AUsGPZyuw07deLMiNVCwWi8VisVgsFovFfwZmLAIeEVes4gAAAABJRU5ErkJggg=="},e19e:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAC9JREFUSIntzTEBACAIADCkJh3obBKp4MezFdipvi8W5EYqFovFYrFYLBaLxeI/A2pjAuXF+OwLAAAAAElFTkSuQmCC"},ea8c:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAADpJREFUSIljjM57+J+BCPDhtx8xyogGTFQ1bdTiUYtHLR61eNTiUYtHLR61eNTiUYtHLR61eNRiqgIAk7oFHmYN0tAAAAAASUVORK5CYII="}});
//# sourceMappingURL=app.6ceaed5d.js.map