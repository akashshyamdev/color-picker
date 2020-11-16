import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button, ThemeProvider } from '@material-ui/core';
import DragableColorList from './DragableColorList';
import { arrayMove } from 'react-sortable-hoc';
import { styles, theme } from './styles/NewPaletteStyles';
import randomColor from 'randomcolor';
import ntc from 'ntcjs';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	};

	constructor(props) {
		super(props);

		this.state = {
			open: true,
			colors: this.props.palettes[0].colors,
		};

		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.clearPalette = this.clearPalette.bind(this);
	}

	handleDrawerOpen() {
		this.setState({ open: true });
	}

	handleDrawerClose() {
		this.setState({ open: false });
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(newPaletteName) {
		const newPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors,
		};
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}

	handleOnSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}));
	};

	addNewColor(newColor) {
		this.setState({ colors: [...this.state.colors, newColor] });
	}

	addRandomColor() {
		const random = randomColor();
		const color = { name: ntc.name(random)[1], color: random };

		this.setState({ colors: [...this.state.colors, color] });
	}

	removeColor(colorName) {
		this.setState({
			colors: this.state.colors.filter((color) => color.name !== colorName),
		});
	}

	clearPalette() {
		this.setState({ colors: [] });
	}

	render() {
		const { classes, maxColors, palettes, savePalette, history } = this.props;
		const { open, currentColor, colors } = this.state;
		const paletteFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<ThemeProvider theme={theme}>
					<PaletteFormNav
						open={open}
						classes={classes}
						palettes={palettes}
						handleSubmit={this.handleSubmit}
						handleDrawerOpen={this.handleDrawerOpen}
						savePalette={savePalette}
						colors={colors}
						history={history}
					/>

					<Drawer
						className={classes.drawer}
						variant="persistent"
						anchor="left"
						open={open}
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						<div className={classes.drawerHeader}>
							<IconButton onClick={this.handleDrawerClose}>
								<ChevronLeftIcon />
							</IconButton>
						</div>

						<Divider style={{ width: '100%' }} />

						<div className={classes.container} style={{ marginTop: '-3rem' }}>
							<Typography className={classes.h4} variant="h4">
								Design Your Palette
							</Typography>

							<div className={classes.buttons}>
								<Button
									variant="contained"
									color="primary"
									onClick={this.clearPalette}
									className={classes.button}
								>
									Clear Palette
								</Button>

								<Button
									variant="contained"
									color="primary"
									onClick={this.addRandomColor}
									style={{ color: 'white', background: paletteFull ? 'grey' : currentColor }}
									disabled={paletteFull}
									className={classes.button}
								>
									Random Color
								</Button>
							</div>

							<ColorPickerForm
								paletteFull={paletteFull}
								addNewColor={this.addNewColor}
								colors={colors}
							/>
						</div>
					</Drawer>
					<main
						className={classNames(classes.content, {
							[classes.contentShift]: open,
						})}
					>
						<div className={classes.drawerHeader} />

						<DragableColorList
							axis="xy"
							colors={colors}
							removeColor={this.removeColor}
							onSortEnd={this.handleOnSortEnd}
						/>
					</main>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
