import { motion } from 'framer-motion';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

import './PaletteList.scss';

class PaletteList extends Component {
	gotToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { palettes, deletePalette } = this.props;

		return (
			<div className="palette-list">
				<div className="palette-list__container">
					<nav className="palette-list__nav">
						<h1>Palette List</h1>
						<Link to="/palette/new" className="palette-list__new">
							New Palette
						</Link>
					</nav>

					<motion.div className="palette-list__palettes">
						{palettes.map((palette) => (
							<motion.li className="palette-list__palette-item" transition={{ duration: 2 }}>
								<MiniPalette
									{...palette}
									key={palette.id}
									id={palette.id}
									handleClick={() => this.gotToPalette(palette.id)}
									handleDeletePalette={deletePalette}
								/>
							</motion.li>
						))}
					</motion.div>
				</div>
			</div>
		);
	}
}

export default PaletteList;
