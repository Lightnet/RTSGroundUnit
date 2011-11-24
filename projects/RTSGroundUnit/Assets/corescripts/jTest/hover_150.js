
var length	: float = 10.0;
var width	: float = 5.0;
var height	: float = 2.0;

var hoverHeight : int = 4;
var springiness : float = 1;
var damping 	: float = 0.1;
var thrust		: float = 10;
var centerOfGravity	: Vector3;
var ground 	: Transform;
var gravity	: float = 9.8;

var OneDGrav : boolean = true;

function Start()
{
	rigidbody.centerOfMass = centerOfGravity;
}

function FixedUpdate () {
	
	 	var gravForce : Vector3 =  (ground.position - transform.position).normalized * gravity;
	 	if ( OneDGrav )
			rigidbody.AddForce(0, gravity, 0);
		else
			rigidbody.AddForce(gravForce);
		
	//	Get the four corners of the vehicle in world space.
		var frontLeft : Vector3 = transform.TransformPoint(-width / 2, -height / 2, length / 2);
		var frontRight : Vector3 = transform.TransformPoint(width / 2, -height / 2, length / 2);
		var backLeft : Vector3 = transform.TransformPoint(-width / 2, -height / 2, -length / 2);
		var backRight : Vector3 = transform.TransformPoint(width / 2, -height / 2, -length / 2);
		
	//	Vehicle's relative "up" direction.
		var relUp : Vector3 = transform.TransformDirection(Vector3.up);
		var frontLeftHit : RaycastHit;
		var frontRightHit : RaycastHit;
		var backLeftHit : RaycastHit;
		var backRightHit : RaycastHit;
		
	//	Measure the distance to the ground with rays.
		Physics.Raycast(frontLeft, -relUp, frontLeftHit);
		Physics.Raycast(frontRight, -relUp, frontRightHit);
		Physics.Raycast(backLeft, -relUp, backLeftHit);
		Physics.Raycast(backRight, -relUp, backRightHit);
	
	//	Get the current velocity of the corner points in the
	//	hover's up/down direction to act as damping for the
	//	springy hovering force.
		var dampVec = new Vector3(0, damping, 0);
		
		var frontLeftDamp : Vector3 = transform.TransformDirection(Vector3.Scale(transform.InverseTransformDirection(rigidbody.GetPointVelocity(frontLeft)), dampVec));
		var frontRightDamp : Vector3 = transform.TransformDirection(Vector3.Scale(transform.InverseTransformDirection(rigidbody.GetPointVelocity(frontRight)), dampVec));
		var backLeftDamp : Vector3 = transform.TransformDirection(Vector3.Scale(transform.InverseTransformDirection(rigidbody.GetPointVelocity(backLeft)), dampVec));
		var backRightDamp : Vector3 = transform.TransformDirection(Vector3.Scale(transform.InverseTransformDirection(rigidbody.GetPointVelocity(backLeft)), dampVec));

	//	Calculate the lift given by each corner.
		var frontLeftLift : Vector3 = (-relUp * gravity / 4) + (relUp * (hoverHeight - frontLeftHit.distance) * springiness) - frontLeftDamp;
		var frontRightLift : Vector3 = (-relUp * gravity / 4) + (relUp * (hoverHeight - frontRightHit.distance) * springiness) - frontRightDamp;
		var backLeftLift : Vector3 = (-relUp * gravity / 4) + (relUp * (hoverHeight - backLeftHit.distance) * springiness) - backLeftDamp;
		var backRightLift : Vector3 = (-relUp * gravity / 4) + (relUp * (hoverHeight - backRightHit.distance) * springiness) - backRightDamp;
		
	//	Calculate a simple forward thrust from the arrow keys.
		var lThrust : float;
		var rThrust : float;
		
		lThrust = rThrust = thrust * Input.GetAxis("Vertical");
		
		var horizAxis : float = Input.GetAxis("Horizontal");
		
		var lThrustForce : Vector3 = transform.TransformDirection(Vector3.forward) * (lThrust + horizAxis);
		var rThrustForce : Vector3 = transform.TransformDirection(Vector3.forward) * (rThrust - horizAxis);

	//	Add the forces to the hover at the appropriate places. Note that
	//	the back corners have forward thrust as well as lift.
		rigidbody.AddForceAtPosition(frontLeftLift, frontLeft);
		rigidbody.AddForceAtPosition(frontRightLift, frontRight);
		rigidbody.AddForceAtPosition(backLeftLift + lThrustForce, backLeft);
		rigidbody.AddForceAtPosition(backRightLift + rThrustForce, backRight);
		

	
}