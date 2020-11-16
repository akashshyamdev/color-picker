import React, { Component } from 'react';
import 'rc-slider/assets/index.css';

import ColorBox from './ColorBox.jsx';
import Navbar from './Navbar';
import styles from './styles/PaletteStyles';
import PaletteFooter from './PaletteFooter.jsx';
import { withStyles } from '@material-ui/styles';

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500, format: 'hex' };
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}

	changeLevel(level) {
		this.setState({ level });
	}

	changeFormat(val) {
		this.setState({ format: val });
	}

	render() {
		const { colors, paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const { level, format } = this.state;

		const colorBoxes = colors[level].map((color) => (
			<ColorBox
				background={color[format]}
				name={color.name}
				key={color.id}
				id={color.id}
				paletteId={id}
				showLink
			/>
		));

		return (
			<div className={`${classes.palette}`}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleChange={this.changeFormat}
					showSlider={true}
				/>

				<div className={`${classes.palette__colors}`}>{colorBoxes}</div>

				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
