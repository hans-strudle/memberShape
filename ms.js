exports.mShape = function(n, shape, scale){ // n should be int, shape should be Array
	scale = scale || 100
	
	var fin = 0,
	lmid = Math.floor((shape.length-1)/2),
	hmid = Math.ceil((shape.length-1)/2),
	min = Math.min.apply(null, shape),
	max = Math.max.apply(null, shape)
	
	if (n <= min || n >= max){
		// too small or large
		return 0
	} else if (n >= shape[lmid] && n <= shape[hmid]){
		// center
		return scale
	} else if (n < shape[lmid]){
		side = false // left side
		shape = shape.splice(0,lmid+1)
	} else if (n > shape[hmid]){
		side = true // right side
		shape = shape.splice(hmid,shape.length-hmid)
	}
	
	var step = scale / (shape.length - 1) ,
		lb = 0,
		hb = 0

	shape.every(function(point, pos){
		if (n <= point){
			hb = point // highbound
			
			return false
		}
		p = pos // position in [shape]
		lb = point // lowbound
		return true
	})
	val = step / (hb - lb) * (n - lb) + p * step
	if (side) val = -step / (hb - lb) * (n - lb) + (shape.length-p-1) * step
	return val
}