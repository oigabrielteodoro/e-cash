import React from 'react'
import { addMonths, addYears, format, subMonths, subYears } from 'date-fns'

import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

import { theme } from 'config'

import { Calendar } from '.'

describe('Calendar', () => {
  it('should be able render correctly', async () => {
    const date = new Date()
    const dateFormatted = format(date, 'dd MMM, yyyy')

    render(<Calendar />)

    expect(
      screen.getByRole('button', {
        name: dateFormatted,
      }),
    ).toBeInTheDocument()
  })

  it('should be able open/close calendar', async () => {
    const date = new Date()
    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    // Close calendar
    userEvent.click(button)

    await waitFor(() =>
      expect(screen.queryByText(monthFormatted)).not.toBeInTheDocument(),
    )
  })

  it('should be able select single dates', async () => {
    const date = new Date()
    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    // Remove default selected date
    userEvent.click(
      await screen.findByRole('button', {
        name: date.getDate().toString(),
      }),
    )

    const singleDate = screen.getByRole('button', {
      name: '1',
    })

    // Select single date
    userEvent.click(singleDate)

    expect(
      await screen.findByRole('button', {
        name: '1',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[500]}`)
  })

  it('should be able select between dates', async () => {
    const date = new Date()
    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    const initialDate = screen.getByRole('button', {
      name: date.getDate().toString(),
    })

    const firstDate = screen.getByRole('button', {
      name: '1',
    })

    const endDate = screen.getByRole('button', {
      name: '4',
    })

    // Unselect initial date
    userEvent.click(initialDate)

    expect(
      await screen.findByRole('button', {
        name: date.getDate().toString(),
      }),
    ).toHaveStyle(`background: ${theme.colors.neutral[100]}`)

    // Select two dates
    userEvent.click(firstDate)
    userEvent.click(endDate)

    expect(
      await screen.findByRole('button', {
        name: '1',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[500]}`)
    expect(
      await screen.findByRole('button', {
        name: '2',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[100]}`)
    expect(
      await screen.findByRole('button', {
        name: '3',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[100]}`)
    expect(
      await screen.findByRole('button', {
        name: '4',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[500]}`)
  })

  it('should be able reset dates when user selects more than allowed', async () => {
    const date = new Date()
    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    const initialDate = screen.getByRole('button', {
      name: date.getDate().toString(),
    })

    const firstDate = screen.getByRole('button', {
      name: '1',
    })

    const endDate = screen.getByRole('button', {
      name: '4',
    })

    // Unselect initial date
    userEvent.click(initialDate)

    expect(
      await screen.findByRole('button', {
        name: date.getDate().toString(),
      }),
    ).toHaveStyle(`background: ${theme.colors.neutral[100]}`)

    // Select two dates
    userEvent.click(firstDate)
    userEvent.click(endDate)

    expect(
      await screen.findByRole('button', {
        name: '1',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[500]}`)
    expect(
      await screen.findByRole('button', {
        name: '2',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[100]}`)
    expect(
      await screen.findByRole('button', {
        name: '3',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[100]}`)
    expect(
      await screen.findByRole('button', {
        name: '4',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[500]}`)

    const newDateToReset = screen.getByRole('button', {
      name: '6',
    })

    // Select new date to reset previous ones
    userEvent.click(newDateToReset)

    expect(
      await screen.findByRole('button', {
        name: '1',
      }),
    ).not.toHaveStyle(`background: ${theme.colors.blue[500]}`)
    expect(
      await screen.findByRole('button', {
        name: '2',
      }),
    ).not.toHaveStyle(`background: ${theme.colors.blue[100]}`)
    expect(
      await screen.findByRole('button', {
        name: '3',
      }),
    ).not.toHaveStyle(`background: ${theme.colors.blue[100]}`)
    expect(
      await screen.findByRole('button', {
        name: '4',
      }),
    ).not.toHaveStyle(`background: ${theme.colors.blue[500]}`)

    expect(
      await screen.findByRole('button', {
        name: '6',
      }),
    ).toHaveStyle(`background: ${theme.colors.blue[500]}`)
  })

  it('should be able to show next month', async () => {
    const date = new Date()
    const nextDate = addMonths(date, 1)

    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')
    const nextDateFormatted = format(nextDate, 'MMMM yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    const nextButton = screen.getByRole('button', {
      name: 'Next month',
    })

    // Click in next month button
    userEvent.click(nextButton)

    expect(await screen.findByText(nextDateFormatted)).toBeInTheDocument()
  })

  it('should be able to show next year', async () => {
    const date = new Date()
    const nextDate = addYears(date, 1)

    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')
    const nextDateFormatted = format(nextDate, 'MMMM yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    const nextButton = screen.getByRole('button', {
      name: 'Next year',
    })

    // Click in next year button
    userEvent.click(nextButton)

    expect(await screen.findByText(nextDateFormatted)).toBeInTheDocument()
  })

  it('should be able to show previous month', async () => {
    const date = new Date()
    const previousDate = subMonths(date, 1)

    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')
    const previousDateFormatted = format(previousDate, 'MMMM yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    const previousButton = screen.getByRole('button', {
      name: 'Previous month',
    })

    // Click in previous month button
    userEvent.click(previousButton)

    expect(await screen.findByText(previousDateFormatted)).toBeInTheDocument()
  })

  it('should be able to show previous year', async () => {
    const date = new Date()
    const previousDate = subYears(date, 1)

    const monthFormatted = format(date, 'MMMM yyyy')
    const dateFormatted = format(date, 'dd MMM, yyyy')
    const previousDateFormatted = format(previousDate, 'MMMM yyyy')

    render(<Calendar />)

    const button = screen.getByRole('button', {
      name: dateFormatted,
    })

    expect(button).toBeInTheDocument()

    // Open calendar
    userEvent.click(button)

    expect(await screen.findByText(monthFormatted)).toBeInTheDocument()

    const previousButton = screen.getByRole('button', {
      name: 'Previous year',
    })

    // Click in previous year button
    userEvent.click(previousButton)

    expect(await screen.findByText(previousDateFormatted)).toBeInTheDocument()
  })
})
