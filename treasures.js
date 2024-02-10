const TYPE = {
	Gacha: 0,
	CookiePet: 1,
	Level: 2,
	Limited: 3,
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
		minp: 14.28,
		maxp: 14.28,
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
        webp:true
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

function getDesc(treasure,lvl) {
    const [amt,prob] = getValues(treasure,lvl)
    return `출석시 크리스탈 ${amt}개를 ${prob}% 확률로 획득`
}
function getExpectedValue(treasure,lvl){
    const [amt,prob] = getValues(treasure,lvl)
    return round(amt * prob /100,-4)
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
	if (Number.isInteger((maxp - p) / 9)) {
		return round(p + ((maxp - p) / 9) * lvl,-2)
	} else if(maxp - p < 9){
		return round(p + floor((maxp - p) / 9,-1) * lvl,-2)
	}
    else{
		return round(p + floor((maxp - p) / 9,-1) * lvl,-2)
	}
}
