"use strict";(self["webpackChunkweb_10947"]=self["webpackChunkweb_10947"]||[]).push([[608],{6608:function(e,a,l){l.r(a),l.d(a,{default:function(){return S}});var r=l(3396),n=l(9242),t=l(7139);const o={class:"container mt-5"},m={class:"row"},i={class:"col-md-12"},s={class:"card border-0 rounded shadow"},d={class:"card-body"},c=(0,r._)("h4",null,"TAMBAH MEMBER",-1),u=(0,r._)("hr",null,null,-1),p={class:"form-group mb-3"},b=(0,r._)("label",{class:"form-label"},"Nama",-1),_={key:0,class:"mt-2 alert alert-danger"},g={class:"form-group mb-3"},v=(0,r._)("label",{for:"content",class:"form-label"},"Email",-1),f={key:0,class:"mt-2 alert alert-danger"},k={class:"form-group mb-3"},h=(0,r._)("label",{for:"content",class:"form-label"},"Nomor Telepon",-1),w={key:0,class:"mt-2 alert alert-danger"},y={class:"form-group mb-3"},M=(0,r._)("label",{for:"content",class:"form-label"},"Tanggal Lahir",-1),D={key:0,class:"mt-2 alert alert-danger"},q={class:"form-group mb-3"},U=(0,r._)("label",{for:"content",class:"form-label"},"Gender",-1),z=(0,r._)("option",{value:"Laki-laki"},"Laki-laki",-1),V=(0,r._)("option",{value:"Perempuan"},"Perempuan",-1),N=[z,V],x={key:0,class:"mt-2 alert alert-danger"},A=(0,r._)("button",{type:"submit",class:"btn btn-primary"},"SIMPAN",-1);function E(e,a,l,z,V,E){return(0,r.wg)(),(0,r.iD)("div",o,[(0,r._)("div",m,[(0,r._)("div",i,[(0,r._)("div",s,[(0,r._)("div",d,[c,u,(0,r._)("form",{onSubmit:a[5]||(a[5]=(0,n.iM)(((...e)=>z.store&&z.store(...e)),["prevent"]))},[(0,r._)("div",p,[b,(0,r.Uk)(),(0,r.wy)((0,r._)("input",{type:"text",class:"form-control","onUpdate:modelValue":a[0]||(a[0]=e=>z.member.nama=e),placeholder:"Masukkan Nama Member"},null,512),[[n.nr,z.member.nama]]),z.validation.nama?((0,r.wg)(),(0,r.iD)("div",_,(0,t.zw)(z.validation.nama[0]),1)):(0,r.kq)("",!0)]),(0,r._)("div",g,[v,(0,r.wy)((0,r._)("input",{class:"form-control","onUpdate:modelValue":a[1]||(a[1]=e=>z.member.email=e),placeholder:"Masukkan email member"},null,512),[[n.nr,z.member.email]]),z.validation.email?((0,r.wg)(),(0,r.iD)("div",f,(0,t.zw)(z.validation.email[0]),1)):(0,r.kq)("",!0)]),(0,r._)("div",k,[h,(0,r.wy)((0,r._)("input",{class:"form-control",type:"number","onUpdate:modelValue":a[2]||(a[2]=e=>z.member.no_telp=e),placeholder:"Masukkan nomor telepon"},null,512),[[n.nr,z.member.no_telp]]),z.validation.no_telp?((0,r.wg)(),(0,r.iD)("div",w,(0,t.zw)(z.validation.no_telp[0]),1)):(0,r.kq)("",!0)]),(0,r._)("div",y,[M,(0,r.wy)((0,r._)("input",{type:"date",class:"form-control","onUpdate:modelValue":a[3]||(a[3]=e=>z.member.tgl_lahir=e),placeholder:"Masukkan tanggal lahir"},null,512),[[n.nr,z.member.tgl_lahir]]),z.validation.tgl_lahir?((0,r.wg)(),(0,r.iD)("div",D,(0,t.zw)(z.validation.tgl_lahir[0]),1)):(0,r.kq)("",!0)]),(0,r._)("div",q,[U,(0,r.wy)((0,r._)("select",{class:"form-select","aria-label":"Default select example","onUpdate:modelValue":a[4]||(a[4]=e=>z.member.gender=e)},N,512),[[n.bM,z.member.gender]]),z.validation.gender?((0,r.wg)(),(0,r.iD)("div",x,(0,t.zw)(z.validation.gender[0]),1)):(0,r.kq)("",!0)]),A],32)])])])])])}l(7658);var L=l(4870),P=l(678),T=l(4161),B={setup(){const e=(0,L.qj)({nama:"",email:"",no_telp:"",tgl_lahir:"",gender:""}),a=(0,L.iH)([]),l=(0,P.tv)();function r(){let r=e.nama,n=e.email,t=e.no_telp,o=e.tgl_lahir,m=e.gender;T.Z.post("https://api-gofit.200710947.com/api/member",{nama:r,email:n,no_telp:t,tgl_lahir:o,gender:m}).then((()=>{l.push({name:"member.index"})})).catch((e=>{a.value=e.response.data}))}return{member:e,validation:a,router:l,store:r}}},C=l(89);const H=(0,C.Z)(B,[["render",E]]);var S=H}}]);
//# sourceMappingURL=608.c1ad7db9.js.map