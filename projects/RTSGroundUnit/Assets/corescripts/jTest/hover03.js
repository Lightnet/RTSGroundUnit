
var speed = 0.5;
var gravity = 50.0;

var surfaceNormal : Vector3;
var hit : RaycastHit;

// assign the sphere as your target in the Inspector
var target : Transform;

	function Update () 
	{
		// rotate our object to align up with the target's normal
		if (Physics.Raycast (transform.position, Vector3.down, hit))
		{
			surfaceNormal = hit.normal;
		}
		transform.rotation = Quaternion.FromToRotation(Vector3.up, surfaceNormal); 

		// I need to figure out how adjust angles south of the equator.
		// Vector3.up is zero. So x and z both rotate 0-90 and 359-270.
		// At this point it won't point down.
	}

	function FixedUpdate() 
	{
		// move our object
		moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		transform.Translate (moveDirection, Space.World);

		// Apply gravity
		rigidbody.AddForce((target.transform.position - transform.position).normalized * gravity); 

		// When going fast enough the object will want to leave the surface due to inertia.
		// Playing with mass, speed and gravity helps but it doesn't quite get there.
		// Still trying to come up with a way to stick to the surface when moving.
	}

	function Start ()
	{
		// Make the rigid body not change rotation
		if (rigidbody)
		{
			rigidbody.freezeRotation = true;
		}
	}