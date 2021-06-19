import { render, screen, fireEvent } from '@testing-library/react'
import DynamicForm from './DynamicForm'
import data from './data/data'

test('renders field names from data', () => {
  render(<DynamicForm formData={data} />)
  data.forEach(elem => {
    const label = screen.queryByLabelText(elem.human_label)
    if (!elem.conditional) {
      expect(label).toBeInTheDocument()
    } else {
      expect(label).not.toBeInTheDocument()
    }
  })
});

test('renders conditional when condition is met', () => {
  render(<DynamicForm formData={data} />)

  fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '2020-05-24' } })
  const conditionalLabel = screen.getByLabelText('Parental Consent')
  expect(conditionalLabel).toBeInTheDocument()
})
