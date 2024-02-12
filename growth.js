const GACHA_A_PROB = 0.453
const GACHA_CRYSTAL_PROB = 0.01863
const GACHA_SWORD_PROB = 0.006556
const GACHA_PEARL_PROB = 0.00207
const GACHA_OTHER_CRYSTAL_PROB = GACHA_CRYSTAL_PROB - GACHA_PEARL_PROB - GACHA_SWORD_PROB

const gacha_treasures = TREASURES.filter(tr=>tr.type === TYPE.Gacha)
let totalexp = 0
for(const tr of gacha_treasures){
    let expval = getExpectedValue(tr,9)
    if(tr.id===0) totalexp += expval * GACHA_PEARL_PROB
    else if(tr.id === 8) totalexp += expval * GACHA_SWORD_PROB
    else totalexp += expval * GACHA_OTHER_CRYSTAL_PROB / gacha_treasures.length

    // console.log(totalexp)
}
const EXP_PER_7_GACHA = totalexp * 7

const EXP_PER_CRYSTAL = EXP_PER_7_GACHA / 119
// console.log(EXP_PER_CRYSTAL)
function simulateGrowth(currentExpVal,dates){
    if(currentExpVal===0) return [[],0]
    const today = Date.now()
    currentExpVal+=1 //기본 출석보상

    const expGrowth = (t) => currentExpVal * Math.exp(EXP_PER_CRYSTAL*t)

    let values = []
    for(let t=0;t<dates;++t){

        values.push([today + 3600 * 1000 * 24 * t,expGrowth(t)])
    }
    const sum = expGrowthIntegral(currentExpVal,dates)
    return [values,sum]
}


function showGrowth(currentExpVal){
    let lvl9totalexp = 0

    for (const elem of $(".tr-displayed")) {
        let id = Number($data(elem, "id"))
        const tr = TR_DICT.get(id)
        lvl9totalexp += getExpectedValue(tr, 9)
    }

    const [values,sum] = simulateGrowth(lvl9totalexp,365)
    if(values.length===0) {
        showToast("보물이 없습니다")
        return
    }

    
    gtag("event", "growth", {})

    $removeClass("#growth-container","hidden")
    $addClass("#sim-result-container","hidden")
    
    let oneyear = values.at(-1)[1]
    let halfyear = values[182][1]
    let onemonth = values[30][1]
    const elems = $(".growth-val")
    elems[0].innerHTML = round(currentExpVal,-1)
    elems[1].innerHTML = round(lvl9totalexp,-1)

    elems[2].innerHTML = round(onemonth,-1)
    elems[3].innerHTML = round(halfyear,-1)
    elems[4].innerHTML = round(oneyear,-1)
    elems[5].innerHTML = round(sum,-1)


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
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                }
            }]
        }
    });
}