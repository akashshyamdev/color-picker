import chroma from 'chroma-js';

const styles = {
	darkText: {
		color: (props) => (chroma(props.background).luminance() >= 0.7 ? 'black' : 'white'),
	},
	lightText: {
		color: (props) => (chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'),
	},
};

export default styles;
