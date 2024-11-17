'use client'

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  AriaDatePickerProps,
  AriaTimeFieldProps,
  CalendarProps,
  DateValue,
  TimeValue,
  useButton,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useDateField,
  useDatePicker,
  useDateSegment,
  useLocale,
  useTimeField,
} from 'react-aria'
import {
  CalendarState,
  DateFieldState,
  DatePickerState,
  DatePickerStateOptions,
  TimeFieldStateOptions,
  useCalendarState,
  useDateFieldState,
  useDatePickerState,
  useTimeFieldState,
} from 'react-stately'
import { cn } from '@/libs/utils'
import { Button } from '@/modules/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/ui/popover'
import {
  CalendarDate,
  createCalendar,
  getLocalTimeZone,
  getWeeksInMonth,
  parseDateTime,
  fromDate,
  toCalendarDateTime,
  isToday as _isToday,
  toCalendarDate,
} from '@internationalized/date'
import { Select } from '@/modules/ui/select'
import { DateSegment as IDateSegment } from '@react-stately/datepicker'

function Calendar(props: CalendarProps<DateValue>) {
  const prevButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const nextButtonRef = React.useRef<HTMLButtonElement | null>(null)

  const { locale } = useLocale()
  const state = useCalendarState({
    ...props,
    locale: 'th-TH',
    createCalendar,
  })
  const {
    calendarProps,
    prevButtonProps: _prevButtonProps,
    nextButtonProps: _nextButtonProps,
  } = useCalendar(props, state)
  const { buttonProps: prevButtonProps } = useButton(
    _prevButtonProps,
    prevButtonRef,
  )
  const { buttonProps: nextButtonProps } = useButton(
    _nextButtonProps,
    nextButtonRef,
  )

  const formatter = new Intl.DateTimeFormat('th-TH', {
    month: 'long',
    year: 'numeric',
  })
  const title = formatter.format(state.focusedDate.toDate(getLocalTimeZone()))

  return (
    <div {...calendarProps} className="space-y-4">
      <div className="relative flex items-center justify-center pt-1">
        <Button
          {...prevButtonProps}
          ref={prevButtonRef}
          variant="outline"
          className={cn(
            'absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">{title}</div>
        <Button
          {...nextButtonProps}
          ref={nextButtonRef}
          variant="outline"
          className={cn(
            'absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          )}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}

interface CalendarGridProps {
  state: CalendarState
}

function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table
      {...gridProps}
      className={cn(gridProps.className, 'w-full border-collapse space-y-1')}
    >
      <thead {...headerProps}>
        <tr className="flex">
          {weekDays.map((day, index) => (
            <th
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              key={index}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map(weekIndex => (
          <tr className="mt-2 flex w-full" key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface CalendarCellProps {
  state: CalendarState
  date: CalendarDate
}

function CalendarCell({ state, date }: CalendarCellProps) {
  const ref = React.useRef<HTMLButtonElement | null>(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref)

  const isToday = useMemo(() => {
    const timezone = getLocalTimeZone()
    return _isToday(date, timezone)
  }, [date])

  const isPastDate = useMemo(() => {
    const today = new Date()
    const calendarDate = date.toDate(getLocalTimeZone())

    // Consider today as a past date only if the time is past 17:00
    if (calendarDate.toDateString() === today.toDateString()) {
      return today.getHours() >= 17
    }
    return calendarDate < today
  }, [date])
  return (
    <td
      {...cellProps}
      className={cn(
        cellProps.className,
        'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
      )}
    >
      <Button
        {...buttonProps}
        type="button"
        variant="ghost"
        ref={ref}
        disabled={isPastDate || isDisabled || isOutsideVisibleRange}
        className={cn(
          buttonProps.className,
          'h-9 w-9',
          isToday && '',
          isSelected &&
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          isOutsideVisibleRange && '',
          isDisabled && 'text-muted-foreground opacity-50',
        )}
      >
        {formattedDate}
      </Button>
    </td>
  )
}

interface DateSegmentProps {
  segment: IDateSegment
  state: DateFieldState
}

function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null)

  const {
    segmentProps: { ...segmentProps },
  } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cn(
        'focus:rounded-[2px] focus:bg-accent focus:text-accent-foreground focus:outline-none',
        segment.type !== 'literal' && 'px-[1px]',
        segment.isPlaceholder && 'text-muted-foreground',
      )}
    >
      {segment.text}
    </div>
  )
}

function DateField(props: AriaDatePickerProps<DateValue>) {
  const ref = useRef<HTMLDivElement | null>(null)

  const { locale } = useLocale()
  const state = useDateFieldState({
    ...props,
    locale: 'th-TH',
    createCalendar,
  })
  const { fieldProps } = useDateField(
    { ...props, 'aria-label': 'date-field' },
    state,
    ref,
  )

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'inline-flex h-10 flex-1 items-center rounded-l-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.isDisabled && 'cursor-not-allowed opacity-50',
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  )
}

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
  const ref = useRef<HTMLDivElement | null>(null)

  const { locale } = useLocale()
  const state = useTimeFieldState({
    ...props,
    locale: 'th-TH',
  })
  const {
    fieldProps: { ...fieldProps },
    labelProps,
  } = useTimeField({ ...props, 'aria-label': 'time-field' }, state, ref)

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'inline-flex h-10 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.isDisabled && 'cursor-not-allowed opacity-50',
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  )
}

const TimePicker = React.forwardRef<
  HTMLDivElement,
  Omit<TimeFieldStateOptions<TimeValue>, 'locale'>
>((props, forwardedRef) => {
  return <TimeField {...props} />
})

TimePicker.displayName = 'TimePicker'

export type DateTimePickerRef = {
  divRef: HTMLDivElement | null
  buttonRef: HTMLButtonElement | null
  contentRef: HTMLDivElement | null
  jsDate: Date | null
  state: DatePickerState
}

const DateTimePicker = React.forwardRef<
  DateTimePickerRef,
  DatePickerStateOptions<DateValue> & {
    jsDate?: Date | null
    onJsDateChange?: (date: Date) => void
    showClearButton?: boolean
  }
>(({ jsDate, onJsDateChange, showClearButton = true, ...props }, ref) => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [jsDatetime, setJsDatetime] = useState(() => {
    if (jsDate) {
      return jsDate
    }
    const defaultDate = new Date()
    const currentTime = new Date()

    if (currentTime.getHours() >= 14) {
      defaultDate.setDate(defaultDate.getDate() + 1) // Set to tomorrow
    }

    defaultDate.setHours(9, 0, 0, 0)

    return defaultDate
  })

  const state = useDatePickerState({
    ...props,
  })

  useImperativeHandle(ref, () => ({
    divRef: divRef.current,
    buttonRef: buttonRef.current,
    contentRef: contentRef.current,
    jsDate: jsDatetime,
    state,
  }))
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker({ ...props, 'aria-label': 'date-picker' }, state, divRef)
  const { buttonProps } = useButton(_buttonProps, buttonRef)

  const currentValue = useCallback(() => {
    if (!jsDatetime || isNaN(jsDatetime.getTime())) {
      return null
    }

    const parsed = fromDate(jsDatetime, getLocalTimeZone())

    if (state.hasTime) {
      return toCalendarDateTime(parsed)
    }

    return toCalendarDate(parsed)
  }, [jsDatetime, state.hasTime])

  useEffect(() => {
    if (state.value) {
      const date = parseDateTime(state.value.toString()).toDate(
        getLocalTimeZone(),
      )
      date.setHours(9, 0, 0, 0) // Set default time to 09:00
      setJsDatetime(date)
      onJsDateChange?.(date)
    }
  }, [state.value, onJsDateChange])

  const handleTimeChange = useCallback(
    (e: any) => {
      const { name, value } = e.target
      const newJsDate = new Date(jsDatetime || new Date())

      if (name === 'hours') {
        newJsDate.setHours(Number(value))
      } else if (name === 'minutes') {
        newJsDate.setMinutes(Number(value))
      }

      setJsDatetime(newJsDate)
      onJsDateChange?.(newJsDate)
    },
    [jsDatetime, onJsDateChange],
  )

  const today = new Date()
  const isToday = jsDatetime?.toDateString() === today.toDateString()

  const availableHours = isToday
    ? Array.from({ length: 10 }, (_, i) => 8 + i).filter(
        hour =>
          hour > today.getHours() ||
          (hour === today.getHours() && today.getMinutes() < 45),
      )
    : Array.from({ length: 10 }, (_, i) => 8 + i)

  const availableMinutes =
    isToday && jsDatetime?.getHours() === today.getHours()
      ? [0, 15, 30, 45].filter(minute => minute > today.getMinutes())
      : [0, 15, 30, 45]

  return (
    <div
      {...groupProps}
      ref={divRef}
      className={cn(
        groupProps.className,
        'flex items-center rounded-md border ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
      )}
    >
      <Popover open={props.isOpen} onOpenChange={props.onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            {...buttonProps}
            variant="ghost"
            className="border-r"
            disabled={props.isDisabled}
            onClick={() => {
              state.setOpen(true)
            }}
          >
            <CalendarIcon className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent ref={contentRef} className="w-full">
          <div {...dialogProps} className="space-y-3">
            <Calendar {...calendarProps} />
            {state.hasTime && (
              <div className="flex items-center gap-2 justify-center">
                <select
                  name="hours"
                  value={
                    jsDatetime
                      ? String(jsDatetime.getHours()).padStart(2, '0')
                      : ''
                  }
                  onChange={handleTimeChange}
                  className="border border-gray-300 rounded-md px-2 py-1"
                >
                  {availableHours.map(hour => (
                    <option key={hour} value={hour}>
                      {String(hour).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <p>:</p>
                <select
                  name="minutes"
                  value={
                    jsDatetime
                      ? String(jsDatetime.getMinutes()).padStart(2, '0')
                      : ''
                  }
                  onChange={handleTimeChange}
                  className="border border-gray-300 rounded-md px-2 py-1"
                >
                  {availableMinutes.map(minute => (
                    <option key={minute} value={minute}>
                      {String(minute).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <DateField {...fieldProps} value={currentValue()} />
      {jsDatetime && (
        <div className="ml-2">{/* {formatDate(jsDatetime)} */}</div>
      )}
    </div>
  )
})

DateTimePicker.displayName = 'DateTimePicker'

export { DateTimePicker, TimePicker }
