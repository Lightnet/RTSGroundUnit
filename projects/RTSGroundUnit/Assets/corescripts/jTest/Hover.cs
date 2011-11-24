using UnityEngine;
using System.Collections;

public class Hover : MonoBehaviour {
    public float thrust = 1f;
    public float steerThrust = .5f;
    public float hoverThrust = 2.5f;
    public float diveThrust = .01f;
    public float maxHoverImpulseRange = 10f;

    private bool accelerate = false;
    private bool steerLeft = false;
    private bool steerRight = false;

    private Transform leftThruster;
    private Transform rightThruster;
    private Transform noseThruster;    
    private Transform mainThruster;

    private Transform frontLeftRepulsor;
    private Transform frontRightRepulsor;
    private Transform rearLeftRepulsor;    
    private Transform rearRightRepulsor;
    private Transform[] repulsors;

    public bool soaring = false;

    void Start () {
        leftThruster = (Transform) transform.FindChild("Left Thruster");
        rightThruster = (Transform) transform.FindChild("Right Thruster");
        mainThruster = (Transform) transform.FindChild("Main Thruster");
        noseThruster = (Transform) transform.FindChild("Nose Thruster");

        frontLeftRepulsor = (Transform) transform.FindChild("Front Left Repulsor");
        frontRightRepulsor = (Transform) transform.FindChild("Front Right Repulsor");
        rearLeftRepulsor = (Transform) transform.FindChild("Rear Left Repulsor");
        rearRightRepulsor = (Transform) transform.FindChild("Rear Right Repulsor");

        repulsors = new Transform[4];
        repulsors[0] = frontLeftRepulsor;
        repulsors[1] = frontRightRepulsor;
        repulsors[2] = rearLeftRepulsor;
        repulsors[3] = rearRightRepulsor;
    }

    void Update () {
        TrackInput();
    }

    void FixedUpdate() {
        Move();
        RepulseAll();
    }

    void Repulse(RaycastHit hit, Transform repulsor) {
        float distanceToGround = hit.distance;
        distanceToGround = Mathf.Min(maxHoverImpulseRange, distanceToGround);
        float halfMaxHoverImpulseRange = maxHoverImpulseRange/2;

        if (distanceToGround > maxHoverImpulseRange/2) {
            rigidbody.AddForceAtPosition(-repulsor.up * ((distanceToGround - halfMaxHoverImpulseRange) / halfMaxHoverImpulseRange) * hoverThrust, repulsor.position);
        } else {
            rigidbody.AddForceAtPosition(repulsor.up * (halfMaxHoverImpulseRange / distanceToGround) * hoverThrust, repulsor.position);
        }
    }

    void RepulseAll() {
        foreach (Transform repulsor in repulsors) {
            RaycastHit hit;
            if (Physics.Raycast(repulsor.transform.position, -repulsor.transform.up, out hit, maxHoverImpulseRange)) {
                Repulse(hit, repulsor);
            }
        }        
    }

    void TrackInput() {
        if (Input.GetKeyDown(KeyCode.UpArrow)) {
            accelerate = true;
        }

        if (Input.GetKeyUp(KeyCode.UpArrow)) {
            accelerate = false;
        }

        if (Input.GetKeyDown(KeyCode.LeftArrow)) {
            steerLeft = true;
        }

        if (Input.GetKeyUp(KeyCode.LeftArrow)) {
            steerLeft = false;
        }

        if (Input.GetKeyDown(KeyCode.RightArrow)) {
            steerRight = true;
        }

        if (Input.GetKeyUp(KeyCode.RightArrow)) {
            steerRight = false;
        }

        if (Input.GetKeyUp("mouse 0")) {
            rigidbody.AddForce(new Vector3(Random.Range(-10,10),Random.Range(-10,10),Random.Range(-10,10)) * 20);
            rigidbody.AddTorque(new Vector3(Random.Range(-10,10),Random.Range(-10,10),Random.Range(-10,10)));
        }
    }

    void Move() {
        if (steerRight) {
            rigidbody.AddForceAtPosition(transform.right * steerThrust, leftThruster.position, ForceMode.Impulse);
        }        

        if (steerLeft) {
            rigidbody.AddForceAtPosition(-transform.right * steerThrust, rightThruster.position, ForceMode.Impulse);
        }

        if (soaring) {
            //rigidbody.AddForceAtPosition(-transform.up * diveThrust, noseThruster.position, ForceMode.Impulse);
        }

        if (accelerate) {
            rigidbody.AddForce(transform.forward * thrust, ForceMode.Impulse);
        }
    }
}