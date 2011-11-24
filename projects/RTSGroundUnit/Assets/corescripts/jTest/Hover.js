var hoverHeight = 3;
var ForceFactor = 10;



function Update () {

	var hit : RaycastHit;
	if (Physics.Raycast (transform.position, -transform.up, hit, 100.0)) {
		idealPosition = transform.position + ((hoverHeight-hit.distance) * transform.up);
	}

	var pull : Vector3 = (idealPosition - transform.position);
	print(pull);
	
	var push = Vector3.zero;
	print((pull.y / hoverHeight) );
	
	/*
	if((pull.y / hoverHeight)  < 0.5){
		push.y =  (pull.y / hoverHeight) * ForceFactor;
	}
	else if(((pull.y / hoverHeight)  > 0.5)&&((pull.y / hoverHeight)  < 1)){
		push.y =  0.5 * ForceFactor;
	}
	*/
	
	if(((pull.y / hoverHeight)  < 0.4)){
		push.y =  0.54 * ForceFactor;
	}else{
		push.y =  (pull.y / hoverHeight) * ForceFactor;
	}
	
	print(push);
	
	//rigidbody.AddForce( pull * ForceFactor );
	rigidbody.AddForce( push);
}