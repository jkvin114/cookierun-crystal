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
            return "img/squirrel/tr-squirrel-1.png"
        case SQUIRREL_REWARD.Treasure2:
            return "img/squirrel/tr-squirrel-2.png"
        case SQUIRREL_REWARD.Treasure3:
            return "img/squirrel/tr-squirrel-3.png"
        case SQUIRREL_REWARD.Treasure4:
            return "img/tr/28.png"
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
            return "진심어린 축하 폭죽"
        case SQUIRREL_REWARD.Treasure2:
            return "고농축 도토리 드링크"
        case SQUIRREL_REWARD.Treasure3:
            return "말랑말랑 젤리 탕후루"
        case SQUIRREL_REWARD.Treasure4:
            return "반짝이는 크리스탈 보석함"
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