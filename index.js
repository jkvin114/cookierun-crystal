const State = {
	selectionOpen: true,
	settingOpen: false,
	maxSerial: 0,
	settingSerial: -1,
	settingLvl: -1,
	settingTr: -1,
	resultHidden:false,
	currentExpVal:0,
	attendanceReward:"",
	isGridView:true,
	simulatedRewards:null,  //[보상갯수, 횟수] (내림차순으로 정렬됨)
	simulatedRewardDict:null,  //보상갯수 => 횟수
	simulatedTotal:1, //총 시뮬레이션 횟수
	maxReward:1,
	isUpdatedAfterLastSim:true, //
	currentAttendanceCount:0 //마지막 출석보상 생성 결과
}
const sleep = (m) => new Promise((r) => setTimeout(r, m))

const TR_DICT = new Map() // id => treasure obj
function isMobile() {
	return window.innerWidth < 700
}
function setSetting(id, lvl) {
	$addClass("#tr-setting-empty-tr", "hidden")
	$removeClass("#tr-setting-tr", "hidden")
	const tr = TR_DICT.get(Number(id))
	let html = treasureBody(tr, lvl)
	//console.log(lvl)
	const name = !isRewardTr(tr) ? tr.name : getRewardTreasureName(tr.minscore)
	$html("#tr-setting-tr-name", name)
	$html("#tr-setting-tr", html)
	$html("#tr-setting-desc", getDesc(tr, lvl))
	$html("#tr-setting-exp", getExpectedValue(tr, lvl))
	$removeClass(".tr-btn", "disabled")
	$removeClass(".tr-btn", "selected")
	$addClass("#tr-" + lvl + "-btn", "selected")
	$removeClass("#tr-next-btn", "disabled")
}

function onModalOpen() {
	if (isMobile()) {
		$removeClass(".shadow", "hidden")
	}
	$addClass("html", "scroll-lock")
}
function onModalClose() {
	$addClass(".shadow", "hidden")
	$removeClass("html", "scroll-lock")
}
function openSetting(id, lvl, serial) {
	State.settingSerial = serial
	State.settingLvl = lvl
	State.settingTr = id
	if (id !== null) setSetting(id, lvl)
	$removeClass("#tr-setting", "hidden")
	$addClass(".tr-setting-container", "hidden")
	$removeClass("#tr-one-setting", "hidden")
	$removeClass(".tr-displayed", "active")
	$addClass("#_tr-" + serial, "active")
	onModalOpen()
	$html("#modal-title", "보물 수정")
	$html("#tr-one-setting-serial", "#" + serial)
}
function openSelection() {
	$removeClass("#tr-setting", "hidden")
	$addClass(".tr-setting-container", "hidden")
	$removeClass("#tr-selection", "hidden")
	onModalOpen()
	$html("#modal-title", "보물 추가")
}

function closeModal() {
	closeAttendance()
	$addClass("#tr-setting", "hidden")
	$addClass("#record-dialog-modal","hidden")

	onModalClose()
}
function removeTreasure() {
	if (State.settingTr === -1) return
	$one("#_tr-" + State.settingSerial).remove()
	if (isMobile()) {
		closeModal()
	} else openNextTreasure()
	onTreasureChange()
}

function getCount() {
	let count = prompt("복제할 갯수를 입력하세요", "1")
	if (count === null) return 0
	if (Number(count) < 1 || Number(count) > 100 || isNaN(Number(count))) {
		showToast("1~100 사이의 숫자를 입력하세요")
		return 0
	}
	return Number(count)
}
function copyTreasure() {
	if (State.settingTr === -1) return
	let count = getCount()
	if (count <= 0) return

	for (let i = 0; i < count; ++i) addTreasure(Number(State.settingTr), Number(State.settingLvl))
	// openSetting(Number($data(node, "id")), Number($data(node, "lvl")), Number($data(node, "serial")))
	clearSetting()
	if (isMobile()) {
		closeModal()
	}
	gtag("event", "tr_copy", { count: count })
}

function setTreasureLvl(lvl) {
	if (State.settingTr === -1) return

	if (State.settingLvl < 0 || State.settingLvl === lvl) return
	changeTreasureLvl(lvl,State.settingSerial)
	State.settingLvl = lvl
	setSetting(State.settingTr, lvl)
	onTreasureChange()
	//gtag("event", "tr_level_change", {})
}


