class ActivityRepository {
  constructor(activityData) {
      this.data = activityData;
  }

  getMilesPerDay(user, date){
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    const numberStepsPerMile = 5280 / user.strideLength;
    const userDistanceinMiles = usersActivity.numSteps / numberStepsPerMile
    return Math.round(userDistanceinMiles * 10) / 10 //=> 6 total
  }

  getStepsPerDay(user, date){
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    return usersActivity.numSteps
  }

  getFlightsPerDay(user, date){
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    return usersActivity.flightsOfStairs
  }

  minutesActiveByDate(user, date) {
    const retrievedUser =  this.data.filter(userInfo => userInfo.userID === user.id)
    const desiredDate = retrievedUser.find(info => info.date === date).minutesActive
    return desiredDate
  }

  averageMinutesByWeek(user, date) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const desiredDate = retrievedUsersInfo.find(info => info.date === date)
    const indexOfDate = retrievedUsersInfo.indexOf(desiredDate)
    const retrievedWeek = retrievedUsersInfo.slice(indexOfDate -6, indexOfDate +1 );

    const average = retrievedWeek.reduce((total, entry) => {
      total += entry.minutesActive
      return Math.round(total / retrievedWeek.length)
    }, 0)
    return average
  }

  stepGoalSuccess(user, date) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const desiredDate = retrievedUsersInfo.find(info => info.date === date);
    if (desiredDate.numSteps > user.dailyStepGoal) {
        return `Congratulation's, you have reached your goal of ${user.dailyStepGoal} steps!!`
    } else {
        return `Let's keep walking to meet your goal!`
    }
  }

  getReachedStepGoalDays(user) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const getBestDatesInfo = retrievedUsersInfo.reduce((bestDates, activityInfo) => {
     if (activityInfo.numSteps > user.dailyStepGoal) {
       bestDates.push(activityInfo)
  }
    return bestDates
  }, [])
    const justDates = getBestDatesInfo.map( date => date.date);
    return justDates
  }

  bestSatirClimbRecord(user) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const bestRecord = retrievedUsersInfo.reduce((record, activityInfo) => {
      if (activityInfo.flightsOfStairs > record.bestClimb) {
        record.bestClimb = activityInfo.flightsOfStairs
      }
      return record
    },{bestClimb: 0})
      return bestRecord.bestClimb
  }

  averageAllUserActivities(date) {
    const retrieveInfoByDate = this.data.filter(data => data.date === date)
    const averageData = retrieveInfoByDate.reduce((averageList, data)=> {
      averageList.numStepsAverage += data.numSteps
      averageList.numStepsAverage = Math.round(averageList.numStepsAverage / retrieveInfoByDate.length)

      averageList.minutesActiveAverage += data.minutesActive
      averageList.minutesActiveAverage =   Math.round(averageList.minutesActiveAverage/ retrieveInfoByDate.length)

      averageList.flightsOfStairsAverage += data.flightsOfStairs
      averageList.flightsOfStairsAverage =  Math.round(averageList.flightsOfStairsAverage / retrieveInfoByDate.length)
      return averageList
    }, {numStepsAverage: 0, minutesActiveAverage: 0, flightsOfStairsAverage : 0, })
    return averageData
  }
  //I am thinking about writting a function that would be able to calculate the average
  //so this part could be better refactored
  getKeyAllActivities(date){
    const result = [this.averageAllUserActivities(date)]
    const dates = result.reduce((acc, curr) => {
      acc.push(...Object.keys(curr))
      return acc
    }, [])
    return dates
  }

  getValuesAllActivities(date){
    const result = [this.averageAllUserActivities(date)]
    const dates = result.reduce((acc, curr) => {
      acc.push(...Object.values(curr))
      return acc
    }, [])
    return dates
  }

  getMostActivePeople(usersData, date){
    const listByDate = this.data.filter(entry => entry.date === date);
    const getIDs = listByDate.reduce((names, entry) => {
        if(entry.minutesActive > 250){
            names.push(entry.userID)
        }
        return names
    }, [])
    const getNames = getIDs.map(id => {
        const user = usersData.find(user => user.id === id);
        return user.name
    })
    return getNames
  }

  returnPriorWeekDates(user, date) {
    const userEntries = this.data.filter((entry)=>{
      return entry.userID === user.id
    })
    const specificDate = userEntries.find((entry)=>{
      return entry.date === date
    })
    const entryDateIndex = userEntries.indexOf(specificDate)
    const priorUserWeek = userEntries.slice(entryDateIndex - 6, entryDateIndex +1)
    return priorUserWeek.map((entry)=>{
      return entry.date
    })
  }

}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
/*
  getMostActivePeople(usersData, date){
    const listByDate = this.data.filter(entry => entry.date === date);
    const getIDs = listByDate.reduce((names, entry) => {
        if(entry.minutesActive > 250){
            names.push(entry.userID)
        }
        return names
    }, [])
    console.log(getIDs)//[1, 4]
    console.log(usersData)

    return getIDs
  }
*/
