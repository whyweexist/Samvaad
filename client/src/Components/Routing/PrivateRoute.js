import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const loading = useSelector((state) => state.auth.loading);
	return (
		!loading && (
			<Route
				render={(props) =>
					isAuthenticated && user ? (
						user.isAdmin && !window.location.pathname.startsWith('/users/') ? (
							<Redirect to='/adminpanel' />
						) : (
							<Component {...props} />
						)
					) : (
						<Redirect to='/login' />
					)
				}
			/>
		)
	);
};

export default PrivateRoute;
