"use strict";(self["webpackChunkweb_10947"]=self["webpackChunkweb_10947"]||[]).push([[427],{9427:function(t,a,l){l.r(a),l.d(a,{default:function(){return z}});var n=l(3396),e=l(7139);const s=(0,n._)("div",{class:"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"},[(0,n._)("h1",{class:"h2"},"Dashboard")],-1),i={class:"container mt-5"},o={class:"row"},r={class:"col-md-12"},c={class:"card border-0 rounded shadow"},d={class:"card-body"},u={class:"table table-striped table-bordered mt-4"},_=(0,n._)("thead",{class:"thead-dark"},[(0,n._)("tr",null,[(0,n._)("th",{scope:"col"},"ID"),(0,n._)("th",{scope:"col"},"INSTRUKTUR"),(0,n._)("th",{scope:"col"},"JADWAL"),(0,n._)("th",{scope:"col"},"INSTRUKTUR PENGGANTI"),(0,n._)("th",{scope:"col"},"KETERANGAN"),(0,n._)("th",{scope:"col"},"TANGGAL MENGAJUKAN"),(0,n._)("th",{scope:"col"},"STATUS")])],-1),p=["onClick"];function h(t,a,l,h,w,b){return(0,n.wg)(),(0,n.iD)(n.HY,null,[s,(0,n._)("div",i,[(0,n._)("div",o,[(0,n._)("div",r,[(0,n._)("div",c,[(0,n._)("div",d,[(0,n._)("table",u,[_,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(h.izins,((t,a)=>((0,n.wg)(),(0,n.iD)("tr",{key:a},[(0,n._)("td",null,(0,e.zw)(t.id_izin),1),(0,n._)("td",null,(0,e.zw)(t.instruktur.nama),1),(0,n._)("td",null,(0,e.zw)(t.jadwal_harian.tanggal)+"/"+(0,e.zw)(t.jadwal_harian.jam_mulai)+"-"+(0,e.zw)(t.jadwal_harian.jam_selesai)+"/"+(0,e.zw)(t.jadwal_harian.id_kelas),1),(0,n._)("td",null,(0,e.zw)(t.id_instruktur_pengganti),1),(0,n._)("td",null,(0,e.zw)(t.teterangan),1),(0,n._)("td",null,(0,e.zw)(t.tgl_mengajukan),1),(0,n._)("td",null,(0,e.zw)(t.status),1),(0,n._)("td",null,[(0,n._)("button",{class:"btn btn-sm btn-primary ml-1",onClick:a=>h.konfirmasi(t.id_izin)},"KONFIRMASi",8,p)])])))),128))])])])])])])])],64)}var w=l(4161),b=l(4870),m={setup(){let t=(0,b.iH)([]);function a(a){w.Z.put(`https://api-gofit.200710947.com/api/izin_instruktur/${a}`).then((()=>{t.value.splice(t.value.indexOf(a),1),location.reload()})).catch((t=>{console.log(t.response.data)}))}return(0,n.bv)((()=>{w.Z.post("https://api-gofit.200710947.com/api/izin_instruktur/by_status").then((a=>{t.value=a.data.data})).catch((t=>{console.log(t.response.data)}))})),{izins:t,konfirmasi:a}}},f=l(89);const k=(0,f.Z)(m,[["render",h]]);var z=k}}]);
//# sourceMappingURL=427.767f8a9d.js.map