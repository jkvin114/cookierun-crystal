const TYPE = {
	Gacha: 0,
	CookiePet: 1,
	Level: 2,
	Limited: 3,
	Trophy:4
}
const TREASURES = [
	{
		id: 0,
		name: "진주 크리스탈 귀걸이",
		amt: 1,
		minp: 5,
		maxp: 50,
		type: TYPE.Gacha,
		a: true,
	},
	{
		id: 1,
		name: "레어 크리스탈 사파이어",
		amt: 2,
		minp: 5,
		maxp: 50,
		type: TYPE.Gacha,
	},
	{
		id: 2,
		name: "희귀한 크리스탈 조개",
		amt: 10,
		minp: 1,
		maxp: 11,
		type: TYPE.Gacha,
	},
	{
		id: 3,
		name: "커다란 크리스탈 원석",
		amt: 5,
		minp: 2,
		maxp: 21,
		type: TYPE.Gacha,
	},
	{
		id: 4,
		name: "최고급 크리스탈 보석함",
		amt: 7,
		minp: 2,
		maxp: 16,
		type: TYPE.Gacha,
	},
	{
		id: 5,
		name: "청명한 크리스탈 자명종",
		amt: 12,
		minp: 1,
		maxp: 10,
		type: TYPE.Gacha,
	},
	{
		id: 6,
		name: "왕 크리스탈 보석반지",
		amt: 4,
		minp: 4,
		maxp: 27,
		type: TYPE.Gacha,
	},
	{
		id: 7,
		name: "장식용 크리스탈 포크스푼",
		amt: 9,
		minp: 1,
		maxp: 12,
		type: TYPE.Gacha,
        webp:true
	},
	{
		id: 8,
		name: "마음에 품은 신성한 크리스탈 검",
		amt: 3,
		minp: 3,
		maxp: 33,
		type: TYPE.Gacha,
        webp:true
	},
	{
		id: 9,
		name: "초코 왕방울의 왕젤리 왕관",
		amt: 1,
		minp: 15,
		maxp: 60,
		type: TYPE.CookiePet,
	},
	{
		id: 10,
		name: "스노우 글로브의 크리스탈 왕관",
		amt: 1,
		minp: 15,
		maxp: 60,
		type: TYPE.CookiePet,
	},
	{
		id: 11,
		name: "예언자맛 쿠키의 바삭한 수염",
		amt: 2,
		minp: 7,
		maxp: 30,
		type: TYPE.CookiePet,
	},
	{
		id: 12,
		name: "크리스탈을 부르는 수요일의 종 ",
		amt: 1,
		maxamt: 2,
		minp: 14.2857,
		maxp: 14.2857,
		type: TYPE.Limited,
	},
	{
		id: 13,
		name: "오리지널 진저브래드",
		amt: 1,
		minp: 30,
		maxp: 60,
		type: TYPE.Limited,
	},
	{
		id: 14,
		name: "2016 크리스탈 원숭이",
		amt: 1,
		minp: 5,
		maxp: 50,
		type: TYPE.Limited,
        webp:true,
		expiration :"2016-12-31"

	},
	{
		id: 15,
		name: "깜찍한 미니 크리스탈 쿠션",
		amt: 8,
		minp: 8,
		maxp: 16,
		type: TYPE.Limited,
	},
	{
		id: 16,
		name: "미니 크리스탈 피규어",
		amt: 9,
		minp: 7,
		maxp: 14,
		type: TYPE.Limited,
        webp:true
	},
	{
		id: 17,
		name: "미니 크리스탈 룰렛",
		amt: 8,
		minp: 2,
		maxp: 16,
		type: TYPE.Limited,
	},
	{
		id: 18,
		name: "어딘가 낯익은 푸른빛 목걸이",
		amt: 1,
		minp: 5,
		maxp: 50,
		type: TYPE.Limited,
	},
	{
		id: 19,
		name: "Lv.50 골든 쿠키스 클럽 트로피",
		amt: 2,
		minp: 20,
		maxp: 50,
		type: TYPE.Level,
	},
	{
		id: 20,
		name: "Lv.60 레전드 쿠키스 클럽 트로피",
		amt: 3,
		minp: 20,
		maxp: 50,
		type: TYPE.Level,
	},
	{
		id: 21,
		name: "Lv.70 나는 쿠키다 클럽 트로피",
		amt: 5,
		minp: 10,
		maxp: 30,
		type: TYPE.Level,
	},
	{
		id: 22,
		name: "Lv.80 프리미엄 쿠키스 클럽 트로피",
		amt: 6,
		minp: 10,
		maxp: 25,
		type: TYPE.Level,
	},
	{
		id: 23,
		name: "Lv.90 VIP 쿠키스 클럽 트로피",
		amt: 9,
		minp: 6,
		maxp: 16,
		type: TYPE.Level,
        webp:true
	},
	{
		id: 24,
		name: "Lv.100 꿈을 이룬 쿠키스 클럽 트로피",
		amt: 10,
		minp: 5,
		maxp: 15,
		type: TYPE.Level,
        webp:true
	},{
		id: 25,
		name: "작은 케이크들개 전용 컵케이크",
		amt: 11,
		minp: 1,
		maxp: 11,
		type: TYPE.CookiePet,
		fullImage:true
	},
	{
		id: 26,
		name: "11주년 기념 골드 액자",
		amt: 11,
		minp: 1,
		maxp: 11,
		type: TYPE.Limited,
		fullImage:true,
		expiration :"2024-12-31"
	},{
		id: 27,
		name: "11주년 기념 크리스탈 액자",
		amt: 11,
		minp: 1,
		maxp: 11,
		type: TYPE.Limited,
		fullImage:true,
		expiration :"2024-12-31"

	},{
		id: 28,
		name: "다람쥐의 반짝이는 크리스탈 보석함",
		amt: 1,
		minp: 62,
		maxp: 72,
		type: TYPE.Limited,
		fullImage:true
	},{
		id: 29,
		name: "2024 여름한정 크리스탈 딸기빙수",
		amt: 2,
		minp: 50,
		maxp: 78,
		type: TYPE.Limited,
		fullImage:true,
		expiration :"2024-08-31"
	},{
		id: 30,
		name: "용감한 쿠키군을 위한 생일 케이크",
		amt: 15,
		minp: 6,
		maxp: 15,
		type: TYPE.Limited,
		fullImage:true,
		expiration :"2024-12-31"
	},{
		id: 31,
		name: "생일 기념! 영롱한 딸기 보석캔디",
		amt: 15,
		minp: 6,
		maxp: 15,
		type: TYPE.Limited,
		fullImage:true,
		expiration :"2024-12-31"
	},{
		id: 32,
		name: "카드게임 전용 스페셜 크리스탈 카드",
		amt: 9,
		minp: 7,
		maxp: 14,
		type: TYPE.Limited,
		fullImage:true
	},{
		id: 33,
		name: "다람쥐의 크리스탈 에이드 디스펜서",
		amt: 2,
		minp: 31,
		maxp: 36,
		type: TYPE.Limited,
		fullImage:true
	},{
		id: 34,
		name: "영양듬뿍 크리스탈 뚝배기 삼계탕",
		amt: 5,
		minp: 30,
		maxp: 100,
		type: TYPE.Limited,
		fullImage:true,
		expiration :"2024-08-14"

	},{
		id: 35,
		name: "천하를 품은 자의 크리스탈 장식 부채",
		amt: 9,
		minp: 7,
		maxp: 14,
		type: TYPE.Limited,
		fullImage:true

	},{
		id: 36,
		name: "다람쥐의 크리스탈 별 오너먼트",
		amt: 2,
		minp: 31,
		maxp: 36,
		type: TYPE.Limited,
		fullImage:true

	},
	{
		id: 201,
		name: "새싹1 등급의 소중한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 202,
		name: "새싹2 등급의 소중한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 203,
		name: "새싹3 등급의 소중한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 204,
		name: "새싹4 등급의 소중한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 205,
		name: "새싹5 등급의 소중한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 50,
		type: TYPE.Trophy
	},
	{
		id: 206,
		name: "중수1 등급의 대단한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},
	{
		id: 207,
		name: "중수2 등급의 대단한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 208,
		name: "중수3 등급의 대단한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 209,
		name: "중수4 등급의 대단한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 210,
		name: "중수5 등급의 대단한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 51,
		type: TYPE.Trophy
	},{
		id: 211,
		name: "고수1 등급의 엄청난 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 212,
		name: "고수2 등급의 엄청난 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 213,
		name: "고수3 등급의 엄청난 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 214,
		name: "고수4 등급의 엄청난 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 215,
		name: "고수5 등급의 엄청난 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 52,
		type: TYPE.Trophy
	},
	{
		id: 216,
		name: "영웅1 등급의 히어로 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},
	{
		id: 217,
		name: "영웅2 등급의 히어로 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},{
		id: 218,
		name: "영웅3 등급의 히어로 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},{
		id: 219,
		name: "영웅4 등급의 히어로 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},{
		id: 220,
		name: "영웅5 등급의 히어로 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 53,
		type: TYPE.Trophy
	},
	{
		id: 221,
		name: "초인1 등급의 위대한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},
	{
		id: 222,
		name: "초인2 등급의 위대한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},{
		id: 223,
		name: "초인3 등급의 위대한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},{
		id: 224,
		name: "초인4 등급의 위대한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},{
		id: 225,
		name: "초인5 등급의 위대한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 54,
		type: TYPE.Trophy
	},
	{
		id: 226,
		name: "제왕1 등급의 환상적인 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 227,
		name: "제왕2 등급의 환상적인 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 228,
		name: "제왕3 등급의 환상적인 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 229,
		name: "제왕4 등급의 환상적인 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 230,
		name: "제왕5 등급의 환상적인 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 56,
		type: TYPE.Trophy
	},
	{
		id: 231,
		name: "전설1 등급의 레전드 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 232,
		name: "전설2 등급의 레전드 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 233,
		name: "전설3 등급의 레전드 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 234,
		name: "전설4 등급의 레전드 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},{
		id: 235,
		name: "전설5 등급의 레전드 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 58,
		type: TYPE.Trophy
	},
	{
		id: 236,
		name: "신 등급의 휘황찬란한 영광 트로피",
		amt: 1,
		minp: 40,
		maxp: 60,
		type: TYPE.Trophy
	},
]
const REWARD_TREASURES = [
	{
		id: 100,
		minp: 40,
		minscore: 0,
		maxp: 50,
	},
	{
		id: 101,
		minp: 41,
		minscore: 1, //100 만점 단위
		maxp: 51,
	},
	{
		id: 102,
		minp: 42,
		minscore: 2,
		maxp: 52,
	},
	{
		id: 103,
		minp: 43,
		minscore: 3,
		maxp: 53,
	},
	{
		id: 104,
		minp: 44,
		minscore: 4,
		maxp: 54,
	},
	{
		id: 105,
		minp: 45,
		minscore: 5,
		maxp: 55,
	},
	{
		id: 106,
		minp: 46,
		minscore: 6,
		maxp: 56,
	},
	{
		id: 107,
		minp: 47,
		minscore: 7,
		maxp: 57,
	},
	{
		id: 108,
		minp: 48,
		minscore: 8,
		maxp: 58,
	},
	{
		id: 109,
		minp: 49,
		minscore: 9,
		maxp: 59,
	},
	{
		id: 110,
		minp: 50,
		minscore: 10,
		maxp: 60,
	},
	{
		id: 111,
		minp: 51,
		minscore: 20,
		maxp: 61,
	},
	{
		id: 112,
		minp: 52,
		minscore: 30,
		maxp: 62,
	},
	{
		id: 113,
		minp: 53,
		minscore: 40,
		maxp: 63,
	},
	{
		id: 114,
		minp: 54,
		minscore: 50,
		maxp: 64,
	},
	{
		id: 115,
		minp: 55,
		minscore: 60,
		maxp: 65,
	},
	{
		id: 116,
		minp: 56,
		minscore: 70,
		maxp: 66,
	},
	{
		id: 117,
		minp: 57,
		minscore: 80,
		maxp: 67,
	},
	{
		id: 118,
		minp: 58,
		minscore: 90,
		maxp: 68,
	},
	{
		id: 119,
		minp: 60,
		minscore: 100,
		maxp: 70,
	},
]
function getValues(treasure,lvl)
{
    let amt = treasure.amt ? treasure.amt : 1
    if(lvl === 9 && treasure.maxamt) amt = treasure.maxamt

    let prob = getProb(treasure.minp,treasure.maxp,lvl)

    return [amt,prob]
}

function isExpired(treasure){
	if(treasure.expiration){
		let date = new Date(treasure.expiration)
		if(date < new Date()) return true
	}
	return false
}
function isExpiredAsOf(treasure,targetDate){
	if(treasure.expiration){
		let date = new Date(treasure.expiration)
		if(date < targetDate) return true
	}
	return false
}
function getDesc(treasure,lvl) {
    const [amt,prob] = getValues(treasure,lvl)
	let expiration = !treasure.expiration?"":treasure.expiration +"까지 "
    return `${expiration}출석시 크리스탈 ${amt}개를 ${prob}% 확률로 획득`
}
function sample(treasure,lvl){
    const [amt,prob] = getValues(treasure,lvl)

	if(isExpired(treasure)) return 0

	return Math.random() * 100 < prob ? amt :0
}
function getExpectedValue(treasure,lvl){
    const [amt,prob] = getValues(treasure,lvl)

	if(isExpired(treasure)) return 0

    return round(amt * prob /100,-4)
}
const addOneDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
};

function getExpectedValueAfter(treasure,lvl,date){
    const [amt,prob] = getValues(treasure,lvl)

	if(isExpiredAsOf(treasure,addOneDay(date))) return 0

    return round(amt * prob /100,-4)
}
function getVar(treasure,lvl){
    const [amt,prob] = getValues(treasure,lvl)
	let p=prob /100
	// console.log(amt * p * (1-p))
    return amt * p * (1-p)
}
function getScoreStr(score) {
	if (score === 100) return "1억"
	return `${score}00만`
}
/**
 *
 * @param {*} minscore 100 만점 단위
 */
function getRewardTreasureName(minscore) {
	if (minscore === 0) return "격변 전 함께해준 증표"
	return `격변 전 ${getScoreStr(minscore)}점의 증표`
}

function getProb(p, maxp, lvl) {
	if (lvl <= 0) return p
	if (lvl >= 9) return maxp
    if(p === maxp) return p

	let diff = maxp - p
	if (Number.isInteger(diff / 9)) {
		return round(p + (diff / 9) * lvl,-2)
	}
    else if(Number.isInteger(diff / 10)){
		return round(p + diff / 10 * lvl,-2)
	}
	else {
		return round(p + floor(diff / 9,-1) * lvl,-2)
	}
}
function isRewardTr(tr){
	return tr.id >= 100 && tr.id < 200
}
function getImg(tr){
	let isReward = isRewardTr(tr)
	let src = `img/tr/${tr.id}.` + (tr.webp ? "webp" : "png")
	if (isReward) src = `img/tr/reward/tr_reward_${tr.minscore}00.` + (tr.webp ? "webp" : "png")
	if(tr.id>=200) src = `img/tr/trophy/trophy (${tr.id-200}).png`
	return src
}