var height: float = 5.0;
var forceMultiplier : float = 10.0;

function FixedUpdate(){

    var hit : RaycastHit;

    if(Physics.Raycast(transform.position, -transform.up, hit, height)){
        rigidbody.AddForce(transform.up*(forceMultiplier/(hit.distance/2)));
    }

}