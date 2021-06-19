import './FormField.css'

const FormField = (props) => {
  const { tag, name, type, human_label, fieldValues, setFieldValues } = props

  // Handles checking if a conditional field should be rendered
  const shouldShowField = () => {
    const { conditional } = props

    if (!conditional) {
      return true
    }

    const { name, show_if } = conditional

    if (fieldValues[name]) {
      if (typeof show_if === 'function') {
        return show_if(fieldValues[name])
      }
    }
  }

  // Updates the value of the current field in the dynamic form's state
  // so that any conditional fields can use the value in their show_if functions
  const updateFieldValue = (value) => {
    setFieldValues({[name]: value})
  }

  const handleChange = (e) => {
    updateFieldValue(e.target.value)
  }

  // Certain inputs may need special styling
  const getClassNames = () => {
    const classes = ['form-field']

    if (type === 'checkbox') {
      classes.push('form-field-checkbox')
    }

    return classes.join(' ')
  }

  const renderField = () => {
    // React can choose the tag at runtime, 
    // but the variable must be capitalized
    const DynamicTag = tag

    return (
      <DynamicTag 
        className={`form-field-input`} 
        name={name} 
        id={name} 
        type={type} 
        placeholder={human_label} 
        onChange={handleChange} 
      />
    )
  }

  if (!shouldShowField()) {
    return null
  }

  const classNames = getClassNames()

  return (
    <div className={classNames}>
      <label className='form-field-label' htmlFor={name}>{human_label}</label>
      {renderField()}
    </div>
  )
}

export default FormField