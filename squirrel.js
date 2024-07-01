const SQUIRREL_REWARD = {
	Powder: 0,
	IngredientS: 1,
	IngredientSS: 2,
	Ticket: 3,
	Treasure1:4, //폭죽
	Treasure2:5,// 드링크
	Treasure3:6,//탕후루
	Treasure4:7//보석함
}
function getSquirrelReward() {
	return chooseWeightedRandom([40,30,10,14.5,2,1.5,1.2,0.8])
}

const SQUIRREL_DRAW_STATE = {
	crystalSpend: 0,
    otherCount:[0,0,0,0]
}
function resetSquirrelGachaState(){
    SQUIRREL_DRAW_STATE.crystalSpend = 0
    SQUIRREL_DRAW_STATE.otherCount = [0,0,0,0]
    $html("#squirrel-treasures-drawn","")
    onAfterSquirrelDraw()
}

function getSquirrelRewardImg(id){
    switch(id){
        case SQUIRREL_REWARD.Powder:
            return "img/squirrel/powder.png"
        case SQUIRREL_REWARD.IngredientS:
            return "img/squirrel/ingredient-s.png"
        case SQUIRREL_REWARD.IngredientSS:
            return "img/squirrel/ingredient-ss.png"
        case SQUIRREL_REWARD.Ticket:
            return "img/squirrel/tr-ticket.png"
        case SQUIRREL_REWARD.Treasure1:
            return "img/squirrel/1.png"
        case SQUIRREL_REWARD.Treasure2:
            return "img/squirrel/2.png"
        case SQUIRREL_REWARD.Treasure3:
            return "img/squirrel/3.png"
        case SQUIRREL_REWARD.Treasure4:
            return "img/tr/33.png"
    }
}
function getSquirrelRewardName(id){
    switch(id){
        case SQUIRREL_REWARD.Powder:
            return "마법가루"
        case SQUIRREL_REWARD.IngredientS:
            return "S급 재료"
        case SQUIRREL_REWARD.IngredientSS:
            return "SS급 재료"
        case SQUIRREL_REWARD.Ticket:
            return "최고급 보물뽑기권"
        case SQUIRREL_REWARD.Treasure1:
            return "다람쥐의 마법모래 유리병"
        case SQUIRREL_REWARD.Treasure2:
            return "다람쥐의 힘나는 코코넛 음료"
        case SQUIRREL_REWARD.Treasure3:
            return "다람쥐의 소라조개 목걸이"
        case SQUIRREL_REWARD.Treasure4:
            return "다람쥐의 크리스탈 에이드 디스펜서"
    }
}
function addSquirrelState(rewards){
    if(rewards.length===0) return
    let html =''
    for (const id of rewards) {
        if(id>=4)
            html += `<img class='squirrel-reward-img' src='${getSquirrelRewardImg(id)}'>`
        else{
            SQUIRREL_DRAW_STATE.otherCount[id] +=1
        }
    }
    $append($one("#squirrel-treasures-drawn"),html)
}

function simulateSquirrelDraw(crystals){
    if(crystals < 20) return
    $html("#squirrel-placeholder","")

    gtag("event", "squirrel-sim")

    let count = Math.floor(crystals/20)

    resetSquirrelGachaState()
    let alltrs = []
    for(let i=0;i<count;++i){
        alltrs.push(getSquirrelReward())
    }
    SQUIRREL_DRAW_STATE.crystalSpend += count * 20
    addSquirrelState(alltrs)
    onAfterSquirrelDraw()
}
function onAfterSquirrelDraw(){
    $html(".squirrel-crystal-spent-total",SQUIRREL_DRAW_STATE.crystalSpend)
    for(let i=0;i<4;++i){
        $html("#squirrel-other-count-"+i,"x "+SQUIRREL_DRAW_STATE.otherCount[i])
    }
}
function squirrelDraw() {
	gtag("event", "squirrel-draw")
    $html("#squirrel-placeholder","")
	let id = getSquirrelReward()
    SQUIRREL_DRAW_STATE.crystalSpend +=  20

	$removeClass("#squirrel-modal", "hidden")
    $html("#squirrel-modal-result",`<img class='squirrel-reward-img' src='${getSquirrelRewardImg(id)}'>`)
    $html("#squirrel-modal-result-text",getSquirrelRewardName(id))
    addSquirrelState([id])
    onAfterSquirrelDraw()
}