function changeTreasureLvl(lvl,serial){
	$data($one("#_tr-" + serial), "lvl", String(lvl))

	let elem = $one("#_tr-" + serial + " .tr-lvl")
	if (elem) {
		if (lvl === 0) elem.remove()
		else if (lvl === 9) {
			elem.classList.add("lvl-9")
			elem.innerHTML = "+9"
		} else {
			elem.classList.remove("lvl-9")
			elem.innerHTML = "+" + lvl
		}
	} else if (lvl > 0) {
		let html = ` <b class="tr-lvl ${lvl === 9 ? "lvl-9" : ""}">+${lvl}</b>`
		$append($one("#_tr-" + serial), html)
	}
}

function openNextTreasure(stopOnNotFound) {
	let start = State.settingSerial - 1
	if (State.settingSerial === -1) start = State.maxSerial

	let next = null
	for (let i = start; i >= 0; --i) {
		next = $one("#_tr-" + i)
		if (next) break
	}

	if (next && $hasClass(next, "tr-displayed")) {
		openSetting(Number($data(next, "id")), Number($data(next, "lvl")), Number($data(next, "serial")))
	} else if (!stopOnNotFound) {
		clearSetting()
	}
}
function goNextTreasure() {
	if (State.settingSerial === -1) return
	openNextTreasure(true)
}
function settingEventListener() {
	for (let i = 0; i <= 9; ++i) {
		$onclick("#tr-" + i + "-btn", () => setTreasureLvl(i))
	}
	$onclick("#tr-copy-btn", copyTreasure)
	$onclick("#tr-remove-btn", removeTreasure)
	$onclick("#tr-next-btn", goNextTreasure)
}

function addTreasure(id, lvl) {
	const tr = TR_DICT.get(id)
	let node = $node(displayedTreasure(tr, lvl, State.maxSerial))
	node.addEventListener("click", (e) =>
		openSetting(
			Number($data(e.currentTarget, "id")),
			Number($data(e.currentTarget, "lvl")),
			Number($data(e.currentTarget, "serial"))
		)
	)

	State.maxSerial++
	$one("#tr-add-btn").after(node)
	$addClass(".empty-tr-temp", "hidden")
	onTreasureChange()
	return node
}

function clearSetting() {
	$removeClass("#tr-setting-empty-tr", "hidden")
	$addClass("#tr-setting-tr", "hidden")
	$html("#tr-setting-desc", "..")
	$html("#tr-setting-exp", "?")
	$addClass(".tr-btn", "disabled")
	$removeClass(".tr-btn", "selected")
	$html("#tr-setting-tr-name", "보물을 선택하세요")
	$removeClass(".tr-displayed", "active")
	$addClass("#tr-next-btn", "disabled")
	;(State.settingSerial = -1), (State.settingLvl = -1), (State.settingTr = -1)
}

