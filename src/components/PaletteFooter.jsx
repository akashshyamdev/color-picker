import { withStyles } from '@material-ui/styles';
import React from 'react';

import styles from '../styles/PaletteFooter';

function PaletteFooter(props) {
	const { paletteName, emoji, classes } = props;

	return (
		<footer className={`${classes.palette__footer}`}>
			{paletteName} <span className={`${classes.palette__emoji}`}>{emoji}</span>
		</footer>
	);
}

export default withStyles(styles)(PaletteFooter);
