import * as React from 'react';
import { Routes, Route} from 'react-router-dom';
//import SimpleExample from './example/Simple';
//import VegaLiteExample from './example/VegaLite';
//import WidgetEncoding from './example/WidgetEncoding';
//import WidgetNavigation from './example/WidgetNavigation';
import MouseEvents from './example/MouseEvents';


// The full list of examples
const examples = {
	//Simple: <SimpleExample/>,
	//'Widget (Encoding)': <WidgetEncoding/>,
	//'Widget (Navigation)': <WidgetNavigation/>,
	MouseEvents: <MouseEvents/>,
	//'Vega-Lite': <VegaLiteExample/>,
}

function App() {
	return (
		<div className='flex flex-row h-full w-full'>
			<div className='flex-none border-r-[1px]'>
				

			</div>
			<div className=''>
				<Routes>
					<Route path="/" element={examples.MouseEvents} />
					{Object.entries(examples).map(entry => <Route key={entry[0]} path={`/${entry[0].replace(' ', '_')}`} element={entry[1]}/>)}
				</Routes>
			</div>
		</div>
	);
}

export default App;