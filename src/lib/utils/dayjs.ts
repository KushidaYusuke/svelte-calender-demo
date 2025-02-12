import dayjs from "dayjs"
import weekOfYear from "dayjs/plugin/weekOfYear"
import weekday from "dayjs/plugin/weekday"
import isoWeek from "dayjs/plugin/isoWeek"

dayjs.extend(weekOfYear)
dayjs.extend(weekday)
dayjs.extend(isoWeek)

export default dayjs

