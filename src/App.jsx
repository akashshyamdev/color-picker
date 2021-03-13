import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/App.css';
import Palette from './Palette.jsx';
import PaletteList from './PaletteList';
import seedColors from './data/seedColors';
import { generatePalette } from './utils/colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPalette from './NewPalette';

class App extends Component {
	constructor(props) {
		super(props);

		const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

		this.state = { palettes: savedPalettes || seedColors };

		window.state = this.state;
		window.sync = this.syncLocalStorage;

		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find(function (palette) {
			return palette.id === id;
		});
	}

	async savePalette(newPalette) {
		await this.setState({ palettes: [...this.state.palettes, newPalette] });

		this.syncLocalStorage();
	}

	async deletePalette(id) {
		await this.setState((st) => ({
			palettes: st.palettes.filter((palette) => palette.id !== id),
		}));

		this.syncLocalStorage();
	}

	syncLocalStorage() {
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
	}

	render() {
		return (
			<Switch>
				<Route exact path="/palette/new" render={(routeProps) => <NewPalette savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />} />
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={(routeProps) => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} />}
				/>

				<Route exact path="/" render={(routeProps) => <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} />} />

				<Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
			</Switch>
		);
	}
}

export default App;
