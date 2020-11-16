import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);

		this._shades = this.gatherShades(this.props.palette, this.props.colorId);
		this.state = { format: 'hex' };
		this.changeFormat = this.changeFormat.bind(this);
	}

	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
		}

		return shades.slice(1);
	}

	changeFormat(val) {
		this.setState({ format: val });
	}

	render() {
		const { format } = this.state;
		const { paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;

		const colorBoxes = this._shades.map((color, i) => (
			<ColorBox key={i} name={color.name} background={color[format]} showLink={false} isLong />
		));

		return (
			<div className={`${classes.palette}`}>
				<Navbar handleChange={this.changeFormat} showSlider={false} />

				<div className={`${classes.palette__colors}`}>
					{colorBoxes}
					<div className="color-box color-box--back">
						<Link to={`/palette/${id}`} className="color-box__copy-btn color-box__copy-btn--show">
							Go Back
						</Link>
					</div>
				</div>

				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
