import React, { useEffect, useRef, useState } from 'react';
import { GoslingComponent } from 'gosling.js';
import { VegaLite } from 'react-vega'


import EnhancersURL from '../cell_type_enhancers/enhancers_13celltypes_gene_main.csv'
import ArcsURL from '../cell_type_enhancers/astrocyte-ENCODE_arcs_gene_main.csv'

import EnhancersURL_re from '../cell_type_enhancers/enhancers_13celltypes_enhancer_main.csv'
import ArcsURL_re from '../cell_type_enhancers/astrocyte-ENCODE_arcs_enhancer_main.csv'

const vegaLiteSpec = {
	$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
	height: 60,
	width:150,
	data: {
		values: [
			{a: 'C', b: 2},
			{a: 'C', b: 7},
			{a: 'C', b: 4},
			{a: 'D', b: 1},
			{a: 'D', b: 2},
			{a: 'D', b: 6},
			{a: 'E', b: 8},
			{a: 'E', b: 4},
			{a: 'E', b: 7}
		]
	},
	mark: 'bar',
	encoding: {
		y: {field: 'a', type: 'nominal'},
		x: {
			aggregate: 'average',
			field: 'b',
			type: 'quantitative',
			axis: {
				title: 'Average of b'
			}
		}
	}
};
const vegaLiteSpec2 = {
	$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
	height: 100,
	width:150,
	data: {
		values: [
			{a: 'C', b: 2},
			{a: 'C', b: 7},
			{a: 'C', b: 4},
			{a: 'D', b: 1},
			{a: 'D', b: 2},
			{a: 'D', b: 6},
			{a: 'E', b: 8},
			{a: 'E', b: 4},
			{a: 'E', b: 7}
		]
	},
	mark: 'bar',
	
	encoding: {
		y: {field: 'a', type: 'nominal'},
		x: {
			aggregate: 'average',
			field: 'b',
			type: 'quantitative',
			axis: {
				title: 'Average of b'
			}
		}
	}
};

