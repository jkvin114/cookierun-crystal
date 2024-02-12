const GACHA_A_PROB = 0.453
const GACHA_CRYSTAL_PROB = 0.01863
const GACHA_CRYSTAL_STD=0.13521
const GACHA_CRYSTAL_95CI = 0.00491
const GACHA_SWORD_PROB = 0.006556
const GACHA_PEARL_PROB = 0.00207
const GACHA_OTHER_CRYSTAL_PROB = GACHA_CRYSTAL_PROB - GACHA_PEARL_PROB - GACHA_SWORD_PROB

const gacha_treasures = TREASURES.filter(tr=>tr.type === TYPE.Gacha)
let totalexp = 0
let totalexp_low = 0
let totalexp_high = 0
for(const tr of gacha_treasures){
    let expval = getExpectedValue(tr,9)
    if(tr.id===0) totalexp += expval * GACHA_PEARL_PROB
    else if(tr.id === 8) totalexp += expval * GACHA_SWORD_PROB
    else totalexp += expval * GACHA_OTHER_CRYSTAL_PROB / (gacha_treasures.length - 2)

    if(tr.id===0) totalexp_low += expval * GACHA_PEARL_PROB
    else if(tr.id === 8) totalexp_low += expval * GACHA_SWORD_PROB
    else totalexp_low += expval * (GACHA_OTHER_CRYSTAL_PROB - GACHA_CRYSTAL_95CI) / (gacha_treasures.length - 2)

    if(tr.id===0) totalexp_high += expval * GACHA_PEARL_PROB
    else if(tr.id === 8) totalexp_high += expval * GACHA_SWORD_PROB
    else totalexp_high += expval * (GACHA_OTHER_CRYSTAL_PROB + GACHA_CRYSTAL_95CI) / (gacha_treasures.length - 2)

    // console.log(totalexp)
}
const EXP_PER_CRYSTAL = totalexp * 7 / 119
const EXP_PER_CRYSTAL_LOW = totalexp_low * 7 / 119
const EXP_PER_CRYSTAL_HIGH = totalexp_high * 7 / 119

function growthFunc(initial,growth,t){
    return initial * Math.exp(growth*t)
}


function simulateGrowth(currentExpVal,dates){
    if(currentExpVal===0) return [[],0]
    const today = Date.now()
    //currentExpVal+=1 //기본 출석보상

    const expGrowth = (t) => growthFunc(currentExpVal,EXP_PER_CRYSTAL,t)
    let values = []
    for(let t=0;t<dates;++t){
        const val=expGrowth(t)
        values.push([today + 3600 * 1000 * 24 * t,val])
    }
    //console.log(str)
    
    return values
}
function errorbar(currentExpVal,dates){
    if(currentExpVal===0) return [[],0]
    const today = Date.now()
    //currentExpVal+=1 //기본 출석보상

    const expGrowthLow = (t) => growthFunc(currentExpVal,EXP_PER_CRYSTAL_LOW,t)
    const expGrowthHigh = (t) => growthFunc(currentExpVal,EXP_PER_CRYSTAL_HIGH,t)
    let values = []
    let interval = Math.floor(dates/6)
    for(let t=dates-1;t>=0;t-=interval){
        const low=expGrowthLow(t)
        const high=expGrowthHigh(t)
        values.push([today + 3600 * 1000 * 24 * t,low,high])
    }
    return values
}

function showGrowth(currentExpVal){
    let lvl9totalexp = 0
    if(currentExpVal===0) {
        showToast("보물이 없습니다")
        return
    }
    for (const elem of $(".tr-displayed")) {
        let id = Number($data(elem, "id"))
        const tr = TR_DICT.get(id)
        lvl9totalexp += getExpectedValue(tr, 9)
    }
    const dates=365
    const values = simulateGrowth(lvl9totalexp,dates)
    const sum = expGrowthIntegral(currentExpVal,dates,EXP_PER_CRYSTAL)
    const errorvalues = errorbar(lvl9totalexp,dates)
    if(values.length===0) return
    
    gtag("event", "growth", {})

    $removeClass("#growth-container","hidden")
    $addClass("#sim-result-container","hidden")
    
    let oneyear = values.at(-1)[1]
    let halfyear = values[182][1]
    let onemonth = values[30][1]
    const elems = $(".growth-val")
    elems[0].innerHTML = round(currentExpVal,-2)
    elems[1].innerHTML = round(lvl9totalexp,-2)

    elems[2].innerHTML = round(onemonth,-2)
    elems[3].innerHTML = round(halfyear,-2)
    elems[4].innerHTML = round(oneyear,-2)
    elems[5].innerHTML = round(sum)
    let sum_high = expGrowthIntegral(currentExpVal,dates,EXP_PER_CRYSTAL_HIGH)

    $html("#growth-error","(± " + round(errorvalues[0][2] - oneyear,-2) + ")")
    $html("#growth-sum-error","(± " + round(sum_high - sum,-2) + ")")

    Highcharts.chart('growth-graph', {
        style: {
			fontSize: "20px",
		},
        title: {
            text: '크리스탈 기댓값 성장 예측(1년)',
            align: 'left'
        },
        chart: {
			backgroundColor: "#f5f3ee",
			margin: [50, 80, 90, 10],
		},
        yAxis: {
            title: {
                text: '하루 크리스탈 기댓값'
            },
            labels:{
                    
                style: {
                    fontSize: "20px",
                }
            },
            opposite:true
        },
        xAxis: {
            type: 'datetime',
            labels:{
                    
                style: {
                    fontSize: "13px",
                },
                format:'{value:%y-%m}월'
            },
        },
        tooltip: {
			enabled: false, // Disable tooltips
		},
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        },
        series: [{
            name: '하루 기댓값',
            data: values
        },
        {
            name: '오차범위',
            data: errorvalues,
            type: 'errorbar',
            whiskerLength:13
        },
    ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                }
            }]
        }
    });
}