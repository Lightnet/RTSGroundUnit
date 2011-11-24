/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var target:Transform;
var teamid:int;
var objunit:Transform;

function Start(){
	if(objunit !=null){
		var unitobj = objunit.transform.GetComponent(jRTSUnit);
		teamid = unitobj.rtsdata.teamid;
	}
}

function OnTriggerStay (other : Collider) {
	if(target ==null){
		if((other.transform !=null)&&(target ==null)&&(other.transform != transform.parent.transform)){
			var junit = other.transform.GetComponent(jRTSUnit);
			if((junit !=null)){
				if(junit.rtsdata.teamid != teamid){
					target = other.transform;
				}else{
					target = other.transform;
				}
			}
		}
	}
}

function OnTriggerExit(other : Collider){
	if(other.transform == target){
		target=null;
	}
}


function Update () {
}