function updateTreasureSummary(){
	let trs = $("#treasures .tr-displayed")
	const counter = new Map() //id => count
	for(const tr of trs){
		let id = $data(tr,"id")
		if(counter.has(id))
		{
			counter.set(id,counter.get(id)+1)
		}
		else{
			counter.set(id,1)
		}
	}
	const list = []
	for(const [id,count] of counter.entries()){
		list.push({id:id,count:count})
	}
	list.sort((a,b)=>b.count-a.count)
	let htmlmulti = ""
	let htmlsingle = ""
	for(const {id,count} of list){
		if(count <=1){
			htmlsingle+=`
			<div class="tr-summary-item single">
				<div class="tr">
					${treasureBody(TR_DICT.get(Number(id)), 0)}
				</div>
			</div>`
		}
		else{
			htmlmulti+=`
			<div class="tr-summary-item">
				<div class="tr">
					${treasureBody(TR_DICT.get(Number(id)), 0)}
				</div>
				<b>x ${count}</b>
			</div>`
		}

	}
	$html("#tr-summary-multi",htmlmulti)
	$html("#tr-summary-single",htmlsingle)

}
function main() {
	$addClass(".tr-btn", "disabled")
	addDragEvent()
	initSelectionWindow()
	clearSetting()
	if (isMobile()) closeModal()

	$onclick(".tr-selection", function (e) {

		if($one("#enter-count-checkbox").checked){
			let count = prompt("추가할 갯수를 입력하세요", "1")
			if (count===null || Number(count) < 1 || Number(count) > 100 || isNaN(Number(count))) {
				showToast("1~100 사이의 숫자를 입력하세요")
			}
			else{
				let id = Number($data(e.currentTarget, "id"))
				for(let i=0;i<count;++i){
					addTreasure(id, $one("#lvl-9-checkbox").checked ? 9 : 0)
				}
				showToast(`보물 ${count}개를 추가했습니다`)
				window.scroll(0, 0)
			}

			return
		}

		//if($data(e.target,"longpressed")==="true") return
		if (isMobile()){
			showToast("보물을 추가했습니다")
		}
		
		//$addClass("#tr-setting", "hidden")
		//onModalClose()
		let id = Number($data(e.currentTarget, "id"))
		// console.log(id)

		addTreasure(id, $one("#lvl-9-checkbox").checked ? 9 : 0)
		window.scroll(0, 0)
	})
	


	$onclick("#tr-setting-close", closeModal)
	
	$onclick("#tr-add-btn", function () {
		$removeClass("#tr-setting", "hidden")
		openSelection()
	})
	$onclick("#tr-add-floating-btn", function () {
		$removeClass("#tr-setting", "hidden")
		openSelection()
	})
	$onclick(".tr-btn", function () {
		if (isMobile()) closeModal()
	})
	$onclick("#gacha-modal-close",function(){
		$addClass("#gacha-modal", "hidden")
	})
	$onclick("#gacha-modal-open-btn",openGacha)
	$onclick("#gacha-btn", drawFirst)
	$onclick("#more-gacha-btn", drawAgain)

	$onclick("#squirrel-modal-close",function(){
		$addClass("#squirrel-modal", "hidden")
	})
	$onclick("#squirrel-modal-open-btn",openSquirrel)
	$onclick("#squirrel-btn", squirrelDraw)
	$onclick("#squirrel-btn-2", squirrelDraw)


	$onclick("#clear-btn", removeAll)
	$onclick("#save-btn", save)
	$onclick("#share-btn", share)
	$onclick("#load-btn", function(){
		load(false)
	})
	$onclick(".shadow", closeModal)
	$onclick("#sim-btn", simulate)
	$onclick("#attendance-sim-btn",()=>{
		showToast("확률 계산 중....")
		simulate()
	})
	settingEventListener()
	try{

		let query = new URLSearchParams(window.location.search)
		if (query.has("state")) decodeState(query.get("state"))
		else load(true)
		if (query.has("reward")) decodeRewardAndShow(query.get("reward"))
	}
	catch(e){
		console.error(e)
	}

	$one("#lvl-9-checkbox").addEventListener("change", function (e) {
		change9Checkbox(e.currentTarget.checked)
	})
	$onclick("#check-prob-btn", checkProb)
	$onclick("#to-lvl9-btn",toLvl9)
	$onclick("#result-hide-btn",toggleResult)
	// $onclick(".counter",function(e){
	// 	e.currentTarget.innerHTML = Number(e.currentTarget.innerHTML) + 1
	// })
	$onclick("#growth-btn",()=>showGrowth(State.currentExpVal))
	$onclick("#attend-btn",()=>{
		gtag("event", "attendance", {})
		let rewards = genAttendenceReward()
		showAttendence(rewards)
	})
	$onclick("#close-attend-btn",closeAttendance)
	$onclick("#share-attend-btn",share)
	$onclick("#gacha-sim-btn",function(){
		gtag("event", "gacha-sim")
		let num = Number($one("#gacha-sim-input").value)
		if (!num || isNaN(num) || num < 119 || num > 100000) {
			showToast("119 ~ 100,000 사이 숫자를 입력하세요")
			return
		}
		simulateDraw(num)
	})
	$onclick("#gacha-reset-btn",resetGachaState)

	$onclick("#grid-btn",function(){
		if(State.isGridView) return
		State.isGridView = true
		$removeClass(".view-type-img","active")
		$addClass("#grid-btn svg","active")
		$removeClass("#treasures","hidden")
		$addClass("#treasures-summary-container","hidden")
		$removeClass("#tr-add-floating-btn","hidden")
	})
	$onclick("#summary-btn",function(){
		if(!State.isGridView) return
		State.isGridView = false
		$removeClass(".view-type-img","active")
		$addClass("#summary-btn svg","active")
		$addClass("#treasures","hidden")
		$removeClass("#treasures-summary-container","hidden")
		$addClass("#tr-add-floating-btn","hidden")

		updateTreasureSummary()
	})
	$onclick("#squirrel-reset-btn",resetSquirrelGachaState)

	$onclick("#squirrel-sim-btn",function(){
		let num = Number($one("#squirrel-sim-input").value)
		if (!num || isNaN(num) || num < 20 || num > 10000) {
			showToast("20 ~ 10,000 사이 숫자를 입력하세요")
			return
		}
		simulateSquirrelDraw(num)
	})
	$onclick("#record-dialog-close",function(){
		$addClass("#record-dialog-modal","hidden")
		onModalClose()
	})
	$onclick("#record-dialog-confirm",function(){
		let num = Number($one("#record-dialog-input").value)
		if (!num || isNaN(num) || num < 1) {
			showToast("1이상 숫자를 입력하세요")
			return
		}
		addTodayRecord(num)
		$addClass("#record-dialog-modal","hidden")
		onModalClose()
		openRecord()
		window.location.href="#record-container"
	})
	$onclick("#record-open-btn",openRecord)
	tryOpenRecordDialog()
	$onclick("#open-record-dialog-btn",tryOpenRecordDialog)
	$onclick("#record-dialog-prob",function(){
		gtag("event", "check_prob", {})
		if(State.isUpdatedAfterLastSim){
			simulate()
		}
		else{
			updateRecordDialogAfterSim()
		}
	})
}

