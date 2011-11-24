/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var maxheight:float = 1000;
var minheight:float = 0;
var bplayercontrol:boolean = false;
var scrollspeed:float = 10;

function Update () {
	if (Input.GetAxis("Mouse ScrollWheel") > 0){
		transform.position.y -= scrollspeed;
		if(transform.position.y < minheight){
			transform.position.y = minheight;
		}
	}
	
	if (Input.GetAxis("Mouse ScrollWheel") < 0){
		transform.position.y += scrollspeed;
		if(transform.position.y > maxheight){
			transform.position.y = maxheight;
		}
	}
	
	if(bplayercontrol){
	if(Input.GetAxis("Vertical") > 0){
		transform.position.z += 1;
	
	}
	if(Input.GetAxis("Vertical") < 0){
		transform.position.z -= 1;
	}
	
	if(Input.GetAxis("Horizontal") > 0){
		transform.position.x += 1;
	
	}
	if(Input.GetAxis("Horizontal") < 0){
		transform.position.x -= 1;
	}
	}
}