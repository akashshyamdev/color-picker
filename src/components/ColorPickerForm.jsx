import React, { Component } from 'react';
import { Button, ThemeProvider, withStyles } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { styles, theme } from '../styles/NewPaletteStyles';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentColor: 'teal',
			newColorName: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleColorChange = this.handleColorChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('colorNameUnique', (value) => this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()));

		ValidatorForm.addValidationRule('colorUnique', (value) => this.props.colors.every(({ color }) => color !== this.state.currentColor));
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleColorChange(newColor) {
		this.setState({ currentColor: newColor.hex });
	}

	handleSubmit() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName,
		};

		this.props.addNewColor(newColor);
	}

	render() {
		const { paletteFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;

		return (
			<div className={classes.pickerForm}>
				<ThemeProvider theme={theme}>
					<ChromePicker color={currentColor} onChangeComplete={this.handleColorChange} className={classes.picker} />

					<ValidatorForm onSubmit={this.handleSubmit} ref="form">
						<TextValidator
							value={newColorName}
							onChange={this.handleChange}
							name="newColorName"
							validators={['required', 'colorNameUnique', 'colorUnique']}
							errorMessages={['This field is mandatory', 'Color name must be unique', 'Color already exists']}
							label="Color Name"
							className={classes.colorInput}
							variant="filled"
							margin="normal"
						/>

						<Button
							variant="contained"
							type="submit"
							color="primary"
							style={{ color: 'white', background: paletteFull ? 'grey' : currentColor }}
							disabled={paletteFull}
							className={classes.addColor}
						>
							{paletteFull ? 'Palette Full' : 'Add Color'}
						</Button>
					</ValidatorForm>
				</ThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ColorPickerForm);
