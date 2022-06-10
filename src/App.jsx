import React, { useState, useEffect } from "react";
import "./index.css";

import ContextCurrentString from './context/ContextCurrentString'
import { Main } from "./components/Main";
import { useLocation } from "react-router-dom";


export const App = () => {
	const [count, setcount] = useState(1)
	const [data, setData] = useState([])
	const [state, setState] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [stringsPerPage] = useState(10)

	const location = useLocation()
	const locationPathName = parseInt(location.pathname.match(/\d+/))
	const lastStringIndex = currentPage * stringsPerPage
	const firstStringIndex = lastStringIndex - stringsPerPage
	const currentString = data?.slice(firstStringIndex, lastStringIndex)

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts`, {
		})
			.then(res => res.json())
			.then(res => {
				setData(res)
				setState(res)
			})
	}, [])

	useEffect(() => {
		if (locationPathName) {
			setCurrentPage(locationPathName)
			setcount(locationPathName)
		}
	}, [location])

	return (
		<ContextCurrentString.Provider value={currentString}>
			<div className="container">
				<Main
					count={count}
					setcount={setcount}
					state={state}
					data={data}
					currentString={currentString}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					setData={setData}
				/>
			</div>
		</ContextCurrentString.Provider>
	)
};
