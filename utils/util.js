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

const law_arr = ['2018/04/29', '2018/04/30', '2018/05/01', '2018/06/16', '2018/06/17', '2018/06/18', '2018/09/22', '2018/09/23', '2018/09/24', '2018/10/01', '2018/10/02', '2018/10/03', '2018/10/04', '2018/10/05', '2018/10/06', '2018/10/07']

const gusLow = date => {
  return law_arr.includes(date)
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  gusLow: gusLow
}
