const EMPTY="EMPTY"
function genAttendenceReward(){
    let treasures = []
    for (const elem of $(".tr-displayed")) {
        let id = Number($data(elem, "id"))
        let lvl = Number($data(elem, "lvl"))
        const tr = TR_DICT.get(id)
        let amt = sample(tr, lvl)
        if(amt>0)
        treasures.push([id,lvl])
    }
    return treasures
}
function encodeReward(treasures){
    let str = ""
    for(const [id,lvl] of treasures){
        str += `${id}-${lvl},`
    }
    if(str==="") str=EMPTY
    return btoa(str)
}
function decodeRewardAndShow(encodedString){
    var str = atob(encodedString)
    if(str===EMPTY){
        showAttendence([])
        return
    }
	const trs = str.split(",")
    let treasures=[]
	for (const tr of trs.reverse()) {
		if (!tr || tr === "") continue
        const [id,lvl] = tr.split("-")
		treasures.push([Number(id),Number(lvl)])
	}
    console.log(treasures)

    showAttendence(treasures)
}
function showAttendence(treasures){
    State.attendanceReward = encodeReward(treasures)
    onModalOpen()
    $removeClass("#attendance-modal","hidden")
    let str = ''
    let total =0
    for(const [id,lvl] of treasures){
        const tr = TR_DICT.get(id)
        const [amt,_] = getValues(tr,lvl)
        total +=  amt
        str+=`
        <div class="reward-item">
        <div class="tr">
        ${treasureBody(tr,lvl)}
          </div>
        <div style="padding-top: 7px;">
            <span><<b>${tr.name}</b>>의 효과로</span><br>
            <span class="reward-item-amt">${amt} 크리스탈이 지급되었습니다</span>
        </div>
    </div>`
    }
    if(total===0)
    str = "<img src='img/squirrel.png' id='squirrel'><span id='squirrel-text'>꽝이다찌</span>"
    $html("#attendance-total-val",total)
    $html("#reward-container",str)

}
