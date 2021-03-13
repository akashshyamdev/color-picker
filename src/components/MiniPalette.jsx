import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';

import '../styles/MiniPalette.scss';

class MiniPalette extends React.Component {
	constructor(props) {
		super(props);

		this.deletePalette = this.deletePalette.bind(this);
	}

	deletePalette(e) {
		e.stopPropagation();
		this.props.handleDeletePalette(this.props.id);
	}

	render() {
		const { paletteName, emoji, colors, handleClick } = this.props;

		const miniColorBoxes = colors.map((color) => <div className="mini-palette__color-box" style={{ backgroundColor: color.color }} key={color.name}></div>);

		return (
			<div className="mini-palette" onClick={handleClick}>
				<DeleteIcon
					className="mini-palette__delete-icon"
					style={{
						transition: 'all 0.3s ease-in-out',
						backgroundColor: '#eb3d30',
						position: 'absolute',
						right: '0px',
						top: '0px',
						color: 'white',
						width: '40px',
						height: '40px',
						padding: '.5rem',
					}}
					onClick={this.deletePalette}
				/>

				<div className="mini-palette__colors">{miniColorBoxes}</div>

				<h5 className="mini-palette__title">
					{paletteName} <span className="mini-palette__emoji">{emoji}</span>{' '}
				</h5>
			</div>
		);
	}
}

export default MiniPalette;
