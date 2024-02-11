function floor(num, digit) {
	if (!digit) digit = 0

	num = num * 10 ** -digit

	return Math.floor(num) / 10 ** -digit
}
function round(num, digit) {
	if (!digit) digit = 0

	num = num * 10 ** -digit

	return Math.round(num) / 10 ** -digit
}

const State = {
	selectionOpen: true,
	settingOpen: false,
	maxSerial: 0,
	settingSerial: -1,
	settingLvl: -1,
	settingTr: -1,
}

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
	const name = tr.id < 100 ? tr.name : getRewardTreasureName(tr.minscore)
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
	$html("#tr-one-setting-serial","#"+serial)
}
function openSelection() {
	$removeClass("#tr-setting", "hidden")
	$addClass(".tr-setting-container", "hidden")
	$removeClass("#tr-selection", "hidden")
	onModalOpen()
	$html("#modal-title", "보물 추가")
}

function closeModal() {
	$addClass("#tr-setting", "hidden")
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


function getCount(){
	let count = prompt('복제할 갯수를 입력하세요',"1")
	if(count===null) return 0
	if(Number(count) < 1 || Number(count) > 100 || isNaN(Number(count))){
		showToast("1~100 사이의 숫자를 입력하세요")
		return 0
	}
	return Number(count)
}
function copyTreasure() {
	if (State.settingTr === -1) return
	let count = getCount()
	if(count<=0) return

	for(let i=0;i<count;++i)
		addTreasure(Number(State.settingTr), Number(State.settingLvl))
	// openSetting(Number($data(node, "id")), Number($data(node, "lvl")), Number($data(node, "serial")))
	clearSetting()
	if (isMobile()) {
		closeModal()
	}
}

function setTreasureLvl(lvl) {
	if (State.settingTr === -1) return

	if (State.settingLvl < 0 || State.settingLvl === lvl) return
	$data($one("#_tr-" + State.settingSerial), "lvl", String(lvl))

	let elem = $one("#_tr-" + State.settingSerial + " .tr-lvl")
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
		$append($one("#_tr-" + State.settingSerial), html)
	}
	State.settingLvl = lvl
	setSetting(State.settingTr, lvl)
    onTreasureChange()
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
    $addClass(".empty-tr-temp","hidden")
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
function main() {
	$addClass(".tr-btn", "disabled")

	initSelectionWindow()
	clearSetting()
	if (isMobile()) closeModal()
	$onclick(".tr-selection", function (e) {
		if (isMobile()) $addClass("#tr-setting", "hidden")
		onModalClose()
		let id = Number($data(e.currentTarget, "id"))
		// console.log(id)

		addTreasure(id, $one("#lvl-9-checkbox").checked ? 9 : 0)
	})
	$onclick("#tr-setting-close", closeModal)
	$onclick("#tr-add-btn", function () {
		$removeClass("#tr-setting", "hidden")
		openSelection()
	})
	$onclick(".tr-btn", function () {
		if (isMobile()) closeModal()
	})
	$onclick("#clear-btn", removeAll)
	$onclick("#save-btn", save)
    $onclick("#share-btn",share)
    $onclick("#load-btn",load)
	$onclick(".shadow",closeModal)
	//$onclick("#sim-btn",simulate)
	settingEventListener()
    let query = new URLSearchParams(window.location.search)
    if(query.has("state"))
    decodeState(query.get("state"))
}

function selectionTreasure(tr) {
	let isReward = tr.id >= 100
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	let name = !isReward ? tr.name : getRewardTreasureName(tr.minscore)
	return `
    <div class="tr tr-selection" title="${name}" data-id='${tr.id}'>
        <img src="img/${tr.a ? "frame-a" : "frame"}.png">
        <img class="tr-img" src="${src}">
        <img class="tr-img" src="img/passive.png">
        <b class="tr-add-hover">+</b>
    </div>
    `
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
	let isReward = tr.id >= 100
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	let lvl9 = lvl === 9 ? "lvl-9" : ""

	let lvltext = lvl > 0 ? '<b class="tr-lvl ' + lvl9 + '">+' + lvl + "</b>" : ""
	return ` <img src="img/${tr.a ? "frame-a" : "frame"}.png">
    <img class="tr-img" src="${src}">
    <img class="tr-img" src="img/passive.png">
    ${lvltext}`
}

function initSelectionWindow() {
	let $gacha = ""
	let $cookiepet = ""
	let $limited = ""
	let $level = ""
	let $reward = ""

	for (const tr of TREASURES) {
		TR_DICT.set(tr.id, tr)
		const str = selectionTreasure(tr)
		if (tr.type === TYPE.Gacha) $gacha += str
		else if (tr.type === TYPE.CookiePet) $cookiepet += str
		else if (tr.type === TYPE.Limited) $limited += str
		else if (tr.type === TYPE.Level) $level += str
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
}
function removeAll() {
	if (!confirm("정말 모든 보물을 삭제하시겠습니까?")) return

	clearSetting()
	$(".tr-displayed").forEach((e) => e.remove())
	onTreasureChange()
    $removeClass(".empty-tr-temp","hidden")
	clearSearchQueryString()
}
function clearSearchQueryString() {
	const newUrl = window.location.origin + window.location.pathname;
	window.history.replaceState({}, document.title, newUrl);
  }
  
function decodeState(encodedString){
    var str = atob(encodedString);

    const trs = str.split(",")
    for(const tr of trs.reverse()){
        if(!tr || tr==="") continue
        const [id,lvl] = tr.split("-")
        addTreasure(Number(id),Number(lvl))
    }
}

function encodeCurrentState(){
    let str= ""
    for (const elem of $(".tr-displayed")) {
		let id = Number($data(elem, "id"))
		let lvl = Number($data(elem, "lvl"))
        str += `${id}-${lvl},`
    }
    var encodedString = btoa(str);

    return encodedString
}
let toastTimeout = null
function showToast(msg) {
	if(toastTimeout) clearTimeout(toastTimeout)

	const toast = document.getElementById('toast');
	toast.textContent = msg;
	toast.classList.add('show');
	toastTimeout=setTimeout(()=>$one("#toast").classList.remove('show'), 1500); // Adjust the duration as needed (in milliseconds)
  }
  
function save() {
    if (!confirm("세팅을 브라우저에 저장하시겠습니까? 기존에 저장한 세팅은 삭제됩니다.")) return

    const str = encodeCurrentState()
    // console.log(str)
    localStorage.setItem("cookierun-crystal-state",str)
    // alert("세팅이 브라우저에 저장되었습니다")
	showToast("세팅이 브라우저에 저장되었습니다") 
}
function share(){
    let link=window.location.href.split('?')[0]+"?state="+ encodeCurrentState()
    navigator.clipboard.writeText(link)
    .then(() => {
        showToast("링크가 클립보드에 복사되었습니다")
    })
    $html("#share-area",link)
}
function load(){
    let str = localStorage.getItem("cookierun-crystal-state")
    if(!str || str==="") {
        showToast("저장된 세팅이 없습니다")
        return
    }
    if (!confirm("저장된 세팅을 불러오시겠습니까? 현재 세팅은 삭제됩니다.")) return
    $(".tr-displayed").forEach((e) => e.remove())
    clearSetting()
    decodeState(str)
    window.scroll(0,0)
}
window.onload = main

function pToPercent(p){
	let result = round(p * 100, -6)
    if(Math.abs(0-result) < 0.0000001) result ="0.000001% 미만"
    else result +="%"
	return result
}
function calcStd(numbers) {
  // Calculate the mean (average) of the numbers
  const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;

  // Calculate the squared differences from the mean
  const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));

  // Calculate the variance (average of squared differences)
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / numbers.length;

  // Calculate the standard deviation (square root of variance)
  const standardDeviation = Math.sqrt(variance);

  return standardDeviation;
}

