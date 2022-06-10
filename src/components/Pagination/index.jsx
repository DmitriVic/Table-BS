import React, { useEffect, useState } from "react";
import cn from "classnames";
import s from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export const Pagination = ({ setStatePathRoute, count, setcount, data, currentString, setCurrentPage, currentPage }) => {

	const [btnNav, setBtnNav] = useState([])
	const location = useLocation()
	const locationPathName = parseInt(location.pathname.match(/\d+/))

	useEffect(() => {
		let arr = []
		for (let i = 0; i < Math.ceil(data?.length / currentString?.length); i++) {
			arr.push(i + 1)
		}
		if (locationPathName > 5) {
			arr = changeArr(arr)
		}
		setBtnNav(arr)
	}, [data])


	function rigntShiftArrByOne(arr) {
		return [].concat(arr.slice(-1), arr.slice(0, -1))
	}

	function leftShiftArrByOne(arr) {
		return [].concat(arr.slice(1), arr.slice(0, 1))
	}

	function changeArr(arr) {
		const newArr = [].concat(arr.slice(locationPathName), arr.slice(0, locationPathName))
		return [].concat(newArr.slice(-5), newArr.slice(0, -5))
	}

	function changeArrBtn(el, index) {
		setcount(el)
		setStatePathRoute(el)
		if (index === 4 && el !== btnNav?.length) {
			setBtnNav(leftShiftArrByOne(btnNav))
		}
		if (index === 0 && el !== 1) {
			setBtnNav(rigntShiftArrByOne(btnNav))
		}
		setCurrentPage(el)
	}

	function pageIsForward() {
		if (currentPage * 10 < data.length) {
			setCurrentPage(el => el + 1)
			setcount(el => el + 1)
			if (btnNav[btnNav.length - 1] !== 5 && btnNav.length > 5) {
				setBtnNav(leftShiftArrByOne(btnNav))
			}
		}
	}

	function backPage() {
		if (currentPage > 1) {
			setcount(el => el - 1)
			setCurrentPage(el => el - 1)
			if (btnNav[0] !== 1) {
				setBtnNav(rigntShiftArrByOne(btnNav))
			}
		}
	}

	return (
		<>
			<div className={s.pagin}>
				<div>
					<Link to={count > 1 && `${count - 1}`} onClick={backPage}>Назад</Link>
				</div>
				<div>
					{btnNav.map((el, index) =>
						index <= 4 && (<Link key={uuidv4()} to={el + ""}
							className={cn({ 'color-btn': el === count })}
							onClick={() => { changeArrBtn(el, index) }}>
							{el}
						</Link>)
					)}
				</div>
				<div>
					<Link to={Math.ceil(data?.length / 10) > count && `${count + 1}`} onClick={pageIsForward}>Далее</Link>
				</div>
			</div>
		</>
	);
};
