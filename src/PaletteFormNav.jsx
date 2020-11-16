import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PaletteFormDialog from './PaletteFormDialog';
import PaletteIcon from '@material-ui/icons/Palette';

export default class PaletteFormNav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newPaletteName: '',
		};
	}

	render() {
		const { classes, open, handleDrawerOpen, savePalette, palettes, colors, history } = this.props;

		return (
			<nav className={classes.nav}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}
					color="default"
				>
					<Toolbar disableGutters={!open} style={{ color: 'black' }}>
						<IconButton
							color="grey"
							onClick={handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<PaletteIcon />
						</IconButton>

						<Typography variant="h6" color="inherit" noWrap>
							Color Palette
						</Typography>
					</Toolbar>

					<div className={classes.navButtons}>
						<PaletteFormDialog
							savePalette={savePalette}
							palettes={palettes}
							colors={colors}
							history={history}
						/>

						<Link to="/" className={classes.navButton}>
							<Button variant="outlined" color="secondary">
								GO BACK
							</Button>
						</Link>
					</div>
				</AppBar>
			</nav>
		);
	}
}
