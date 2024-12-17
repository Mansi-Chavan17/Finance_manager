import React,{useEffect, useState} from 'react'
import axios from 'axios'
import './Expenses.css'


const Expenses = () => {
    const[expense, setExpense]=useState({amount:"", description:"",category:"", date:"",})
    const[expenseList, setExpenseList]=useState([])
    const baseurl='https://financemanager-4d0f9-default-rtdb.firebaseio.com/expenses'


    const handleChange=(e)=>{
        const {name, value}=e.target
        setExpense({...expense,[name]:value})
    }

    const handleAddExpense=async(e)=>{
        e.preventDefault()
        await axios.post(`${baseurl}.json`, expense)
        setExpense({amount:"", description:"", date:""})
        fetchExpenseList()
    }

    const fetchExpenseList=async()=>{
        const response=await axios.get(`${baseurl}.json`)
        if(response.data){
            const incomeArray=Object.keys(response.data).map((key)=>({
                id:key,
                ...response.data[key]
            }))
            setExpenseList(incomeArray)
        }else{
         setExpenseList([])
        }
    }

    const handleDeleteExpense=async(id)=>{
        await axios.delete(`${baseurl}/${id}.json`)
        fetchExpenseList()
    }

    useEffect(()=>{
        fetchExpenseList()
    },[])
    

    

  return (
    <div className='expense-container'>
        <h1 className='expense-title'>Expense</h1>
        <form onSubmit={handleAddExpense} className='expense-form'>
            <input className='expense-input' type='number'name='amount' value={expense.amount} placeholder='enter amount' onChange={handleChange}/>
            <input className='expense-input' type='text' name='description' value={expense.description} placeholder='enter description' onChange={handleChange} />
            <input className='expense-input' type='date' name='date' value={expense.date} placeholder='enter date' onChange={handleChange} />
            <button className='expense-button' type='Submit'>Add Expense</button>
        </form>
        <h2 className=' expense-list-title'>Expense List</h2>
        {expenseList.length>0 ?(
            <ul className='expense-list'>
                {expenseList.map((item)=>(
                    <li key={item.id} className='expense-item'>
                        <strong className='expense-amount'>{item.amount}</strong>-{item.description} ({item.date}) {" "}
                        <button className='expense-delete-button' onClick={()=>handleDeleteExpense(item.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        ):(
            <p className='expense-empty-message'>No expense added yet</p>
        )}
    </div>
  )}


export default Expenses