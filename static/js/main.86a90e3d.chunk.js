(this["webpackJsonpmark-sudoku"]=this["webpackJsonpmark-sudoku"]||[]).push([[0],[,,function(e,t,n){e.exports={difficulty:"DifficultySelector_difficulty__pVktE",easy:"DifficultySelector_easy__3b07R",medium:"DifficultySelector_medium__1C5qB",hard:"DifficultySelector_hard__21mcI"}},function(e,t,n){e.exports={container:"Board_container__BYxnO",board:"Board_board__2J0sm",row:"Board_row__3acZN"}},,,,,,function(e,t,n){e.exports={title:"Title_title__uIoE3"}},function(e,t,n){e.exports={card:"Card_card__1MXel"}},function(e,t,n){e.exports={button:"Button_button__8mrP0"}},function(e,t,n){e.exports={cell:"Cell_cell__2IcuW",given:"Cell_given__B8GyM",bottom:"Cell_bottom__3W8RE",right:"Cell_right__1pFqV"}},,,,,function(e,t,n){},,,,,,,function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(8),i=n.n(a),l=(n(17),n(9)),u=n.n(l),o=n(0),s=function(e){return Object(o.jsx)("div",{className:u.a.title,children:"Sudoku"})},d=n(5),j=n(4),f=n(10),b=n.n(f),m=function(e){var t=b.a.card+" "+e.className;return Object(o.jsx)("div",{className:t,children:e.children})},_=n(11),h=n.n(_),O=function(e){var t=h.a.button+" "+e.className;return Object(o.jsx)("button",{className:t,onClick:e.onClick,children:e.children})},p=n(2),x=n.n(p),v=function(e){var t=function(t){e.onDifficultySelect(t.target.innerHTML)};return Object(o.jsxs)(m,{className:x.a.difficulty,children:[Object(o.jsx)(O,{className:x.a.easy,onClick:t,children:"Easy"}),Object(o.jsx)(O,{className:x.a.medium,onClick:t,children:"Medium"}),Object(o.jsx)(O,{className:x.a.hard,onClick:t,children:"Hard"})]})},g=n(3),y=n.n(g),k=function(e){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("div",{className:y.a.container,children:Object(o.jsx)(m,{className:y.a.board,children:e.puzzle.map((function(e,t){return Object(o.jsx)("div",{className:y.a.row,children:e.map((function(e){return e}))},"row-".concat(t))}))})})})},C=n(12),N=n.n(C),S=function(e){var t=!!e.value;return Object(o.jsx)("input",{type:"number",name:"sudoku-cell",defaultValue:e.value,readOnly:t,className:e.classList.map((function(e){return N.a["".concat(e)]})).join(" "),onKeyDown:function(e){(["e","+","-","0","."].includes(e.key)||e.target.value)&&e.preventDefault()},onPaste:function(e){return e.preventDefault()}})},z={Easy:.85,Medium:2,Hard:1/0},B=function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)(""),l=Object(d.a)(i,2),u=l[0],s=l[1],f=Object(c.useState)([]),b=Object(d.a)(f,2),m=b[0],_=b[1];Object(c.useEffect)((function(){if(u){var e=[],t=0;do{e=Object(j.makepuzzle)(),t=Object(j.ratepuzzle)(e,20)}while(t>=z[u]);a(Object(j.solvepuzzle)(e)),_(h(e))}}),[u]);var h=function(e){for(var t=[],n=[],c=0;c<e.length;c++){var r=["cell"];c>71&&r.push("bottom"),(c+1)%9===0&&r.push("right"),null===e[c]?n.push(Object(o.jsx)(S,{classList:r,value:""},c)):(r.push("given"),n.push(Object(o.jsx)(S,{classList:r,value:e[c]+1},c))),9===n.length&&(t.push(n),n=[])}return t};return Object(o.jsxs)(o.Fragment,{children:[!u&&Object(o.jsx)(v,{onDifficultySelect:s}),u&&Object(o.jsx)(k,{puzzle:m}),u&&Object(o.jsx)(O,{onClick:function(e){for(var t=document.getElementsByName("sudoku-cell"),n=0;n<r.length;n++)if(r[n]!==t[n].value-1)return void console.log("Incorrect solution");console.log("Correct solution")},children:"Submit"}),u&&Object(o.jsx)(O,{onClick:function(e){s(""),_([])},children:"Reset"})]})};var D=function(){return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(s,{}),Object(o.jsx)(B,{})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};i.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(D,{})}),document.getElementById("root")),w()}],[[24,1,2]]]);
//# sourceMappingURL=main.86a90e3d.chunk.js.map