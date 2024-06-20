import dayjs from 'dayjs'
import { now } from 'next-auth/client/_utils'

export default function LastMessageTime(time: any) {

  const localizedFormat = require("dayjs/plugin/localizedFormat"),
        advancedFormat = require("dayjs/plugin/advancedFormat")

  function formatTime() {
		dayjs.extend(advancedFormat)
		const date: any = dayjs(time.time).format('X')
		
		if (date < (now() - 86400)) {
			return 'ddd'
		} else if (date < (now() - 604800)) {
			dayjs.extend(localizedFormat)
			return 'll'
		} else {
			return 'HH:mm'
		}
	}

  return (
    <span className='text-xs opacity-30'>
      {dayjs(time.time).format(formatTime())}
    </span>
  )
}