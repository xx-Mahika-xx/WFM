import LoggedInContainer from '../containers/LoggedInContainer';

const Staff = () => {
	return (
		<LoggedInContainer curActiveScreen='staffdashboard'>
			<p style={{ color: 'white' }}>This is staff dahsboard page</p>
		</LoggedInContainer>
	);
};

export default Staff;
