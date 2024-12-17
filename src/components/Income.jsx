import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './Income.css'


const Income = () => {
    const[income, setIncome]=useState({amount:"", description:"", date:"",})
    const[incomeList, setIncomeList]=useState([])
    const baseurl='https://financemanager-4d0f9-default-rtdb.firebaseio.com/income'


    const handleChange=(e)=>{
        const {name, value}=e.target
        setIncome({...income,[name]:value})
    }

    const handleAddIncome=async(e)=>{
        e.preventDefault()
        await axios.post(`${baseurl}.json`, income)
        setIncome({amount:"", description:"", date:""})
        fetchIncomeList()
    }

    const fetchIncomeList=async()=>{
        const response=await axios.get(`${baseurl}.json`)
        if(response.data){
            const incomeArray=Object.keys(response.data).map((key)=>({
                id:key,
                ...response.data[key]
            }))
            setIncomeList(incomeArray)
        }else{
         setIncomeList([])
        }
    }

    const handleDeleteIncome=async(id)=>{
        await axios.delete(`${baseurl}/${id}.json`)
        fetchIncomeList()
    }

    useEffect(()=>{
        fetchIncomeList()
    },[])
    

    

  return (
    <div className='income-container'>
        <h1 className='income-title'>Income</h1>
        <form onSubmit={handleAddIncome} className='income-form'>
            <input className='income-input' type='number'name='amount' value={income.amount} placeholder='enter amount' onChange={handleChange}/>
            <input className='income-input' type='text' name='description' value={income.description} placeholder='enter description' onChange={handleChange} />
            <input className='income-input' type='date' name='date' value={income.date} placeholder='enter date' onChange={handleChange} />
            <button type='Submit' className='income-button'>Add Income</button>
        </form>
        <h2 className='income-list-title'>Income List</h2>
        {incomeList.length>0 ?(
            <ul className='income-list'>
                {incomeList.map((item)=>(
                    <li key={item.id} className='income-item'>
                        <strong className='income-amount'>{item.amount}</strong>-{item.description} ({item.date}) {" "}
                        <button className='income-delete-button' onClick={()=>handleDeleteIncome(item.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        ):(
            <p className='income-empty-message'>No income added yet</p>
        )}
    </div>
  )}


export default Income