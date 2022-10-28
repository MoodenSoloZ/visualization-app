import React from 'react';
import { GoslingComponent } from 'gosling.js';

function SimpleExample() {
	return (
		<>
			<GoslingComponent
				spec={
					{
						linkingId: 'view1',
						xDomain: {chromosome: 'chr5', interval: [0, 80000000]},
						tracks: [
							{
								alignment: 'overlay',
								data: {
									//./cell_type_enhancers/segdup.txt
									url: 'https://raw.githubusercontent.com/vigsterkr/circos/master/data/5/segdup.txt',
									type: 'csv',
									headerNames: ['id', 'chr', 'p1', 'p2'],
									chromosomePrefix: 'hs',
									chromosomeField: 'chr',
									genomicFields: ['p1', 'p2'],
									separator: ' ',
									longToWideId: 'id',
									sampleLength: 2000
								},
								dataTransform: [
									{type: 'filter', field: 'chr', oneOf: ['hs5', 'hs4', 'hs6']},
									{type: 'filter', field: 'chr_2', oneOf: ['hs5', 'hs4', 'hs6']}
								],
								tracks: [
									{mark: 'rect'},
									{
										mark: 'brush',
										x: {linkingId: 'view2'},
										strokeWidth: {value: 0}
									}
								],
								x: {field: 'p1', type: 'genomic'},
								xe: {field: 'p2', type: 'genomic'},
								row: {
									field: 'chr_2',
									type: 'nominal',
									domain: ['hs5', 'hs4', 'hs6']
								},
								color: {
									field: 'chr_2',
									type: 'nominal',
									domain: ['hs5', 'hs4', 'hs6'],
									range: ['#62AAD7', '#D1A74F', '#6CB74C']
								},
								stroke: {
									field: 'chr_2',
									type: 'nominal',
									domain: ['hs5', 'hs4', 'hs6'],
									range: ['#62AAD7', '#D1A74F', '#6CB74C']
								},
								strokeWidth: {value: 2},
								opacity: {value: 0.4},
								style: {outline: 'black', outlineWidth: 1},
								width: 800,
								height: 80
							},

						]
					}
				}
				experimental={{ reactive: true }}
			/>
		</>
	);
}

export default SimpleExample;
