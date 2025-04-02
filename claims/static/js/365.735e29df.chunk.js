"use strict";(self.webpackChunkupward_cliam=self.webpackChunkupward_cliam||[]).push([[365],{1028:(e,t,n)=>{n.r(t),n.d(t,{default:()=>m});var l=n(1906),i=n(5043),a=n(7242),r=n(3086),o=n(1527),s=n(2046),d=n(324),u=n(3587),c=n(1178),p=n(4619),y=n(1591),v=n(579);const x=e=>{let{title:t=""}=e;return(0,v.jsxs)(y.m,{children:[(0,v.jsx)("title",{children:`CLAIMS - ${t}`}),(0,v.jsx)("link",{rel:"icon",type:"image/png",href:"//logo.png"})]})};var f=n(8383),h=(n(5015),n(7941));const g=[{label:"Approved Settled",id:0},{label:"List of Ongoing Claims",id:1},{label:"Denied Claims",id:2},{label:"Cancel Claim",id:3},{label:"Reimbursement",id:4}];function m(){const[e,t]=(0,i.useState)(0);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(x,{title:g[e].label}),(0,v.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flex:1,height:"100vh",backgroundColor:"#F1F1F1"},children:(0,v.jsx)("div",{style:{border:"1px solid #94a3b8",width:"700px",height:"480px",display:"flex",flexDirection:"column",rowGap:"10px",padding:"20px",boxShadow:"0px 0px 5px -1px rgba(0,0,0,0.75)"},children:(0,v.jsxs)("div",{style:{flex:1,display:"flex",columnGap:"10px"},children:[(0,v.jsxs)("div",{style:{width:"250px",background:"white",display:"flex",flexDirection:"column",rowGap:"2px",position:"relative"},children:[(0,v.jsx)("span",{style:{width:"100%",textAlign:"center",fontSize:"12px",padding:"5px"},children:"*** CLAIMS ****"}),(0,v.jsx)("div",{style:{position:"relative",width:"100%",height:"380px",overflow:"auto"},children:(0,v.jsx)("div",{style:{width:"100%",height:"100%",position:"absolute"},children:g.map(((n,l)=>(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("button",{style:{fontSize:"12px",border:"none",background:e===n.id?"#0076d7":"transparent",color:e===n.id?"white":"black",width:"100%",textAlign:"left",cursor:"pointer"},onClick:()=>{t(n.id)},children:n.label},l)})))})})]}),0===e&&(0,v.jsx)(w,{titleHeader:"CLAIM REPORT FOR APPROVED/SETTLED",linkPdf:"/report/approved-settled-pdf",linkExcel:"/report/approved-settled-excel",hideReport:!1}),1===e&&(0,v.jsx)(w,{titleHeader:"ONGOING CLAIM REPORT",linkPdf:"/report/ongoing-pdf",linkExcel:"/report/ongoing-excel",hideReport:!0}),2===e&&(0,v.jsx)(w,{titleHeader:"DENIED CLAIM REPORT",linkPdf:"/report/denied-pdf",linkExcel:"/report/denied-excel",hideReport:!0}),3===e&&(0,v.jsx)(w,{titleHeader:"CANCEL CLAIM REPORT",linkPdf:"/report/cancel-pdf",linkExcel:"/report/cancel-excel",hideReport:!0})]})})})]})}const w=e=>{let{titleHeader:t,linkPdf:n,linkExcel:y,hideReport:x}=e;const{user:f,myAxios:g}=(0,i.useContext)(u.R),[m,w]=(0,i.useState)(O({dateFrom:new Date,dateTo:(0,a.W)(new Date)})),[D,b]=(0,i.useState)("Yearly"),j=(0,i.useRef)(null),I=(0,i.useRef)(null),R=(0,i.useRef)(null),C=(0,i.useRef)(null),T=(0,i.useRef)(null),E=(0,i.useRef)(null),S=(0,i.useRef)(null),F=(0,i.useRef)(null),P=(0,i.useRef)(null),A=(0,i.useRef)(null),M=(0,i.useRef)(null),z=(0,i.useRef)(null),{isPending:B,mutate:N}=(0,d.n)({mutationKey:["account"],mutationFn:async e=>await g.post("/report/get-insurance-provider",e,{headers:{Authorization:`Bearer ${null===f||void 0===f?void 0:f.accessToken}`}}),onSuccess:(e,t)=>{const n=e;E.current.setDataSource(n.data.data)}}),{isPending:$,mutate:L}=(0,d.n)({mutationKey:["pdf-api"],mutationFn:async e=>await g.post(n,e,{responseType:"arraybuffer",headers:{Authorization:`Bearer ${null===f||void 0===f?void 0:f.accessToken}`}}),onSuccess:(e,t)=>{const n=new Blob([e.data],{type:"application/pdf"}),l=URL.createObjectURL(n);window.open(`/CLAIMS/dashboard/report?pdf=${encodeURIComponent(l)}`,"_blank")}}),{isPending:G,mutate:Y}=(0,d.n)({mutationKey:["excel-api"],mutationFn:async e=>await g.post(y,e,{responseType:"arraybuffer",headers:{Authorization:`Bearer ${null===f||void 0===f?void 0:f.accessToken}`}}),onSuccess:(e,t)=>{const n=new Blob([e.data],{type:"application/pdf"}),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download="report.xls",l.click()}}),K=(0,i.useRef)(N);function O(e){let{dateFrom:n,dateTo:l}=e;return x?t:`${t}\nFrom ${(0,r.GP)(new Date(n),"MM/01/yyyy")} To ${(0,r.GP)(new Date(l),"MM/dd/yyyy")}\n    `}return(0,i.useEffect)((()=>{K.current({})}),[]),(0,v.jsxs)(v.Fragment,{children:[($||G||B)&&(0,v.jsx)(c.R,{}),(0,v.jsxs)("div",{style:{display:"flex",flex:1,flexDirection:"column",padding:"5px",rowGap:"7px"},children:[(0,v.jsx)(p.No,{containerStyle:{marginBottom:"10px"},label:{title:"Title : ",style:{fontSize:"12px",fontWeight:"bold",width:"100px",display:"none"}},textarea:{rows:7,style:{flex:1},value:m,onChange:e=>{w(e.currentTarget.value)}},_inputRef:j}),!x&&(0,v.jsx)(p.pp,{label:{title:"Report : ",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},selectRef:I,select:{style:{flex:1,height:"22px"},defaultValue:"Yearly",onKeyDown:e=>{"NumpadEnter"!==e.code&&"Enter"!==e.code||e.preventDefault()},onChange:e=>{b(e.currentTarget.value)}},datasource:[{key:"Monthly"},{key:"Yearly"},{key:"Custom"}],values:"key",display:"key"}),"Monthly"===D&&!x&&(0,v.jsx)(p.ks,{label:{title:"Date :",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},input:{type:"month",style:{flex:1,height:"22px !important"},defaultValue:(0,r.GP)(new Date,"yyyy-MM"),onKeyDown:e=>{"Enter"!==e.key&&"NumpadEnter"!==e.key||e.preventDefault()},onBlur:e=>{let t=new Date(`${e.currentTarget.value}-01`),n=(0,a.W)(new Date(t));w(O({dateFrom:t,dateTo:n}))}},inputRef:F}),"Yearly"===D&&!x&&(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"5px",width:"100%"},children:[(0,v.jsx)(k,{label:{title:"Date : ",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},onKeyDown:e=>{"NumpadEnter"!==e.code&&"Enter"!==e.code||(e.preventDefault(),(0,h.u)(100).then((()=>{var e;null===(e=R.current)||void 0===e||e.focus()})))},onBlur:e=>{var t;const n=new Date(`${P.current.input.value}-01-01`),l=parseInt(null===(t=A.current)||void 0===t?void 0:t.value);if(l<0)return alert("Invalid Year Count!");const i=(0,o.T)(new Date((0,s.e)(n,l)));w(O({dateFrom:n,dateTo:i}))},ref:P}),(0,v.jsx)(p.ks,{label:{title:"",style:{display:"none"}},input:{min:1,max:100,type:"number",style:{width:"40px",height:"22px !important",textAlign:"right"},defaultValue:"0",onKeyDown:e=>{"Enter"!==e.key&&"NumpadEnter"!==e.key||e.preventDefault()},onBlur:e=>{const t=new Date(`${P.current.input.value}-01-01`),n=parseInt(e.currentTarget.value);if(n<0)return alert("Invalid Year Count!");const l=(0,o.T)(new Date((0,s.e)(t,n)));w(O({dateFrom:t,dateTo:l}))},onFocus:()=>{var e;null===(e=A.current)||void 0===e||e.select()}},inputRef:A})]}),"Custom"===D&&!x&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(p.ks,{label:{title:"Date From:",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},input:{type:"date",style:{flex:1,height:"22px !important"},defaultValue:(0,r.GP)(new Date,"yyyy-MM-dd"),onKeyDown:e=>{"Enter"!==e.key&&"NumpadEnter"!==e.key||e.preventDefault()},onBlur:e=>{var t;const n=new Date(e.currentTarget.value),l=new Date(null===(t=z.current)||void 0===t?void 0:t.value);w(O({dateFrom:n,dateTo:l}))}},inputRef:M}),(0,v.jsx)(p.ks,{label:{title:"Date To:",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},input:{type:"date",style:{flex:1,height:"22px !important"},defaultValue:(0,r.GP)(new Date,"yyyy-MM-dd"),onKeyDown:e=>{"Enter"!==e.key&&"NumpadEnter"!==e.key||e.preventDefault()},onBlur:e=>{var t;const n=new Date(null===(t=M.current)||void 0===t?void 0:t.value),l=new Date(e.currentTarget.value);w(O({dateFrom:n,dateTo:l}))}},inputRef:z})]}),(0,v.jsx)(p.pp,{label:{title:"Department : ",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},selectRef:R,select:{style:{flex:1,height:"22px"},defaultValue:"All",onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(e.preventDefault(),null===(t=C.current)||void 0===t||t.focus())}},datasource:[{key:"All"},{key:"UCSMI"},{key:"UMIS"}],values:"key",display:"key"}),(0,v.jsx)(p.pp,{label:{title:"Claim Type : ",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},selectRef:C,select:{style:{flex:1,height:"22px"},defaultValue:"All",onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(e.preventDefault(),null===(t=T.current)||void 0===t||t.focus())}},datasource:[{key:"All"},{key:"Own Damage"},{key:"Theft/Carnap"},{key:"Acts of Nature"},{key:"Bodily Injury"},{key:"Death Claim"},{key:"Third Party Bodily Injury "},{key:"Third Party Property Damage"},{key:"Unnamed Passenger Personal Accident "}],values:"key",display:"key"}),(0,v.jsx)(p.pp,{label:{title:"Status : ",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},selectRef:T,select:{style:{flex:1,height:"22px"},defaultValue:"All",onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(e.preventDefault(),null===(t=S.current)||void 0===t||t.focus())}},datasource:[{key:"All"},{key:"For Review"},{key:"For Evaluation "},{key:"For Loa"},{key:"For Billing"},{key:"For Check Prep"},{key:"ON HOLD"},{key:"With Lacking Docs"}],values:"key",display:"key"}),(0,v.jsx)(p.pp,{ref:E,label:{title:"Insurance : ",style:{fontSize:"12px",fontWeight:"bold",width:"100px"}},selectRef:S,select:{style:{flex:1,height:"22px"},defaultValue:"All",onKeyDown:e=>{"NumpadEnter"!==e.code&&"Enter"!==e.code||e.preventDefault()}},datasource:[],values:"account",display:"account"}),(0,v.jsx)("div",{style:{height:"25px"}}),(0,v.jsx)(l.A,{onClick:function(){var e,t,n,l,i;let r=new Date,d=new Date;var u;if(!x)if("Monthly"===D)r=new Date(`${null===(u=F.current)||void 0===u?void 0:u.value}-01`),d=(0,a.W)(new Date(r));else if("Yearly"===D){var c;r=new Date(`${P.current.input.value}-01-01`);const e=parseInt(null===(c=A.current)||void 0===c?void 0:c.value);if(e<0)return alert("Invalid Year Count!");d=(0,o.T)(new Date((0,s.e)(r,e)))}else{var p,y;r=new Date(null===(p=M.current)||void 0===p?void 0:p.value),d=new Date(null===(y=z.current)||void 0===y?void 0:y.value)}L({title:null===(e=j.current)||void 0===e?void 0:e.value,department:null===(t=R.current)||void 0===t?void 0:t.value,claimType:null===(n=C.current)||void 0===n?void 0:n.value,status:null===(l=T.current)||void 0===l?void 0:l.value,insurance:null===(i=S.current)||void 0===i?void 0:i.value,dateFrom:r,dateTo:d})},color:"success",variant:"contained",sx:{height:"22px",fontSize:"12px",width:"100%"},children:"Generate PDF Report"}),(0,v.jsx)(l.A,{onClick:function(){var e,t,n,l,i;let r=new Date,d=new Date;var u;if(!x)if("Monthly"===D)r=new Date(`${null===(u=F.current)||void 0===u?void 0:u.value}-01`),d=(0,a.W)(new Date(r));else if("Yearly"===D){var c;r=new Date(`${P.current.input.value}-01-01`);const e=parseInt(null===(c=A.current)||void 0===c?void 0:c.value);if(e<0)return alert("Invalid Year Count!");d=(0,o.T)(new Date((0,s.e)(r,e)))}else{var p,y;r=new Date(null===(p=M.current)||void 0===p?void 0:p.value),d=new Date(null===(y=z.current)||void 0===y?void 0:y.value)}Y({title:null===(e=j.current)||void 0===e?void 0:e.value,department:null===(t=R.current)||void 0===t?void 0:t.value,claimType:null===(n=C.current)||void 0===n?void 0:n.value,status:null===(l=T.current)||void 0===l?void 0:l.value,insurance:null===(i=S.current)||void 0===i?void 0:i.value,dateFrom:r,dateTo:d})},color:"success",variant:"contained",sx:{height:"22px",fontSize:"12px",width:"100%"},children:"Generate Excel Report"})]})]})},k=e=>{let{input:t,label:n,inputRef:l,icon:a,iconPosition:r="end",disableIcon:o=!1,containerStyle:s,onIconClick:d=e=>{},offValidation:u=!1,onKeyDown:c,onBlur:p,ref:y}=e;const[x,h]=(0,i.useState)(new Date),g=(0,i.useId)();return(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative",...s},children:[(0,v.jsx)("label",{...n,htmlFor:g,children:n.title}),a&&"start"===r&&(0,v.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:a}),(0,v.jsx)("div",{style:{flex:1,width:"100%",position:"relative"},children:(0,v.jsx)(f.Ay,{className:"custom-date-picker",ref:y,selected:x,onChange:e=>h(e),showYearPicker:!0,dateFormat:"yyyy",onKeyDown:c,onBlur:p})}),a&&"end"===r&&(0,v.jsx)("div",{onClick:d,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:o?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:o?"none":"auto"},children:a})]})}},4619:(e,t,n)=>{n.d(t,{pp:()=>c,No:()=>u,iO:()=>s,ks:()=>d});var l=n(5043);function i(e){if(!/^\d{4}-\d{2}-\d{2}$/.test(e))return!1;const[t,n,l]=e.split("-"),i=parseInt(t);if(i<1e3||i>2040)return!1;const a=new Date(e);return a.getFullYear()===i&&a.getMonth()+1===parseInt(n)&&a.getDate()===parseInt(l)}var a=n(3086),r=n(7941),o=n(579);function s(e){let{input:t,label:n,inputRef:i,icon:a,iconPosition:r="end",disableIcon:s=!1,onIconClick:d=e=>{},onChange:u=e=>{},onBlur:c=e=>{},containerStyle:p}=e;const y=(0,l.useId)(),v=e=>{if(!e)return e;const t=e.split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")},x=e=>e.replace(/,/g,"");return(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative",...p},children:[(0,o.jsx)("label",{...n,htmlFor:y,children:n.title}),a&&"start"===r&&(0,o.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:a}),(0,o.jsx)("input",{ref:i,id:y,...t,type:"text",style:{height:"100%",textAlign:"right",...t.style},onChange:e=>{(e=>{let t=e.target.value;if(t=x(t),t=x(t),""===t||/^-?\d+(,\d{3})*(\.\d*)?$/.test(t))e.target.value=v(t);else{const n=t.match(/\d+/g);if(n){const t=n.join("");e.target.value=v(t)}else e.target.value="0"}})(e),u(e)},onBlur:e=>{(e=>{let t=x(e.target.value);t=(e=>e.includes(".")?1===e.split(".")[1].length?e+"0":e:""===e?"0.00":e+".00")(t),e.target.value=v(t)})(e),c(e)},onFocus:e=>{e.currentTarget.select(),t&&t.onFocus&&t.onFocus(e)}}),a&&"end"===r&&(0,o.jsx)("div",{onClick:d,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:s?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:s?"none":"auto"},children:a})]})}function d(e){let{input:t,label:n,inputRef:s,icon:d,iconPosition:u="end",disableIcon:c=!1,containerStyle:p,onIconClick:y=e=>{},offValidation:v=!1}=e;const x=(0,l.useId)();return(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative",...p},children:[(0,o.jsx)("label",{...n,htmlFor:x,children:n.title}),d&&"start"===u&&(0,o.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:d}),(0,o.jsx)("input",{ref:s,id:x,...t,onBlur:e=>{var l,o;if("month"===t.type&&!v&&!i(`${e.currentTarget.value}-01`))return alert(`Invalid ${null===(l=n.title)||void 0===l?void 0:l.replace(/:/g,"").trim()}!, Resetting date.`),e.currentTarget.value=(0,a.GP)(new Date,"yyyy-MM"),void(0,r.u)(100).then((()=>{var e;null===s||void 0===s||null===(e=s.current)||void 0===e||e.focus()}));if("date"===t.type&&!v&&!i(e.currentTarget.value))return alert(`Invalid ${null===(o=n.title)||void 0===o?void 0:o.replace(/:/g,"").trim()}!, Resetting date.`),e.currentTarget.value=(0,a.GP)(new Date,"yyyy-MM-dd"),void(0,r.u)(100).then((()=>{var e;null===s||void 0===s||null===(e=s.current)||void 0===e||e.focus()}));t&&t.onBlur&&t.onBlur(e)},style:{height:"100%",...t.style}}),d&&"end"===u&&(0,o.jsx)("div",{onClick:y,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:c?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:c?"none":"auto"},children:d})]})}function u(e){let{textarea:t,label:n,_inputRef:i,icon:a,iconPosition:r="end",disableIcon:s=!1,onIconClick:d=e=>{},containerStyle:u}=e;const c=(0,l.useId)();return(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",position:"relative",...u},children:[(0,o.jsx)("label",{...n,htmlFor:c,children:n.title}),a&&"start"===r&&(0,o.jsx)("div",{style:{position:"absolute",left:"8px",zIndex:1},children:a}),(0,o.jsx)("textarea",{ref:i,id:c,...t,style:{height:"100%",...t.style}}),a&&"end"===r&&(0,o.jsx)("div",{onClick:d,style:{position:"absolute",right:"2px",top:"50%",transform:"translateY(-50%)",zIndex:1,cursor:s?"none":"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:"white",pointerEvents:s?"none":"auto"},children:a})]})}const c=(0,l.forwardRef)(((e,t)=>{let{select:n,label:i,selectRef:a,datasource:r=[],values:s="",display:d="",containerStyle:u}=e;const[c,p]=(0,l.useState)(r),y=(0,l.useId)();return(0,l.useImperativeHandle)(t,(()=>({setDataSource:e=>{p(e)},getDataSource:()=>c}))),(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",...u},children:[(0,o.jsx)("label",{...i,htmlFor:y,children:i.title}),(0,o.jsx)("select",{...n,ref:a,className:`select ${n.className}`,style:{height:"18px",...n.style},children:c.map(((e,t)=>(0,o.jsx)("option",{value:e[s],children:e[d]},t)))})]})}))}}]);
//# sourceMappingURL=365.735e29df.chunk.js.map