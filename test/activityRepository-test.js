const chai = require('chai');
const expect = chai.expect;
const dummyUserData = require('../data/dummyUserData');
const User = require('../src/user');
const activityTestData = require('../data/dummyActivityData');
const ActivityRepository = require('../src/activityRepository');

describe('ActivityRepository', () => {
  let today ;
  let anotherDay;
  let testActivityData;
  let testUsersData;
  let user1;
  let user;
  let newActivity;

  beforeEach(() => {
    today = '2020/08/22';
    anotherDay = '2020/08/21'
    testActivityData = activityTestData;
    testUsersData = dummyUserData;
    user1 = testUsersData[0] 
    user = new User(user1);
    activityRepo = new ActivityRepository(testActivityData);
});

it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be able to instantiate a new activity repository class', () => {
    expect(activityRepo).to.be.an.instanceOf(ActivityRepository);
  })

  it('should be able to store all activity Data', () => {

    expect(activityRepo.data).to.deep.equal(testActivityData);
  });
//return the miles a user has walked based on their number of steps
  it('return the miles a user has walked based on their number of steps by date', () => {
    expect(activityRepo.getMilesPerDay(user1, today)).to.equal(6);
  })
//how many minutes were they active for a given day (specified by a date)?
  it('should be able return minutes active for a given day', () => {
    expect(activityRepo.minutesActiveByDate(today)).to.equal(239);
  })
//how many minutes active they average for a given week (7 days)
  it('minutes active for a given week', () => {
    expect(activityRepo.averageMinutesByWeek(user,today)).to.equal(38);
  })
////For a user, did they reach their step goal for a given day (specified by a date)?
  it('should evaluate if users reached their desired step goal or not' , () => {
    expect(activityRepo.stepGoalSuccess(user, today)).to.equal('Paco diPoi, keep walking')
  })
  ////For a user, find all the days where they exceeded their step goal
  it('should be able return all the dates where the users exceeded their daily step goal', () => {
    expect(activityRepo.getReachedStepGoalDays(user)).to.deep.equal([ '2020/08/19', '2020/08/20']);
  })
//find their all-time stair climbing record
  it('should be able to return the user\'s , all-time stair climbing record',() => {
    expect(activityRepo.bestSatirClimbRecord(user)).to.equal(44)
}) 
});