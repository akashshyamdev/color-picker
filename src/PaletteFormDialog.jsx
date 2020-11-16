import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import slugify from 'slugify';
import { withStyles } from '@material-ui/styles';
import { styles, theme } from './styles/NewPaletteStyles';
import { DialogContentText } from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteFormDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stage: 'form',
			newPaletteName: '',
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.showEmojiPicker = this.showEmojiPicker.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('paletteNameUnique', (value) =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleOpen() {
		this.setState({ stage: 'name' });
	}

	handleClose() {
		this.setState({ stage: 'form' });
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(emoji) {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			colors: this.props.colors,
			id: slugify(this.state.newPaletteName),
			emoji: emoji.native,
		};

		this.props.savePalette(newPalette);
		this.props.history.push('/');
	}

	showEmojiPicker() {
		this.setState({ stage: 'emoji' });
	}

	render() {
		const { stage } = this.state;
		const { classes } = this.props;

		return (
			<div>
				<Button variant="contained" color="secondary" onClick={this.handleOpen}>
					Save Palette
				</Button>

				<Dialog open={stage === 'emoji'}>
					<Picker onSelect={(emoji) => this.handleSubmit(emoji)} />
				</Dialog>

				<Dialog open={stage === 'name'} onClose={this.handleClose}>
					<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>

					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText style={{ marginTop: '-1.5rem' }}>
								Please enter a name for your new palette. Make sure that it is unique
							</DialogContentText>

							<TextValidator
								label="Palette Name"
								name="newPaletteName"
								value={this.state.newPaletteName}
								onChange={this.handleChange}
								validators={['required', 'paletteNameUnique']}
								errorMessages={['Enter palette name', 'Name already used']}
								fullWidth
								margin="normal"
								style={{ marginTop: '-.5rem' }}
							/>
						</DialogContent>

						<DialogActions>
							<Button
								variant="outlined"
								color="secondary"
								onClick={this.handleClose}
								className={classes.formBtn}
							>
								Close
							</Button>

							<Button
								variant="contained"
								color="secondary"
								type="submit"
								className={classes.formBtn}
							>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormDialog);
