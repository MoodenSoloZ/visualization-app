import React, { useEffect, useRef, useState } from 'react';
import { GoslingComponent } from 'gosling.js';


const enhancer_region='https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancers_region_13celltypes.csv'

const celltype1_gm='https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/adrenal_gland_fetal-ENCODE_arcs.csv'
const celltype2_gm= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/adrenal_gland-ENCODE_arcs.csv'
const celltype3_gm= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/astrocyte-ENCODE_arcs.csv'
const celltype4_gm='https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/B_cell-ENCODE_arcs.csv'
const celltype5_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/bipolar_neuron_from_iPSC-ENCODE_arcs.csv'
const celltype6_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/CD4-positive_helper_T_cell-ENCODE_arcs.csv'
const celltype7_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/CD8-positive_alpha-beta_T_cell-ENCODE_arcs.csv'
const celltype8_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/CD14-positive_monocytes-Roadmap_arcs.csv'
const celltype9_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/CD56-positive_natural_killer_cells-Roadmap_arcs.csv'
const celltype10_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/H1_Derived_Mesenchymal_Stem_Cells-Roadmap_arcs.csv'
const celltype11_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/skeletal_muscle_myoblast-Roadmap_arcs.csv'
const celltype12_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/spinal_cord_fetal-ENCODE_arcs.csv'
const celltype13_gm=  'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/transverse_colon-ENCODE_arcs.csv'

const celltype1_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/adrenal_gland_fetal-ENCODE_arcs.csv'
const celltype2_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/adrenal_gland-ENCODE_arcs.csv'
const celltype3_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/astrocyte-ENCODE_arcs.csv'
const celltype4_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/B_cell-ENCODE_arcs.csv'
const celltype5_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/bipolar_neuron_from_iPSC-ENCODE_arcs.csv'
const celltype6_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/CD4-positive_helper_T_cell-ENCODE_arcs.csv'
const celltype7_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/CD8-positive_alpha-beta_T_cell-ENCODE_arcs.csv'
const celltype8_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/CD14-positive_monocytes-Roadmap_arcs.csv'
const celltype9_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/CD56-positive_natural_killer_cells-Roadmap_arcs.csv'
const celltype10_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/H1_Derived_Mesenchymal_Stem_Cells-Roadmap_arcs.csv'
const celltype11_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/skeletal_muscle_myoblast-Roadmap_arcs.csv'
const celltype12_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/spinal_cord_fetal-ENCODE_arcs.csv'
const celltype13_em= 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/enhancer_main/transverse_colon-ENCODE_arcs.csv'

const dic_gm={
	'adrenal_gland_fetal-ENCODE':celltype1_gm,
	'adrenal_gland-ENCODE':celltype2_gm,
	'astrocyte-ENCODE':celltype3_gm,
	'B_cell-ENCODE':celltype4_gm,
	'bipolar_neuron_from_iPSC-ENCODE':celltype5_gm,
	'CD4-positive_helper_T_cell-ENCODE':celltype6_gm,
	'CD8-positive_alpha-beta_T_cell-ENCODE':celltype7_gm,
	'CD14-positive_monocytes-Roadmap':celltype8_gm,
	'CD56-positive_natural_killer_cells-Roadmap':celltype9_gm,
	'H1_Derived_Mesenchymal_Stem_Cells-Roadmap':celltype10_gm,
	'skeletal_muscle_myoblast-Roadmap':celltype11_gm,
	'spinal_cord_fetal-ENCODE':celltype12_gm,
	'transverse_colon-ENCODE':celltype13_gm
}

const dic_em={
	'adrenal_gland_fetal-ENCODE':celltype1_em,
	'adrenal_gland-ENCODE':celltype2_em,
	'astrocyte-ENCODE':celltype3_em,
	'B_cell-ENCODE':celltype4_em,
	'bipolar_neuron_from_iPSC-ENCODE':celltype5_em,
	'CD4-positive_helper_T_cell-ENCODE':celltype6_em,
	'CD8-positive_alpha-beta_T_cell-ENCODE':celltype7_em,
	'CD14-positive_monocytes-Roadmap':celltype8_em,
	'CD56-positive_natural_killer_cells-Roadmap':celltype9_em,
	'H1_Derived_Mesenchymal_Stem_Cells-Roadmap':celltype10_em,
	'skeletal_muscle_myoblast-Roadmap':celltype11_em,
	'spinal_cord_fetal-ENCODE':celltype12_em,
	'transverse_colon-ENCODE':celltype13_em
}





	