function MouseEvents() {

	const gosRef = useRef();
	const [position, setPosition] = useState();
	const [data, setData] = useState([]);

	useEffect(() => {
		if(!gosRef.current) return;

		gosRef.current.api.subscribe('click', (_, eventData) => {
			const { genomicPosition: p } = eventData;
			const { data: d } = eventData;
			window.alert(d[0].gene);
			window.location.assign('https://www.hgc.jp/~weihang/temp_jump_to_gene.html?enhancer='+'IL17RA@rank3')
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
	const plotwidth=screen.width*0.75
	//window.alert(ifgene);
	if (ifgene){
		
		var gene=url.match(/=(\S*)@chr/)[1];
		var chr = url.match(/@chr(\S*)range1/)[1];
		var range1= url.match(/range1@(\S*)range2@/)[1];
		var range2= url.match(/range2@(\S*)@ensem/)[1];
		var enseID= url.match(/@ensem(\S*)@rangeinput/)[1];
		var range_input= url.match(/@rangeinput(\S*)/)[1];
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
				url: 'https://higlass.io/api/v1/tileset_info/?d=P0PLbQMwTYGy-5uPIQid7A',
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
		const basic_cell_type_tracks={
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
						url: 'https://gene-enhancer-interaction.s3.ap-northeast-1.amazonaws.com/cell_type_enhancers/enhancers_13celltypes_gene_main.csv',
						type: 'csv',
						chromosomeField: 'chr',
						genomicFields: ['p1', 'p2']
					},
					tracks: [
						{
							mark: 'rect',
							dataTransform: [
								{
									type: 'filter',
									field: 'gene',
									oneOf: ['astrocyte-ENCODE@'+gene],
									not: true
								},
							],
							color: {
								field: 'gene',
								type: 'nominal',
								value: 'black'
							},
							size: {value: 60},
						},
						{
							mark: 'rect',
							dataTransform: [
								{
									type: 'filter', field: 'gene', oneOf: ['astrocyte-ENCODE@'+gene]
								}
							],
							size: {value: 60},
							color: {value: '#ff0000'},
							stroke:{value:'red'},
						},
					],
					tooltip: [
						{
							field: 'ind',
							type: 'quantitative',
							alt: 'Enhancer ID',
						},
						{field: 'p1', type: 'genomic', alt: 'Start Position'},
						{field: 'p2', type: 'genomic', alt: 'End Position'},
					],
					x: {field: 'p1', type: 'genomic'},
					xe: {field: 'p2', type: 'genomic'},
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
					title:'Astrocyte-ENCODE',
					id: 'heatmap-track',
					data: {
						url: ArcsURL,
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
					color: { field: 'score', type: 'quantitative', legend: true, range: 'pink' },
					stroke: {value: 'red'},
					strokeWidth: {value: 1},
					opacity: {value: 1},
					style: {background: '#F8F8F8',outline: 'black',legendTitle:'left'},
					width: plotwidth,
					height: 60
				}
			]
		};
		
		cell_type_array.push(gene_annotation);
		cell_type_array.push(basic_cell_type_tracks);

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
				<div style={{ position: 'absolute', left: screen.width*0.8, top:'250px' }}><VegaLite spec={vegaLiteSpec} /></div>
			</div>
		);
	}


	else{
		var enhancer=url.match(/=(\S*)@chr/)[1];
		chr = url.match(/@chr(\S*)range1/)[1];
		range1= url.match(/range1@(\S*)range2@/)[1];
		range2= url.match(/range2@(\S*)@rangeinput/)[1];
		range_input= url.match(/@rangeinput(\S*)/)[1];
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
						url: EnhancersURL_re,
						type: 'csv',
						chromosomeField: 'chr',
						genomicFields: ['p1', 'p2']
					},
					tracks: [
						{
							mark: 'rect',
							dataTransform: [
								{
									type: 'filter',
									field: 'enhancerID',
									oneOf: [enhancer],
									not: true
								},
							],
							color: {
								field: 'enhancerID',
								type: 'nominal',
								value: 'black'
							},
							size: {value: 60},
						},
						{
							mark: 'rect',
							dataTransform: [
								{type: 'filter', field: 'enhancerID', oneOf: [enhancer]}
							],
							size: {value: 60},
							color: {value: '#ff0000'},
							stroke:{value:'red'},
						},
					],
					tooltip: [
						{
							field: 'enhancerID',
							type: 'quantitative',
							alt: 'Enhancer ID',
						},
						{field: 'p1', type: 'genomic', alt: 'Start Position'},
						{field: 'p2', type: 'genomic', alt: 'End Position'},
					],
					x: {field: 'p1', type: 'genomic'},
					xe: {field: 'p2', type: 'genomic'},
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
						url: 'https://higlass.io/api/v1/tileset_info/?d=P0PLbQMwTYGy-5uPIQid7A',
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
					title:'Astrocyte-ENCODE',
					data: {
						url: ArcsURL_re,
						type: 'csv',
						chromosomeField: 'chr',
						genomicFields: ['center', 'TSS']
					},
					dataTransform: [
						{type: 'filter', field: 'enhancerID', oneOf: [enhancer]},
					],
					tracks: [
						{mark: 'withinLink'},
					],
					tooltip: [
						{
							field: 'enhancerID',
							type: 'quantitative',
							alt: 'Connected  Enhancer',
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
					stroke: {value: 'red'},
					strokeWidth: {value: 1},
					opacity: {value: 1},
					style: {background: '#F8F8F8',outline: 'black',legendTitle:'left'},
					width: plotwidth,
					height: 60
				}
			]
		}
		cell_type_array.push(enhancer_annotation);
		cell_type_array.push(basic_cell_type_tracks);
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
				<div style={{ position: 'absolute', left: screen.width*0.8, top:'250px' }}><VegaLite spec={vegaLiteSpec2} /></div>
			</div>
		);
	}
	
}

export default MouseEvents;
