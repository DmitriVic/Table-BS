import React, { useState, useEffect } from "react";
import s from "./styles.module.css";

import { Table } from "../Table";
import { Pagination } from "../Pagination";
import { Search } from "../Search";



export const Main = ({ count, setcount, data, setData, state, currentString, setCurrentPage, currentPage }) => {
	const [statePathRoute, setStatePathRoute] = useState("/")
	

	return (
		<main>
			<div className="wrapper">
				<div className="wrapper-container">
					<Search
						setData={setData}
						data={data}
						state={state}
						setcount={setcount}
						count={count}
						setCurrentPage={setCurrentPage}
					/>
					<div className={s['table-container']}>
						<Table
							setData={setData}
							count={count}
							statePathRoute={statePathRoute}
							setStatePathRoute={setStatePathRoute}
							data={data}
							setcount={setcount}
							currentString={currentString}
							setCurrentPage={setCurrentPage}
						/>
					</div>
					<Pagination
						statePathRoute={statePathRoute}
						setStatePathRoute={setStatePathRoute}
						data={data}
						count={count}
						setcount={setcount}
						currentString={currentString}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</div>
			</div>
		</main>
	);
};
