import React, { useEffect, useRef, useState } from 'react';
import { GoslingComponent } from 'gosling.js';

function MouseEvents() {

	const gosRef = useRef();
	const [position, setPosition] = useState();
	const [data, setData] = useState([]);

	useEffect(() => {
		if(!gosRef.current) return;

		gosRef.current.api.subscribe('click', (_, eventData) => {
			const { genomicPosition: p } = eventData;
			window.alert(p.chromosome);
			setPosition(`${p.chromosome}:${p.position}`)
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

	return (
		<div>
			<div style={{ marginTop: 30, marginLeft: 80 }}>
				Selected Position: {position ? position : 'N/A'}
			</div>
			<GoslingComponent
				ref={gosRef}
				spec={{
					title: 'Results',
					style: {linkStyle: 'elliptical'},
					views: [
						{
							alignment: 'overlay',
							assembly: 'hg38',
							title: 'Gene annotation',
							linkingId: 'view1',
							xDomain: {chromosome: 'chr22', interval: [17084954-100000, 17115694+100000]},
							data: {
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
							width: 1383,
							height: 100
						},

						
						// Cell type specific enhancer_track
						{
							alignment:':overlay',
							assembly: 'hg38',
							linkingId: 'view1',
							xDomain: {chromosome: 'chr22', interval: [17084954-100000, 17115694+100000]},
							tracks: [
								{
									alignment: 'overlay',
									title: 'Active enhancers',
									data: {
										url: './cell_type_enhancers/enahncers_13celltypes.csv',
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
													oneOf: ['astrocyte-ENCODE@'+'IL17RA'],
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
													type: 'filter', field: 'gene', oneOf: ['astrocyte-ENCODE@'+'IL17RA']
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
									width: 1383,
									height: 15
								},

								{
									alignment: 'overlay',
									title:'Astrocyte-ENCODE',
									data: {
										url: './cell_type_enhancers/astrocyte-ENCODE_arcs.csv',
										type: 'csv',
										chromosomeField: 'chr',
										genomicFields: ['center', 'TSS']
									},
									dataTransform: [
										{type: 'filter', field: 'gene', oneOf: ['IL17RA']},
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
									stroke: {value: 'red'},
									strokeWidth: {value: 1},
									opacity: {value: 1},
									style: {background: '#F8F8F8',outline: 'black',legendTitle:'left'},
									width: 1383,
									height: 60
								}
							]
						},

					]
				}}
				experimental={{ reactive: true }}
			/>
			{data.length === 0 ? null : (<div  className='mx-[60px]'>
				<table className='table-fixed border-collapse border border-slate-400'>
					<thead className='capitalize'>
					    <tr className='border border-slate-300  bg-slate-100'>{Object.keys(data[0]).map(d => <th className='px-1' key={d}>{d}</th>)}</tr>
					</thead>
					<tbody>
						{data.map(d => <tr className='border border-slate-300' key={JSON.stringify(d)}>{Object.entries(d).map(datum => <td className='px-1' key={datum[0]}>{datum[1]}</td>)}</tr>)}
					</tbody>
				</table>
			</div>)}
		</div>
	);
}

export default MouseEvents;
