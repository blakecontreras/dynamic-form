import './DynamicForm.css'
import { useState, useReducer, useEffect } from 'react'
import FormField from './FormField'

const DynamicForm = (props) => {
  const { formData } = props
  const [fieldValues, setFieldValues] = useReducer((state, updatedState) => {
    return {...state, ...updatedState}
  }, {})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Resets the error message when form field values change
    setErrorMessage('')
  }, [fieldValues])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldValues)
    })

    // So we can see what's being submitted even though there's no backend
    console.log('Payload:', fieldValues)

    if (!response.ok) {
      return setErrorMessage(`Sorry, there isn't actually a server listening right now :(`)
    }

    alert('Form submitted successfully')
  }

  return (
    <div className='dynamic-form'>
      <form id='dynamic-form' onSubmit={handleSubmit}>
        {formData.map(fieldData => { 
          return (
            <div className='form-row' key={fieldData.name}>
              <FormField 
                {...fieldData} 
                fieldValues={fieldValues} 
                setFieldValues={setFieldValues}
              />
            </div>
          )
        })}
        <button className='submit-button' form='dynamic-form'>Submit</button>
      </form>
      <div className='error-message'>{errorMessage}</div>
    </div>
  )
}

export default DynamicForm