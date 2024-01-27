import React from 'react'
import {thunk} from 'redux-thunk'
import {createStore,applyMiddleware} from'redux'
import axios from 'axios'
import reducer from './Reducer'
import { fetchUserData,showError } from './Action'

const store = createStore(reducer,applyMiddleware(thunk))

const fetchData = () => async() => {
  try {
    let data = await axios.get('https://jsonplaceholder.typicode.com/users')
    store.dispatch(fetchUserData(data.data))
  } catch (error) {
    store.dispatch(showError(error))
  }
}

function DisplayData() {
    const [showData,setshowData] = React.useState(false)
    const [data,setData] = React.useState([])
    function handleClick() {
      store.dispatch(fetchData())
      setshowData(!showData)
    }

    React.useEffect(()=>{
      let subscribe = store.subscribe(()=>{
        setData(store.getState().users)
      })
      return subscribe
    },[])

  return (
    <div>
      <button onClick={handleClick}>{showData? "Hide Data":"Fetch Data"}</button>
        {showData && (
            <div>
                {data.map((ele,index)=>(
                    <div style={{border:"1px solid black"}} key={index}>
                        <p>Name: {ele.name}</p>
                        <p>Email: {ele.email}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default DisplayData