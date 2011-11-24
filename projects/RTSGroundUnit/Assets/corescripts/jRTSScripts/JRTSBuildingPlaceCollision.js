/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var buildingunits:Array = new Array();

function OnTriggerEnter(other : Collider){
	//print("trigger collision:" + other.transform.root.transform.name);
	var buildinginfo01 = other.transform.root.transform.GetComponent(jRTSGroundBuildingUnit);
	var Collision01 = other.transform.GetComponent(JRTSBuildingCollision);
	if((buildinginfo01 !=null)&&(Collision01 !=null)){
		//print("checking");
		var bfound:boolean = false;
	
		for (buidlingunit in buildingunits){
			//var buildinginfo02 = buidlingunit.transform.GetComponent(jRTSGroundBuildingUnit);
			if( other.transform.root.transform == buidlingunit.transform){
				bfound = true;
				//print("found");
				break;
			}
		}
		if(bfound == false){
			buildingunits.Push(other.transform.root.transform);
		}
	}
	
	var unitinfo01 = other.transform.root.transform.GetComponent(jRTSUnit);
	var UnitCollision01 = other.transform.GetComponent(JRTSUnitCollision);
	if((unitinfo01 !=null)&&(UnitCollision01 !=null)){
		//print("unit collision check");
		var bfound01:boolean = false;
	
		for (buidlingunit in buildingunits){
			//var buildinginfo02 = buidlingunit.transform.GetComponent(jRTSGroundBuildingUnit);
			if( other.transform.root.transform == buidlingunit.transform){
				bfound01 = true;
				//print("found");
				break;
			}
		}
		if(bfound01 == false){
			buildingunits.Push(other.transform.root.transform);
		}
	}
	
	
	
	
	
	//print("check collision units:" + buildingunits.length);
}

function OnTriggerExit (other : Collider) {
	var buildinginfo01 = other.transform.root.transform.GetComponent(jRTSGroundBuildingUnit);
	var Collision01 = other.transform.GetComponent(JRTSBuildingCollision);
	if((buildinginfo01 !=null)&&(Collision01 != null)){
		for (buidlingunit in buildingunits){
			//var buildinginfo02 = buidlingunit.transform.GetComponent(jRTSGroundBuildingUnit);
			if( other.transform.root.transform == buidlingunit.transform){
				//bfound = true;
				//print("found");
				buildingunits.Remove(other.transform.root.transform);
				break;
			}
		}	
	}
	
	var unitinfo01 = other.transform.root.transform.GetComponent(jRTSUnit);
	var UnitCollision01 = other.transform.GetComponent(JRTSUnitCollision);
	if((unitinfo01 !=null)&&(UnitCollision01 !=null)){
		for (buidlingunit in buildingunits){
			if( other.transform.root.transform == buidlingunit.transform){
				//bfound = true;
				//print("found");
				//print("found remove");
				buildingunits.Remove(other.transform.root.transform);
				break;
			}
		}	
	}
	//print("remove collision units:" + buildingunits.length);
}


/*
function OnCollisionEnter(collision : Collision) {
	print("collision:" + collision.transform.root.transform.name);

}
*/


function Update () {
}