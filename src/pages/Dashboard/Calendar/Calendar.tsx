import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { AiOutlineCalendar } from 'react-icons/ai'
import {
  FiChevronDown,
  FiChevronsRight,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronLeft,
} from 'react-icons/fi'

import { Tooltip } from 'ui'
import { Period, useCalendar } from './useCalendar'

import * as S from './Calendar.styled'

export function Calendar() {
  const {
    isOpen,
    daysInMonth,
    selectedMonthFormatted,
    selectedDatesFormatted,
    isSelected,
    handleOnClick,
    handleNext,
    handlePrevious,
    setIsOpen,
  } = useCalendar()

  return (
    <S.Wrapper>
      <S.Container
        isOpen={isOpen}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <AiOutlineCalendar size={24} />
        <span>{selectedDatesFormatted}</span>
        <FiChevronDown />
      </S.Container>
      <AnimatePresence>
        {isOpen && (
          <S.Calendar>
            <S.CalendarHeader>
              <section>
                <Tooltip position='top' message='Previous year'>
                  <button
                    aria-label='Previous year'
                    onClick={() => handlePrevious(Period.YEAR)}
                  >
                    <FiChevronsLeft size={20} />
                  </button>
                </Tooltip>
                <Tooltip position='top' message='Previous month'>
                  <button
                    aria-label='Previous month'
                    onClick={() => handlePrevious(Period.MONTH)}
                  >
                    <FiChevronLeft size={20} />
                  </button>
                </Tooltip>
              </section>
              <strong>{selectedMonthFormatted}</strong>
              <section>
                <Tooltip position='top' message='Next month'>
                  <button
                    aria-label='Next month'
                    onClick={() => handleNext(Period.MONTH)}
                  >
                    <FiChevronRight size={20} />
                  </button>
                </Tooltip>
                <Tooltip position='top' message='Next year'>
                  <button
                    aria-label='Next year'
                    onClick={() => handleNext(Period.YEAR)}
                  >
                    <FiChevronsRight size={20} />
                  </button>
                </Tooltip>
              </section>
            </S.CalendarHeader>
            <ul>
              {daysInMonth.map((dayInMonth) => (
                <li key={dayInMonth.getTime()}>
                  <S.CalendarItem
                    isSelected={isSelected(dayInMonth)}
                    isInside={isSelected(dayInMonth, true)}
                    onClick={() => handleOnClick(dayInMonth)}
                  >
                    {dayInMonth.getDate()}
                  </S.CalendarItem>
                </li>
              ))}
            </ul>
          </S.Calendar>
        )}
      </AnimatePresence>
    </S.Wrapper>
  )
}
