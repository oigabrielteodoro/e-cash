import { useState, useMemo, useCallback } from 'react'
import {
  startOfMonth,
  endOfMonth,
  isSameDay,
  eachDayOfInterval,
  format,
  addYears,
  subYears,
  addMonths,
  subMonths,
} from 'date-fns'

import getMaxDateBasedOnDates from 'lodash/max'
import getMinDateBasedOnDates from 'lodash/min'

type Props = {
  maxSelectedDates?: number
}

export enum Period {
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export function useCalendar({ maxSelectedDates = 2 }: Props = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()])

  const selectedMonthFormatted = useMemo(
    () => format(selectedMonth, 'MMMM yyyy'),
    [selectedMonth],
  )

  const daysInMonth = useMemo(
    () => getDaysInMonth(selectedMonth),
    [selectedMonth],
  )

  const [maxSelectedDate, minSelectedDate] = useMemo(
    () => [
      getMaxDateBasedOnDates(selectedDates),
      getMinDateBasedOnDates(selectedDates),
    ],
    [selectedDates],
  )

  const selectedDatesFormatted = useMemo(() => {
    if (selectedDates.length === 1) {
      return format(selectedDates[0], 'dd MMM, yyyy')
    }

    if (maxSelectedDate && minSelectedDate) {
      return `${format(minSelectedDate, 'dd MMM, yyyy')} - ${format(
        maxSelectedDate,
        'dd MMM, yyyy',
      )}`
    }

    return 'Select date'
  }, [maxSelectedDate, minSelectedDate, selectedDates])

  const betweenDates = useMemo(
    () => getBetweenDates(minSelectedDate, maxSelectedDate),
    [maxSelectedDate, minSelectedDate],
  )

  function isSelected(date: Date, inside?: boolean) {
    const dates = inside ? betweenDates : selectedDates

    return !!dates.find((storagedDate) => isSameDay(date, storagedDate))
  }

  function handleNext(period: Period) {
    if (period === Period.MONTH) {
      setSelectedMonth((prevState) => addMonths(prevState, 1))
    }

    if (period === Period.YEAR) {
      setSelectedMonth((prevState) => addYears(prevState, 1))
    }
  }

  function handlePrevious(period: Period) {
    if (period === Period.MONTH) {
      setSelectedMonth((prevState) => subMonths(prevState, 1))
    }

    if (period === Period.YEAR) {
      setSelectedMonth((prevState) => subYears(prevState, 1))
    }
  }

  const handleOnClick = useCallback(
    (date: Date) => {
      setSelectedDates((prevState) => {
        const alreadyAddedDate = !!prevState.find((storagedDate) =>
          isSameDay(date, storagedDate),
        )

        if (alreadyAddedDate) {
          return prevState.filter(
            (storagedDate) => !isSameDay(date, storagedDate),
          )
        }

        if (prevState.length === maxSelectedDates) {
          return [date]
        }

        return [...prevState, date]
      })
    },
    [maxSelectedDates],
  )

  return {
    isOpen,
    daysInMonth,
    selectedDates,
    betweenDates,
    selectedMonth,
    selectedMonthFormatted,
    selectedDatesFormatted,
    setIsOpen,
    handleOnClick,
    handleNext,
    handlePrevious,
    isSelected,
  }
}

function getDaysInMonth(date: Date) {
  const firstDay = startOfMonth(date)
  const endDate = endOfMonth(date)

  return eachDayOfInterval({
    start: firstDay,
    end: endDate,
  })
}

function getBetweenDates(firstDate?: Date, endDate?: Date) {
  if (!firstDate || !endDate) return []

  return eachDayOfInterval({
    start: firstDate,
    end: endDate,
  })
}
