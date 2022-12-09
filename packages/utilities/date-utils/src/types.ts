import type { CalendarDate, DateDuration, DateFormatter, DateValue } from "@internationalized/date"

type Stringify = ({ start, end }: { start: string; end: string }) => string

export type DateContext = DateValueRange & {
  locale: string
  timeZone: string
  duration: DateDuration
  isDateUnavailable?: (date: CalendarDate) => boolean
}

export type DateValueRange = {
  min?: DateValue
  max?: DateValue
}

export type DateSegmentContext = {}

export type DateDescriptionContext = {
  start?: CalendarDate
  end?: CalendarDate
  isSelectingRange?: boolean
  timeZone: string
  locale: string
  createDateFormatter: (options: Intl.DateTimeFormatOptions) => DateFormatter
  stringify: Stringify
}