window.onload = main

function tryOpenRecordDialog(){
    if(!shouldDisplayAttendenceInput()) return
    $removeClass("#record-dialog-modal","hidden")
    onModalOpen()
}
function shareAttendance(){

}
function closeAttendance(){
	$addClass("#attendance-modal","hidden")
	State.attendanceReward=""
	onModalClose()
}

function toggleResult(){
	if(State.resultHidden){
		State.resultHidden=false
		$removeClass("#hidden-result","hidden")
		$html("#result-hide-btn","숨기기 &#9664;")

	}
	else{
		const floatbtn = $one("#exp-floating-btn")
		if(floatbtn.style.display==="none"){
			floatbtn.style.display = "flex"
			floatbtn.style.left = "40px"
			floatbtn.style.bottom = "50px"
		}

		State.resultHidden=true
		$addClass("#hidden-result","hidden")
		$html("#result-hide-btn","펼치기 &#9660;")

	}
}
function change9Checkbox(checked) {
	if (checked) $removeClass(".tr-selection .lvl-9", "hidden")
	else $addClass(".tr-selection .lvl-9", "hidden")
}
function toLvl9(){
	if (!confirm("정말 모든 보물을 9강으로 변경하시겠습니까?")) return
	for (const elem of $(".tr-displayed")) {
		let serial = Number($data(elem, "serial"))
		changeTreasureLvl(9,serial)
	}
	onTreasureChange()
	window.scroll(0, 0)

}

