import { createMuiTheme } from '@material-ui/core';

const drawerWidth = 400;

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#f59c16',
			light: '#f7b44f',
			dark: '#e08a07',
		},
		secondary: {
			main: '#DC09D2',
			light: '#F90BED',
			dark: '#BD08B4',
		},
		error: {
			main: '#FF2D00',
			light: '#FF6D4E',
			dark: '#DC2700',
		},
	},
	typography: {
		fontFamily: ['Montserrat'].join(','),
	},
});

export const styles = (theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		display: 'flex',
		flexDirection: 'row',
		color: '#fff',
		justifyContent: 'space-between',
		height: '64px',
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,

		'@media (max-width: 675.98px)': {
			marginLeft: 2,
			marginRight: 0,
		},
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		alignItems: 'center',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
		width: '100%',
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: 0,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	btn: {
		color: 'white',
		backgroundColor: theme.palette.error.main,

		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
	},
	container: {
		width: '90%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		margin: '0 auto',
	},
	pickerForm: {
		width: '100%',
	},
	picker: {
		width: '100% !important',
		marginTop: '2rem',
	},
	addColor: {
		width: '70%',
		padding: '1rem',
		marginTop: '1rem',
		fontSize: '1.8rem',
		margin: '0 15%',
	},
	colorInput: {
		width: '100%',
		height: '6rem',
		marginTop: '2rem',
	},
	buttons: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: '2rem',
	},
	h4: {
		fontWeight: 700,
	},
	button: {
		width: '45%',

		'&:first-child': {
			color: 'white',
			backgroundColor: theme.palette.error.main,

			'&:hover': {
				backgroundColor: theme.palette.error.dark,
			},
		},
	},
	navButtons: {
		display: 'flex',
		alignItems: 'center',
		marginRight: '2rem',
		'@media (max-width: 675.98px)': {
			marginLeft: 2,
			marginRight: 0,
		},
	},
	navButton: {
		textDecoration: 'none',
		marginLeft: '2rem',
		transition: '.3s all',
	},
	formBtn: {
		margin: '1rem',

		'&:first-child': {
			marginRight: '2rem',

			'&:hover': {
				backgroundColor: theme.palette.secondary.dark,
				color: 'white',
			},
		},
	},
});
