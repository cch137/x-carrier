import{u as e}from"./useAuth.e44ee3e1.js";import{u as a,E as n}from"./useTitle.e23f3c6e.js";import{f as s,K as u}from"./entry.506f3cf6.js";import{a as i}from"./app.36c0a517.js";import"./vue.f36acd1f.2cd25342.js";const d=s({__name:"logout",setup(r){const{logout:t}=e();a(`Log Out - ${i}`);const o=n.service({text:"Logging out..."});return t().finally(()=>{o&&o.close(),u("/")}),(_,l)=>null}});export{d as default};
