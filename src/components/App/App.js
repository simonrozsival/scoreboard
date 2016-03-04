import React, { Component, PropTypes } from 'react';
import styles from './App.less';
import { Grid, Row, Col } from 'react-bootstrap';

import logo from './logo.png';

/**
 * The root component of the application. It is very simple right now
 * but it might contain some advanced layout in the future.
 */
class App extends Component {

	static propTypes = {
		children: PropTypes.oneOfType([
		  PropTypes.arrayOf(PropTypes.node),
		  PropTypes.node
		])
	}

	render() {
		return (
			<Grid fluid>
				<Row className={styles.app}>
					<Col sm={3}>
						<img src={logo} className={styles.logo} />
					</Col>
					<Col sm={9}>
						{this.props.children}
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<hr />
						<p className={'text-center'}>
							Created by <a href="https://github.com/simonrozsival">Šimon Rozsíval</a>, 2016
						</p>
					</Col>
				</Row>
			</Grid>
		);
	}

}

export default App;
