import { withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-5.5px',

		'&:hover svg': {
			color: 'white',
			transform: 'scale(1.5)',
		},

		'@media (max-width: 1419.98px)': {
			width: '25%',
			height: '20%',
		},

		'@media (max-width: 1191.98px)': {
			width: '50%',
			height: '10%',
		},

		'@media (max-width: 767.98px)': {
			width: '100%',
			height: '7%',
		},
	},
	boxContent: {
		position: 'absolute',
		width: '100%',
		left: '0',
		bottom: '0',
		padding: '1rem',
		color: 'black',
		textTransform: 'uppercase',
		letterSpacing: '1px',
		fontSize: '1rem',
		display: 'flex',
		justifyContent: 'space-between',
	},
	deleteIcon: {
		color: '#5c5959',
		transition: 'all 0.3s ease-in-out',
	},
};

const DraggableColorBox = SortableElement((props) => {
	const { classes, color, name, handleClick } = props;

	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span className={classes.name}>{name}</span>
				<DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
			</div>
		</div>
	);
});

export default withStyles(styles)(DraggableColorBox);