function GetQueryString(name)
{
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

function MouseEvents() {

	const gosRef = useRef();
	const [position, setPosition] = useState();
	const [data, setData] = useState([]);

	useEffect(() => {
		if(!gosRef.current) return;

		gosRef.current.api.subscribe('click', (_, eventData) => {
			const { genomicPosition: p } = eventData;
			const { data: d } = eventData;
			//window.alert(d[0].enhancer_id);

			//window.location.assign('https://www.hgc.jp/~weihang/temp_jump_to_gene.html?enhancer='+d[0].enhancer_id)
			var celltypes_to_enhancer=GetQueryString('celltypes');
			window.location.assign('https://www.hgc.jp/~weihang/temp_jump_to_gene.html?enhancerID='+d[0].enhancer_id+'&'+'celltypes='+celltypes_to_enhancer)
			setPosition(`${p.chromosome}:${p.position}`);
			setData(eventData.data);
		});

		gosRef.current.api.subscribe('rangeSelect', (_, eventData) => {
			if(!eventData || !eventData.genomicRange) {
				// range selection cleared
				setPosition('N/A');
				setData([]);
			} else {
				const { genomicRange: p } = eventData;
				if(p.length === 2) setPosition(`${p[0].chromosome}:${p[0].position}-${p[1].chromosome}:${p[1].position}`);
				setData(eventData.data.length > 10 ? eventData.data.slice(0, 10) : eventData.data);
			}
		});

		return () => {
			gosRef.current.api.unsubscribe('click');
			gosRef.current.api.unsubscribe('rangeSelect');
		}
	}, [gosRef]);

	var url = window.location.href;  
	var ifgene = url.includes('gene');
	const plotwidth=screen.width*0.9
	//window.alert(ifgene);
	if (ifgene){
		
		//var gene=url.match(/=(\S*)@chr/)[1];
		//var chr = url.match(/@chr(\S*)range1/)[1];
		//var range1= url.match(/range1@(\S*)range2@/)[1];
		//var range2= url.match(/range2@(\S*)@ensem/)[1];
		//var enseID= url.match(/@ensem(\S*)@rangeinput/)[1];
		//var range_input= url.match(/@rangeinput(\S*)/)[1];

		var gene=GetQueryString('geneID');
		var chr=GetQueryString('chr');
		var range1=GetQueryString('range1');
		var range2=GetQueryString('range2');
		var enseID=GetQueryString('ensem');
		var range_input=GetQueryString('rangeinput');
		var celltype_list=GetQueryString('celltypes').split(',');
		//window.alert(celltype_list)

		//var celltypes=GetQueryString('celltypes');
		//window.alert(enseID);
		var locus='chr'+chr+':'+range1+'~'+range2+'(GRCh38/hg38)'
		//style='background-color: #cfc ; padding: 10px; border: 1px solid green;height: 40px;width: 1600px; position: fixed; top:0px; left: 0px;z-index: 10'>
		// create one array containing the gene annotation and cell type specific tracks 
		var cell_type_array=[];
		const gene_annotation = {
			alignment: 'overlay',
			assembly: 'hg38',
			title: 'Gene annotation',
			linkingId: 'view1',
			xDomain: {chromosome: 'chr'+chr, interval: [parseInt(range1)-parseInt(range_input), parseInt(range2)+parseInt(range_input)]},
			data: {
				//url: 'https://higlass.io/api/v1/tileset_info/?d=P0PLbQMwTYGy-5uPIQid7A',
				url: 'https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation',
				type: 'beddb',
				genomicFields: [
					{index: 1, name: 'start'},
					{index: 2, name: 'end'}
				],
				valueFields: [
					{index: 5, name: 'strand', type: 'nominal'},
					{index: 3, name: 'name', type: 'nominal'}
				],
				exonIntervalFields: [
					{index: 12, name: 'start'},
					{index: 13, name: 'end'}
				]
			},
			tracks: [
				{
					experimental: { mouseEvents: true },
					dataTransform: [
						{type: 'filter', field: 'type', oneOf: ['gene']},
						{type: 'filter', field: 'strand', oneOf: ['+']}
					],
					mark: 'triangleRight',
					x: {field: 'end', type: 'genomic', axis: 'top'},
					size: {value: 15},
				},
				{
					experimental: { mouseEvents: true },
					dataTransform: [
						{type: 'filter', field: 'type', oneOf: ['gene']}
					],
					mark: 'text',
					text: {field: 'name', type: 'nominal'},
					x: {field: 'start', type: 'genomic'},
					xe: {field: 'end', type: 'genomic'},
					style: {dy: -15}
				},
				{
					experimental: { mouseEvents: true },
					dataTransform: [
						{type: 'filter', field: 'type', oneOf: ['gene']},
						{type: 'filter', field: 'strand', oneOf: ['-']}
					],
					mark: 'triangleLeft',
					x: {field: 'start', type: 'genomic'},
					size: {value: 15},
					style: {align: 'right'}
				},
				{
					experimental: { mouseEvents: true },
					dataTransform: [
						{type: 'filter', field: 'type', oneOf: ['exon']}
					],
					mark: 'rect',
					x: {field: 'start', type: 'genomic'},
					size: {value: 15},
					xe: {field: 'end', type: 'genomic'}
				},
				{
					experimental: { mouseEvents: true },
					dataTransform: [
						{type: 'filter', field: 'type', oneOf: ['gene']},
						{type: 'filter', field: 'strand', oneOf: ['+']}
					],
					mark: 'rule',
					x: {field: 'start', type: 'genomic'},
					strokeWidth: {value: 3},
					xe: {field: 'end', type: 'genomic'},
					style: {linePattern: {type: 'triangleRight', size: 5}}
				},
				{
					experimental: { mouseEvents: true },
					dataTransform: [
						{type: 'filter', field: 'type', oneOf: ['gene']},
						{type: 'filter', field: 'strand', oneOf: ['-']}
					],
					mark: 'rule',
					x: {field: 'start', type: 'genomic'},
					strokeWidth: {value: 3},
					xe: {field: 'end', type: 'genomic'},
					style: {linePattern: {type: 'triangleLeft', size: 5}}
				}
			],
			row: {field: 'strand', type: 'nominal', domain: ['+', '-']},
			color: {
				field: 'strand',
				type: 'nominal',
				domain: ['+', '-'],
				range: ['#7585FF', '#FF8A85']
			},
			visibility: [
				{
					operation: 'less-than',
					measure: 'width',
					threshold: '|xe-x|',
					transitionPadding: 10,
					target: 'mark'
				}
			],
			tooltip: [
				{
					field: 'name',
					type: 'quantitative',
					alt: 'Gene(exon)',
				},
				{
					field: 'strand',
					type: 'quantitative',
					alt: 'Strand',
				},
				{field: 'start', type: 'genomic', alt: 'Start Position'},
				{field: 'end', type: 'genomic', alt: 'End Position'},
			],
			opacity: {value: 0.8},
			width: plotwidth,
			height: 100
		};
		cell_type_array.push(gene_annotation);
		for (const celltype of celltype_list){
			//window.alert(celltype)
			var basic_cell_type_tracks={
				alignment:':overlay',
				assembly: 'hg38',
				linkingId: 'view1',
				xDomain: {chromosome: 'chr'+chr, interval: [parseInt(range1)-parseInt(range_input), parseInt(range2)+parseInt(range_input)]},
				tracks: [
					{
						alignment: 'overlay',
						title: 'Active enhancers',
						experimental: { mouseEvents: true },
						data: {
							//url:'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/enhancers_region_13celltypes.csv',
							url: enhancer_region,
							type: 'csv',
							chromosomeField: 'chr',
							genomicFields: ['start', 'end']
						},
						tracks: [
							{
								mark: 'rect',
								dataTransform: [
									{
										type: 'filter',
										field: 'celltype_gene',
										oneOf: [celltype+'@'+gene],
										not: true
									},
								],
								color: {
									field: 'celltype_gene',
									type: 'nominal',
									value: 'black'
								},
								size: {value: 60},
							},
							{
								mark: 'rect',
								dataTransform: [
									{
										type: 'filter', field: 'celltype_gene', oneOf: [celltype+'@'+gene]
									}
								],
								size: {value: 60},
								color: {value: '#ff0000'},
								stroke:{value:'red'},
							},
						],
						tooltip: [
							{
								field: 'enhancer_id',
								type: 'quantitative',
								alt: 'Enhancer ID',
							},
							{field: 'start', type: 'genomic', alt: 'Start Position'},
							{field: 'end', type: 'genomic', alt: 'End Position'},
						],
						x: {field: 'start', type: 'genomic'},
						xe: {field: 'end', type: 'genomic'},
						color: {
							field: 'chr',
							type: 'nominal',
							range: ['black']
						},
						stroke: {
							field: 'chr',
							type: 'nominal',
							range: ['black']
						},
						strokeWidth: {value: 1},
						style: {
							background: '#F8F8F8',outline: 'black',legendTitle:'left'
						},
						width: plotwidth,
						height: 15
					},
	
					{
						alignment: 'overlay',
						title: celltype,
						data: {
							//url:'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/13celltypes_arcs/gene_main/'+celltype+'_arcs.csv',
							url: dic_gm[celltype],
							type: 'csv',
							chromosomeField: 'chr',
							genomicFields: ['center', 'TSS']
						},
						dataTransform: [
							{type: 'filter', field: 'gene', oneOf: [gene]},
						],
						tracks: [
							{mark: 'withinLink'},
						],
						tooltip: [
							{
								field: 'gene',
								type: 'quantitative',
								alt: 'Connected  Gene',
							},
							{
								field: 'score',
								type: 'quantitative',
								alt: 'ABC score (0~1)',
								format: '.4'
							},
							{field: 'TSS', type: 'genomic', alt: 'Gene TSS'},
							{field: 'center', type: 'genomic', alt: 'Enhancer Region Center'},
						],
						x: {field: 'TSS', type: 'genomic', linkingId: 'view1'},
						xe: {field: 'center', type: 'genomic'},
						color: { field: 'score', type: 'quantitative'},
						stroke: {value: 'red'},
						strokeWidth: {value: 1},
						opacity: {value: 1},
						style: {background: '#F8F8F8',outline: 'black',legendTitle:'left'},
						width: plotwidth,
						height: 60
					}
				]
			};
			cell_type_array.push(basic_cell_type_tracks);
		}

		//const cell_type_name = ['astrocyte-ENCODE@']
		//for (const element of cell_type_name){
		//	const new_cell_type_track = Object.create(basic_cell_type_tracks);
		//	new_cell_type_track.tracks[0].tracks[0].dataTransform[0].oneOf=[element+gene];
		//	new_cell_type_track.tracks[0].tracks[1].dataTransform[0].oneOf=[element+gene];
		//	cell_type_array.push(new_cell_type_track);
			
		//}

		return (
			<div>
				{position ? null: null}
				
				<div id='info' style={{backgroundColor: 'salmon',height: '40px',width: screen.width,position: 'fixed',zIndex:'10',padding:'10px'}}>
					<b style={{fontSize: '25px',left:'10px',top:'0px',position:'absolute'}}>{'Checked Gene:'+' '+gene}
					</b>
					<b style={{fontSize: '25px',left: screen.width/4,top:'0px',position:'absolute'}}>{'Ensembl:'+' '+enseID}
					</b>
					<b style={{fontSize: '25px',left: 2.1*screen.width/4,top:'0px',position:'absolute'}}>{'Locus:'+' '+locus}
					</b>
				</div>
				
				<GoslingComponent
					ref={gosRef}
					spec={{
						title: 'Results',
						style: {linkStyle: 'elliptical'},

						views: cell_type_array,
					}}
					experimental={{ reactive: true }}
				/>
				{data.length === 0 ? null : null}
				
			</div>
		);
	}


	else{
		var enhancer=GetQueryString('enhancerID');
		chr =GetQueryString('chr');
		range1= GetQueryString('range1');
		range2=GetQueryString('range2');
		range_input= GetQueryString('rangeinput');
		celltype_list=GetQueryString('celltypes').split(',');
		locus=chr+':'+range1+'~'+range2+'(GRCh38/hg38)'
		cell_type_array=[];
		const enhancer_annotation={
			alignment:':overlay',
			assembly: 'hg38',
			linkingId: 'view1',
			xDomain: {chromosome: chr, interval: [parseInt(range1)-parseInt(range_input)/2, parseInt(range2)+parseInt(range_input)/2]},
			tracks: [
				{
					alignment: 'overlay',
					title: 'Enhancer annotation',
					data: {
						url: enhancer_region,
						type: 'csv',
						chromosomeField: 'chr',
						genomicFields: ['start', 'end']
					},
					tracks: [
						{
							mark: 'rect',
							dataTransform: [
								{
									type: 'filter',
									field: 'enhancer_id',
									oneOf: [enhancer],
									not: true
								},
							],
							color: {
								field: 'enhancer_id',
								type: 'nominal',
								value: 'black'
							},
							size: {value: 60},
						},
						{
							mark: 'rect',
							dataTransform: [
								{type: 'filter', field: 'enhancer_id', oneOf: [enhancer]}
							],
							size: {value: 60},
							color: {value: '#ff0000'},
							stroke:{value:'red'},
						},
					],
					tooltip: [
						{
							field: 'enhancer_id',
							type: 'quantitative',
							alt: 'Enhancer ID',
						},
						{field: 'start', type: 'genomic', alt: 'Start Position'},
						{field: 'end', type: 'genomic', alt: 'End Position'},
					],
					x: {field: 'start', type: 'genomic'},
					xe: {field: 'end', type: 'genomic'},
					color: {
						field: 'chr',
						type: 'nominal',
						range: ['black']
					},
					stroke: {
						field: 'chr',
						type: 'nominal',
						range: ['black']
					},
					strokeWidth: {value: 1},
					width: plotwidth,
					height: 100
				},
			]			
		}
		cell_type_array.push(enhancer_annotation);

		for (const celltype of celltype_list){
			//window.alert(celltype)
			const basic_cell_type_tracks={
				alignment:':overlay',
				assembly: 'hg38',
				linkingId: 'view1',
				xDomain: {chromosome: chr, interval: [parseInt(range1)-parseInt(range_input)/2, parseInt(range2)+parseInt(range_input)/2]},
				tracks: [
					{
						alignment: 'overlay',
						assembly: 'hg38',
						title: 'Gene annotation',
						linkingId: 'view1',
						
						xDomain: {chromosome: chr, interval: [parseInt(range1)-parseInt(range_input)/2, parseInt(range2)+parseInt(range_input)/2]},
						data: {
							//url: 'https://higlass.io/api/v1/tileset_info/?d=P0PLbQMwTYGy-5uPIQid7A',
							url: 'https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation',
							type: 'beddb',
							genomicFields: [
								{index: 1, name: 'start'},
								{index: 2, name: 'end'}
							],
							valueFields: [
								{index: 5, name: 'strand', type: 'nominal'},
								{index: 3, name: 'name', type: 'nominal'}
							],
							exonIntervalFields: [
								{index: 12, name: 'start'},
								{index: 13, name: 'end'}
							]
						},
						tracks: [
							{
								dataTransform: [
									{type: 'filter', field: 'type', oneOf: ['gene']},
									{type: 'filter', field: 'strand', oneOf: ['+']}
								],
								mark: 'triangleRight',
								x: {field: 'end', type: 'genomic', axis: 'top'},
								size: {value: 5},
							},
							{
								dataTransform: [
									{type: 'filter', field: 'type', oneOf: ['gene']},
									{type: 'filter', field: 'strand', oneOf: ['+']}
								],
								mark: 'text',
								text: {field: 'name', type: 'nominal'},
								x: {field: 'start', type: 'genomic'},
								xe: {field: 'end', type: 'genomic'},
								style: {dy: -8}
							},
							{
								dataTransform: [
									{type: 'filter', field: 'type', oneOf: ['gene']},
									{type: 'filter', field: 'strand', oneOf: ['-']}
								],
								mark: 'text',
								text: {field: 'name', type: 'nominal'},
								x: {field: 'start', type: 'genomic'},
								xe: {field: 'end', type: 'genomic'},
								style: {dy: +8}
							},
							{
								dataTransform: [
									{type: 'filter', field: 'type', oneOf: ['gene']},
									{type: 'filter', field: 'strand', oneOf: ['-']}
								],
								mark: 'triangleLeft',
								x: {field: 'start', type: 'genomic'},
								size: {value: 5},
								style: {align: 'right'}
							},
							{
								dataTransform: [
									{type: 'filter', field: 'type', oneOf: ['exon']}
								],
								mark: 'rect',
								x: {field: 'start', type: 'genomic'},
								size: {value: 5},
								xe: {field: 'end', type: 'genomic'}
							},
							{
								dataTransform: [
									{type: 'filter', field: 'type', oneOf: ['gene']},
									{type: 'filter', field: 'strand', oneOf: ['+']}
								],
								mark: 'rule',
								x: {field: 'start', type: 'genomic'},
								strokeWidth: {value: 1},
								xe: {field: 'end', type: 'genomic'},
								style: {linePattern: {type: 'triangleRight', size: 2}}
							},
							{
								dataTransform: [
									{type: 'filter', field: 'type', oneOf: ['gene']},
									{type: 'filter', field: 'strand', oneOf: ['-']}
								],
								mark: 'rule',
								x: {field: 'start', type: 'genomic'},
								strokeWidth: {value: 1},
								xe: {field: 'end', type: 'genomic'},
								style: {linePattern: {type: 'triangleLeft', size: 2}}
							}
						],
						row: {field: 'strand', type: 'nominal', domain: ['+', '-']},
						color: {
							field: 'strand',
							type: 'nominal',
							domain: ['+', '-'],
							range: ['#7585FF', '#FF8A85']
						},
						visibility: [
							{
								operation: 'less-than',
								measure: 'width',
								threshold: '|xe-x|',
								transitionPadding: 10,
								target: 'mark'
							}
						],
						tooltip: [
							{
								field: 'name',
								type: 'quantitative',
								alt: 'Gene(exon)',
							},
							{
								field: 'strand',
								type: 'quantitative',
								alt: 'Strand',
							},
							{field: 'start', type: 'genomic', alt: 'Start Position'},
							{field: 'end', type: 'genomic', alt: 'End Position'},
						],
						opacity: {value: 0.8},
						width: plotwidth,
						height: 50,
						style: {
							background: '#F8F8F8',outline: 'black',legendTitle:'left',mouseOver:{color:'red'},
						},
					},
					{
						alignment: 'overlay',
						title: celltype,
						data: {
							url: dic_em[celltype],
							type: 'csv',
							chromosomeField: 'chr',
							genomicFields: ['center', 'tss']
						},
						dataTransform: [
							{type: 'filter', field: 'enhancer_id', oneOf: [enhancer]},
						],
						tracks: [
							{mark: 'withinLink'},
						],
						tooltip: [
							{
								field: 'enhancer_id',
								type: 'quantitative',
								alt: 'Connected  Enhancer',
							},
							{
								field: 'ABC.Score',
								type: 'quantitative',
								alt: 'ABC score (0~1)',
								format: '.4'
							},
							{field: 'tss', type: 'genomic', alt: 'Gene TSS'},
							{field: 'center', type: 'genomic', alt: 'Enhancer Region Center'},
						],
						x: {field: 'tss', type: 'genomic', linkingId: 'view1'},
						xe: {field: 'center', type: 'genomic'},
						stroke: {value: 'red'},
						strokeWidth: {value: 1},
						opacity: {value: 1},
						style: {background: '#F8F8F8',outline: 'black',legendTitle:'left'},
						width: plotwidth,
						height: 60
					}
				]
			}
			cell_type_array.push(basic_cell_type_tracks);
		}

		return (
			<div>
				{position ? null: null}
				
				<div id='info' style={{backgroundColor: 'green',height: '40px',width: screen.width,position: 'fixed',zIndex:'10',padding:'10px'}}>
					<b style={{fontSize: '25px',left:'10px',top:'0px',position:'absolute'}}>{'Checked Enhancer:'+' '+enhancer}
					</b>
					<b style={{fontSize: '25px',left: 2.1*screen.width/4,top:'0px',position:'absolute'}}>{'Location:'+' '+locus}
					</b>
				</div>
				
				<GoslingComponent
					ref={gosRef}
					spec={{
						title: 'Results',
						style: {linkStyle: 'elliptical'},
						views: cell_type_array,
					}}
					experimental={{ reactive: true }}
				/>
				{data.length === 0 ? null : null}
			</div>
		);
	}
	
}

export default MouseEvents;
