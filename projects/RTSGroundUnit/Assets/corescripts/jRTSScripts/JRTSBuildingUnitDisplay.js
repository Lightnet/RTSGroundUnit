var bdistance:boolean = false;
var mindistance:float = 0;
var maxdistance:float = 60;

var bdisplayinfo:boolean = false;

//var bdisplayprogressbar:boolean = false;
var objprogressbar:Transform;
var progressbarinfo;

//var bdisplay3dtext:boolean = false;
var objtext3d:Transform;
var text3d:TextMesh;

var buildinginfo;
var unitinfo;

var bfollowmaincam:boolean = true;

function Start(){
	buildinginfo = transform.root.transform.GetComponent(jRTSGroundBuildingUnit);
	unitinfo = transform.root.transform.GetComponent(jRTSUnit);
	
	if(objprogressbar !=null){
		progressbarinfo = objprogressbar.transform.GetComponent(JRTSStatus3DBar);
		if(bdisplayinfo == false){
			objprogressbar.transform.gameObject.SetActiveRecursively(false);	
		}
	}
	
	if(objtext3d !=null){
		text3d = objtext3d.transform.GetComponent(TextMesh);
		text3d.text = unitinfo.rtsdata.name;
		if(bdisplayinfo == false){
			objtext3d.transform.gameObject.SetActiveRecursively(false);	
		}
	}
}

function Update () {
	if(progressbarinfo !=null){
		progressbarinfo.percent = 1 - (unitinfo.rtsdata.health/unitinfo.rtsdata.healthcaps);
	}
	
	if(bfollowmaincam){
		transform.rotation = Quaternion.LookRotation(transform.position - Camera.main.transform.position);
	}
}