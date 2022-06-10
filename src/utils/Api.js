
const onResponce = (res)=> {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}


const data = fetch(`https://jsonplaceholder.typicode.com/posts`, {
		 }).then(onResponce)

export default data