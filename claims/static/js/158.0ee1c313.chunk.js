"use strict";(self.webpackChunkupward_cliam=self.webpackChunkupward_cliam||[]).push([[158],{2153:(e,t,l)=>{l.d(t,{A:()=>u});var i=l(7392),n=l(1906),o=l(5043),r=l(7661),s=l(7131),d=l(9389),a=l(3438),c=l(579);const u=(0,o.forwardRef)(((e,t)=>{let{handleOnSave:l,handleOnClose:u}=e;const[p,f]=(0,o.useState)(0),[x,m]=(0,o.useState)([]),[h,y]=(0,o.useState)(null),b=(0,o.useRef)([]),[v,g]=(0,o.useState)(!1),[j,w]=(0,o.useState)(!1),[D,R]=(0,o.useState)(!1),[A,S]=(0,o.useState)(!1),k=(e,t)=>{R(!0),setTimeout((()=>{w(!1),R(!1),u(e,t)}),100)},C=(0,o.useRef)(k);return(0,o.useEffect)((()=>{window.addEventListener("keydown",(e=>{"Escape"===e.key&&C.current()}))}),[]),(0,o.useImperativeHandle)(t,(()=>({showModal:()=>{w(!0)},clsoeModal:()=>{w(!1)},getRefs:()=>({}),setSelectedDocument:e=>{e.files&&(m(e.files),b.current=e.files),y(e)},resetUpload:()=>{m([]),f(0),y(null)},closeDelay:e=>{k(null,e)}}))),j?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{position:"fixed",top:0,bottom:0,left:0,right:0,background:"transparent",zIndex:"88"},onClick:()=>{S(!0),setTimeout((()=>{S(!1)}),250)}}),(0,c.jsxs)("div",{style:{height:A?"90.1vh":"90vh",width:A?"70.1%":"70%",border:"1px solid #64748b",position:"absolute",top:"50%",left:"50%",bottom:"0",transform:"translate(-50%, -50%)",display:"flex",flexDirection:"column",zIndex:D?-100:9999,opacity:D?0:1,transition:"all 150ms",boxShadow:"3px 6px 32px -7px rgba(0,0,0,0.75)",boxSizing:"border-box"},children:[(0,c.jsxs)("div",{style:{flex:1,background:"#F1F1F1",display:"flex",flexDirection:"column"},children:[(0,c.jsx)("button",{className:"btn-check-exit-modal",style:{padding:"0 5px",borderRadius:"0px",background:"transparent",color:"black",height:"22px",position:"absolute",top:0,right:0,zIndex:999,border:"none",cursor:"pointer"},onClick:e=>{if(x.length>0){const t={id:null===h||void 0===h?void 0:h.id,label:null===h||void 0===h?void 0:h.label,document_id:null===h||void 0===h?void 0:h.document_id,required:null===h||void 0===h?void 0:h.required,files:x.map((e=>({link:URL.createObjectURL(e),filename:e.name,document_id:null===h||void 0===h?void 0:h.document_id,reference:null===h||void 0===h?void 0:h.reference,id:null===h||void 0===h?void 0:h.id})))};k(e,t)}else{const t={id:null===h||void 0===h?void 0:h.id,label:null===h||void 0===h?void 0:h.label,document_id:null===h||void 0===h?void 0:h.document_id,required:null===h||void 0===h?void 0:h.required,files:null};k(e,t)}},children:(0,c.jsx)(a.A,{sx:{fontSize:"20px"}})}),(0,c.jsx)("div",{style:{display:"flex",padding:"20px",flex:1},children:(0,c.jsx)("div",{style:{display:"flex",padding:"10px",flex:1,border:"2px dashed #ccc"},children:(0,c.jsxs)("div",{className:"dropzone "+(v?"active":""),onDragOver:e=>{e.preventDefault(),g(!0)},onDragLeave:()=>{g(!1)},onDrop:e=>{e.preventDefault(),g(!1),e.dataTransfer.files.length>0&&(f(0),m(Array.from(e.dataTransfer.files)))},onClick:()=>{var e;return null===(e=document.getElementById("fileInput"))||void 0===e?void 0:e.click()},style:{background:x.length>0?"black":"transparent",padding:"10px",position:"relative"},children:[(0,c.jsx)("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"},children:(0,c.jsx)(r.A,{sx:{fontSize:"22rem",color:v?"#c3facf":"#ebe8e8"}})}),x.length>0&&(0,c.jsx)("img",{src:URL.createObjectURL(x[p]),alt:x[p].name,style:{position:"absolute",width:"auto",maxWidth:"100%",height:"100%",left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}),x.length>1&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i.A,{onClick:e=>{e.stopPropagation(),f((e=>e<=0?x.length-1:e-1))},sx:{position:"absolute",left:"0",top:"50%",transform:"translateY(-50%)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},color:"success",children:(0,c.jsx)(s.A,{sx:{fontSize:"3rem",color:"white",textAlign:"center",marginLeft:"10px"}})}),(0,c.jsx)(i.A,{sx:{position:"absolute",right:"0",top:"50%",transform:"translateY(-50%)",cursor:"pointer"},onClick:e=>{e.stopPropagation(),f((e=>e>=x.length-1?0:e+1))},color:"success",children:(0,c.jsx)(d.A,{sx:{fontSize:"3rem",color:"white"}})})]}),(0,c.jsxs)("div",{className:"dropzone-text-field",children:[(0,c.jsx)("input",{id:"fileInput",type:"file",multiple:!0,hidden:!0,onChange:e=>{e.target.files.length>0&&(f(0),m(Array.from(e.target.files)))}}),(0,c.jsx)("p",{className:"placeholder-text",style:{color:x.length>0?"white":"#686161"},children:"Drag & Drop a file here"}),(0,c.jsx)("p",{className:"placeholder-text",style:{color:x.length>0?"white":"#686161"},children:"or"}),(0,c.jsx)("p",{className:"placeholder-text",style:{color:x.length>0?"white":"#686161"},children:"Click to select"}),(0,c.jsx)("div",{style:{height:"20px"}})]}),x.length>0&&(0,c.jsx)("div",{style:{position:"absolute",top:"0px",left:"15px"},children:(0,c.jsxs)("p",{style:{color:"white"},children:[p+1," / ",x.length," ",x[p].name]})})]})})}),(0,c.jsx)(n.A,{disabled:x.length<=0,color:"primary",sx:{borderRadius:0,width:"100%"},variant:"contained",onClick:e=>{if(x.length<=0)return alert("No File Uploaded!");if(x.length>0){const t={id:null===h||void 0===h?void 0:h.id,label:null===h||void 0===h?void 0:h.label,document_id:null===h||void 0===h?void 0:h.document_id,required:null===h||void 0===h?void 0:h.required,files:x.map((e=>({link:URL.createObjectURL(e),filename:e.name,document_id:null===h||void 0===h?void 0:h.document_id,reference:null===h||void 0===h?void 0:h.reference,id:null===h||void 0===h?void 0:h.id})))};l(e,t)}else{const t={id:null===h||void 0===h?void 0:h.id,label:null===h||void 0===h?void 0:h.label,document_id:null===h||void 0===h?void 0:h.document_id,required:null===h||void 0===h?void 0:h.required,files:null};l(e,t)}},children:"Save Upload"})]}),(0,c.jsx)("style",{children:"\n              .btn-check-exit-modal:hover{\n                background:red !important;\n                color:white !important;\n              }\n            "})]})]}):null}))},3158:(e,t,l)=>{l.r(t),l.d(t,{ModalAddapproveDate:()=>C,ModalDocument:()=>k,default:()=>E});l(8618);var i=l(5043),n=l(3086),o=l(4619),r=l(1178),s=l(9040),d=l(7392),a=l(1906),c=l(5721),u=l(3561),p=l(8968),f=l(2050),x=l(7566),m=(l(8441),l(1675)),h=l(2153),y=l(9606),b=l(3515),v=l(141),g=l(147),j=l(3438),w=l(7332),D=l(3464),R=l(751),A=l(579);const S=[{documents:[{id:10,label:"Repair Estimate",files:null,document_id:"0001",required:!1,primaryDocuments:!0,others:!1},{id:11,label:"Picture of Damage",files:null,document_id:"0001",primaryDocuments:!0,others:!1}],id:"0001"},{documents:[{id:10,label:"Complaint Sheet",files:null,document_id:"0002",required:!1,primaryDocuments:!0,others:!1},{id:11,label:"Alarm Sheet",files:null,document_id:"0002",primaryDocuments:!0,others:!1},{id:12,label:"Original Sheet",files:null,document_id:"0002",primaryDocuments:!0,others:!1},{id:13,label:"Certificate of No Recovery",files:null,document_id:"0002",primaryDocuments:!0,others:!1}],id:"0002"},{documents:[{id:10,label:"Brgy, Certificate",files:null,document_id:"0003",required:!1,primaryDocuments:!0,others:!1},{id:11,label:"Stencils",files:null,document_id:"0003",primaryDocuments:!0,others:!1},{id:12,label:"Repair Estimate",files:null,document_id:"0003",primaryDocuments:!0,others:!1},{id:13,label:"Picture of Damage",files:null,document_id:"0003",primaryDocuments:!0,others:!1}],id:"0003"},{documents:[{id:10,label:"Medical Cert",files:null,document_id:"0004",required:!1,primaryDocuments:!0,others:!1},{id:11,label:"Hospital/Medical Bill and OR",files:null,document_id:"0004",primaryDocuments:!0,others:!1},{id:12,label:"PSA birth certificate",files:null,document_id:"0004",primaryDocuments:!0,others:!1},{id:13,label:"Valid ID",files:null,document_id:"0004",primaryDocuments:!0,others:!1},{id:14,label:"Proof of settlement",files:null,document_id:"0004",primaryDocuments:!0,others:!1},{id:15,label:"PSA Death certificate",files:null,document_id:"0004",primaryDocuments:!0,others:!1},{id:16,label:"Funeral and burial OR",files:null,document_id:"0004",primaryDocuments:!0,others:!1}],id:"0004"},{documents:[{id:10,label:"OR CR",files:null,document_id:"0005",required:!1,primaryDocuments:!0,others:!1},{id:11,label:"Driver\u2019s license and OR",files:null,document_id:"0005",primaryDocuments:!0,others:!1},{id:12,label:"Driver\u2019s Statement to the Police (Salaysay)",files:null,document_id:"0005",primaryDocuments:!0,others:!1},{id:13,label:"Pictures  Damages",files:null,document_id:"0005",primaryDocuments:!0,others:!1},{id:14,label:"Repair Estimate",files:null,document_id:"0005",primaryDocuments:!0,others:!1},{id:15,label:"Certificate of No Claim",files:null,document_id:"0005",primaryDocuments:!0,others:!1}],id:"0005"},{documents:[{id:10,label:"Medical Cert",files:null,document_id:"0006",required:!1,primaryDocuments:!0,others:!1},{id:11,label:"Hospital/Medical Bill and OR",files:null,document_id:"0006",primaryDocuments:!0,others:!1},{id:12,label:"Valid ID",files:null,document_id:"0006",primaryDocuments:!0,others:!1}],id:"0006"},{documents:[{id:8,label:"Medical certificate ",files:null,document_id:"0007",required:!1,primaryDocuments:!0,others:!1},{id:9,label:"Hospital/Medical Bill and OR",files:null,document_id:"0007",primaryDocuments:!0,others:!1},{id:10,label:"PSA birth certificate",files:null,document_id:"0007",primaryDocuments:!0,others:!1},{id:11,label:"Valid ID",files:null,document_id:"0007",primaryDocuments:!0,others:!1},{id:12,label:"Proof of settlement",files:null,document_id:"0007",primaryDocuments:!0,others:!1}],id:"0007"},{documents:[{id:8,label:" PSA Death certificate ",files:null,document_id:"0008",required:!1,primaryDocuments:!0,others:!1},{id:9,label:"Funeral and burial OR",files:null,document_id:"0008",primaryDocuments:!0,others:!1},{id:10,label:"PSA certificate of live birth",files:null,document_id:"0008",primaryDocuments:!0,others:!1},{id:11,label:"PSA marriage certificate",files:null,document_id:"0008",primaryDocuments:!0,others:!1},{id:12,label:"Valid ID ",files:null,document_id:"0008",primaryDocuments:!0,others:!1},{id:13,label:"Proof of settlement ",files:null,document_id:"0008",primaryDocuments:!0,others:!1}],id:"0008"},{documents:[{id:3,label:"Medical Certificate",files:null,document_id:"00021",required:!1,primaryDocuments:!0,others:!1},{id:4,label:"Hospital/Medical Bill and OR",files:null,document_id:"00021",primaryDocuments:!0,others:!1},{id:5,label:"Laboratory Results",files:null,document_id:"00021",primaryDocuments:!0,others:!1},{id:6,label:"Valid ID",files:null,document_id:"00021",primaryDocuments:!0,others:!1}],id:"00021"},{documents:[{id:3,label:"PSA Death certificate ",files:null,document_id:"00021",required:!1,primaryDocuments:!0,others:!1},{id:4,label:"Funeral and burial OR",files:null,document_id:"00021",primaryDocuments:!0,others:!1},{id:5,label:"PSA Birt Certicate",files:null,document_id:"00021",primaryDocuments:!0,others:!1},{id:6,label:"PSA marriage certificate",files:null,document_id:"00021",primaryDocuments:!0,others:!1},{id:7,label:"Heir's Valid ID",files:null,document_id:"00021",primaryDocuments:!0,others:!1}],id:"00021"}];const k=(0,i.forwardRef)(((e,t)=>{let{handleOnSave:l,handleOnClose:n,hasSelectedRow:r}=e;const s=(0,i.useRef)(null),d=(0,i.useRef)(!1),c=(0,i.useRef)({x:0,y:0}),[u,p]=(0,i.useState)(!1),[f,x]=(0,i.useState)(!1),[m,h]=(0,i.useState)(!1),y=(0,i.useRef)(null),b=()=>{x(!0),setTimeout((()=>{p(!1),x(!1),n()}),100)},v=(0,i.useRef)(b);(0,i.useImperativeHandle)(t,(()=>({showModal:()=>{p(!0)},clsoeModal:()=>{p(!1)},getRefs:()=>({}),closeDelay:b}))),(0,i.useEffect)((()=>{window.addEventListener("keydown",(e=>{"Escape"===e.key&&v.current()}))}),[]);const g=e=>{d.current&&s.current&&(s.current.style.left=e.clientX-c.current.x+"px",s.current.style.top=e.clientY-c.current.y+"px")},w=()=>{d.current=!1,document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",w)};return u?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("div",{style:{position:"fixed",top:0,bottom:0,left:0,right:0,background:"transparent",zIndex:"88"},onClick:()=>{h(!0),setTimeout((()=>{h(!1)}),250)}}),(0,A.jsxs)("div",{ref:s,style:{height:m?"142px":"140px",width:m?"40.3%":"40%",border:"1px solid #64748b",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -75%)",display:"flex",flexDirection:"column",zIndex:f?-100:100,opacity:f?0:1,transition:"all 150ms",boxShadow:"3px 6px 32px -7px rgba(0,0,0,0.75)"},children:[(0,A.jsxs)("div",{style:{height:"22px",background:"white",display:"flex",justifyContent:"space-between",padding:"5px",position:"relative",alignItems:"center",cursor:"grab"},onMouseDown:e=>{s.current&&(d.current=!0,c.current={x:e.clientX-s.current.offsetLeft,y:e.clientY-s.current.offsetTop},document.addEventListener("mousemove",g),document.addEventListener("mouseup",w))},children:[(0,A.jsx)("span",{style:{fontSize:"13px",fontWeight:"bold"},children:"Add Other Documents"}),(0,A.jsx)("button",{className:"btn-check-exit-modal",style:{padding:"0 5px",borderRadius:"0px",background:"white",color:"black",height:"22px",position:"absolute",top:0,right:0},onClick:()=>{b()},children:(0,A.jsx)(j.A,{sx:{fontSize:"22px"}})})]}),(0,A.jsxs)("div",{style:{flex:1,background:"#F1F1F1",padding:"5px",display:"flex",flexDirection:"column",rowGap:"5px"},children:[(0,A.jsx)(o.No,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Label : ",style:{fontSize:"12px",fontWeight:"bold",width:"100%"}},textarea:{rows:3,style:{width:"calc(100% - 10px)",borderRadius:"5px"},onKeyDown:e=>{"NumpadEnter"===e.code||e.code}},_inputRef:y}),(0,A.jsx)(a.A,{sx:{height:"25px",fontSize:"13px"},variant:"contained",onClick:e=>{var t;l(e,null===(t=y.current)||void 0===t?void 0:t.value)},children:"SAVE NEW DOCUMENT"})]}),(0,A.jsx)("style",{children:"\n              .btn-check-exit-modal:hover{\n                background:red !important;\n                color:white !important;\n              }\n            "})]})]}):null})),C=(0,i.forwardRef)(((e,t)=>{let{handleOnSave:l,handleOnClose:r,hasSelectedRow:s}=e;const d=(0,i.useRef)(null),c=(0,i.useRef)(!1),u=(0,i.useRef)({x:0,y:0}),[p,f]=(0,i.useState)(!1),[x,m]=(0,i.useState)(!1),[h,y]=(0,i.useState)(!1),b=(0,i.useRef)(null),v=()=>{m(!0),setTimeout((()=>{f(!1),m(!1),r()}),100)},g=(0,i.useRef)(v);(0,i.useImperativeHandle)(t,(()=>({showModal:()=>{f(!0)},clsoeModal:()=>{f(!1)},getRefs:()=>({}),closeDelay:v}))),(0,i.useEffect)((()=>{window.addEventListener("keydown",(e=>{"Escape"===e.key&&g.current()}))}),[]);const w=e=>{c.current&&d.current&&(d.current.style.left=e.clientX-u.current.x+"px",d.current.style.top=e.clientY-u.current.y+"px")},D=()=>{c.current=!1,document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",D)};return p?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("div",{style:{position:"fixed",top:0,bottom:0,left:0,right:0,background:"transparent",zIndex:"88"},onClick:()=>{y(!0),setTimeout((()=>{y(!1)}),250)}}),(0,A.jsxs)("div",{ref:d,style:{height:"auto",width:h?"20.1%":"20%",border:"1px solid #64748b",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -75%)",display:"flex",flexDirection:"column",zIndex:x?-100:100,opacity:x?0:1,transition:"all 150ms",boxShadow:"3px 6px 32px -7px rgba(0,0,0,0.75)"},children:[(0,A.jsxs)("div",{style:{height:"22px",background:"white",display:"flex",justifyContent:"space-between",padding:"5px",position:"relative",alignItems:"center",cursor:"grab"},onMouseDown:e=>{d.current&&(c.current=!0,u.current={x:e.clientX-d.current.offsetLeft,y:e.clientY-d.current.offsetTop},document.addEventListener("mousemove",w),document.addEventListener("mouseup",D))},children:[(0,A.jsx)("span",{style:{fontSize:"13px",fontWeight:"bold"},children:"Add Approved Date"}),(0,A.jsx)("button",{className:"btn-check-exit-modal",style:{padding:"0 5px",borderRadius:"0px",background:"white",color:"black",height:"22px",position:"absolute",top:0,right:0},onClick:()=>{v()},children:(0,A.jsx)(j.A,{sx:{fontSize:"22px"}})})]}),(0,A.jsxs)("div",{style:{flex:1,background:"#F1F1F1",padding:"5px",display:"flex",flexDirection:"column",rowGap:"5px"},children:[(0,A.jsx)(o.ks,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px",marginBottom:"5px"},label:{title:"Approved Date  ",style:{fontSize:"12px",fontWeight:"bold",width:"100px",display:"none"}},input:{type:"date",style:{width:"calc(100% - 10px)"},defaultValue:(0,n.GP)(new Date,"yyyy-MM-dd"),onKeyDown:e=>{"NumpadEnter"===e.code||e.code}},inputRef:b}),(0,A.jsx)(a.A,{sx:{height:"25px",fontSize:"13px"},variant:"contained",onClick:e=>{var t;l(e,null===(t=b.current)||void 0===t?void 0:t.value)},children:"SAVE APPROVED DATE"})]}),(0,A.jsx)("style",{children:"\n              .btn-check-exit-modal:hover{\n                background:red !important;\n                color:white !important;\n              }\n            "})]})]}):null})),_=e=>{let{inputRef:t,label:l,gridRow:n,checked:o,onChange:r}=e;const s=(0,i.useId)();return(0,A.jsxs)("div",{style:{display:"flex",columnGap:"5px",gridRow:n,alignItems:"center"},children:[(0,A.jsx)("input",{id:s,ref:t,type:"checkbox",style:{cursor:"pointer"},checked:o,onChange:r}),(0,A.jsx)("label",{htmlFor:s,style:{fontSize:"12px",cursor:"pointer"},children:l})]})},E=function(){const e=(0,m.Zp)(),t=(0,i.useRef)(null),l=(0,i.useRef)(null),j=(0,i.useRef)(null),[E,z]=(0,i.useState)(null),[O,I]=(0,i.useState)("Ongoing"),[M,P]=(0,i.useState)(null),[N,L]=(0,i.useState)(""),F=(0,i.useRef)(null),G=(0,i.useRef)(null),T=(0,i.useRef)(null),U=(0,i.useRef)(null),q=(0,i.useRef)(null),W=(0,i.useRef)(null),Y=(0,i.useRef)(null),V=(0,i.useRef)(null),B=(0,i.useRef)(null),$=(0,i.useRef)(null),K=(0,i.useRef)(null),H=(0,i.useRef)(null),J=(0,i.useRef)(null),X=(0,i.useRef)(null),Z=e=>{I(e)},Q=async(e,t)=>{if(t.files&&t.files.length>0){const e=t.files.map(((e,t)=>(async(e,t)=>{const l=await fetch(e),i=await l.blob();return new File([i],t,{type:"image/png"})})(e.link,e.filename))),l=await Promise.all(e);t.files=l}t.reference=E.reference,j.current.showModal(),j.current.setSelectedDocument(t)},ee=(e,t)=>{window.confirm(`Are you sure you want to reset this document? \n${e.label}`)&&z((t=>({...t,documents:t.documents.map((t=>t.id===e.id?{...t,files:null}:t))})))},te=(e,t)=>{window.confirm(`Are you sure you want to reset this document? \n${e.label}`)&&z((t=>({...t,documents:t.documents.filter((t=>t.id!==e.id))})))};return(0,i.useEffect)((()=>{const e=new URLSearchParams(window.location.search).get("Mkr44Rt2iuy13R");if(e){const t=JSON.parse(decodeURIComponent(e)).state;P(JSON.parse(decodeURIComponent(e)).dataPreview);const l=S.filter((e=>e.id===t.id));z({...t,id:l[0].id,documents:l[0].documents})}}),[P]),(0,i.useEffect)((()=>{const e=e=>{e.preventDefault(),e.returnValue=""};return window.addEventListener("beforeunload",e),()=>{window.removeEventListener("beforeunload",e)}}),[]),(0,i.useEffect)((()=>{const e=()=>{window.history.pushState(null,"",window.location.href)};return e(),window.addEventListener("popstate",e),()=>{window.removeEventListener("popstate",e)}}),[]),(0,i.useEffect)((()=>{if(""!==N&&"Approved"!==O){window.confirm("Are your sure you want to change the Status?\nThe Approved date will be delete")?L(""):I("Approved")}}),[O]),E?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(h.A,{ref:j,handleOnSave:(e,t)=>{j.current.closeDelay(t)},handleOnClose:(e,t)=>{const l=E.documents.map((e=>(e.id===t.id&&(e={...e,...t,reference:E.reference}),e)));z({...E,documents:l}),j.current.resetUpload()}}),(0,A.jsx)(k,{ref:t,handleOnSave:(e,l)=>{const i=E.documents,n=i[i.length-1];i.push({id:n.id+1,label:l,files:null,document_id:n.document_id,others:!0,primaryDocuments:!1});const o={...E,documents:i};z(o),t.current.closeDelay()},handleOnClose:(e,t)=>{}}),(0,A.jsx)(C,{ref:l,handleOnSave:(e,t)=>{L(t),l.current.clsoeModal()},handleOnClose:(e,t)=>{""===N&&I("Ongoing")}}),(0,A.jsx)("div",{style:{display:"flex",flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"},children:(0,A.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"80%",height:"100%"},children:[(0,A.jsxs)("div",{style:{height:"50px",background:"#ffc107",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"22px",color:"#9e5f03",position:"relative"},children:[(0,A.jsx)(s.A,{title:"Back to Dashboard",children:(0,A.jsx)(d.A,{sx:{position:"absolute",left:5,top:"50%",transform:"translateY(-50%)"},onClick:()=>{const t=encodeURIComponent(JSON.stringify(M));e(`/${y.DEPARTMENT}/dashboard?Mkr44Rt2iuy13R=${t}`)},children:(0,A.jsx)(w.A,{})})}),E.claimType]}),(0,A.jsxs)("div",{style:{flex:"1",display:"flex",position:"relative"},children:[(0,A.jsx)("div",{style:{flex:"1",display:"flex",position:"relative",flexDirection:"column",overflow:"auto",height:"100%",borderRight:"1px solid #d1d5db",borderLeft:"1px solid #d1d5db"},children:(0,A.jsxs)("div",{style:{position:"absolute",left:"0",right:"0",height:"auto",display:"grid",columnGap:"15px",rowGap:"7px",padding:"20px 10px"},children:[(0,A.jsxs)("div",{style:{marginBottom:"20px",fontSize:"12px",fontWeight:"bold",display:"flex",justifyContent:"space-between"},children:[(0,A.jsxs)("span",{children:["REF#:"," ",(0,A.jsx)("span",{style:{color:"green",marginLeft:"10px"},children:E.reference})]}),""!==N&&(0,A.jsxs)("span",{children:["Date Approved:"," ",(0,A.jsx)("span",{style:{color:"green",marginLeft:"10px"},children:(0,n.GP)(new Date(N),"MM/dd/yyyy")})]})]}),(0,A.jsxs)("div",{style:{display:"flex",columnGap:"5px"},children:[(0,A.jsx)(o.ks,{containerStyle:{flex:1,flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Date Report : ",style:{fontSize:"12px",fontWeight:"bold",flex:1}},input:{type:"date",style:{width:"calc(100% - 10px)",height:"25px ",borderRadius:"5px"},defaultValue:(0,n.GP)(new Date,"yyyy-MM-dd"),onKeyDown:e=>{var t;"Enter"!==e.key&&"NumpadEnter"!==e.key||(e.preventDefault(),null===(t=q.current)||void 0===t||t.focus())}},inputRef:F}),(0,A.jsx)(o.ks,{containerStyle:{flex:1,flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Date Accident : ",style:{fontSize:"12px",fontWeight:"bold",flex:1}},input:{type:"date",style:{width:"calc(100% - 10px)",height:"25px ",borderRadius:"5px"},defaultValue:(0,n.GP)(new Date,"yyyy-MM-dd"),onKeyDown:e=>{var t;"Enter"!==e.key&&"NumpadEnter"!==e.key||(e.preventDefault(),null===(t=q.current)||void 0===t||t.focus())}},inputRef:G})]}),(0,A.jsxs)("div",{style:{display:"flex",columnGap:"5px"},children:[(0,A.jsx)(o.pp,{containerStyle:{flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px",flex:1},label:{title:"Status : ",style:{fontSize:"12px",fontWeight:"bold",width:"60px"}},selectRef:T,select:{style:{width:"calc(100% - 10px)",height:"25px",borderRadius:"5px"},defaultValue:"",onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(e.preventDefault(),null===(t=U.current)||void 0===t||t.focus())}},datasource:[{key:""},{key:"For Review"},{key:"For Evaluation "},{key:"For Loa"},{key:"For Billing"},{key:"For Check Prep"},{key:"ON HOLD"},{key:"With Lacking Docs"}],values:"key",display:"key"}),(0,A.jsx)(o.ks,{containerStyle:{flex:1,flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Date Received : ",style:{fontSize:"12px",fontWeight:"bold",flex:1}},input:{type:"date",style:{width:"calc(100% - 10px)",height:"25px ",borderRadius:"5px"},onFocus:e=>e.target.blur(),defaultValue:"",onKeyDown:e=>{var t;"Enter"!==e.key&&"NumpadEnter"!==e.key||(e.preventDefault(),null===(t=q.current)||void 0===t||t.focus())}},inputRef:U,offValidation:!0})]}),(0,A.jsxs)("div",{style:{display:"flex",columnGap:"5px"},children:[(0,A.jsx)(o.iO,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Amount of Claim : ",style:{fontSize:"12px",fontWeight:"bold",width:"100%"}},input:{type:"text",defaultValue:"0.00",style:{width:"calc(100% - 10px)",height:"25px ",borderRadius:"5px"},onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(null===(t=W.current)||void 0===t||t.focus())}},inputRef:q}),(0,A.jsx)(o.iO,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Amount Approved : ",style:{fontSize:"12px",fontWeight:"bold",width:"100%"}},input:{type:"text",defaultValue:"0.00",style:{width:"calc(100% - 10px)",height:"25px ",borderRadius:"5px"},onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(null===(t=Y.current)||void 0===t||t.focus())}},inputRef:W})]}),(0,A.jsxs)("div",{style:{display:"flex",columnGap:"5px"},children:[(0,A.jsx)(o.iO,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Participation : ",style:{fontSize:"12px",fontWeight:"bold",width:"100%"}},input:{type:"text",defaultValue:"0.00",style:{width:"calc(100% - 10px)",height:"25px ",borderRadius:"5px"},onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(null===(t=V.current)||void 0===t||t.focus())}},inputRef:Y}),(0,A.jsx)(o.iO,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Net Amount : ",style:{fontSize:"12px",fontWeight:"bold",width:"100%"}},input:{type:"text",defaultValue:"0.00",style:{width:"calc(100% - 10px)",height:"25px ",borderRadius:"5px"},onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(null===(t=B.current)||void 0===t||t.focus())}},inputRef:V})]}),(0,A.jsx)(o.No,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Name of TPPD : ",style:{fontSize:"12px",fontWeight:"bold",width:"100%"}},textarea:{style:{width:"calc(100% - 10px)",borderRadius:"5px"},onKeyDown:e=>{var t;"NumpadEnter"!==e.code&&"Enter"!==e.code||(null===(t=$.current)||void 0===t||t.focus())}},_inputRef:B}),(0,A.jsx)(o.No,{containerStyle:{width:"100%",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start",textAlign:"left",rowGap:"5px"},label:{title:"Remarks : ",style:{fontSize:"12px",fontWeight:"bold",width:"100%"}},textarea:{rows:4,style:{width:"calc(100% - 10px)",borderRadius:"5px"},onKeyDown:e=>{"NumpadEnter"===e.code||e.code}},_inputRef:$}),(0,A.jsxs)("div",{style:{width:"100%",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"10px",alignItems:"center",padding:"20px 0px"},children:[(0,A.jsx)(_,{gridRow:1,inputRef:K,label:"Ongoing",onChange:()=>Z("Ongoing"),checked:"Ongoing"===O}),(0,A.jsx)(_,{gridRow:1,inputRef:H,label:"Denied",onChange:()=>Z("Denied"),checked:"Denied"===O}),(0,A.jsx)(_,{gridRow:1,inputRef:J,label:"Cancel",onChange:()=>Z("Cancel"),checked:"Cancel"===O}),(0,A.jsx)(_,{gridRow:1,inputRef:X,label:"Approved",onChange:()=>{l.current.showModal(),Z("Approved")},checked:"Approved"===O})]})]})}),(0,A.jsx)("div",{style:{flex:"1",display:"flex",position:"relative",flexDirection:"column",overflowY:"auto",overflowX:"hidden",height:"100%",borderRight:"1px solid #d1d5db"},children:(0,A.jsx)("div",{style:{background:"red",position:"absolute",left:"0",right:"0",height:"auto",display:"flex",flexDirection:"column",boxSizing:"border-box"},children:(0,A.jsxs)("nav",{"aria-label":"main mailbox folders",style:{position:"absolute",left:"0",right:"0",marginBottom:"50px"},children:[(0,A.jsx)("p",{style:{fontSize:"13px",fontWeight:"bold",padding:"5px 10px"},children:"Basic Requirement (For Assured)"}),(0,A.jsx)(c.A,{children:E.documents.filter((e=>e.basicDocuments)).map(((e,t)=>(0,A.jsxs)(u.Ay,{disablePadding:!0,sx:{backgroundColor:e.files?"#b9f6ca":"",position:"relative"},children:[(0,A.jsxs)(f.A,{sx:{cursor:"pointer",width:"auto !important",minWidth:"auto"},children:[(0,A.jsx)(s.A,{title:"Reset Upload",children:(0,A.jsx)(d.A,{disabled:null===e.files,color:"primary",onClick:()=>{ee(e)},children:(0,A.jsx)(R.A,{color:"primary",sx:{fontSize:"20px"}})})}),e.others&&(0,A.jsx)(s.A,{title:"Reset Upload",children:(0,A.jsx)(d.A,{color:"error",onClick:()=>{te(e)},children:(0,A.jsx)(D.A,{color:"error",sx:{fontSize:"20px"}})})})]}),(0,A.jsx)(s.A,{title:"Upload Document",children:(0,A.jsxs)(p.A,{onClick:t=>Q(0,e),children:[(0,A.jsx)(x.A,{primaryTypographyProps:{fontSize:"12px"},primary:`${t+1}.   ${e.label}`}),e.required&&!e.files&&(0,A.jsx)(b.A,{sx:{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",fontSize:"18px",color:"error.main"}})]})})]},e.id)))}),(0,A.jsx)("p",{style:{fontSize:"13px",fontWeight:"bold",padding:"5px 10px"},children:E.claimType}),(0,A.jsx)(c.A,{children:E.documents.filter((e=>e.primaryDocuments)).map(((e,t)=>(0,A.jsxs)(u.Ay,{disablePadding:!0,sx:{backgroundColor:e.files?"#b9f6ca":"",position:"relative"},children:[(0,A.jsxs)(f.A,{sx:{cursor:"pointer",width:"auto !important",minWidth:"auto"},children:[(0,A.jsx)(s.A,{title:"Reset Upload",children:(0,A.jsx)(d.A,{disabled:null===e.files,color:"primary",onClick:()=>{ee(e)},children:(0,A.jsx)(R.A,{color:"primary",sx:{fontSize:"20px"}})})}),e.others&&(0,A.jsx)(s.A,{title:"Reset Upload",children:(0,A.jsx)(d.A,{color:"error",onClick:()=>{te(e)},children:(0,A.jsx)(D.A,{color:"error",sx:{fontSize:"20px"}})})})]}),(0,A.jsx)(s.A,{title:"Upload Document",children:(0,A.jsxs)(p.A,{onClick:t=>Q(0,e),children:[(0,A.jsx)(x.A,{primaryTypographyProps:{fontSize:"12px"},primary:`${t+1}.   ${e.label}`}),e.required&&!e.files&&(0,A.jsx)(b.A,{sx:{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",fontSize:"18px",color:"error.main"}})]})})]},e.id)))}),E.documents.filter((e=>e.others)).length>0&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)("p",{style:{fontSize:"13px",fontWeight:"bold",padding:"5px 10px"},children:"Other Documents"}),(0,A.jsx)(c.A,{children:E.documents.filter((e=>e.others)).map(((e,t)=>(0,A.jsxs)(u.Ay,{disablePadding:!0,sx:{backgroundColor:e.files?"#b9f6ca":"",position:"relative"},children:[(0,A.jsxs)(f.A,{sx:{cursor:"pointer",width:"auto !important",minWidth:"auto"},children:[(0,A.jsx)(s.A,{title:"Reset Upload",children:(0,A.jsx)(d.A,{disabled:null===e.files,color:"primary",onClick:()=>{ee(e)},children:(0,A.jsx)(R.A,{color:"primary",sx:{fontSize:"20px"}})})}),e.others&&(0,A.jsx)(s.A,{title:"Reset Upload",children:(0,A.jsx)(d.A,{color:"error",onClick:()=>{te(e)},children:(0,A.jsx)(D.A,{color:"error",sx:{fontSize:"20px"}})})})]}),(0,A.jsx)(s.A,{title:"Upload Document",children:(0,A.jsxs)(p.A,{onClick:t=>Q(0,e),children:[(0,A.jsx)(x.A,{primaryTypographyProps:{fontSize:"12px"},primary:`${t+1}.   ${e.label}`}),e.required&&!e.files&&(0,A.jsx)(b.A,{sx:{position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)",fontSize:"18px",color:"error.main"}})]})})]},e.id)))})]})]})})}),(0,A.jsx)("div",{style:{position:"absolute",bottom:"10px",right:"10px",width:"50px",height:"50px",borderRadius:"50%",cursor:"pointer",zIndex:999},onClick:()=>{t.current.showModal()},children:(0,A.jsx)(s.A,{title:"Add Other Document",children:(0,A.jsx)(d.A,{"aria-label":"delete",size:"large",sx:{background:g.A[800],":hover":{background:g.A[900]}},children:(0,A.jsx)(v.A,{sx:{color:"white"}})})})})]}),(0,A.jsx)("div",{style:{height:"40px",background:"#d1d5db"},children:(0,A.jsx)(s.A,{title:"Submit Claim",children:(0,A.jsx)(a.A,{variant:"contained",color:"success",sx:{width:"100%",borderRadius:0,height:"100%"},onClick:()=>{let t=[];if(E.documents.forEach(((e,l)=>{e.required&&!e.files&&t.push(`${l+1}. ${e.label}`)})),t.length>0)return alert("The following required documents are missing:\n\n"+t.join("\n"));{var l,i,o,r,s,d,a,c,u,p,f,x,m,h;const t=[E.reference,E.claimType,(0,n.GP)(new Date(null===(l=F.current)||void 0===l?void 0:l.value),"MM/dd/YYY"),(0,n.GP)(new Date(null===(i=G.current)||void 0===i?void 0:i.value),"MM/dd/YYY"),null===(o=T.current)||void 0===o?void 0:o.value,""===(null===(r=U.current)||void 0===r?void 0:r.value)?"":(0,n.GP)(new Date(null===(s=U.current)||void 0===s?void 0:s.value),"MM/dd/YYY"),null===(d=q.current)||void 0===d?void 0:d.value,null===(a=W.current)||void 0===a?void 0:a.value,null===(c=Y.current)||void 0===c?void 0:c.value,null===(u=V.current)||void 0===u?void 0:u.value,null===(p=B.current)||void 0===p?void 0:p.value,null===(f=$.current)||void 0===f?void 0:f.value,""!==N?(0,n.GP)(new Date(N),"MM/dd/YYY"):N,N,null===(x=F.current)||void 0===x?void 0:x.value,null===(m=G.current)||void 0===m?void 0:m.value,null===(h=U.current)||void 0===h?void 0:h.value,O,E.id,E.documents],b=JSON.parse(M.tableData);b.push(t),M.tableData=JSON.stringify(b);const v=encodeURIComponent(JSON.stringify(M));e(`/${y.DEPARTMENT}/dashboard?Mkr44Rt2iuy13R=${v}`)}},children:"SUBMIT"})})})]})})]}):(0,A.jsx)(r.R,{})}},8618:()=>{}}]);
//# sourceMappingURL=158.0ee1c313.chunk.js.map