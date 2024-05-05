// Listen for messages from the main thread
onmessage = function(event) {
    // Extract parameters from the message
    const { n, avgLvl,treasures,sampleFunc } = event.data;
    let record=[]
    for (let i = 0; i < n; ++i) {
		let total = 0
        for(const tr of treasures){
            let amt = sampleFunc(tr, lvl)
			total += amt
        }

		record.push(total)
	}
    let lvl9record = []
    if (avgLvl < 8) {
		for (let i = 0; i < n; ++i) {
			let total = 0
            for(const tr of treasures){
                let amt = sampleFunc(tr, 9)
                total += amt
            }
    
			lvl9record.push(total)
		}
    }

    // Send the result back to the main thread
    postMessage({
        record:record,
        lvl9record:lvl9record
    });
  };
  
  /**
   * 
function runWorker(args){
	return new Promise(res=>{
		const worker = new Worker('simulation_worker.js');

		// Define a callback function to handle messages from the worker
		worker.onmessage = function(event) {
		// Log the result received from the worker
		res(event.data)
		};

		// Send a message to the worker with parameters
		worker.postMessage({ num1: 5, num2: 10 });

	})
}
   */