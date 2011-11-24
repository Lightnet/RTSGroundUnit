/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

/*
This deal with highlighting the unit on the ground that projector to the ground. 
It will update a variable change that doesn't update time.
It enable and disable of the transform.

*/

var bselected:boolean = false;
var bunitselected:boolean = false;
var bcheck:boolean = true;
var bcurrentselect:boolean = false;

var unitinfo;
var HighLightObj:Transform;

function Start(){
	unitinfo = transform.root.transform.GetComponent(jRTSUnit);
}

function Update () {

	if(unitinfo !=null){
		bselected = unitinfo.bselected;	
	}
	
	var oldbselected = bselected;
	if(bselected != bunitselected){//check if there a vairable change to active and deactive the game object
		bunitselected = bselected;
		bcheck = true;
	}
	
	if(bcheck){//it will update once if the variable change
		if(bselected){
			if(HighLightObj !=null){
				HighLightObj.transform.gameObject.SetActiveRecursively(true);
			}		
		}else{
			if(HighLightObj !=null){
				HighLightObj.transform.gameObject.SetActiveRecursively(false);
			}
		}
		bcheck = false;
	}


}