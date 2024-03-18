import moment from 'moment'

export const getRapidOption = (type: any) => {
  const statusOptions = {
    today: { title: '今天', startTime: moment(), endTime: moment() }, //今天
    lastTwoDay: { title: '最近两天', startTime: moment().add(-2, 'd'), endTime: moment() }, //最近两天
    lastWeek: { title: '最近一周', startTime: moment().add(-1, 'w'), endTime: moment() }, //最近一周
    lastMonth: { title: '最近一个月', startTime: moment().add(-1, 'M'), endTime: moment() }, //最近一个月
    lastThreeMonth: { title: '最近三个月', startTime: moment(-3, 'M'), endTime: moment() }, //最近三个月
    thisMonth: { title: '本月', startTime: moment().startOf('month'), endTime: moment().endOf('month') }, //本月
    nextWeek: { title: '未来一周', startTime: moment(), endTime: moment().add(1, 'w') }, //未来一周
    nextMonth: { title: '未来一个月', startTime: moment(), endTime: moment().add(1, 'M') }, //未来一个月
    nextThreeMonth: { title: '未来三个月', startTime: moment(), endTime: moment().add(3, 'M') }, //未来三年个月
    lastYear: { title: '最近一年', startTime: moment().add(-1, 'y'), endTime: moment() }, //最近一年
    thisYear: { title: '本年', startTime: moment().startOf('year'), endTime: moment().endOf('year') }, //本年
    nextYear: { title: '未来一年', startTime: moment(), endTime: moment().add(1, 'y') }, //未来一年
    custom: false,
    default: false
  }
  return statusOptions[type] || statusOptions['default']
}
