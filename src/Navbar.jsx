import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

import './Nav.scss';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { format: 'hex', open: false };
		this.handleFormatChange = this.handleFormatChange.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	handleFormatChange(e) {
		this.setState({ format: e.target.value, open: true });
		this.props.handleChange(e.target.value);
	}

	closeSnackbar() {
		this.setState({ open: false });
	}

	render() {
		const { level, changeLevel, showSlider } = this.props;
		const { format } = this.state;

		return (
			<nav className="nav">
				<div className="nav__logo">
					<Link to="/">color-picker</Link>
				</div>

				{showSlider && (
					<div className="nav__slider-container">
						<span className="nav__slider-level">Level: {level}</span>
						<div className="nav__slider">
							<Slider
								defaultValue={level}
								min={100}
								max={900}
								step="100"
								onAfterChange={changeLevel}
							/>
						</div>
					</div>
				)}

				<div className="nav__dropdown">
					<Select value={format} onChange={this.handleFormatChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
					</Select>
				</div>

				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={this.state.open}
					autoHideDuration={3000}
					message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</nav>
		);
	}
}

export default Navbar;
