(this["webpackJsonpgosling-react"]=this["webpackJsonpgosling-react"]||[]).push([[0],{215:function(e,t){},218:function(e,t){},229:function(e,t,n){},230:function(e,t,n){"use strict";n.r(t);var a=n(5),i=n.n(a),l=n(90),r=n.n(l),o=n(130),s=n(13),c=n(82),d=n.p+"static/media/segdup.25c7c485.txt";var p=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(c.a,{spec:{linkingId:"view1",xDomain:{chromosome:"chr5",interval:[0,8e7]},tracks:[{alignment:"overlay",data:{url:d,type:"csv",headerNames:["id","chr","p1","p2"],chromosomePrefix:"hs",chromosomeField:"chr",genomicFields:["p1","p2"],separator:" ",longToWideId:"id",sampleLength:2e3},dataTransform:[{type:"filter",field:"chr",oneOf:["hs5","hs4","hs6"]},{type:"filter",field:"chr_2",oneOf:["hs5","hs4","hs6"]}],tracks:[{mark:"rect"},{mark:"brush",x:{linkingId:"view2"},strokeWidth:{value:0}}],x:{field:"p1",type:"genomic"},xe:{field:"p2",type:"genomic"},row:{field:"chr_2",type:"nominal",domain:["hs5","hs4","hs6"]},color:{field:"chr_2",type:"nominal",domain:["hs5","hs4","hs6"],range:["#62AAD7","#D1A74F","#6CB74C"]},stroke:{field:"chr_2",type:"nominal",domain:["hs5","hs4","hs6"],range:["#62AAD7","#D1A74F","#6CB74C"]},strokeWidth:{value:2},opacity:{value:.4},style:{outline:"black",outlineWidth:1},width:800,height:80}]},experimental:{reactive:!0}}))},m=n(1),f=n(6),g=n(271),y=n.p+"static/media/enhancers_13celltypes_enhancer_main.c14a5c6c.csv",h=n.p+"static/media/astrocyte-ENCODE_arcs_enhancer_main.36ea2dc6.csv";function u(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null}var v={$schema:"https://vega.github.io/schema/vega-lite/v5.json",height:60,width:150,data:{values:[{a:"C",b:2},{a:"C",b:7},{a:"C",b:4},{a:"D",b:1},{a:"D",b:2},{a:"D",b:6},{a:"E",b:8},{a:"E",b:4},{a:"E",b:7}]},mark:"bar",encoding:{y:{field:"a",type:"nominal"},x:{aggregate:"average",field:"b",type:"quantitative",axis:{title:"Average of b"}}}},x={$schema:"https://vega.github.io/schema/vega-lite/v5.json",height:100,width:150,data:{values:[{a:"C",b:2},{a:"C",b:7},{a:"C",b:4},{a:"D",b:1},{a:"D",b:2},{a:"D",b:6},{a:"E",b:8},{a:"E",b:4},{a:"E",b:7}]},mark:"bar",encoding:{y:{field:"a",type:"nominal"},x:{aggregate:"average",field:"b",type:"quantitative",axis:{title:"Average of b"}}}};var k=function(){var e=Object(a.useRef)(),t=Object(a.useState)(),n=Object(f.a)(t,2),l=(n[0],n[1]),r=Object(a.useState)([]),o=Object(f.a)(r,2),s=o[0],d=o[1];Object(a.useEffect)((function(){if(e.current)return e.current.api.subscribe("click",(function(e,t){var n=t.genomicPosition,a=t.data;window.alert(a[0].gene),window.location.assign("https://www.hgc.jp/~weihang/temp_jump_to_gene.html?enhancer=IL17RA@rank3"),l("".concat(n.chromosome,":").concat(n.position)),d(t.data)})),e.current.api.subscribe("rangeSelect",(function(e,t){if(t&&t.genomicRange){var n=t.genomicRange;2===n.length&&l("".concat(n[0].chromosome,":").concat(n[0].position,"-").concat(n[1].chromosome,":").concat(n[1].position)),d(t.data.length>10?t.data.slice(0,10):t.data)}else l("N/A"),d([])})),function(){e.current.api.unsubscribe("click"),e.current.api.unsubscribe("rangeSelect")}}),[e]);var p=window.location.href,k=p.includes("gene"),b=.75*screen.width;if(k){var E=u("geneID"),w=u("chr"),I=u("range1"),O=u("range2"),F=u("ensem"),S=u("rangeinput"),T=u("celltypes").split(","),_="chr"+w+":"+I+"~"+O+"(GRCh38/hg38)",D=[],C={alignment:"overlay",assembly:"hg38",title:"Gene annotation",linkingId:"view1",xDomain:{chromosome:"chr"+w,interval:[parseInt(I)-parseInt(S),parseInt(O)+parseInt(S)]},data:{url:"https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",type:"beddb",genomicFields:[{index:1,name:"start"},{index:2,name:"end"}],valueFields:[{index:5,name:"strand",type:"nominal"},{index:3,name:"name",type:"nominal"}],exonIntervalFields:[{index:12,name:"start"},{index:13,name:"end"}]},tracks:[{experimental:{mouseEvents:!0},dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["+"]}],mark:"triangleRight",x:{field:"end",type:"genomic",axis:"top"},size:{value:15}},{experimental:{mouseEvents:!0},dataTransform:[{type:"filter",field:"type",oneOf:["gene"]}],mark:"text",text:{field:"name",type:"nominal"},x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},style:{dy:-15}},{experimental:{mouseEvents:!0},dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["-"]}],mark:"triangleLeft",x:{field:"start",type:"genomic"},size:{value:15},style:{align:"right"}},{experimental:{mouseEvents:!0},dataTransform:[{type:"filter",field:"type",oneOf:["exon"]}],mark:"rect",x:{field:"start",type:"genomic"},size:{value:15},xe:{field:"end",type:"genomic"}},{experimental:{mouseEvents:!0},dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["+"]}],mark:"rule",x:{field:"start",type:"genomic"},strokeWidth:{value:3},xe:{field:"end",type:"genomic"},style:{linePattern:{type:"triangleRight",size:5}}},{experimental:{mouseEvents:!0},dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["-"]}],mark:"rule",x:{field:"start",type:"genomic"},strokeWidth:{value:3},xe:{field:"end",type:"genomic"},style:{linePattern:{type:"triangleLeft",size:5}}}],row:{field:"strand",type:"nominal",domain:["+","-"]},color:{field:"strand",type:"nominal",domain:["+","-"],range:["#7585FF","#FF8A85"]},visibility:[{operation:"less-than",measure:"width",threshold:"|xe-x|",transitionPadding:10,target:"mark"}],tooltip:[{field:"name",type:"quantitative",alt:"Gene(exon)"},{field:"strand",type:"quantitative",alt:"Strand"},{field:"start",type:"genomic",alt:"Start Position"},{field:"end",type:"genomic",alt:"End Position"}],opacity:{value:.8},width:b,height:100};D.push(C);var z,P=Object(m.a)(T);try{for(P.s();!(z=P.n()).done;){var A=z.value,R={alignment:":overlay",assembly:"hg38",linkingId:"view1",xDomain:{chromosome:"chr"+w,interval:[parseInt(I)-parseInt(S),parseInt(O)+parseInt(S)]},tracks:[{alignment:"overlay",title:"Active enhancers",experimental:{mouseEvents:!0},data:{url:"https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/enhancers_region_13celltypes.csv",type:"csv",chromosomeField:"chr",genomicFields:["start","end"]},tracks:[{mark:"rect",dataTransform:[{type:"filter",field:"celltype_gene",oneOf:[A+"@"+E],not:!0}],color:{field:"celltype_gene",type:"nominal",value:"black"},size:{value:60}},{mark:"rect",dataTransform:[{type:"filter",field:"celltype_gene",oneOf:[A+"@"+E]}],size:{value:60},color:{value:"#ff0000"},stroke:{value:"red"}}],tooltip:[{field:"enhancer_id",type:"quantitative",alt:"Enhancer ID"},{field:"start",type:"genomic",alt:"Start Position"},{field:"end",type:"genomic",alt:"End Position"}],x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},color:{field:"chr",type:"nominal",range:["black"]},stroke:{field:"chr",type:"nominal",range:["black"]},strokeWidth:{value:1},style:{background:"#F8F8F8",outline:"black",legendTitle:"left"},width:b,height:15},{alignment:"overlay",title:A,id:"heatmap-track",data:{url:"https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/"+A+"_arcs.csv",type:"csv",chromosomeField:"chr",genomicFields:["center","TSS"]},dataTransform:[{type:"filter",field:"gene",oneOf:[E]}],tracks:[{mark:"withinLink"}],tooltip:[{field:"gene",type:"quantitative",alt:"Connected  Gene"},{field:"score",type:"quantitative",alt:"ABC score (0~1)",format:".4"},{field:"TSS",type:"genomic",alt:"Gene TSS"},{field:"center",type:"genomic",alt:"Enhancer Region Center"}],x:{field:"TSS",type:"genomic",linkingId:"view1"},xe:{field:"center",type:"genomic"},color:{field:"score",type:"quantitative",legend:!0,range:"pink"},stroke:{value:"red"},strokeWidth:{value:1},opacity:{value:1},style:{background:"#F8F8F8",outline:"black",legendTitle:"left"},width:b,height:60}]};D.push(R)}}catch(G){P.e(G)}finally{P.f()}return i.a.createElement("div",null,null,i.a.createElement("div",{id:"info",style:{backgroundColor:"salmon",height:"40px",width:screen.width,position:"fixed",zIndex:"10",padding:"10px"}},i.a.createElement("b",{style:{fontSize:"25px",left:"10px",top:"0px",position:"absolute"}},"Checked Gene: "+E),i.a.createElement("b",{style:{fontSize:"25px",left:screen.width/4,top:"0px",position:"absolute"}},"Ensembl: "+F),i.a.createElement("b",{style:{fontSize:"25px",left:2.1*screen.width/4,top:"0px",position:"absolute"}},"Locus: "+_)),i.a.createElement(c.a,{ref:e,spec:{title:"Results",style:{linkStyle:"elliptical"},views:D},experimental:{reactive:!0}}),(s.length,null),i.a.createElement("div",{style:{position:"absolute",left:.8*screen.width,top:"250px"}},i.a.createElement(g.a,{spec:v})))}var q=p.match(/=(\S*)@chr/)[1];w=p.match(/@chr(\S*)range1/)[1],I=p.match(/range1@(\S*)range2@/)[1],O=p.match(/range2@(\S*)@rangeinput/)[1],S=p.match(/@rangeinput(\S*)/)[1],_=w+":"+I+"~"+O+"(GRCh38/hg38)",D=[];var j={alignment:":overlay",assembly:"hg38",linkingId:"view1",xDomain:{chromosome:w,interval:[parseInt(I)-parseInt(S)/2,parseInt(O)+parseInt(S)/2]},tracks:[{alignment:"overlay",title:"Enhancer annotation",data:{url:y,type:"csv",chromosomeField:"chr",genomicFields:["p1","p2"]},tracks:[{mark:"rect",dataTransform:[{type:"filter",field:"enhancerID",oneOf:[q],not:!0}],color:{field:"enhancerID",type:"nominal",value:"black"},size:{value:60}},{mark:"rect",dataTransform:[{type:"filter",field:"enhancerID",oneOf:[q]}],size:{value:60},color:{value:"#ff0000"},stroke:{value:"red"}}],tooltip:[{field:"enhancerID",type:"quantitative",alt:"Enhancer ID"},{field:"p1",type:"genomic",alt:"Start Position"},{field:"p2",type:"genomic",alt:"End Position"}],x:{field:"p1",type:"genomic"},xe:{field:"p2",type:"genomic"},color:{field:"chr",type:"nominal",range:["black"]},stroke:{field:"chr",type:"nominal",range:["black"]},strokeWidth:{value:1},width:b,height:100}]},W={alignment:":overlay",assembly:"hg38",linkingId:"view1",xDomain:{chromosome:w,interval:[parseInt(I)-parseInt(S)/2,parseInt(O)+parseInt(S)/2]},tracks:[{alignment:"overlay",assembly:"hg38",title:"Gene annotation",linkingId:"view1",xDomain:{chromosome:w,interval:[parseInt(I)-parseInt(S)/2,parseInt(O)+parseInt(S)/2]},data:{url:"https://higlass.io/api/v1/tileset_info/?d=P0PLbQMwTYGy-5uPIQid7A",type:"beddb",genomicFields:[{index:1,name:"start"},{index:2,name:"end"}],valueFields:[{index:5,name:"strand",type:"nominal"},{index:3,name:"name",type:"nominal"}],exonIntervalFields:[{index:12,name:"start"},{index:13,name:"end"}]},tracks:[{dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["+"]}],mark:"triangleRight",x:{field:"end",type:"genomic",axis:"top"},size:{value:5}},{dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["+"]}],mark:"text",text:{field:"name",type:"nominal"},x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},style:{dy:-8}},{dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["-"]}],mark:"text",text:{field:"name",type:"nominal"},x:{field:"start",type:"genomic"},xe:{field:"end",type:"genomic"},style:{dy:8}},{dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["-"]}],mark:"triangleLeft",x:{field:"start",type:"genomic"},size:{value:5},style:{align:"right"}},{dataTransform:[{type:"filter",field:"type",oneOf:["exon"]}],mark:"rect",x:{field:"start",type:"genomic"},size:{value:5},xe:{field:"end",type:"genomic"}},{dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["+"]}],mark:"rule",x:{field:"start",type:"genomic"},strokeWidth:{value:1},xe:{field:"end",type:"genomic"},style:{linePattern:{type:"triangleRight",size:2}}},{dataTransform:[{type:"filter",field:"type",oneOf:["gene"]},{type:"filter",field:"strand",oneOf:["-"]}],mark:"rule",x:{field:"start",type:"genomic"},strokeWidth:{value:1},xe:{field:"end",type:"genomic"},style:{linePattern:{type:"triangleLeft",size:2}}}],row:{field:"strand",type:"nominal",domain:["+","-"]},color:{field:"strand",type:"nominal",domain:["+","-"],range:["#7585FF","#FF8A85"]},visibility:[{operation:"less-than",measure:"width",threshold:"|xe-x|",transitionPadding:10,target:"mark"}],tooltip:[{field:"name",type:"quantitative",alt:"Gene(exon)"},{field:"strand",type:"quantitative",alt:"Strand"},{field:"start",type:"genomic",alt:"Start Position"},{field:"end",type:"genomic",alt:"End Position"}],opacity:{value:.8},width:b,height:50,style:{background:"#F8F8F8",outline:"black",legendTitle:"left",mouseOver:{color:"red"}}},{alignment:"overlay",title:"Astrocyte-ENCODE",data:{url:h,type:"csv",chromosomeField:"chr",genomicFields:["center","TSS"]},dataTransform:[{type:"filter",field:"enhancerID",oneOf:[q]}],tracks:[{mark:"withinLink"}],tooltip:[{field:"enhancerID",type:"quantitative",alt:"Connected  Enhancer"},{field:"score",type:"quantitative",alt:"ABC score (0~1)",format:".4"},{field:"TSS",type:"genomic",alt:"Gene TSS"},{field:"center",type:"genomic",alt:"Enhancer Region Center"}],x:{field:"TSS",type:"genomic",linkingId:"view1"},xe:{field:"center",type:"genomic"},stroke:{value:"red"},strokeWidth:{value:1},opacity:{value:1},style:{background:"#F8F8F8",outline:"black",legendTitle:"left"},width:b,height:60}]};return D.push(j),D.push(W),i.a.createElement("div",null,null,i.a.createElement("div",{id:"info",style:{backgroundColor:"green",height:"40px",width:screen.width,position:"fixed",zIndex:"10",padding:"10px"}},i.a.createElement("b",{style:{fontSize:"25px",left:"10px",top:"0px",position:"absolute"}},"Checked Enhancer: "+q),i.a.createElement("b",{style:{fontSize:"25px",left:2.1*screen.width/4,top:"0px",position:"absolute"}},"Location: "+_)),i.a.createElement(c.a,{ref:e,spec:{title:"Results",style:{linkStyle:"elliptical"},views:D},experimental:{reactive:!0}}),(s.length,null),i.a.createElement("div",{style:{position:"absolute",left:.8*screen.width,top:"250px"}},i.a.createElement(g.a,{spec:x})))},b={Simple:a.createElement(p,null),MouseEvents:a.createElement(k,null)};var E=function(){return a.createElement("div",{className:"flex flex-row h-full w-full"},a.createElement("div",{className:"flex-none border-r-[1px]"}),a.createElement("div",{className:""},a.createElement(s.c,null,a.createElement(s.a,{path:"/",element:b.MouseEvents}),Object.entries(b).map((function(e){return a.createElement(s.a,{key:e[0],path:"/".concat(e[0].replace(" ","_")),element:e[1]})})))))};n(229);r.a.render(i.a.createElement(o.a,null,i.a.createElement(E,null)),document.getElementById("root"))}},[[230,1,2]]]);
//# sourceMappingURL=main.bf8f29a3.chunk.js.map