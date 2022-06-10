import React, { useContext, useState } from "react";
import ContextCurrentString from "../../context/ContextCurrentString";
//import { HeartTwoTone} from "@ant-design/icons/lib/icons";
//import "antd/dist/antd.css";
import cn from "classnames";
import s from "./styles.module.css";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export const Table = ({statePathRoute, setStatePathRoute, setData, setCurrentPage,setcount,count }) => {
	const currentString = useContext(ContextCurrentString)
	const [stateSort, setstateSort] = useState(true)
	const [obj, setObj] = useState({
		one: false,
		two: false,
		three: false
	})

	const location = useLocation()
	const params = useParams()



	function byField(field,plus,minus) {
		//console.log(minus,plus);
		return (a, b) => a[field] > b[field] ? minus : plus;	
	}

	//console.log(sort);

	function idSorting(arg,plus,minus) {
		 if (stateSort) {
			 setData(state => [].concat(state.sort(byField(arg, plus, minus))))
		} else {
			setData(state =>  [].concat(state.sort(byField(arg, minus, plus))))
		 }
		 setstateSort(a => !a)
		 setCurrentPage(1)
		 setcount(1)
	}

	function handleClickSorting(arg,arg2){
		idSorting(arg,-1,1)
		setObj(obj[arg2] ?{...obj, [arg2]: false}  : {...obj, [arg2]: true} )
		// console.log(obj);
		
	}

	 //console.log(  typeof `${count + ""}`);
	 //console.log(  typeof `${count + ""}`);
	// console.log( count);

	return (
		<>
			
				
					<table >
						<thead>
							<tr>
								<td>ID<Link to="1" className={cn(s['arrow'], obj['one'] && s['arrow2'] )} onClick={()=>{handleClickSorting('id', 'one')}} ></Link></td>
								<td >Заголовок<Link to="1" className={cn(s['arrow'], obj['two'] && s['arrow2'] )}  onClick={()=>{handleClickSorting('title', 'two')}} ></Link></td>
								<td >Описание<Link to="1" className={cn(s['arrow'], obj['three'] && s['arrow2'] )} onClick={()=>{handleClickSorting('body','three')}} ></Link></td>
							</tr>
						</thead>
						<tbody>
						
						<Routes>
							{/* {location.pathname !== '/'&& console.log("вф") } */}
						
							{/* <Route path="200" element={<tr><td>200</td></tr>}/> */}
							{/* <Route path="2" element={<tr><td>2</td></tr>}/>
							<Route path="3" element={<tr><td>3</td></tr>}/> */}
							<Route path={'/'} element={currentString?.map((el, indx) => {
									return (<tr key={indx} >
										<td >{el?.id}</td>
										<td >{el?.title}</td>
										<td >{el?.body}</td>
									</tr>)
								})}/>
							<Route path={`${count}`} element={currentString?.map((el, indx) => {
									return (<tr key={indx} >
										<td >{el?.id}</td>
										<td >{el?.title}</td>
										<td >{el?.body}</td>
									</tr>)
								})}/>
							{/* <Route path={`${statePathRoute}`} element={currentString?.map((el, indx) => {
									return (<tr key={indx} >
										<td >{el?.id}</td>
										<td >{el?.title}</td>
										<td >{el?.body}</td>
									</tr>)
								})}/> */}
							<Route path="*" element={<tr><td>страница не найдена</td></tr>}/>	
							
							</Routes>
						</tbody>
					</table>
				
					
					{/* currentString?.map((el, indx) => {
									return (<tr key={indx} >
										<td >{el?.id}</td>
										<td >{el?.title}</td>
										<td >{el?.body}</td>
									</tr>)
								}) */}
			
		</>
	);
};