function selectionTreasure(tr) {
	let isReward = isRewardTr(tr)
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	let name = !isReward ? tr.name : getRewardTreasureName(tr.minscore)
	let passivestr =tr.fullImage?"":`<img class="tr-img" src="img/passive.png">`
	return `
    <div class="tr tr-selection" title="${name}" data-id='${tr.id}'  data-long-press-delay="500">
        <img src="img/${tr.a ? "frame-a" : "frame"}.png">
        <img class="tr-img" src="${getImg(tr)}">
        ${passivestr}
		<b class="tr-lvl lvl-9 hidden">+9</b>
    </div>
    `
	//        <b class="tr-add-hover">+</b>
}
function displayedTreasure(tr, lvl, serial) {
	if (!lvl) lvl = 0

	//let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	//if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	return `
    <div class="tr tr-displayed" data-id='${tr.id}' data-lvl='${lvl}' data-serial='${serial}' id='_tr-${serial}'>
       ${treasureBody(tr, lvl)}
    </div>
    `
}
/*
 <img src="img/${tr.a ? "frame-a" : "frame"}.png">
        <img class="tr-img" src="${src}">
        <img class="tr-img" src="img/passive.png">
        ${lvl > 0 ? `<b class="tr-lvl ${lvl === 9 ? "lvl-9" : ""}">+${lvl}</b>` : ""}*/

function treasureBody(tr, lvl) {
	if (!lvl) lvl = 0
	let isReward = isRewardTr(tr)
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	let lvl9 = lvl === 9 ? "lvl-9" : ""
	let passivestr =tr.fullImage?"":`<img class="tr-img" src="img/passive.png">`
	let lvltext = lvl > 0 ? '<b class="tr-lvl ' + lvl9 + '">+' + lvl + "</b>" : ""
	return ` <img src="img/${tr.a ? "frame-a" : "frame"}.png">
    <img class="tr-img" src="${getImg(tr)}">
    ${passivestr}
    ${lvltext}`
}

function initSelectionWindow() {
	let $gacha = ""
	let $cookiepet = ""
	let $limited = ""
	let $level = ""
	let $reward = ""
	let $trophy=""

	for (const tr of TREASURES) {
		TR_DICT.set(tr.id, tr)
		const str = selectionTreasure(tr)
		if (tr.type === TYPE.Gacha) $gacha += str
		else if (tr.type === TYPE.CookiePet) $cookiepet += str
		else if (tr.type === TYPE.Limited) $limited += str
		else if (tr.type === TYPE.Level) $level += str
		else if (tr.type === TYPE.Trophy) $trophy += str
	}
	for (const tr of REWARD_TREASURES) {
		TR_DICT.set(tr.id, tr)
		$reward += selectionTreasure(tr)
	}
	$one("#tr-selection-gacha").innerHTML = $gacha
	$one("#tr-selection-cookiepet").innerHTML = $cookiepet

	$one("#tr-selection-limited").innerHTML = $limited

	$one("#tr-selection-level").innerHTML = $level
	$one("#tr-selection-reward").innerHTML = $reward
	$one("#tr-selection-trophy").innerHTML = $trophy

}
function removeAll() {
	if (!confirm("정말 모든 보물을 삭제하시겠습니까?")) return

	clearSetting()
	$(".tr-displayed").forEach((e) => e.remove())
	onTreasureChange()
	$removeClass(".empty-tr-temp", "hidden")
	clearSearchQueryString()
	gtag("event", "remove_all", {})
	updateTreasureSummary()
}
function clearSearchQueryString() {
	const newUrl = window.location.origin + window.location.pathname
	window.history.replaceState({}, document.title, newUrl)
}

function decodeState(encodedString) {
	var str = atob(encodedString)

	const trs = str.split(",")
	for (const tr of trs.reverse()) {
		if (!tr || tr === "") continue
		const [id, lvl] = tr.split("-")
		addTreasure(Number(id), Number(lvl))
	}
}

function encodeCurrentState() {
	let str = ""
	for (const elem of $(".tr-displayed")) {
		let id = Number($data(elem, "id"))
		let lvl = Number($data(elem, "lvl"))
		str += `${id}-${lvl},`
	}
	var encodedString = btoa(str)

	return encodedString
}

let toastTimeout = null
function showToast(msg) {
	if (toastTimeout) clearTimeout(toastTimeout)

	const toast = document.getElementById("toast")
	toast.textContent = msg
	toast.classList.add("show")
	toastTimeout = setTimeout(() => $one("#toast").classList.remove("show"), 1500) // Adjust the duration as needed (in milliseconds)
}

function save() {
	const str = encodeCurrentState()
	if(!str || str===""){
		showToast("저장할 세팅이 없습니다")
		return
	}
	if (!confirm("세팅을 브라우저에 저장하시겠습니까? 기존에 저장한 세팅은 삭제됩니다.")) return
	gtag("event", "save", {})

	
	// console.log(str)
	localStorage.setItem("cookierun-crystal-state", str)
	// alert("세팅이 브라우저에 저장되었습니다")
	showToast("세팅이 브라우저에 저장되었습니다")
}
function share() {
	let str = encodeCurrentState()
	let rewardstr = State.attendanceReward
	let link = window.location.href.split("?")[0]+"?" + (str===""?"" : ("state=" + str)) 
	+ (rewardstr===""?"":("&reward=" + rewardstr))

	navigator.clipboard.writeText(link).then(() => {
		showToast("링크가 클립보드에 복사되었습니다")
	})
	//window.history.replaceState({}, document.title, link)
	gtag("event", "share", {})

	// $html("#share-area", link)
}
function load(isInitial) {
	let str = localStorage.getItem("cookierun-crystal-state")
	if (!isInitial && (!str || str === "")) {
		showToast("저장된 세팅이 없습니다")
		return
	}
	if(!isInitial)
		gtag("event", "load", {})

	if (!isInitial && !confirm("저장된 세팅을 불러오시겠습니까? 현재 세팅은 삭제됩니다.")) return
	$(".tr-displayed").forEach((e) => e.remove())
	clearSetting()
	decodeState(str)
	window.scroll(0, 0)
}

function pToPercent(p,digit) {
	if(!digit) digit=-6
	let result = round(p * 100, digit)
	if (Math.abs(0 - result) < 0.0000001) result = "0.000001% 미만"
	else result += "%"
	return result
}

/**
    recalculate total expected value * 
 */
function onTreasureChange() {
	const [maxamt, totalexp, maxprob, minprob,lvl9exp] = calcStats()
	$html("#total-exp", round(totalexp, -4))
	$html("#total-exp-2", round(totalexp, -2))

	State.currentExpVal = totalexp
	$html("#total-max", maxamt)
	$html("#total-min-prob", pToPercent(minprob))
	$html("#total-max-prob", pToPercent(maxprob))
	let months= $(".months-val")
	let mohthtotal = totalexp * 30
	months[0].innerHTML = Math.floor(mohthtotal/20)
	let val1= Math.floor(mohthtotal/25)
	let val2 = (Math.floor(mohthtotal/20))
	months[1].innerHTML = val1===val2 ? val1 :  val1+"~" +val2
	
	val1= Math.floor(mohthtotal/119)
	val2 = (Math.floor(mohthtotal/108))
	months[2].innerHTML = val1===val2 ? val1 :  val1+"~" +val2


	let x = Math.round((totalexp * 55000 - 148231) / 141048) + 1
	months[3].innerHTML = 119 + 108*(x-1)
	months[4].innerHTML = x

	if(lvl9exp > totalexp*1.05){
		$removeClass(".lvl-9-summary","hidden")
		$html(".lvl-9-summary-exp",pToPercent((lvl9exp - totalexp) / totalexp,-2))
		$html(".lvl-9-summary-diff",`${round(lvl9exp,-2)}`)

	}
	else{
		$addClass(".lvl-9-summary","hidden")

	}
	State.isUpdatedAfterLastSim=true
	//  $html("#total-std",round(variance*total,-4))
}

function calcStats() {
	let maxamt = 0
	let totalexp = 0
	let maxprob = 1
	let minprob = 1
	let lvl9exp = 0
	for (const elem of $(".tr-displayed")) {
		let id = Number($data(elem, "id"))
		let lvl = Number($data(elem, "lvl"))
		const tr = TR_DICT.get(id)
		totalexp += getExpectedValue(tr, lvl)
		maxamt += isExpired(tr)? 0 : getValues(tr, lvl)[0]
		let p = getValues(tr, lvl)[1] / 100
		maxprob *= p
		minprob *= 1 - p
		lvl9exp += getExpectedValue(tr, 9)
	}
	return [maxamt, totalexp, maxprob, minprob,lvl9exp]
}

function openGacha(){
	$removeClass("#gacha-container","hidden")
    $addClass("#sim-result-container","hidden")
	$addClass("#growth-container","hidden")
	$addClass("#new-ballon","hidden")
	$addClass("#squirrel-container","hidden")
	$addClass("#record-container","hidden")
}

function openSquirrel(){
	$addClass("#new-ballon2","hidden")
	$addClass("#gacha-container","hidden")
    $addClass("#sim-result-container","hidden")
	$addClass("#growth-container","hidden")
	$removeClass("#squirrel-container","hidden")
	$addClass("#record-container","hidden")

}

function openRecord(){
	$addClass("#new-ballon","hidden")
	$addClass("#gacha-container","hidden")
    $addClass("#sim-result-container","hidden")
	$addClass("#growth-container","hidden")
	$addClass("#squirrel-container","hidden")
	$removeClass("#record-container","hidden")
	drawCalender()
	displayRecordSummary()
}
function checkProb() {
	if(!State.simulatedRewards) return
	const elem = $one("#check-prob-btn")
	let max = Number($data(elem, "max"))
	let n = State.simulatedTotal
	let num = Number($one("#check-prob-input").value)
	if (!num || isNaN(num) || num < 0) {
		showToast("1 이상 숫자를 입력하세요")
		return
	}
	gtag("event", "check_prob", {})

	let p = 1-getQualtilePercentFromDict(State.simulatedRewards, n, num)

	$html("#check-prob-result",((num > max) ?"0%": (pToPercent(p,-2)))+"(으)로 "+num+"개 이상 획득")
}


async function simulate() {
	let count = $(".tr-displayed").length
	if (count === 0) {
		showToast("보물이 없습니다")
		return
	}
	$addClass("#record-container","hidden")

	$removeClass("#loading", "hidden")
	$addClass("#sim-result-container", "hidden")
	$addClass("#growth-container","hidden")
	$addClass("#gacha-container","hidden")
	$addClass(".lvl-9-report","hidden")
	$addClass("#squirrel-container","hidden")

	gtag("event", "simulation", {})
	$html("#check-prob-result","")
	await sleep(300)

	let n = 5000 * Math.log2(count)
	let record = []
	let maxAmt = 0 //보물 하나당 최대 크리스탈
	let avgLvl = 0

	const treasures = []

	for (const elem of $(".tr-displayed")) {
		let id = Number($data(elem, "id"))
		let lvl = Number($data(elem, "lvl"))
		const tr = TR_DICT.get(id)
		treasures.push([tr,lvl])
	}

	const [maxtotal, totalexp] = calcStats()
	const quantiles = [0.1, 0.25, 0.5, 0.75]
	for (let i = 0; i < n; ++i) {
		let total = 0
		for (const [tr,lvl] of treasures) {
			const [baseamt, _] = getValues(tr, lvl)
			let amt = sample(tr, lvl)
			total += amt
			if (i === 0) {
				maxAmt = Math.max(maxAmt, baseamt)
				avgLvl += lvl
			}
		}
		record.push(total)
	}
	avgLvl /= count

	const [mean, std] = calcStd(record)
	let range = Math.max(1.5, std * 3)
	let minRange = Math.max(0, mean - range)
	let maxRange = mean + Math.max(maxAmt + 1, range)

	let lvl9record = []
	let lvl9ExpLine = {}
	let lvl9totalexp = 0
	if (avgLvl < 8) {
		for (let i = 0; i < n; ++i) {
			let total = 0
			for (const [tr,lvl] of treasures) {
				total += sample(tr, 9)
				if (i === 0) {
					lvl9totalexp += getExpectedValue(tr, 9)
				}
			}
			lvl9record.push(total)
		}

		const [mean9, std9] = calcStd(lvl9record)
		let range9 = Math.max(1.5, std9 * 3)
		maxRange = Math.max(maxRange, mean9 + Math.max(maxAmt + 1, range9))

		lvl9ExpLine = {
			// Add a plot line for the mean value
			color: "green",
			dashStyle: "solid",
			value: lvl9totalexp, // Set the value to the mean value
			width: 2,
			zIndex: 1,
			label: {
				text: "올 9강시:" + round(lvl9totalexp, -1), // Label text for the mean value
				align: "center",
				style: {
					color: "green",
					fontWeight: "bold",
					fontSize: "20px",
				},
			},
		}
		
		$removeClass(".lvl-9-report","hidden")
	////	$(".lvl-9-report-val")[0].innerHTML = pToPercent((lvl9totalexp - totalexp) / totalexp,-2)
	//	$(".lvl-9-report-val")[1].innerHTML = `${round(totalexp,-2)} -> ${round(lvl9totalexp,-2)}`

	}

	// if(avgLvl)
	// let cdf = 1 - normalcdf(totalexp, std, 2)
	
	let quantileDesc = ""

	const elem = $one("#check-prob-btn")
	$data(elem, "max", maxtotal)
	$data(elem, "simcount", n)
	const recordDict = new Map()
	const record9Dict = new Map()

	for(const val of record){
		if(recordDict.has(val)){
			recordDict.set(val,recordDict.get(val)+1)
		}
		else{
			recordDict.set(val,1)
		}
	}

	for(const val of lvl9record){
		if(record9Dict.has(val)){
			record9Dict.set(val,record9Dict.get(val)+1)
		}
		else{
			record9Dict.set(val,1)
		}
	}
	State.simulatedRewardDict = recordDict
	State.isUpdatedAfterLastSim=false
	State.simulatedTotal=n
	State.maxReward=maxtotal
	State.simulatedRewards= [...recordDict.entries()].sort((a,b)=>a[0]-b[0])
	simulated9Rewards=[...record9Dict.entries()].sort((a,b)=>a[0]-b[0])
	//console.log(State.simulatedRewards)
	for (const q of quantiles) {
		let quantile = getQualtileValueFromDict(State.simulatedRewards, n, q)
		quantileDesc += `<li>${pToPercent(1 - q)}로 최소 <b>${Math.max(0, round(quantile))}개</b> 획득
		</li>`
	}

	if(avgLvl < 8){
		let quantileDesc9=""
		for (const q of quantiles) {
			let quantile = getQualtileValueFromDict(simulated9Rewards, n, q)
			quantileDesc9 += `<li>${pToPercent(1 - q)}로 최소 <b>${Math.max(0, round(quantile))}개</b> 획득
			</li>`
		}
		$html("#quantiles-9", quantileDesc9)
	}


	$html("#quantiles", quantileDesc)

	record = populateSeries(recordDict,minRange,maxRange)
	lvl9record = populateSeries(record9Dict,minRange,maxRange)
	
	Highcharts.chart("distribution", {
		style: {
			fontSize: "20px",
		},
		chart: {
			type: "areaspline",
			backgroundColor: "#f5f3ee",
			margin: [50, 10, 90, 10],
		},
		title: {
			text: "출석보상 갯수 분포",
		},
		xAxis: {
			min: minRange, // Set the minimum value of the x-axis
			max: maxRange, // Set the maximum value of the x-axis
			title: {
				text: "크리스탈 갯수",
			},
			labels: {
				style: {
					fontSize: "18px", // Set the font size for x-axis labels
				},
			},
			minTickInterval: 1,
			plotLines: [
				{
					// Add a plot line for the mean value
					color: "#E45536",
					dashStyle: "solid",
					value: totalexp, // Set the value to the mean value
					width: 2,
					zIndex: 1,
					label: {
						text: "기댓값:" + round(totalexp, -1), // Label text for the mean value
						align: "center",
						style: {
							color: "#E45536",
							fontWeight: "bold",
							fontSize: "20px",
						},
					},
				},
				lvl9ExpLine,
			],
		},
		yAxis: {
			title: {
				text: "확률",
			},
			labels: {
				enabled: false,
			},
		},
		tooltip: {
			enabled: false, // Disable tooltips
		},
		plotOptions: {
			series: {
				marker: {
					enabled: false
				}
			}
		},		
		series: [
			{
				name: '현재 예측치',
				dashStyle: 'solid',
				lineWidth: 2,
				color: '#1E90FF',
				data: record,
				fillOpacity: 0.5,
				zIndex: -1,
			},
			{
				name: '올 9강시 예측치',
				dashStyle: 'solid',
				lineWidth: 2,
				color: '#FFD403',
				data: lvl9record,
				fillOpacity: 0.5,
				zIndex: -1,
			}
		],
	})

	$addClass("#loading", "hidden")
	$removeClass("#sim-result-container", "hidden")
	updateAttendanceAfterSim()
	updateRecordDialogAfterSim()
}
