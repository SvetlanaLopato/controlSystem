import './Directory.css';
import React from 'react';
import { ListGroup, ListGroupItem, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

export default class Directory extends React.Component {
	render() {
		var arr = ['1 group', '2 group', '3 group', 
				'4 group', '5 group', '6 group'];
		const list = ['Lopato Svetlana', 'Kozlova Nastya', 'Orlov Maksim', 
					'Barsukova Irina', 'Lukashenka Andrey', 'Senkov Artem'];	
		return (
			<div className="wrapper">
				<h2>List of groups:</h2>
				<Nav>
				{
					arr.map((item, index) => (
						<NavItem href="/list" key={index}>
							{item}
						</NavItem>
					))
				}
				</Nav>
				<div className="back-button button">
					<Link to="/">
						<i className="fa fa-chevron-left"></i>
						Back
					</Link>
				</div>
			</div>
		);
	}
}

