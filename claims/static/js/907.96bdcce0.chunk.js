"use strict";(self.webpackChunkupward_cliam=self.webpackChunkupward_cliam||[]).push([[907],{1907:(s,e,a)=>{a.r(e),a.d(e,{default:()=>m});var n=a(5043),r=a(324),t=a(1178),i=a(3587),o=a(64),c=a.n(o),d=a(1675),l=a(579);const m=function(){const s=(0,d.Zp)(),{myAxios:e,setUser:a}=(0,n.useContext)(i.R),[o,m]=(0,n.useState)(!1),[u,p]=(0,n.useState)({username:!1,password:!1,success:!1,message:""}),{mutate:h,isPending:g}=(0,r.n)({mutationKey:["login"],mutationFn:async s=>await e.post("/login",{username:s.username,password:s.password},{withCredentials:!0}),onSuccess:e=>{a(e.data.user),p({username:!1,password:!1,success:!0,message:e.data.message}),c().fire({position:"center",icon:"success",title:e.data.message,showConfirmButton:!1,timer:800}).then((()=>{a(e.data.user),window.localStorage.setItem("tab","0"),s("/CLAIMS/dashboard")}))}});return(0,l.jsxs)(l.Fragment,{children:[g&&(0,l.jsx)(t.R,{}),(0,l.jsx)("div",{className:"main-landing-page",children:(0,l.jsxs)("form",{className:"content",onSubmit:async function(s){s.preventDefault();const e=new FormData(s.currentTarget);h({username:e.get("username"),password:e.get("password")})},children:[(0,l.jsx)("img",{alt:"Upward Insurance",src:"/logo.png",style:{width:"120px",height:"auto",background:"white"}}),(0,l.jsx)("h3",{style:{fontWeight:"400",marginBottom:"30px"},children:"LOGIN TO UPWARD INSURANCE"}),(0,l.jsx)("div",{className:"content-field",children:(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"username",children:" USERNAME"}),(0,l.jsx)("input",{autoFocus:!0,name:"username",id:"username",className:u.username?"error":"",onFocus:()=>p({username:!1,password:!1,success:!1,message:""})}),u.username&&(0,l.jsx)("p",{className:"warning-text",children:u.username&&u.message})]})}),(0,l.jsx)("div",{className:"content-field",style:{marginTop:"15px"},children:(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"password",children:" PASSWORD"}),(0,l.jsx)("input",{name:"password",id:"password",type:o?"text":"password",className:u.password?"error":"",onFocus:()=>p({username:!1,password:!1,success:!1,message:""})}),u.password&&(0,l.jsx)("p",{className:"warning-text",children:u.message})]})}),(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",columnGap:"10px",marginTop:"10px"},children:[(0,l.jsx)("input",{name:"showpass",id:"showpass",type:"checkbox",style:{padding:"0",margin:0},onChange:s=>{var e;m(null===(e=s.currentTarget)||void 0===e?void 0:e.checked)}}),(0,l.jsx)("label",{htmlFor:"showpass",style:{fontSize:"10px",cursor:"pointer",padding:"0",margin:0},children:"SHOW PASSWORD"})]}),(0,l.jsx)("button",{children:"SUBMIT"})]})})]})}}}]);
//# sourceMappingURL=907.96bdcce0.chunk.js.map