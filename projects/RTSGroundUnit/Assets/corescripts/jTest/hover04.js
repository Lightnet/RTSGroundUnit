//private var ang = 0;

private var gravity = 2;
private var angle = 0;
//private var trans = 0;

rigidbody.freezeRotation = true;

function FixedUpdate()
{
// for now I'm assuming the center point of the sphere to be 0,0,0
// I'll add center object later after I work some of the bugs out.
var relativePos = transform.position;

// this keeps the orietation of the object always pointing perpendicular to
//the surface of the sphere

var rotation = Quaternion.FromToRotation (Vector3.up, relativePos);
transform.rotation = rotation;

var rotationSpeed = 1;
var speed = 1;

// Get the horizontal and vertical axis.
// By default they are mapped to the arrow keys.
// The value is in the range -1 to 1

var trans = Input.GetAxis ("Vertical") * speed;
var ang = Input.GetAxis ("Horizontal") * rotationSpeed;

// accumulate the angle depending on how many times they
// rotated left or right

angle+=ang;

// rotate it around the y axis
transform.Rotate(0,angle,0);

// translate it forward or backward
transform.Translate (Vector3.right * -trans);

// and apply gravity
rigidbody.AddForce(-relativePos * gravity);
}