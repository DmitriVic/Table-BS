import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./styles.module.css";
import searchImg from "../Search/img/search.png"




export const Search = ({ setCurrentPage, setcount, setData, state }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	function handleChangeInput(e) {
		navigate('/')
		setCurrentPage(1)
		setcount(1)
		setSearchQuery(prev => e.target.value)
	}

	useEffect(() => {
		setData(prev => state?.filter(item => {
			if (item.title.indexOf(searchQuery) !== -1) {
				return item
			}
		}))
	}, [searchQuery])

	return (
		<>
			<div className={s['search-box']}>
				<input
					placeholder="Поиск"
					className={s.search}
					onInput={handleChangeInput}
					type="text"
					name=""
					id="" />
				<img src={searchImg} className={s['search-img']} alt="" />
			</div>
		</>
	);
};
