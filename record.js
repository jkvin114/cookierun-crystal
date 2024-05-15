function shouldDisplayAttendenceInput() {
    // Get the current date in the Korea time zone
    const currentDate = getTodayStr()
    // Check if there's a stored date in localStorage
    const storedDate = localStorage.getItem('lastAttendance');
    
    // If there's no stored date or if the stored date i different from the current date
    return (!storedDate || storedDate !== currentDate) 
        
    
}


function updateRecordDialogAfterSim(){
    let n = State.simulatedTotal
    let val = Number($one("#record-dialog-input").value)
	if (val===null || val===undefined || val==="" || isNaN(val) || val < 0) {
        showToast("0이상 숫자를 입력하세요")
		return
	}
    let quantile = 1-getQualtilePercentFromDict(State.simulatedRewards, n, val)
    let prob = State.simulatedRewardDict.has(val) ?  (State.simulatedRewardDict.get(val)/n) : 0
    $html("#record-prob",`<br>확률:${pToPercent(prob,-2)} (상위 ${pToPercent(quantile,-2)})`)
    if(val > State.maxReward) $html("#record-prob",`<br>확률:0%`)
    $removeClass("#record-prob","hidden")
    // $addClass("#record-dialog-prob","hidden")
}
function getTodayStr(){
    return new Date().toLocaleString('en-US', {timeZone: 'Asia/Seoul'}).split(',')[0];

}
const RecordState = {
	currYear:new Date().getFullYear(),
    currMonth:new Date().getMonth()
}
const LS_RECORD_PREFIX = "crystal-record-"
function getDaysInMonth(year, month) {
    // Create a new Date object for the given year and month (months are zero-based)
    const date = new Date(year, month + 1, 0);
    
    // Get the last day of the month, which gives the number of days in the month
    return date.getDate();
}
function calenderGoPrevMonth(){
    RecordState.currMonth -= 1
    if(RecordState.currMonth<0){
        RecordState.currMonth=11
        RecordState.currYear -= 1
    }
    drawCalender()
}
function calenderGoNextMonth(){
    RecordState.currMonth += 1
    if(RecordState.currMonth>11){
        RecordState.currMonth=0
        RecordState.currYear += 1
    }
    drawCalender()
}

function clearAllRecord(){
    for(const key of Object.keys(localStorage)
        .filter( (key)=> key.startsWith(LS_RECORD_PREFIX) )){
            localStorage.removeItem(key)
        }
        localStorage.removeItem('lastAttendance');
}
function getRecords(){
    const records = new Map()
    for(const key of Object.keys(localStorage)
        .filter( (key)=> key.startsWith(LS_RECORD_PREFIX) )){
            records.set(key.slice(LS_RECORD_PREFIX.length),localStorage.getItem(key))
        }
    return records
}
function addTodayRecord(count){
    const today = getTodayStr()
    localStorage.setItem(LS_RECORD_PREFIX+today,count)
    localStorage.setItem('lastAttendance', getTodayStr());
    showToast("오늘의 출석보상이 저장되었습니다")
    gtag("event", "record", {})
}

function displayRecordSummary(){
    let values = $(".record-summary-val")
    const records = getRecords()
    let total = 0
    let count=0
    for(const val of records.values()){
        total +=Number(val)
        count++

    }
    values[0].innerHTML=count
    values[1].innerHTML=total
    values[2].innerHTML=count===0?0:round(total/count,-2)
    if(shouldDisplayAttendenceInput())
    {
        $removeClass("#open-record-dialog-btn","hidden")
    }
    else{
        $addClass("#open-record-dialog-btn","hidden")
    }

}

function drawCalender(){
    const year = RecordState.currYear
    const month = RecordState.currMonth
    const firstday = new Date(year,month,1)
    let day=firstday.getDay()
    const today = getTodayStr()
    $html("#calender-header",`${year}-${month+1}월`)
    let html = ""
    for(let i=0;i<day;++i){
        html += "<div></div>"
    }
    const records = getRecords()
    for(let i=1;i<=getDaysInMonth(year,month);++i){
        const d = new Date(year,month,i).toLocaleString('en-US', {timeZone: 'Asia/Seoul'}).split(',')[0];
        
        if(records.has(d)){
            html+=`<div class="calender-day special ${new Date(d).valueOf()===new Date(today).valueOf()?"today":""}">
            <span class="day-badge">${i}<span>일</span></span>
            <img src="img/shop_icon_gem.png">
            <b>${records.get(d)}</b>
        </div>`
        }
        else if(new Date(d)>=new Date(today)){
            html+=`
            <div class="calender-day future  ${new Date(d).valueOf()===new Date(today).valueOf()?"today":""}">
            <span class="day-badge">${i}<span>일</span></span>
                <b>?</b>
            </div>`
        }
        else{
            html += `
            <div class="calender-day passed">
                <span class="day-badge">${i}<span>일</span></span>
            </div>
            `
        }
        
    }
    $html("#calender-grid",html)

}