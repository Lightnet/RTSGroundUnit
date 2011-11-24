/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var headLook:Transform;
var hitlocalobj:Transform;
var offset = 1;
var cursorRay:Ray;
var firstpoint:Vector3 = new Vector3();
var secondpoint:Vector3 = new Vector3();
var bmousepress:boolean = false;

var unitcount:int = 0;

function Update () {
}

// Update is called once per frame
function LateUpdate () {
	cursorRay = Camera.main.ScreenPointToRay(Input.mousePosition);

	var hit : RaycastHit;
	Physics.Raycast(cursorRay, hit);
	
	if((Input.GetMouseButtonDown(0) == true)&&(bmousepress == false)){
		firstpoint = hit.point;
		bmousepress = true;
		//print("left mouse is press");
	}else{
		bmousepress = false;
	}
	secondpoint = hit.point;
	if(Input.GetMouseButtonUp(0)){
		secondpoint = hit.point;
		//print("dis: "+Vector3.Distance(firstpoint,secondpoint));
		if(Vector3.Distance(firstpoint,secondpoint) == 0){
			MoveSelectedUnits();
		}else{
			SelectedUnits();
		}
	}
	Debug.DrawLine(firstpoint, secondpoint, Color.red);	
}

function MoveSelectedUnits(){
	//print("move units");
	var units = jRTSUnit.units;
	if(units !=null){
		for (var i = 0; i < units.length;i++){
			var jrtsunit = units[i].GetComponent(jRTSUnit);
			var junitcontrol = units[i].GetComponent(jRTSGroundUnitControl);
			if(jrtsunit.bselected){
				junitcontrol.move(firstpoint);
			}
		}
	}
}

function SelectedUnits(){
	var min:Vector3 = Vector3();
	var max:Vector3 = Vector3();
	
	if(firstpoint.x > secondpoint.x){
		min.x = secondpoint.x;
		max.x = firstpoint.x;
	}else{
		min.x = firstpoint.x;
		max.x = secondpoint.x;
	}	
	if(firstpoint.y > secondpoint.y){
		min.y = secondpoint.y;
		max.y = firstpoint.y;
	}else{
		min.y = firstpoint.y;
		max.y = secondpoint.y;
	}
	
	if(firstpoint.z > secondpoint.z){
		min.z = secondpoint.z;
		max.z = firstpoint.z;
	}else{
		min.z = firstpoint.z;
		max.z = secondpoint.z;
	}
	print(min + ":" + max);
	var units = jRTSUnit.units;
	
	if(units !=null){
		for (var i = 0; i < units.length;i++){
			var rtsdataunit = units[i].GetComponent(jRTSUnit);
			if(rtsdataunit !=null){
				rtsdataunit.bselected = false;
				//print(rtsdataunit.rtsdata.name);
			}
		}
		unitcount =0;
		for (i = 0; i < units.length;i++){
			//print("unit...?");
			if((min.x <= units[i].transform.position.x) &&(max.x >= units[i].transform.position.x)&&
				/*(min.y <= units[i].position.y) &&(max.y >= units[i].position.y)&&*/
				(min.z <= units[i].transform.position.z) &&(max.z >= units[i].transform.position.z)){
				rtsdataunit = units[i].GetComponent(jRTSUnit);
				rtsdataunit.bselected = true;
				print(rtsdataunit.rtsdata.name);
				print(units[i]);
				//print("found it!");
				unitcount++;
			}
		}
			print("unit checked?");
	}else{
		print("?");
	}
}

function OnGUI(){
	var units = jRTSUnit.units;
	if(units !=null){
		GUI.Label(Rect(0,0,150,20),"Units:"+units.length);
	}
	
	if(checkunitselected()){
		GUI.Button(Rect(0,40,100,20),"Attack");
		GUI.Button(Rect(0,60,100,20),"Move");
		GUI.Button(Rect(0,80,100,20),"Hold");
		GUI.Button(Rect(0,100,100,20),"Guard");
		GUI.Button(Rect(0,120,100,20),"Portal");
		GUI.Button(Rect(0,140,100,20),"Cancel");
	}
}

function unitorder(order,object){
	var units:Array = jRTSUnit.units;
	if(units !=null){
		for(var i = 0; i < units.length;i++){
			var objectunit  = units[i].transform.GetComponent(jRTSUnit);
			var objectunitcontrol  = units[i].transform.GetComponent(jRTSGroundUnitControl);
			if(objectunit.bselected == true){
				//objectunit.
				objectunitcontrol.actionorder(order,object);
			}
		}
	}
}


function checkunitselected(){
	var bobjselected:boolean =  false;
	var units:Array  = jRTSUnit.units;
	if(units !=null){
		for (var i = 0; i < units.length; i++){
			var unit = units[i].transform.GetComponent(jRTSUnit);
			if(unit.bselected == true){
				bobjselected= true;
				break;
			}	
		}
	}
	return bobjselected;
}

function OnDrawGizmosSelected () {
	/*
	var min:Vector3 = Vector3();
	var max:Vector3 = Vector3();
	
	if(firstpoint.x > secondpoint.x){
		min.x = secondpoint.x;
		max.x = firstpoint.x;
	}else{
		min.x = firstpoint.x;
		max.x = secondpoint.x;
	}	
	if(firstpoint.y > secondpoint.y){
		min.y = secondpoint.y;
		max.y = firstpoint.y;
	}else{
		min.y = firstpoint.y;
		max.y = secondpoint.y;
	}
	
	if(firstpoint.z > secondpoint.z){
		min.z = secondpoint.z;
		max.z = firstpoint.z;
	}else{
		min.z = firstpoint.z;
		max.z = secondpoint.z;
	}
	*/
	// Draw a semitransparent blue cube at the transforms position
	Gizmos.color = Color (1,0,0,.5);
	Gizmos.DrawCube (firstpoint, Vector3 (1,1,1));
	Gizmos.DrawCube (secondpoint, Vector3 (1,1,1));
}


