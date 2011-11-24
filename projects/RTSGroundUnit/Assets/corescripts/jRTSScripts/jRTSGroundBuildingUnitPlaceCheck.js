/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

/**
* This deal with place holder for the mouse hit scan loaction for preview build.
*/
var prefabunit:Transform;//spawn new base on this object
var gamename:String;
var bplace:boolean = false;

var mats_pass:Material[];
var mats_fail:Material[];

var collisions:Transform[];

var meshholder:Transform;


var bupdatechagnes:boolean = true;

function Update () {

	var bcollision:boolean = false;
	for ( collsion in collisions){
		var collisioninfo = collsion.transform.GetComponent(JRTSBuildingPlaceCollision);
		if(collisioninfo !=null){
			if(collisioninfo.buildingunits.length > 0){
				bcollision = true;
				break;
			}		
		}
	}

	var oldbplace = bcollision;
	if(bplace != oldbplace)//this will not force the update for every time the material is change
	{
		bupdatechagnes = true;
		bplace = oldbplace;
		//print("update");
	}

	if(bupdatechagnes){	
		if(meshholder !=null){		
			if(bplace == true){
				meshholder.renderer.materials = mats_fail;
			}else{
				meshholder.renderer.materials = mats_pass;
			}
		}
		bupdatechagnes = false;
	}
}