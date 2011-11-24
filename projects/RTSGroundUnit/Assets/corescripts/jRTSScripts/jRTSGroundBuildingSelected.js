/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var buildingselected:Transform;
var bmousepress:boolean = false;

var power:float = 0;
var powercost:float = 0;
public static var crystal:float = 0;
public static var gas:float = 0;
public static var ore:float = 0;
public static var taticalpoint:float = 0;

function LateUpdate(){
	updateres();
}

function Update () {
	cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);

	var hit : RaycastHit;
	Physics.Raycast(cursorRay, hit);
	
	if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
	
		bmousepress=true;	
		
		if(hit !=null){
			if(hit.transform !=null){
				if(hit.transform.parent !=null){
					var buildings = jRTSGroundBuildingUnit.buildings;
					if(buildings !=null){
						for(var i=0; i < buildings.length;i++){
							var buildingunit = buildings[i].transform.GetComponent(jRTSGroundBuildingUnit);
							buildingunit.bselected = false;
						}
					}
					
					print("name:" + hit.transform.parent.transform.name);
					var rtsbuildingunit = hit.transform.parent.transform.GetComponent(jRTSGroundBuildingUnit);
					if(rtsbuildingunit !=null){
						rtsbuildingunit.bselected = true;
						print("building unit selected...");
					}
				}
			}		
		}
	}
	else
	{
		bmousepress = false;
	}
}

function OnGUI(){
	GUI.Label(Rect(100,0,150,20),"Power: "+ (power - powercost) +"/"+power);
	GUI.Label(Rect(100,20,150,20),"Crystal: "+ crystal);
	GUI.Label(Rect(100,40,150,20),"Gas: "+gas );
	GUI.Label(Rect(100,60,150,20),"Ores: "+ore );
	GUI.Label(Rect(100,80,150,20),"Tatical points: "+taticalpoint);
	//GUI.Button();
}

function updateres(){
	var buildings:Array = jRTSGroundBuildingUnit.buildings;
	power = 0;
	powercost = 0;
	if(buildings !=null){
		for(var i = 0; i < buildings.length ;i++){
			var buildingunit = buildings[i].transform.GetComponent(jRTSGroundBuildingUnit);
			if(buildingunit !=null ){
				power += buildingunit.power;
				powercost += buildingunit.powercost;
			}
		}
	}
}