const LOTTO_PROB = 1/8145060

function displayMaxProb(maxprob){
	$html("#total-max-prob",pToPercent(maxprob) )
	let p=maxprob
	if(p <= Number.MIN_VALUE || p>0.00001) return
	let diff = p/LOTTO_PROB
	if(diff > 1)
		$html("#total-max-prob-lotto",`로또 1등 확률의 ${round(diff,-1)}배`)
	else 
		$html("#total-max-prob-lotto",`로또 1등보다 ${round(1/diff,-1)}배 어려움`)

}
/**
    recalculate total expected value * 
 */
function onTreasureChange() {
	let total = 0
	let totalexp = 0
	let maxprob = 1
	let minprob = 1
	let variance = 0
	for (const elem of $(".tr-displayed")) {
		let id = Number($data(elem, "id"))
		let lvl = Number($data(elem, "lvl"))
		const tr = TR_DICT.get(id)
		totalexp += getExpectedValue(tr, lvl)
		total += getValues(tr, lvl)[0]
		let p = getValues(tr, lvl)[1] / 100
		maxprob *= p
		minprob *= (1-p)

		variance += getVar(tr,lvl)
	}

	$html("#total-exp", round(totalexp, -4))
	$html("#total-max", total)
	$html("#total-min-prob",pToPercent(minprob) )
	$html("#total-max-prob",pToPercent(maxprob) )
	// $html("#total-std",round(variance,-4))
}

function simulate(){
	let n=5000
	let record=[]
	let str=""
	for(let i=0;i<n;++i){
		let total=0
		for (const elem of $(".tr-displayed")) {
			let id = Number($data(elem, "id"))
			let lvl = Number($data(elem, "lvl"))
			const tr = TR_DICT.get(id)
			let amt = sample(tr,lvl)
			total+=amt
		}
		record.push(total)
	}
	console.log(calcStd(record))
}