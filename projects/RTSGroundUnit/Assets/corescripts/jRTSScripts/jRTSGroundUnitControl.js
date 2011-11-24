/*
 Project: RTS Ground
 Created By: Darknet
 SITE:https://sourceforge.net/projects/animecodeworld/
 SRC:https://animecodeworld.svn.sourceforge.net/svnroot/animecodeworld/trunk/projects/unity3d/RTSGroundUnit/
 license: Creative Commons Attribution 3.0 Unported License.
 As Long Credit work Darknet and others.
*/

var target:Transform;
var targetlastpoint:Vector3;
var targetpoint:Vector3 = new Vector3();
var movepoint:Vector3 = new Vector3();
var bmove:boolean = false;
var speed:float = 1;
var direction:Quaternion = new Quaternion();
var damp = 1;

var detectobject:Transform;
var weaponhandleprefab:Transform;
var weaponhandle:Transform;

var unittime:float = 0;
var unitspawntime:float = 5;
var bspawntime:boolean = false;

var firerange:float = 0;
var altfirerange:float = 0;
var closedistance:float = 10;

var aiorder:String = "";
var order:String = "hold";

function Start(){
	if(weaponhandleprefab !=null ){
		weaponhandle = Instantiate(weaponhandleprefab);
		weaponhandle.transform.parent = transform;
		weaponhandle.transform.position = transform.position;
		weaponhandle.transform.rotation = transform.rotation;
		var unitweapon = weaponhandle.transform.GetComponent(jRTSGroundUnitWeaponHandle);
		if((unitweapon !=null)){
			unitweapon.objectunit = transform;
		}else{
			print("error unit in weapon teamid");
		}
	}
}

function Update () {
	var controller : CharacterController = GetComponent(CharacterController);
	if(bmove){
		var objpos = new Vector3(transform.position.x,0,transform.position.z);
		var objpos2 = new Vector3(targetpoint.x,0,targetpoint.z);
		
		var dis = Vector3.Distance(objpos,objpos2);
		//print(dis);
		if(dis < closedistance){
			bmove = false;
			//print("move");
			return;
		}
		
		direction =Quaternion.LookRotation(targetpoint - transform.position);
		var rotate = Quaternion.Slerp(transform.rotation,direction,Time.deltaTime * damp);
		//var rotate = direction;
		var rotatey = rotate.eulerAngles;
		//transform.Rotate(0, (rotatey.y/360), 0);
		//transform.rotation = direction;
		transform.rotation = Quaternion.AngleAxis(rotatey.y, Vector3.up);
		
		var forward = transform.TransformDirection(Vector3.forward * speed);
		//forward.y = 0.2;
		controller.SimpleMove(forward);
	}else{
		controller.SimpleMove(Vector3.zero);
	}
}

function LateUpdate(){
	if(detectobject != null){
		var objweap;
		var detectobj = detectobject.transform.GetComponent(jRTSGroundUnitDetects);
		if(weaponhandle !=null){
			objweap = weaponhandle.transform.GetComponent(jRTSGroundUnitWeaponHandle);
			objweap.bfire = true;
		}
		target = detectobj.target;
		if(target != null){
			targetpoint = target.transform.position;
		}
		if(target != null){
			bmove= true;
			if(objweap !=null){
				//objweap.bfire = true;
			}
			
		}else{
			//bmove= false;
			if(objweap !=null){
				//objweap.bfire = false;
			}
		}
	}
}

function InitSpawn(initime){
	if(bspawntime == false){
		bspawntime = true;
		unittime = initime + unitspawntime;
	}
}

function ResetSpawn(){
	bspawntime = false;
}

function move(objtarget){
	bmove= true;
	targetpoint = objtarget;
	direction =Quaternion.LookRotation(objtarget - transform.position);
}

function actionorder(ordername,targetobject){


}







