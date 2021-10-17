(this["webpackJsonpdart-calculator"]=this["webpackJsonpdart-calculator"]||[]).push([[0],{270:function(e,t,r){},619:function(e,t,r){"use strict";r.r(t);var n=r(0),c=r.n(n),a=r(44),s=r.n(a),l=(r(270),r(23)),o=r(14),i=r(12),j=r(236),u=r(75),b=r(22),O=r(56),m=r(95),f=r(188),x=r(18),d=["color"],y=function(e){var t=e.color,r=Object(O.a)(e,d);return Object(x.jsx)(f.a,Object(b.a)({color:null!==t&&void 0!==t?t:m.theme.colors.emerald[500]},r))},h=r(106),g=["style"],p=y,P=function(e){var t=e.style,r=Object(O.a)(e,g);return Object(x.jsx)(h.a,Object(b.a)({style:Object(b.a)({color:m.theme.colors.warmGray[50]},t)},r))},v=r(184),C=r(90),w=function(e){return e?e.multiplyer>1?"".concat(e.score,"x").concat(e.multiplyer):"".concat(e.score):"____"},D=m.theme.colors.coolGray[800];var S=function(e){var t=Object(n.useState)(!1),r=Object(o.a)(t,2),c=r[0],a=r[1],s=e.title,b=e.onPress;return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(i.a,{style:{width:50},children:Object(x.jsx)(p,{title:s,onPress:function(){return a(!0)}})}),Object(x.jsx)(j.a,{onRequestClose:function(){return a(!1)},visible:c,children:Object(x.jsxs)(u.a,{style:{backgroundColor:D},children:[Object(x.jsxs)(i.a,{children:[Object(x.jsxs)(i.a,{style:{flexDirection:"row",justifyContent:"space-around",marginTop:10,marginBottom:10},children:[Object(x.jsx)(p,{title:"0",onPress:function(){b(void 0),a(!1)}}),Object(x.jsx)(p,{title:"25",onPress:function(){b({score:25,multiplyer:1}),a(!1)}}),Object(x.jsx)(p,{title:"50",onPress:function(){b({score:50,multiplyer:1}),a(!1)}})]}),Object(l.a)(Array(20)).map((function(e,t){return Object(x.jsx)(i.a,{style:{flexDirection:"row",justifyContent:"space-around",marginBottom:10},children:Object(l.a)(Array(3)).map((function(e,r){var n={score:t+1,multiplyer:r+1},c=w(n);return Object(x.jsx)(p,{title:c,onPress:function(){b(n),a(!1)}},r)}))},t)}))]}),Object(x.jsx)(p,{onPress:function(){return a(!1)},title:"Close"})]})})]})},I=function(){var e=Object(v.useLocalStorage)("numberOfPlayers","2"),t=Object(o.a)(e,2),r=t[0],n=t[1],c={numberOfPlayers:parseInt(r),numberOfDarts:3,startPoint:301},a=[[]],s=Object(v.useLocalStorage)("gameState",a),j=Object(o.a)(s,2),u=j[0],b=j[1],O=function(e){var t=c.startPoint;return u.forEach((function(r){r[e]&&(t-=Object.values(r[e]).reduce((function(e,t){return t?e+t.score*t.multiplyer:e}),0))})),t};return Object(x.jsxs)(i.a,{style:{flex:1,backgroundColor:D},children:[Object(x.jsx)(i.a,{children:Object(x.jsxs)(C.a,{selectedValue:r,onValueChange:function(e,t){return n(e)},children:[Object(x.jsx)(C.a.Item,{label:"One Player",value:"1"}),Object(x.jsx)(C.a.Item,{label:"Two Players",value:"2"}),Object(x.jsx)(C.a.Item,{label:"Three Players",value:"3"}),Object(x.jsx)(C.a.Item,{label:"Four Players",value:"4"}),Object(x.jsx)(C.a.Item,{label:"Five Players",value:"5"}),Object(x.jsx)(C.a.Item,{label:"Six Players",value:"6"})]})}),Object(x.jsxs)(i.a,{style:{flexDirection:"row",justifyContent:"space-around",marginTop:5,marginBottom:5},children:[Object(x.jsxs)(P,{children:["Players: ",c.numberOfPlayers]}),Object(x.jsxs)(P,{children:["Darts: ",c.numberOfDarts]}),Object(x.jsxs)(P,{children:["StartPoint: ",c.startPoint]})]}),Object(x.jsx)(p,{title:"Restart Game",onPress:function(){return b(a)}}),Object(x.jsx)(i.a,{style:{marginLeft:10,marginRight:10},children:u.map((function(e,t){return Object(x.jsxs)(i.a,{style:{marginTop:20,marginBottom:20},children:[Object(x.jsxs)(P,{style:{fontSize:20},children:["Round: ",t+1]}),Object(l.a)(Array(c.numberOfPlayers)).map((function(r,n){return Object(x.jsxs)(i.a,{style:{marginTop:5,marginBottom:5},children:[Object(x.jsxs)(P,{style:{marginBottom:5},children:["Player ",n+1]}),Object(x.jsx)(i.a,{style:{flexDirection:"row",justifyContent:"space-around",marginLeft:5,marginRight:5},children:Object(l.a)(Array(c.numberOfDarts)).map((function(r,c){var a;return Object(x.jsx)(S,{title:w(null===(a=e[n])||void 0===a?void 0:a[c]),onPress:function(e){return function(e,t,r,n){u[t][r]||(u[t][r]=[]),u[t][r][n]=e,b(Object(l.a)(u))}(e,t,n,c)}},c)}))})]},n)}))]},t)}))}),Object(x.jsxs)(i.a,{children:[Object(x.jsx)(p,{title:"Add round",onPress:function(){u.push([]),b(Object(l.a)(u))}}),Object(x.jsx)(i.a,{style:{flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap",marginTop:20},children:Object(l.a)(Array(c.numberOfPlayers)).map((function(e,t){return Object(x.jsxs)(i.a,{children:[Object(x.jsxs)(P,{style:{fontSize:25},children:["Player ",t+1]}),Object(x.jsx)(P,{style:{fontSize:60},children:O(t)})]},t)}))})]}),Object(x.jsx)(i.a,{style:{height:140}}),Object(x.jsx)(i.a,{style:{marginLeft:10,marginRight:10},children:Object(x.jsx)(P,{children:"Dart calculator made by Han Lin Yap"})}),Object(x.jsx)(i.a,{style:{height:70}})]})},T=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,624)).then((function(t){var r=t.getCLS,n=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;r(e),n(e),c(e),a(e),s(e)}))};s.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(I,{})}),document.getElementById("root")),T()}},[[619,1,2]]]);