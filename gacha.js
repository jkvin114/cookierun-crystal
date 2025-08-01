function getSCount() {
	return [3, 4, 5, 6, 7][chooseWeightedRandom([50.13, 27.31, 16.35, 5.44, 0.78])]
}
const A_PROB = 0.5524
const S_PROB = 1 - A_PROB
function drawATreasureId() {
	let rand = Math.random()
	if (rand < 0.0018 / A_PROB) return 0
	return -1
}
const TR_PROBS = [
	0,
	0.08 / S_PROB,
	0.08 / S_PROB,
	0.08 / S_PROB,
	0.08 / S_PROB,
	0.11 / S_PROB,
	0.11 / S_PROB,
	0.11 / S_PROB,
	0.57 / S_PROB,
	97.289,
]

const DRAW_STATE = {
	crystalSpend: 0,
    expValue:0,
    coinNeeded:0
}

function drawSTreasureId() {
	let idx = chooseWeightedRandom([...TR_PROBS])
	if (idx >= 9) return -2
	return idx
}
function draw7Treasures() {
	let scount = getSCount()
	let trs = [] //-1: A, -2:B

	//s treasure
	for (let i = 0; i < scount; ++i) {
		trs.push(drawSTreasureId())
	}
	//a treasure
	for (let i = 0; i < 7 - scount; ++i) {
		trs.push(drawATreasureId())
	}

	return shuffle(trs)
}

function setResultTreasures(trs) {
	let html = ""
	for (const tr of trs) {
		if (tr === -1) {
			html += `<div class="tr dark">
                <img src="img/frame-a.png">
                <b class="tr-unknown">?</b>
            </div>`
		} else if (tr === -2) {
			html += `<div class="tr dark">
                <img src="img/frame.png">
                <b class="tr-unknown">?</b>
            </div>`
		} else {
			const trobj = TR_DICT.get(tr)
			html += `<div class="tr">
                ${treasureBody(trobj)}
            </div>`
		}
	}
	$html(".gacha-treasure-container", html)
    $html(".gacha-crystal-spent",DRAW_STATE.crystalSpend)
}
function resetGachaState(){
    DRAW_STATE.crystalSpend = 0
    DRAW_STATE.expValue = 0
    DRAW_STATE.coinNeeded=0
    $html("#gacha-treasures-drawn","")
    $html(".gacha-treasure-container", "")
    $html(".gacha-crystal-spent",0)
    $html(".gacha-crystal-spent-total",0)
    $html(".gacha-expval",0)
}
function updateTreasureState(newtrs){
    if(newtrs.length===0) return
    let html =''
    for (const tr of newtrs) {
        if(tr<0) continue
        const trobj = TR_DICT.get(tr)
        html += `<div class="tr">
            ${treasureBody(trobj)}
        </div>`
    }
    $append($one("#gacha-treasures-drawn"),html)
}

function simulateDraw(crystals){
    if(crystals < 119) return
    crystals -= 119
    let count = Math.floor(crystals/108) + 1
    resetGachaState()
    let alltrs = []
    for(let i=0;i<count;++i){
        let result = draw7Treasures()
        for (const tr of result) {
            if(tr<0) continue
            const trobj = TR_DICT.get(tr)
            DRAW_STATE.expValue += getExpectedValue(trobj,9)
            DRAW_STATE.coinNeeded += (trobj.a ? fullUpgradeExpCoinsA[0]: fullUpgradeExpCoins[0])
        }
        alltrs.push(...result.filter(t=>t>=0))
    }
    DRAW_STATE.crystalSpend += 119 + (count-1) * 108
    updateTreasureState(alltrs)
    onAfterDraw()
}
function onAfterDraw(){
    let lvl9coins10K = Math.floor(DRAW_STATE.coinNeeded/10000)
    $html(".gacha-coins",`${lvl9coins10K}만 ${DRAW_STATE.coinNeeded%10000}`)
    $html(".gacha-crystal-spent-total",DRAW_STATE.crystalSpend)
    $html(".gacha-expval",round(DRAW_STATE.expValue,-2))
}
function draw() {
	gtag("event", "gacha-draw")
	let result = draw7Treasures()
	setResultTreasures(result)
	$removeClass("#gacha-modal", "hidden")
    updateTreasureState(result.filter(t=>t>=0))
    for (const tr of result) {
        if(tr<0) continue
        const trobj = TR_DICT.get(tr)
        DRAW_STATE.expValue += getExpectedValue(trobj,9)

        DRAW_STATE.coinNeeded += (trobj.a ? fullUpgradeExpCoinsA[0]: fullUpgradeExpCoins[0])
    }
    onAfterDraw()
}

function drawFirst() {
    if(DRAW_STATE.crystalSpend==0)
        $html("#gacha-treasures-drawn","")
    DRAW_STATE.crystalSpend += 119
	draw()
}

function drawAgain() {
    DRAW_STATE.crystalSpend += 108
	draw()
}
