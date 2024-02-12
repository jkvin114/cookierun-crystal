var _a = (8 * (Math.PI - 3)) / (3 * Math.PI * (4 - Math.PI))

function erfINV(inputX) {
	var _x = parseFloat(inputX)
	var signX = _x < 0 ? -1.0 : 1.0

	var oneMinusXsquared = 1.0 - _x * _x
	var LNof1minusXsqrd = Math.log(oneMinusXsquared)
	var PI_times_a = Math.PI * _a

	var firstTerm = Math.pow(2.0 / PI_times_a + LNof1minusXsqrd / 2.0, 2)
	var secondTerm = LNof1minusXsqrd / _a
	var thirdTerm = 2 / PI_times_a + LNof1minusXsqrd / 2.0

	var primaryComp = Math.sqrt(Math.sqrt(firstTerm - secondTerm) - thirdTerm)

	var scaled_R = signX * primaryComp
	return scaled_R
}

function erfinv(x) {
	// maximum relative error = .00013
	const a = 0.147
	console.log(x)
	//if (0 == x) { return 0 }
	const b = 2 / (Math.PI * a) + Math.log(1 - x ** 2) / 2
	console.log(b)
	const sqrt1 = Math.sqrt(b ** 2 - Math.log(1 - x ** 2) / a)
	console.log(sqrt1)
	const sqrt2 = Math.sqrt(sqrt1 - b)
	console.log(sqrt2)
	return sqrt2 * Math.sign(x)
}

function expGrowthIntegral(currentExpVal,dates,rate){
    return currentExpVal * ( Math.exp(rate*dates)-1) / rate
}

function calcStd(numbers) {
	// Calculate the mean (average) of the numbers
	const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length

	// Calculate the squared differences from the mean
	const squaredDifferences = numbers.map((num) => Math.pow(num - mean, 2))

	// Calculate the variance (average of squared differences)
	const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / numbers.length

	// Calculate the standard deviation (square root of variance)
	const standardDeviation = Math.sqrt(variance)

	return [mean, standardDeviation]
}
function calculateQuantile(mean, stdDev, value) {
	// Calculate the quantile using the CDF of the normal distribution
    // console.log(mean,stdDev)
	//const quantile = erfinv((value - mean) / (stdDev * Math.sqrt(2)))
    const quantile = erfINV(2 * value - 1) *stdDev* Math.sqrt(2) + mean;
	return quantile
}

function normalcdf(mean, sigma, to) 
{
    var z = (to-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
}

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

const LOTTO_PROB = 1 / 8145060

function displayMaxProb(maxprob) {
	$html("#total-max-prob", pToPercent(maxprob))
	let p = maxprob
	if (p <= Number.MIN_VALUE || p > 0.00001) return
	let diff = p / LOTTO_PROB
	if (diff > 1) $html("#total-max-prob-lotto", `로또 1등 확률의 ${round(diff, -1)}배`)
	else $html("#total-max-prob-lotto", `로또 1등보다 ${round(1 / diff, -1)}배 어려움`)
}
