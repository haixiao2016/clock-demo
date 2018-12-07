const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 获取当前日期
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()


  return [year, month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 法定节假日
const law_arr = [
  '2018/12/30',
  '2019/01/01',
  '2019/02/04',
  '2019/02/05',
  '2019/02/06',
  '2019/02/07',
  '2019/02/08',
  '2019/02/09',
  '2019/02/10',
  '2019/04/05',
  '2019/04/06',
  '2019/04/07',
  '2019/05/01',
  '2019/06/07',
  '2019/06/08',
  '2019/06/09',
  '2019/09/13',
  '2019/09/14',
  '2019/09/15',
  '2019/10/01',
  '2019/10/02',
  '2019/10/03',
  '2019/10/04',
  '2019/10/05',
  '2019/10/06',
  '2019/10/07'
]

// 周末上班
const mon_arr = [
  '2018/12/29',
  '2019/02/02',
  '2019/02/03',
  '2019/09/29',
  '2019/10/12',
]
const gusLow = date => {
  return law_arr.includes(date)
}

const monLow = date => {
  return mon_arr.includes(date)
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  gusLow: gusLow,
  monLow: monLow
}
